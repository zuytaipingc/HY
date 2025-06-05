<template>
  <div class="login-page">
    <div class="login-card">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            class="input-field"
            placeholder="请输入用户名"
            required
          >
        </div>
        <div class="form-group">
          <label>密码</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            class="input-field"
            placeholder="请输入密码"
            required
          >
        </div>
        <button type="submit" class="btn login-btn">登 录</button>
        <div class="register-link">
          没有账号？<a @click="goToRegister">立即注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '../store/index'

const router = useRouter()
const musicStore = useMusicStore()

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    alert('请输入用户名和密码')
    return
  }

  // 管理员特殊处理
  if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin123') {
    musicStore.adminLogin({
      username: 'admin',
      token: 'fake-admin-token',
      isAdmin: true
    })
    router.push('/admin') // 跳转到管理后台
  } else {
    // 普通用户登录
    musicStore.login({
      username: loginForm.value.username,
      token: 'fake-jwt-token',
      isAdmin: false
    })
    router.push('/') // 跳转到用户首页
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(135deg, #1e2a78 0%, #2a3a8a 100%);
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.login-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.login-btn:active {
  transform: translateY(1px);
}

.register-link {
  text-align: center;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.register-link a {
  color: #58a6ff;
  cursor: pointer;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.2s ease;
}

.register-link a:hover {
  text-decoration: underline;
  color: #79b8ff;
}
</style>