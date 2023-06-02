<script setup>
import { useRouter } from 'vue-router';
import FolderLinkTile from './FolderLinkTile.vue';
import LinkTile from './LinkTile.vue';

// const width = ref(15);
// const dragging = ref(false);

const listAll = (l) => {
    l.forEach(e => {
        if (e.children) l = l.concat(listAll(e.children));
    });
    return l
}

const routes = listAll(useRouter().options.routes);

// const onMouseDown = (e) => {
//     dragging.value = true;
//     console.log(e);
//     console.log(Math.max(Math.min(e.clientX / e.view.innerWidth * 100, 30), 10));
//     width.value = Math.max(Math.min(e.clientX / e.view.innerWidth * 100, 30), 10);
//     // width.value = Math.max(Math.min(e.clientX + 5, 600), 200);
//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
// }

// const onMouseMove = (e) => {
//     if (!dragging.value) return;
//     width.value = Math.max(Math.min(e.clientX / e.view.innerWidth * 100, 30), 10);
//     // width.value = Math.max(Math.min(e.clientX + 5, 600), 200);
// }

// const onMouseUp = () => {
//     dragging.value = false;
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
// }

</script>
<template>
    <div id=sidebar>
        <!-- // TODO: LOGO
        <div id="logo">
            
        </div> -->
        <!--  :style="{ width: `${width}vw` }" -->
        <div id=sidebar-content>
            <div class=sidebar-selector>
                <!-- <FolderLinkTile v-if="state.folder" :to="{ name: 'VoidCloud-Folder' }" icon=Folder text=我的檔案 :folder="state.folder" /> -->
                <FolderLinkTile :to="{ name: 'VoidCloud-Folder' }" icon=Folder text=我的檔案 />
                <template v-for="(route, idx) in routes">
                    <LinkTile v-if="route.show" :key="idx" :to="route" :icon="route.show" :text="route.meta.title" />
                </template>
            </div>
            <!-- <div class=sidebar-selector>
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
            </div>
            <div class=sidebar-selector>
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
                <LinkTile :to="'/'" icon="Account" text="帳號" />
            </div> -->
        </div>
        <!-- <div id=sidebar-resizer @mousedown="onMouseDown" @mouseup="onMouseUp" /> -->
    </div>
</template>

<style lang=scss>
#sidebar {
    position: relative;
}

// TODO: LOGO
// #logo {
    
// }

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

.sidebar-selector+.sidebar-selector::before {
    position: absolute;
    height: 1px;
    width: 100%;
    transform: translateY(calc(-#{$selector-gap} / 2));
    content: '';
    border-top: $border;
}

.sidebar-selector {
    @include flex-row;
    gap: .5rem;

    @media (min-width: $medium-device-width) {
        @include flex-column;
    }

    >.linktile {
        padding-left: $icon-size;
    }
}
</style>