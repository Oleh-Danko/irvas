import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');


    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, num) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[prop] = num;
                        break;
                        case 'INPUT' :
                            if (item.getAttribute('type') === 'checkbox') {
                               num === 0 ? state[prop] = 'Xолодне' : state[prop] = 'Tепле';
                               elem.forEach((box, i) => {
                                    box.checked = false;
                                    if (num == i) {
                                        box.checked = true;
                                    }
                               });
                            } else {
                                state[prop] = item.value;
                            }
                            break;
                        if (item.getAttribute('type') === 'checkbox') {
                            console.log('checkbox');
                        } else {
                            state[prop] = item.value;
                            console.log(state);
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }
    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');

};

export default changeModalState;