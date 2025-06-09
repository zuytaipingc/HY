<template>
  <div class="register-page">
    <div class="register-card">
      <h2>用户注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>用户名</label>
          <input 
            v-model="registerForm.username" 
            type="text" 
            class="input-field"
            placeholder="请输入用户名"
            required
          >
        </div>
        <div class="form-group">
          <label>密码</label>
          <input 
            v-model="registerForm.password" 
            type="password" 
            class="input-field"
            placeholder="请输入密码"
            required
          >
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input 
            v-model="registerForm.confirmPassword" 
            type="password" 
            class="input-field"
            placeholder="请再次输入密码"
            required
          >
        </div>
        <button type="submit" class="btn register-btn">注 册</button>
        <div class="login-link">
          已有账号？<a @click="goToLogin">立即登录</a>
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

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  // 表单验证
  if (!registerForm.value.username) {
    alert('请输入用户名')
    return
  }
  
  if (!registerForm.value.password) {
    alert('请输入密码')
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  // 模拟注册
  musicStore.register({
    username: registerForm.value.username,
    token: 'fake-jwt-token'
  })
  router.push('/')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(135deg, #1e2a78 0%, #2a3a8a 100%);
}

.register-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.register-card h2 {
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

.register-btn {
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

.register-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.register-btn:active {
  transform: translateY(1px);
}

.login-link {
  text-align: center;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.login-link a {
  color: #58a6ff;
  cursor: pointer;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.2s ease;
}

.login-link a:hover {
  text-decoration: underline;
  color: #79b8ff;
}
</style>