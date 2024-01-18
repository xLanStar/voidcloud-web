<script setup>
import { ref } from "vue";
import { SVG_ICON_COLOR_PRIMARY, ViewType } from "../reference";
import { closeViewer, viewer, viewingFile } from "../store";
import { downloadFile, viewNext, viewPrevious } from "../store/storage";
import SvgIcon from "./SvgIcon.vue";

const isFullscreen = ref(
  screen.fullScreen ||
    (window.innerWidth === screen.width && window.innerHeight === screen.height)
);

const onClickImage = (e) => {
  e.clientX / e.view.innerWidth < 0.5 ? viewPrevious() : viewNext();
};

const fullscreen = () => {
  if (isFullscreen.value) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
  isFullscreen.value ^= true;
};

const teste = ref(null);
const test = (e) => {
  teste.value = e;
  console.log(e);
};
</script>

<template>
  <div v-if="viewer.show" id="viewer">
    <div class="background"></div>
    <div id="viewer-header">
      <span>
        <SvgIcon
          icon="Close"
          alt="關閉"
          :color="SVG_ICON_COLOR_PRIMARY"
          @click="closeViewer"
        />
      </span>
      {{ teste && teste.type }}
      {{ teste && teste.scale }}
      <span>
        <SvgIcon
          :icon="isFullscreen ? 'FullscreenExit' : 'Fullscreen'"
          alt="全螢幕"
          :color="SVG_ICON_COLOR_PRIMARY"
          @click="fullscreen"
        />
        <SvgIcon
          icon="Download"
          alt="下載"
          :color="SVG_ICON_COLOR_PRIMARY"
          @click="downloadFile(viewingFile.filepath, viewingFile.file)"
        />
      </span>
    </div>
    <div id="viewer-content">
      <div
        v-if="viewingFile.viewType === ViewType.Image"
        id="viewer-image"
        @click="onClickImage"
      >
        <img :src="viewingFile.link" @pa="test" :alt="viewingFile.filepath" />
      </div>
      <video
        v-else-if="viewingFile.viewType === ViewType.Video"
        id="viewer-video"
        controls
        :title="viewingFile.filepath"
        
        :src="viewingFile.link"
      />
      <div v-else>目前無法預覽此類型的檔案</div>
    </div>
  </div>
</template>

<style lang="scss">
#viewer {
  @include flex-column;
  z-index: 10;
  inset: 0;
  position: fixed;

  .background {
    @include background-dark;
    position: absolute;
    inset: 0;
    opacity: 0.8;
    z-index: -1;
  }
}

#viewer-header {
  @include secondary-background-normal;
  @include flex-row;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}

#viewer-content {
  flex: 1;
  overflow: hidden;
  position: relative;

  > :first-child {
    max-width: 100%;
    max-height: 100%;
  }
}

#viewer-image {
  position: absolute;
  inset: 0;

  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
}

#viewer-video {
  width: 100%;
  height: 100%;
}
</style>
