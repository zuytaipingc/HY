<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const router = useRouter()

const onSubmit = () => {
  loading.value = true
  // 模拟登录API调用
  setTimeout(() => {
    if (form.value.username && form.value.password) {
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error('请输入用户名和密码')
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2 class="auth-title">用户登录</h2>
      <el-form 
        :model="form" 
        @submit.prevent="onSubmit"
        class="auth-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        
        <el-button 
          type="primary" 
          native-type="submit" 
          :loading="loading"
          class="auth-button"
        >
          登录
        </el-button>
        
        <div class="auth-footer">
          没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: rgba(0, 0, 0, 0.5);
}

.auth-card {
  width: 100%;
  max-width: 450px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid var(--accent-color);
}

.auth-title {
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 2rem;
}

.auth-form {
  padding: 0 1.5rem;
}

.auth-button {
  width: 100%;
  margin-top: 1rem;
  background: var(--accent-color);
  border: none;
}

.auth-button:hover {
  background: #ff3333;
}

.auth-footer {
  margin-top: 1rem;
  text-align: center;
  color: #aaa;
}

.auth-footer a {
  color: var(--accent-color);
  text-decoration: none;
}
</style>