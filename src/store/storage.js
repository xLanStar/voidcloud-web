import { reactive } from "vue";
import StorageHelper from "../helper/StorageHelper";
import { getViewType } from "../util";
import { state } from "./state";

let _downloadid = 0;
export const storage = reactive({
    downloads: {},
});

export const viewingFolder = reactive({
    shareFolder: null,
    files: [],
    filepath: '',
    accessable: false
})

export const viewer = reactive({
    show: false,
    onClose: null,
})

export const viewingFile = reactive({
    index: 0,
    file: null,
    filepath: '',
    link: '',
    viewType: ''
})

// 紀錄下載進度
export const newDownload = (data, loaded=0, total=0) => {
    const id = _downloadid++;
    storage.downloads[id] = { loaded, total, ...data };
    return id;
}

// 下載檔案
export const downloadFile = async (filepath, { basename, mime }) => {
    const id = newDownload({ basename });
    const data = await StorageHelper.client.getFileContents(filepath, {
        onDownloadProgress: (progressEvent) => {
            storage.downloads[id].loaded = progressEvent.loaded;
            storage.downloads[id].total = progressEvent.total;
        }
    });
    const blob = new Blob([data], {type: mime});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = basename;
    link.click();
}

// 讀取資料夾
export const viewFolder = async (filepath) => {
	console.log("[儲存]", "讀取資料夾", filepath);
	state.loading = true;
    viewingFolder.accessable = true;
	await StorageHelper.client.getDirectoryContents(filepath, ).then((data) => {
		viewingFolder.files = data.slice(1).map(file => { return { ...file, isDir: file.type === 'directory' } }).sort((a, b) => a.isDir && -1);
		viewingFolder.filepath = filepath;
		console.log("[儲存]", "檔案", viewingFolder.files)
	}).catch(err => {
		console.log("[儲存]", "發生未知的錯誤:", err);
        viewingFolder.accessable = false;
	})
	state.loading = false;
}

const _viewFile = (index) => {
    viewingFile.index = index;
    viewingFile.file = viewingFolder.files[index];
    console.log("[Viewer]", "檢視檔案", {...viewingFile.file});
    viewingFile.filepath = `${viewingFolder.filepath}/${viewingFile.file.basename}`;
    viewingFile.link = `${StorageHelper.client.getFileDownloadLink(viewingFile.filepath)}?Authorization=${localStorage.getItem('token')}${viewingFolder.shareFolder ? `&folder=${viewingFolder.shareFolder}` : ''}`;
    viewingFile.viewType = getViewType(viewingFile.file);
}

// 檢視檔案
export const viewFile = (index, onClose) => {
    _viewFile(index);
    viewer.onClose = onClose;
    viewer.show = true;
}

// 檢視下一個檔案
export const viewNext = () => {
    let index = (viewingFile.index + 1) % viewingFolder.files.length;
    while(getViewType(viewingFolder.files[index]) !== viewingFile.viewType) 
        index = (index + 1) % viewingFolder.files.length;
        _viewFile(index);
}

// 檢視上一個檔案
export const viewPrevious = () => {
    let index = (viewingFile.index - 1 + viewingFolder.files.length) % viewingFolder.files.length;
    while(getViewType(viewingFolder.files[index]) !== viewingFile.viewType)
        index = (index - 1 + viewingFolder.files.length) % viewingFolder.files.length;
        _viewFile(index);
}

export const closeViewer = () => {
    console.log("[Viewer]", "結束")
    viewer.onClose && viewer.onClose();
    viewer.show = false;
}