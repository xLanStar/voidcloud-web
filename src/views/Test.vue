<script setup>
import { ref } from "vue";
import FlatButton from "../components/FlatButton.vue";
import InputBox from "../components/InputBox.vue";
import Popover from "../components/Popover.vue";
import SvgIcon from "../components/SvgIcon.vue";
import {
  EmailValidator,
  SVG_ICON_COLOR_PRIMARY,
  SVG_ICON_COLOR_SECONDARY,
} from "../reference";
import { Notification, showMenu } from "../store";

// References
const icons = [
  "Account",
  "AccountCircle",
  "ArrowCollapseDown",
  "BArrow",
  "Cast",
  "Check",
  "CheckCircle",
  "Close",
  "Computer",
  "Download",
  "Error",
  "Eye",
  "EyeClosed",
  "File",
  "FileAlert",
  "FileCheck",
  "FileDocument",
  "FileDownload",
  "FileEdit",
  "FileMusic",
  "FilePlus",
  "FileQuestion",
  "FileStar",
  "FileSync",
  "FileUpload",
  "Filter",
  "Folder",
  "FolderAlert",
  "FolderEdit",
  "FolderImage",
  "FolderPlus",
  "FolderRemove",
  "FolderShared",
  "FolderSync",
  "FolderUpload",
  "FormatLetter",
  "Headphone",
  "HelpCircle",
  "Home",
  "Information",
  "LArrow",
  "Like",
  "Link",
  "LinkV",
  "List",
  "Lock",
  "Mail",
  "Moon",
  "Open",
  "Play",
  "Printer",
  "Question",
  "RArrow",
  "Refresh",
  "Search",
  "Share",
  "SortDescending",
  "Sun",
  "Trash",
  "Warning",
];

// Component Ref
const component_hue = ref(null);

// Data
const outline = ref(0);
const text = ref("測試文字");

// Functions
const f1 = (n) => n % 3 == 0;
const f2 = (n) => n % 3 >= 1;
const f3 = (n) => n % 3 >= 2;

const d1 = (n) => Math.floor((n % 9) / 3) == 0;
const d2 = (n) => Math.floor((n % 9) / 3) == 1;
const d3 = (n) => Math.floor((n % 9) / 3) == 2;

const onClickInputBoxIcon = () => {
  Notification.info({ message: "點擊輸入框的 Lead 圖示" });
};

const onMouseDownHue = (e) => {
  const hue = (e.offsetX / e.target.clientWidth) * 360;
  Notification.info({ message: `設定彩度為 ${Math.floor(hue)}` });
  document.body.style.setProperty("--theme-h", hue);
  document.addEventListener("pointerup", onMouseUpHue);
  component_hue.value.addEventListener("pointermove", onMouseMoveHue);
};

const onMouseMoveHue = (e) => {
  const hue =
    (Math.min(Math.max(e.offsetX, 0), e.target.clientWidth) /
      e.target.clientWidth) *
    360;
  Notification.info({ message: `設定色相 ${Math.floor(hue)}` });
  document.body.style.setProperty("--theme-h", hue);
};

const onMouseUpHue = () => {
  document.removeEventListener("pointerup", onMouseUpHue);
  component_hue.value.removeEventListener("pointermove", onMouseMoveHue);
};

const onInputHue = (e) => {
  const hue = Number(e.target.value);
  Notification.info({ message: `設定色相 ${hue}` });
  document.body.style.setProperty("--theme-h", hue);
};

const test_menu = [
  {
    icon: "Account",
    text: "新增帳號",
    click: () => Notification.info({ message: "點擊選單 新增帳號" }),
  },
  {
    icon: "File",
    text: "新增檔案",
    click: () => Notification.info({ message: "點擊選單 新增檔案" }),
  },
  {
    icon: "Folder",
    text: "新增資料夾",
    click: () => Notification.info({ message: "點擊選單 新增資料夾" }),
  },
];
</script>
<template>
  <div
    id="test"
    :class="`show-outline-${outline}`"
    @contextmenu="(e) => showMenu(test_menu, e.clientX, e.clientY)"
  >
    <div id="test-content" class="block">
      <p>圖示</p>
      <div class="list">
        <SvgIcon
          class="test-icon clickable"
          v-for="(icon, idx) in icons"
          :key="icon"
          :icon="icon"
          :color="
            idx < icons.length / 2
              ? SVG_ICON_COLOR_PRIMARY
              : SVG_ICON_COLOR_SECONDARY
          "
          @click="Notification.info({ message: `點擊了圖示 #${icon}` })"
        >
        </SvgIcon>
      </div>
      <p>按鈕</p>
      <div class="list">
        <span class="item">無</span>
        <span class="item">陰影</span>
        <span class="item">陰影+圓邊</span>
      </div>
      <div class="list">
        <FlatButton
          v-for="(_, idx) in Array(9)"
          :key="idx"
          class="item"
          icon="File"
          :text="text"
          :class="{
            shadow: f2(idx),
            round: f3(idx),
            secondary: d2(idx),
            primary: d3(idx),
          }"
          @click="Notification.warning({ message: `點擊了 #${idx} 按鈕` })"
        >
          <template #lead v-if="idx % 3">
            <SvgIcon
              icon="Check"
              :color="
                d2(idx) || d3(idx)
                  ? SVG_ICON_COLOR_PRIMARY
                  : SVG_ICON_COLOR_SECONDARY
              "
              @click.stop="
                idx % 2
                  ? Notification.error({ message: '點擊了 Lead 圖示' })
                  : Notification.info({ message: '點擊了 Lead 圖示' })
              "
            />
          </template>
          {{ `#${idx}` }}
        </FlatButton>
      </div>
      <p>輸入框</p>
      <div class="list" id="test-inputbox-list">
        <InputBox
          class="item"
          :value="text"
          @input="(e) => (text = e.target.value)"
        />
        <Popover placement="topRight">
          <template v-slot="{ show, hide }">
            <InputBox
              type="email"
              icon="Mail"
              maxlength="320"
              placeholder="電子信箱"
              :value="email"
              :validate-status="!EmailValidator.test(email) && 'error'"
              @input="
                (e) =>
                  (text = e.target.value) && EmailValidator.test(email)
                    ? hide()
                    : show()
              "
              @focusin="!EmailValidator.test(email) && show()"
              @focusout="hide"
            />
          </template>
          <template #content> 電子信箱格式不正確！ </template>
        </Popover>
        <InputBox
          class="item"
          type="text"
          icon="Lock"
          maxlength="16"
          placeholder="密碼"
          :value="text"
          @input="(e) => (text = e.target.value)"
          hide
        />
      </div>
      <p>滑條</p>
      <div class="list">
        <span class="item">無</span>
        <span class="item">主顏色</span>
        <span class="item">副顏色</span>
      </div>
      <div class="list" id="test-slider-list">
        <InputBox
          type="range"
          class="item show-range"
          min="1"
          max="100"
          @input="
            (e) =>
              Notification.info({
                message: `滑條 #無主顏色 ${e.target.value}`,
                key: 'Slider1',
              })
          "
        ></InputBox>
        <InputBox
          type="range"
          class="item show-range primary"
          min="1"
          max="10000"
          @input="
            (e) =>
              Notification.info({
                message: `滑條 #主顏色 ${e.target.value}`,
                key: 'Slider2',
              })
          "
        ></InputBox>
        <InputBox
          type="range"
          class="item show-range secondary"
          min="0"
          max="10"
          @input="
            (e) =>
              Notification.info({
                message: `滑條 #副顏色 ${e.target.value}`,
                key: 'Slider3',
              })
          "
        ></InputBox>
      </div>
    </div>
    <div id="test-controls" class="block">
      <p>測試工具</p>
      <div class="list">
        <div class="test-option">
          外框:
          <select @change="(e) => (outline = Number(e.target.value))">
            <option value="0">不顯示外框</option>
            <option value="1">顯示元件的外框</option>
            <option value="2">顯示所有元素的外寬</option>
          </select>
        </div>
      </div>
      <div class="test-option">
        色相:
        <InputBox
          ref="component_hue"
          class="show-range"
          id="test-theme-h"
          type="range"
          min="0"
          max="360"
          primary
          @input="onInputHue"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#test {
  @include flex-column;
  justify-items: center;
  height: 100vh;
  font-size: var(--medium-font-size);
  line-height: var(--medium-font-size);

  > div + div {
    border-top: 4px solid black;
  }

  > #test-content {
    @include flex-column;
    flex: 1;
    justify-items: center;
    overflow-y: auto;
    padding: 0 2rem 2rem 2rem;
  }

  > #test-controls {
    height: fit-content;
    padding: 0 2rem 2rem 2rem;
  }

  .block {
    @include flex-column;

    > p {
      text-align: center;
      font-size: var(--medium-font-size);
    }

    > .list {
      @include flex-wrap;
    }
  }

  &.show-outline-1 {
    .test-icon,
    .flat-button,
    .inputbox,
    .tooltip {
      outline: 2px solid red;
    }
  }

  &.show-outline-2 {
    * {
      outline: 2px solid red;
    }
  }

  select {
    font-size: var(--medium-font-size);
  }

  .test-option {
    @include secondary-background-dark;
    @include focus-secondary-background;
    @include hover-secondary-background;
    @include flex-row;
    align-items: center;
    border: 2px solid black;
    padding: 0.2rem;
  }
}

.test-icon {
  width: 64px;
  height: 64px;
  position: relative;
}

.list {
  gap: 1rem;

  .item {
    width: calc((100% - 2rem) / 3);
    text-align: center;
  }
}

.flat-button {
  height: 3rem;
}

#test-theme-h {
  flex: 1;

  input {
    background-size: 50%;

    &::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
      );
    }
  }
}
</style>
