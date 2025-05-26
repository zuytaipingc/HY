<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '../store'
import api from '../utils/api'

const router = useRouter()
const musicStore = useMusicStore()

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  if (!form.value.username || !form.value.password || !form.value.confirmPassword) {
    error.value = '请填写所有必填字段'
    return
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const response = await api.register(form.value)
    musicStore.login(response.data.user)
    router.push('/')
  } catch (err) {
    error.value = '注册失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>注册</h2>
      <el-form :model="form" label-width="100px" class="auth-form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">注册</el-button>
          <el-button @click="goToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #330000 100%);
}

.auth-card {
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 450px;
  color: white;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ff4d4d;
}

.auth-form {
  margin-top: 20px;
}

.error-message {
  color: #ff4d4d;
  text-align: center;
  margin-top: 15px;
}
</style>