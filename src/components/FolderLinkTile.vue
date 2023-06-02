<script setup>
import { ref } from 'vue';
import { SVG_ICON_COLOR_PRIMARY } from '../reference';
import LinkTile from './LinkTile.vue';
import SvgIcon from './SvgIcon.vue';

defineProps({
    to: String|Object,
    icon: String,
    text: String,
    folder: Object
})

const show = ref(false);

const onClickFold = e => {
    show.value = !show.value;
}
</script>

<template>
    <div class="foldertile" :class="{ show }">
        <LinkTile :to="to || { name: 'Box-Folder' }" :icon="icon" :text="text">
            <template v-slot:lead>
                <SvgIcon class="foldertile-fold clickable" :color="SVG_ICON_COLOR_PRIMARY" icon="RArrow" @click.stop="onClickFold" />
            </template>
        </LinkTile>
        <div v-if="folder && folder.subFolders" class="subfolder-list">
            <FolderLinkTile v-for="(subFolder, id) in folder.subFolders" :key="id"
                :to="{ name: 'Box-Folder' }" :icon="icon" :text="subFolder.name" />
        </div>
    </div>
</template>

<style lang="scss">
.foldertile {
    @include flex-column;

    &.show {
        .foldertile-fold {
            transform: rotateZ(90deg);
        }

        >.subfolder-list {
            height: auto;
        }
    }
}

.linktile-container {
    position: relative;
}

.foldertile-fold {
    transform: rotateZ(0deg);
    transition: transform .2s;
}

.subfolder-list {
    overflow: hidden;
    height: 0;
}
</style>