<script setup>
import { useRouter } from "vue-router";
import FolderLinkTile from "./FolderLinkTile.vue";
import LinkTile from "./LinkTile.vue";

const listAll = (l) => {
  l.forEach((e) => {
    if (e.children) l = l.concat(listAll(e.children));
  });
  return l;
};

const routes = listAll(useRouter().options.routes);
</script>
<template>
  <div id="sidebar">
    <div id="sidebar-content">
      <div class="sidebar-selector">
        <FolderLinkTile
          :to="{ name: 'VoidCloud-Folder' }"
          icon="Folder"
          text="我的檔案"
        />
        <template v-for="(route, idx) in routes">
          <LinkTile
            v-if="route.show"
            :key="idx"
            :to="route"
            :icon="route.show"
            :text="route.meta.title"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#sidebar {
  position: relative;
}

#sidebar-resizer {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  cursor: col-resize;
}

$selector-gap: 3rem;

#sidebar-content {
  @include flex-row;
  border-right: $border;
  gap: $selector-gap;
  overflow-x: scroll;
  justify-content: center;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: $medium-device-width) {
    @include flex-column;
    justify-content: flex-start;
    height: 100%;
    padding: 2rem 0;
  }

  .seperator {
    border: $border;
  }
}

.sidebar-selector + .sidebar-selector::before {
  position: absolute;
  height: 1px;
  width: 100%;
  transform: translateY(calc(-#{$selector-gap} / 2));
  content: "";
  border-top: $border;
}

.sidebar-selector {
  @include flex-row;
  gap: 0.5rem;

  @media (min-width: $medium-device-width) {
    @include flex-column;
  }

  > .linktile {
    padding-left: $icon-size;
  }
}
</style>
