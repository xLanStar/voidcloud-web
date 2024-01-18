<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logout } from "../auth";
import InputBox from "../components/InputBox.vue";
import Sidebar from "../components/Sidebar.vue";
import { Notification, showMenu, state } from "../store";

const router = useRouter();

const profile = ref(null);

const profileOptions = [
  {
    icon: "Logout",
    text: "登出",
    click: () => logout() || router.push({ name: "Login" }),
  },
];

const keyword = ref("");

const search = () => {
  Notification.info({ message: `開始搜尋: ${keyword.value}` });
};
</script>

<template>
  <div id="drive-page">
    <Sidebar v-if="state.user" />
    <div id="drive-container">
      <div id="drive-header">
        <InputBox
          icon="Search"
          id="drive-search"
          :value="keyword"
          @input="(e) => (keyword = e.target.value)"
          @clickIcon="search"
        />
        <div
          v-if="state.user"
          ref="profile"
          id="drive-profile"
          @click.stop="
            (e) => {
              const rect = profile.getBoundingClientRect();
              showMenu(profileOptions, rect.right, rect.bottom + 8);
            }
          "
        >
          <img
            id="drive-profile-image"
            src="https://teameowdev.files.wordpress.com/2016/04/avatar24-01.png"
            :alt="state.user.name"
          />
          <div>
            {{ state.user.name }}
          </div>
        </div>
      </div>
      <div id="drive-content">
        <router-view />
        <div id="drive-info"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#drive-page {
  @include flex-column;
  width: 100%;
  height: 100%;

  @media (min-width: $medium-device-width) {
    @include flex-row;
  }
}

#drive-container {
  @include flex-column;
  flex: 1;
}

#drive-header {
  @include flex-row;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: $border;
  height: 3rem;
}

#drive-search {
  width: 100%;

  @media (min-width: $medium-device-width) {
    width: 40vw;
    min-width: 200px;
  }
}

#drive-profile {
  @include clickable;
  @include flex-row;
  align-items: center;
  gap: 0.5rem;
}

#drive-profile-image {
  max-height: 3rem;
  max-width: 3rem;
}

#drive-content {
  @include flex-row;
  @include background-normal;
  flex: 1;
}

#drive-info {
  display: none;
  width: 200px;
  border-left: $border;

  @media (min-width: $small-device-width) {
    display: block;
  }
}
</style>
