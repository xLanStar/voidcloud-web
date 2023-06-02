import { reactive } from "vue";
import { NotificationType } from "../reference";

let counter = 0;

export const notifications = reactive({});

const notify = (type, message, duration, key) => {
	let id;
	if (key) {
		id = key;
	} else {
		id = counter;
		counter++;
	}
	console.log('[提醒]', '類型:', type, '訊息:', message, 'id:', id);
	if (!notifications[id]) {
		notifications[id] = {
			show: false,
			type,
			message,
			timeout: null
		}
		notifications[id].timeout = setTimeout(() => {
			notifications[id].show = true;
			notifications[id].timeout = setTimeout(() => {
				notifications[id].show = false;
				notifications[id].timeout = setTimeout(() => {
					delete notifications[id];
				}, 200)
			}, duration ?? 3000);
		}, 10);
	} else {
		notifications[id].type = type;
		notifications[id].message = message;
		notifications[id].show = true;
		clearTimeout(notifications[id].timeout);
		notifications[id].timeout = setTimeout(() => {
			notifications[id].show = false;
			notifications[id].timeout = setTimeout(() => {
				delete notifications[id];
			}, 200)
		}, duration ?? 3000);
	}
}

const info = ({ message, duration, key }) => {
	notify(NotificationType.Information, message, duration, key);
}

const success = ({ message, duration, key }) => {
	notify(NotificationType.Success, message, duration, key);
}

const error = ({ message, duration, key }) => {
	notify(NotificationType.Error, message, duration, key);
}

const warning = ({ message, duration, key }) => {
	notify(NotificationType.Warning, message, duration, key);
}

const custom = ({ message, duration, key }) => {
	notify(NotificationType.Custom, message, duration, key);
}

export default {
	info,
	success,
	error,
	warning,
	custom
}