<script setup>
import {
  NotificationType,
  SVG_ICON_COLOR_PRIMARY,
  SVG_ICON_COLOR_SECONDARY,
} from "../reference";
import { notifications } from "../store";
import SvgIcon from "./SvgIcon.vue";

const colorMap = {
  [NotificationType.Information]: SVG_ICON_COLOR_PRIMARY,
  [NotificationType.Success]: "#09b336",
  [NotificationType.Warning]: "#e8862a",
  [NotificationType.Error]: "red",
  [NotificationType.Custom]: SVG_ICON_COLOR_SECONDARY,
};
</script>

<template>
  <div id="notification-container">
    <div
      class="notification"
      v-for="notification in notifications"
      :key="notification"
      :class="[{ show: notification.show }, notification.type]"
    >
      <SvgIcon
        :icon="notification.icon || notification.type"
        :color="colorMap[notification.type]"
      />
      <p class="notification-title">{{ notification.message }}</p>
    </div>
  </div>
</template>

<style lang="scss">
#notification-container {
  @include flex-column;
  gap: 1rem;
  position: fixed;
  top: 1rem;
  right: 1rem;
  align-items: end;
}
.notification {
  @include flex-row;
  @include round-border;
  @include border-shadow;
  z-index: 9;
  gap: 0.5rem;
  height: 2rem;
  padding: 1rem;
  width: fit-content;
  align-items: center;
  transition: transform 0.1s ease-in, opacity 0.2s ease-out;
  transform: translateY(-50%);
  opacity: 0;
  background-color: white;

  &.show {
    transform: none;
    opacity: 1;
  }
}

.notification-title {
  color: #333;
  font-size: var(--medium-font-size);
}
</style>
