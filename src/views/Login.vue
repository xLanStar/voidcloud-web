<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../auth";
import FlatButton from "../components/FlatButton.vue";
import InputBox from "../components/InputBox.vue";
import Popover from "../components/Popover.vue";
import { AccountValidator, EmailValidator } from "../reference";
import { Notification } from "../store";

const isRegister = ref(false);
const name = ref("");
const account = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const toggle = () => {
  isRegister.value ^= true;
};

const router = useRouter();

const onSubmit = async () => {
  if (isRegister.value) {
    console.log(
      "register",
      name.value,
      account.value,
      email.value,
      password.value
    );
    await register;
  } else {
    if (!account.value) {
      return Notification.info({ message: "請輸入帳號" });
    }
    if (!password.value) {
      return Notification.info({ message: "請輸入密碼" });
    }
    const result = await login(account.value, password.value);
    if (!result) {
      return;
    }
    router.push({ name: "VoidCloud" });
  }
};
</script>

<template>
  <div id="login">
    <div id="login-header">
      {{ isRegister ? "建立新帳號" : "VoidCloud 雲端" }}
    </div>
    <div id="login-content" @keypress.enter="onSubmit">
      <InputBox
        v-if="isRegister"
        icon="Name"
        placeholder="名稱"
        :value="name"
        @input="(e) => (name = e.target.value)"
      />
      <Popover placement="topRight">
        <template v-slot="{ show, hide }">
          <InputBox
            icon="Account"
            placeholder="帳號"
            :validate-status="!AccountValidator.test(account) && 'error'"
            :value="account"
            @input="
              (e) =>
                (account = e.target.value) && AccountValidator.test(account)
                  ? hide()
                  : show()
            "
            @focusin="!AccountValidator.test(account) && show()"
            @focusout="hide"
          >
          </InputBox>
        </template>
        <template #content>
          帳號只能由以下文字組成
          <ul>
            <li>英文(a-z, A-Z)</li>
            <li>數字(0-9)</li>
          </ul>
        </template>
      </Popover>
      <Popover placement="topRight">
        <template v-slot="{ show, hide }">
          <InputBox
            v-if="isRegister"
            type="email"
            icon="Mail"
            maxlength="320"
            placeholder="電子信箱"
            :value="email"
            :validate-status="!EmailValidator.test(email) && 'error'"
            @input="
              (e) =>
                (email = e.target.value) && EmailValidator.test(email)
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
        type="password"
        icon="Lock"
        maxlength="16"
        placeholder="密碼"
        :value="password"
        @input="(e) => (password = e.target.value)"
      />
      <Popover v-if="isRegister" placement="topRight">
        <template v-slot="{ show, hide }">
          <InputBox
            type="password"
            icon="Lock"
            maxlength="16"
            placeholder="確認密碼"
            :value="confirmPassword"
            :validate-status="confirmPassword !== password && 'error'"
            @input="
              (e) =>
                (confirmPassword = e.target.value) &&
                confirmPassword !== password
                  ? show()
                  : hide()
            "
            @focusin="confirmPassword !== password && show()"
            @focusout="hide"
          />
        </template>
        <template #content> 密碼必須一致 </template>
      </Popover>
      <span
        id="login-forget"
        @click="Notification.info({ message: '尚未實作' })"
        >{{ isRegister ? "" : "忘記密碼?" }}</span
      >
    </div>
    <div id="login-footer">
      <FlatButton
        tabindex="0"
        :text="isRegister ? '註冊' : '登入'"
        class="primary round shadow"
        @click="onSubmit"
      />
      <div id="login-seperator">或</div>
      <FlatButton
        tabindex="0"
        :text="isRegister ? '登入' : '註冊'"
        class="secondary round shadow"
        @click="toggle"
        @keypress.enter="toggle"
      />
    </div>
  </div>
</template>

<style lang="scss">
#login {
  @include flex-column;
  padding: 2rem;
  gap: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  min-width: 95%;

  @media (min-width: $small-device-width) {
    @include float-shadow;
    min-width: 400px;
  }
}

#login-header {
  @include flex-column;
  font-size: var(--medium-font-size);

  > .icon {
    height: $icon-size;
  }
}

#login-content {
  @include flex-column;
  gap: 0.5rem;
}

#login-forget {
  @include clickable;
  align-self: flex-end;
  color: var(--color);
}

#login-footer {
  @include flex-column;
  text-align: center;
  gap: 1rem;

  > .flat-button {
    padding: 0.5rem;
    justify-content: center;
  }
}

#login-seperator {
  position: relative;

  &:before,
  &:after {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 40%;
    height: 1px;
    content: "\a0";
    background-color: var(--primary-color-normal);
  }

  &:before {
    left: 0%;
  }

  &:after {
    left: 60%;
  }
}
</style>
