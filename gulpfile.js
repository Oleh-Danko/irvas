"use strict";

//импорт модулей/пакетов которые понадобяться в зборке
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

//путь куда будет все компилироваться
const dist = "./dist/";
// const dist = "D:/System files/Документы/OpenServer/domains/test";

//задачи - таски

//задача - отслеживает изменения внесенные в html файл
gulp.task("copy-html", () => {
    return gulp.src("./src/index.html") //берем по адресу файл
                .pipe(gulp.dest(dist))  //перемещаем в папку dist
                .pipe(browsersync.stream());  //запускаем browsersync, чтобы страница перезагрузилась
});

//задача по кампиляции скриптов
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")  //берем файл
                .pipe(webpack({  //запускаем webpack
                    mode: 'development',  //указиваем режим
                    output: {  //куда складываеться
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",  //создаеться карта проекта(с каки х кусков состоят скрипты и откуда идут)
                    module: {  //подключаем модуль webpack
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',  //подключаем babel
                              options: {
                                presets: [['@babel/preset-env', {  //указываем присет
                                    debug: true,  //включаем, чтобы консоль показывала где была ошибка
                                    corejs: 3,  //настройки библиотеки core.js(подключена в пакет json)
                                    useBuiltIns: "usage"  //подключает необходимые полифилы согласно браузер листу(который мы указали > 1%)
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))  //отправляем в папку dist
                .on("end", browsersync.reload);  //перезагружаем страницу
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")  // берем из папки все файлы и папки
                .pipe(gulp.dest(dist + "/assets"))  //перемещаем
                .on("end", browsersync.reload);  //перезагружаем
});

//внутри запускаеться отдельный сервер который работает при помощи browsersync
gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",  //серверит файлы внутри папки
		port: 4000,
		notify: true
    });
    
    //запускаеться gulp.watch, чтобы следил за файлами, если изменяеться - запускаеться таск указаный внутри gulp.parallel();
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//запускает все три задачи(на случай изменения кода до запуска gulp)
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

//аналог задачи по кампиляции скриптов, только в более чистовом варианте
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

//default - запускаеться по умолчанию
//build - для компеляции кода, который изменился до запуска gulp
//watch - для отслежки всех изменений
gulp.task("default", gulp.parallel("watch", "build"));