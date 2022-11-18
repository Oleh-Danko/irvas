const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num > 0 && num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
   };

    const getTimereamaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor(t/1000 % 60),
              minutes = Math.floor(t/1000 / 60 % 60),
              hours = Math.floor(t/1000 / 60 / 60 % 24),
              days = Math.floor(t/1000 / 60 / 60 / 24);

        return {
            total: t,
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            days: days
        };

    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(upDateClock, 1000);

        upDateClock();

        function upDateClock() {
            const t = getTimereamaining(endtime);
            
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';

                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;

