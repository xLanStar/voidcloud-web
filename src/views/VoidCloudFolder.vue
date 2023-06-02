<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import FileItem from '../components/FileItem.vue';
import SvgIcon from '../components/SvgIcon.vue';
import ApiHelper from '../helper/APIHelpr';
import StorageHelper from '../helper/StorageHelper';
import { SHARE_FILE_API } from '../reference';
import { showMenu, viewFile, viewFolder, viewingFolder } from '../store';

const route = useRoute();
const router = useRouter();

const fileContainer = ref(null);

// 網格模式
const grid = ref(false);
// 是否按壓
const pressed = ref(false);
const selecting = ref(false);
// 選擇的起點
const startSelectPoint = ref({});
// 選擇矩形的資料
const selectRect = ref({ top: 0, left: 0, width: 0, height: 0 });
const startSelectedIndex = ref(-1);
const endSelectedIndex = ref(-1);


const backMenu = [
	{
		icon: 'Folder',
		text: '新資料夾',
		click: () => {
			console.log('[VoidCloud-Folder]', "新資料夾");
		}
	},
	{
		icon: 'FileUpload',
		text: '上傳檔案',
		click: () => { }
	}
]

const fileMenu = [
	{
		icon: 'Account',
		text: '共用',
		isActive: startSelectedIndex.value == endSelectedIndex.value && startSelectedIndex.value != -1,
		click: () => {
			const file = viewingFolder.files[startSelectedIndex.value];
			ApiHelper.post(SHARE_FILE_API, {
				folder: route.params.folder,
				name: file.basename,
				isDir: file.isDir
			})
		}
	},
	{
		icon: 'Info',
		text: '屬性',
		click: () => { }
	}
]


const ViewFile = (index) => {
	viewFile(index, () => {
		console.log("[BoxFolder]", "close callback");
	});
}

const find = (A, B) => {
	return A.right >= B.left && A.left <= B.right && A.top <= B.bottom && A.bottom >= B.top
}

const updateSelect = (left, top, right, bottom) => {
	const files = fileContainer.value.children
	const firstRect = files[0].getBoundingClientRect();
	const lastRect = files[files.length - 1].getBoundingClientRect();
	if (bottom < firstRect.top || top > lastRect.bottom || right < firstRect.left || left > firstRect.right) {
		startSelectedIndex.value = -1;
		endSelectedIndex.value = -1;
		return;
	}
	let lower = 0, upper = files.length - 1;
	while (lower < upper) {
		const mid = Math.floor((lower + upper) / 2);
		const rect = files[mid].getBoundingClientRect();
		if (rect.bottom < top) {
			lower = mid + 1;
		} else if (rect.top > bottom) {
			upper = mid - 1;
		} else if (rect.right >= left && rect.left <= right && rect.top <= bottom && rect.bottom >= top) {
			upper = mid;
		} else {
			lower = mid + 1;
		}
	}
	startSelectedIndex.value = lower;
	lower = 0, upper = files.length - 1;
	while (lower < upper) {
		const mid = Math.ceil((lower + upper) / 2);
		const rect = files[mid].getBoundingClientRect();
		if (rect.bottom < top) {
			lower = mid + 1;
		} else if (rect.top > bottom) {
			upper = mid - 1;
		} else if (rect.right >= left && rect.left <= right && rect.top <= bottom && rect.bottom >= top) {
			lower = mid;
		} else {
			upper = mid - 1;
		}
	}
	endSelectedIndex.value = lower;
}

const onMouseDownExplorer = e => {
	pressed.value = true;
	startSelectPoint.value = { x: e.x, y: e.y }
	selectRect.value = { left: e.x, top: e.y, width: 0, height: 0 };
	updateSelect(e.x, e.y, e.x, e.y);
}

const onMouseMoveExplorer = e => {
	if (!pressed.value) return;
	selecting.value = true;
	let left, top, right, bottom;
	const { x, y } = startSelectPoint.value;
	if (e.x < x) {
		left = e.x;
		right = x;
	} else {
		left = x;
		right = e.x;
	}
	if (e.y < y) {
		top = e.y;
		bottom = y;
	} else {
		top = y;
		bottom = e.y;
	}
	selectRect.value = { left, top, width: right - left, height: bottom - top };
	updateSelect(left, top, right, bottom);
}

const onMouseUpExplorer = () => {
	pressed.value = false;
	selecting.value = false;
};


onBeforeRouteUpdate(to => StorageHelper.client && viewFolder(to.params.folder.join("/")));

onBeforeMount(() => {
	// window.addEventListener('click', unselect);
	// window.addEventListener('contextmenu', unselect);
})
onBeforeUnmount(() => {
	// window.removeEventListener('click', unselect);
	// window.removeEventListener('contextmenu', unselect);
})

StorageHelper.client && viewFolder(route.params.folder.join("/"));
</script>


<template>
	<div v-if=viewingFolder.accessable id=drive-folder>
		<!-- <div>當前選擇的檔案：{{ selectedFile }}</div> -->
		<div id="folder-explorer" @contextmenu.stop.prevent="e => showMenu(backMenu, e.clientX, e.clientY)">
			<div id="explorer-header">
				<div id="folder-path">
					<span
						@click="router.push({ name: 'VoidCloud-Folder', params: { folder: route.params.folder.slice(0, 1) }, query: { folder: route.query.folder } })">
						/
					</span>
					<span v-for="(folder, idx) in route.params.folder.slice(1)"
						@click="router.push({ name: 'VoidCloud-Folder', params: { folder: route.params.folder.slice(0, idx + 2) }, query: { folder: route.query.folder } })">
						{{ folder }}
					</span>
				</div>
				<div>
					<SvgIcon icon=Grid @click="grid = true" />
					<SvgIcon icon=List @click="grid = false" />
				</div>
			</div>
			<div id="folder-explorer-content" @mousedown="onMouseDownExplorer" @mouseup="onMouseUpExplorer"
				@mousemove="onMouseMoveExplorer">
				<div v-if="!grid" id=folder-explorer-title class=list-item>
					<span>名稱</span>
					<span>最後修改時間</span>
				</div>
				<div id="file-container-wrapper">
					<div ref="fileContainer" :id="grid ? 'file-grid' : 'file-list'" class=file-container>
						<FileItem v-for="(file, idx) in viewingFolder.files" :key="idx" :file="file" :grid="grid"
							:active="startSelectedIndex <= idx && idx <= endSelectedIndex"
							@dblclick="file.isDir ? router.push({ name: 'VoidCloud-Folder', params: { folder: [...route.params.folder, file.basename] }, query: { folder: route.query.folder } }) : ViewFile(idx)"
							@contextmenu.stop.prevent="e => {
								console.log('contextmenu fileitem');
								showMenu(fileMenu, e.clientX, e.clientY)
							}" />
					</div>
				</div>
			</div>
			<div v-if="selecting" id="selector" @mouseup="onMouseUpExplorer" @mousemove="onMouseMoveExplorer"
				:style="{ top: `${selectRect.top}px`, left: `${selectRect.left}px`, width: `${selectRect.width}px`, height: `${selectRect.height}px` }">
			</div>
		</div>
	</div>
	<div v-else>
		<p>很抱歉!您沒有權限檢視此檔案</p>
	</div>
</template>

<style lang="scss">
#drive-folder {
	@include flex-column;
	flex: 1;
	padding: 1rem;
	gap: 1rem;
}

// Folder Explorer
#folder-explorer {
	@include flex-column;
	flex: 1;
}

#explorer-header {
	@include flex-row;
	justify-content: space-between;
}

$folder-path-gap: 1rem;

#folder-path {
	@include flex-row;
	color: var(--primary-color-normal);
	gap: $folder-path-gap;
	margin: .5rem;

	>span {
		@include clickable;
		padding: 0 8px;
		position: relative;
	}

	>span+span::before {
		content: ">";
		pointer-events: none;
		display: inline-block;
		margin-left: 0;
		position: absolute;
		width: 0;
		left: calc(-#{$folder-path-gap} / 2 - 8px);
		text-align: center;
		color: var(--text-color);
	}
}

#folder-explorer-content {
	@include background-light;
	@include round-border;
	@include border-shadow;
	@include flex-column;
	flex: 1;
}


#folder-explorer-title {
	font-size: var(--medium-font-size);
	line-height: var(--medium-font-size);
	padding: 1rem;
	border-bottom: $border;
}

#file-container-wrapper {
	position: relative;
	overflow: hidden;
	;
	flex: 1;
}

.file-container {
	position: absolute;
	inset: 1rem;
	flex: 1;
	gap: .5rem;
	overflow: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
}

#file-list {
	@include flex-column;
}

#file-grid {
	@include flex-wrap;
	flex-direction: row;
}

#selector {
	background-color: rgba(0, 0, 0, 0.12);
	border: $border;
	position: fixed;
}
</style>