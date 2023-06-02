import { reactive } from "vue";

export const menuData = reactive({
    show: false,
    options: [],
    x: 0,
    y: 0,
    callback: null,
    style: {}
});

let timeout;

export const hideMenu = () => {
    console.log('hide menu');
	menuData.show = false;
    timeout = setTimeout(() => {
        menuData.active = false;
    }, 200);
	window.removeEventListener('click', hideMenu);
	window.removeEventListener('mousedown', hideMenu);
	window.removeEventListener('contextmenu', hideMenu);
};

export const showMenu = (options, x, y) => {
    console.log('show menu');
    menuData.active = true;
    menuData.options = options;
    menuData.x = x;
    menuData.y = y;
    if (timeout) clearTimeout(timeout);
    setTimeout(() => {
        menuData.show = true;
    }, 10);
	window.removeEventListener('click', hideMenu);
	window.removeEventListener('mousedown', hideMenu);
	window.removeEventListener('contextmenu', hideMenu);
	window.addEventListener('click', hideMenu);
	window.addEventListener('mousedown', hideMenu);
	window.addEventListener('contextmenu', hideMenu);
}