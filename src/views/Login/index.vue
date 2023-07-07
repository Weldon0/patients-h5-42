<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'vant'

import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { useUserStore } from '@/stores'
import { loginApi, loginByMobile, sendCode } from '@/service/user'

const userStore = useUserStore()
const router = useRouter()

const agree = ref<boolean>(false)
const show = ref<boolean>(false)
const mobile = ref<string>('13230000100')
const password = ref<string>('abc12345')
const code = ref('')
const isPass = ref(true) // 是否为密码登录场景
const form = ref<FormInstance>()
const showCountDown = ref(false)

const login = async () => {
  // 只有点击了同意协议，才可以进行登录
  if (!agree.value) {
    // 全部的请提示
    showToast('请同意协议')
    return
  }
  // 如果当前是密码的场景，调用账号密码的接口，否则调用验证码接口
  const res = isPass.value
    ? await loginApi(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)
  userStore.setUser(res.data)
  router.push('/user')
  showToast('登录成功')
}

// 发送验证码的方法
const send = async () => {
  // 我们还要对手机号校验
  // 获取form实例，调用validate
  await form.value?.validate('mobile')
  await sendCode(mobile.value, 'login')
  showToast('验证码发送成功')
  showCountDown.value = true
}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      title="登录"
      right-text="注册"
      @click-right="$router.push('/register')"
    />
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '验证码登录' }}</h3>
      <a href="javascript:" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单 -->
    <van-form ref="form" autocomplete="off" @submit="login">
      <van-field
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        v-model="password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
        :rules="passwordRules"
      >
        <template #button>
          <CpIcon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          />
        </template>
      </van-field>
      <van-field
        v-model="code"
        :rules="codeRules"
        placeholder="输入验证码"
        v-else
      >
        <template #button>
          <span v-if="!showCountDown" class="btn-send" @click="send"
            >发送验证码</span
          >
          <van-count-down
            @finish="showCountDown = false"
            v-else
            :time="60 * 1000"
            format="ss"
          >
            <template #default="timeData">
              <span class="btn-send active"
                >{{ timeData.seconds }}s之后重新发送</span
              >
            </template>
          </van-count-down>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
