<script setup>
import { ref } from "vue";
import { SVG_ICON_COLOR_PRIMARY, SVG_ICON_COLOR_SECONDARY } from "../reference";
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  type: String,
  icon: String,
  clickIcon: Function,
  required: Boolean,
  maxlength: String,
  placeholder: String,
  invalid: Boolean,
  validateStatus: String | undefined,
  value: String,
  min: String,
  max: String,
});
const emits = defineEmits(["clickIcon"]);

const focusOnce = ref(false);
const focus = ref(false);
const isHidden = ref(true);

const handleHide = () => (isHidden.value ^= true);

const statusIconMap = {
  success: "Success",
  information: "Information",
  warning: "Warning",
  error: "Error",
};

const statusColorMap = {
  success: SVG_ICON_COLOR_PRIMARY,
  information: "#09b336",
  warning: "#e8862a",
  error: "red",
};
</script>

<template>
  <div class="inputbox" :class="validateStatus">
    <SvgIcon
      v-if="icon"
      :icon="icon"
      :color="focus ? SVG_ICON_COLOR_PRIMARY : SVG_ICON_COLOR_SECONDARY"
      @click="(e) => emits('clickIcon', e)"
    />
    <input
      class="input"
      :type="isHidden ? type : 'text'"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :value="value"
      :placeholder="placeholder"
      @focus="
        focus = true;
        focusOnce = true;
      "
      @blur="focus = false"
    />
    <SvgIcon
      v-if="type === 'password'"
      :icon="isHidden ? 'EyeClosed' : 'Eye'"
      :color="focus ? SVG_ICON_COLOR_PRIMARY : SVG_ICON_COLOR_SECONDARY"
      @click="handleHide"
    />
    <SvgIcon
      v-if="validateStatus"
      :icon="statusIconMap[validateStatus]"
      :color="statusColorMap[validateStatus]"
    />
  </div>
</template>

<style lang="scss">
$input-icon-size: 40px;
$icon-margin: calc(($input-icon-size - $icon-size) / 2);

.input {
  flex: 1;
  z-index: 0;
  width: 100%;
  border: none;
  outline: 0;
  box-shadow: none;
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-in;
  padding: 0 1rem;
  text-align: left;
  font-size: var(--medium-font-size);

  &[type="range"] {
    appearance: none;
    height: 20px;
    position: relative;

    &::-webkit-slider-thumb {
      @include border-shadow;
      background: white;
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      cursor: ew-resize;
    }

    &::-webkit-slider-runnable-track {
      @include round-border;
      @include background-dark;
      appearance: none;
      box-shadow: none;
    }
  }
}

.inputbox {
  @include flex-row;
  @include round-border;
  @include background-light;
  position: relative;
  align-items: center;
  outline: 2px solid #ccc;
  height: 40px;

  &.error {
    outline: 2px solid $error-color;
  }

  &.primary {
    > input[type="range"] {
      &::-webkit-slider-runnable-track {
        background: var(--primary-color-dark);
      }

      &::-webkit-slider-thumb {
        @include primary-background-light;
      }
    }
  }

  &.secondary {
    > input[type="range"] {
      &::-webkit-slider-runnable-track {
        background: var(--secondary-color-dark);
      }

      &::-webkit-slider-thumb {
        @include secondary-background-light;
      }
    }
  }

  &.show-range > .input {
    gap: 0.5rem;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    background: none;

    &::before,
    &::after {
      height: fit-content;
    }

    &::before {
      content: attr(min);
      left: 0;
    }

    &::after {
      content: attr(max);
      right: 0;
    }
  }
}
</style>
