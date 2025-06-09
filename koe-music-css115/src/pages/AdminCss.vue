<template>
  <div class="admin-container">
    <!-- 管理员登录表单 -->
    <div v-if="!isAuthenticated" class="login-form">
      <el-card class="login-card">
        <template #header>
          <div class="login-header">管理员登录</div>
        </template>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="管理员账号" prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock" show-password />
          </el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn">
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>

    <!-- 管理后台主界面 -->
    <div v-else class="admin-dashboard">
      <!-- 顶部导航 -->
      <div class="admin-header">
        <div class="header-left">
          <span class="title">音乐平台管理系统</span>
        </div>
        <div class="header-right">
          <span class="welcome">欢迎，管理员 {{ adminInfo.name }}</span>
          <el-button type="danger" size="small" @click="handleLogout" class="logout-btn">
            退出登录
          </el-button>
        </div>
      </div>

      <!-- 主体内容 -->
      <div class="admin-main">
        <!-- 侧边栏 -->
        <div class="admin-sidebar">
          <el-menu :default-active="activeMenu" class="sidebar-menu" @select="handleMenuSelect">
            <el-menu-item index="users">
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="singers">
              <el-icon>
                <Microphone />
              </el-icon>
              <span>歌手管理</span>
            </el-menu-item>
            <el-menu-item index="statistics">
              <el-icon>
                <DataAnalysis />
              </el-icon>
              <span>数据统计</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 内容区 -->
        <div class="admin-content">
          <!-- 用户管理 -->
          <div v-if="activeMenu === 'users'" class="user-management">
            <el-card class="management-card">
              <template #header>
                <div class="card-header">
                  <span>用户列表</span>
                  <el-input v-model="userSearchQuery" placeholder="搜索用户" class="search-input" clearable
                    @clear="fetchUsers" @keyup.enter="searchUsers">
                    <template #prefix>
                      <el-icon class="search-icon">
                        <Search />
                      </el-icon>
                    </template>
                  </el-input>
                </div>
              </template>
              <el-table :data="filteredUsers" style="width: 100%" border>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column prop="username" label="用户名" width="120" />
                <el-table-column prop="email" label="邮箱" width="180" />
                <el-table-column label="用户类型" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.isAdmin ? 'danger' : row.isSinger ? 'success' : 'info'">
                      {{ row.isAdmin ? '管理员' : row.isSinger ? '歌手' : '普通用户' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="registerTime" label="注册时间" width="180" />
                <el-table-column label="操作" width="220">
                  <template #default="{ row }">
                    <el-button size="small" @click="viewUserDetail(row)">
                      查看详情
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteUser(row.id)" :disabled="row.isAdmin">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination" :current-page="userPage.current" :page-size="userPage.size"
                :total="userPage.total" @current-change="handleUserPageChange" />
            </el-card>

            <!-- 用户详情对话框 -->
            <el-dialog v-model="userDetailVisible" :title="`用户详情 - ${currentUser.username}`" width="70%">
              <div class="user-detail-container">
                <div class="user-basic-info">
                  <el-avatar :size="100" :src="currentUser.avatar" />
                  <div class="user-info">
                    <h3>{{ currentUser.username }}</h3>
                    <p>邮箱: {{ currentUser.email }}</p>
                    <p>注册时间: {{ currentUser.registerTime }}</p>
                    <p>
                      用户类型:
                      <el-tag :type="currentUser.isAdmin ? 'danger' : currentUser.isSinger ? 'success' : 'info'">
                        {{ currentUser.isAdmin ? '管理员' : currentUser.isSinger ? '歌手' : '普通用户' }}
                      </el-tag>
                    </p>
                  </div>
                </div>

                <el-tabs type="border-card" class="user-data-tabs">
                  <el-tab-pane label="收藏歌曲">
                    <el-table :data="currentUser.favorites" border>
                      <el-table-column prop="id" label="ID" width="80" />
                      <el-table-column prop="title" label="歌曲名" width="150" />
                      <el-table-column prop="artist" label="歌手" width="120" />
                      <el-table-column prop="album" label="专辑" width="150" />
                      <el-table-column prop="duration" label="时长" width="100" />
                      <el-table-column prop="collectTime" label="收藏时间" width="180" />
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="最近播放">
                    <el-table :data="currentUser.recentlyPlayed" border>
                      <el-table-column prop="id" label="ID" width="80" />
                      <el-table-column prop="title" label="歌曲名" width="150" />
                      <el-table-column prop="artist" label="歌手" width="120" />
                      <el-table-column prop="album" label="专辑" width="150" />
                      <el-table-column prop="duration" label="时长" width="100" />
                      <el-table-column prop="playTime" label="播放时间" width="180" />
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-dialog>
          </div>

          <!-- 歌手管理 -->
          <div v-else-if="activeMenu === 'singers'" class="singer-management">
            <el-card class="management-card">
              <template #header>
                <div class="card-header">
                  <span>歌手列表</span>
                  <div class="header-actions">
                    <el-input v-model="singerSearchQuery" placeholder="搜索歌手" class="search-input" clearable
                      @clear="fetchSingers" @keyup.enter="searchSingers">
                      <template #prefix>
                        <el-icon class="search-icon">
                          <Search />
                        </el-icon>
                      </template>
                    </el-input>
                    <el-button type="primary" @click="showAddSingerDialog">
                      添加歌手
                    </el-button>
                  </div>
                </div>
              </template>
              <el-table :data="filteredSingers" style="width: 100%" border>
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column label="头像" width="100">
                  <template #default="{ row }">
                    <el-avatar :size="50" :src="row.avatar" />
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="歌手名" width="120" />
                <el-table-column prop="description" label="简介" />
                <el-table-column label="操作" width="180">
                  <template #default="{ row }">
                    <el-button size="small" @click="editSinger(row)">
                      编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteSinger(row.id)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination" :current-page="singerPage.current" :page-size="singerPage.size"
                :total="singerPage.total" @current-change="handleSingerPageChange" />
            </el-card>

            <!-- 添加/编辑歌手对话框 -->
            <el-dialog v-model="singerDialogVisible" :title="isEditingSinger ? '编辑歌手' : '添加歌手'" width="50%">
              <el-form :model="singerForm" :rules="singerRules" ref="singerFormRef">
                <el-form-item label="歌手名" prop="name">
                  <el-input v-model="singerForm.name" />
                </el-form-item>
                <el-form-item label="歌手简介" prop="description">
                  <el-input v-model="singerForm.description" type="textarea" />
                </el-form-item>
                <el-form-item label="歌手头像" prop="avatar">
                  <!-- 模拟上传逻辑：拦截真实请求，生成临时 URL -->
                  <el-upload class="avatar-uploader" :action="mockUploadAction" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="singerForm.avatar" :src="singerForm.avatar" class="avatar" :key="imageKey" />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="标签">
                  <el-tag v-for="tag in singerForm.tags" :key="tag" closable @close="removeTag(tag)">
                    {{ tag }}
                  </el-tag>
                  <el-input v-if="tagInputVisible" ref="tagInputRef" v-model="tagInputValue" size="small"
                    @keyup.enter="addTag" @blur="addTag" />
                  <el-button v-else size="small" @click="showTagInput">
                    + 添加标签
                  </el-button>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="singerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitSingerForm">
                  确认
                </el-button>
              </template>
            </el-dialog>
          </div>

          <!-- 数据统计 -->
          <div v-else class="data-statistics">
            <el-card class="statistics-card">
              <template #header>
                <div class="card-header">
                  <span>平台数据概览</span>
                </div>
              </template>
              <div class="statistics-overview">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-card shadow="hover" class="stat-card">
                      <div class="stat-item">
                        <div class="stat-value">{{ statistics.userCount }}</div>
                        <div class="stat-label">注册用户</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card shadow="hover" class="stat-card">
                      <div class="stat-item">
                        <div class="stat-value">{{ statistics.singerCount }}</div>
                        <div class="stat-label">歌手数量</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card shadow="hover" class="stat-card">
                      <div class="stat-item">
                        <div class="stat-value">{{ statistics.songCount }}</div>
                        <div class="stat-label">歌曲总数</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card shadow="hover" class="stat-card">
                      <div class="stat-item">
                        <div class="stat-value">{{ statistics.playCount }}</div>
                        <div class="stat-label">总播放量</div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>

              <div class="statistics-charts">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-card shadow="hover" class="chart-card">
                      <div class="chart-title">用户增长趋势</div>
                      <div class="chart-container">
                        <img src="/images/admin/user-growth.png" alt="用户增长趋势" class="chart-img">
                        <div class="chart-placeholder">用户增长图表</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card shadow="hover" class="chart-card">
                      <div class="chart-title">热门歌手TOP10</div>
                      <div class="chart-container">
                        <img src="/images/admin/top-singers.png" alt="热门歌手TOP10" class="chart-img">
                        <div class="chart-placeholder">热门歌手图表</div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  User, Lock, Search, Microphone,
  DataAnalysis, Plus, Delete
} from '@element-plus/icons-vue'
import { useMusicStore } from '../store/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const musicStore = useMusicStore()

onMounted(() => {
  if (!musicStore.isAdmin) {
    router.push('/')
    alert('无权访问管理后台')
  }
})

// 管理员登录状态
const isAuthenticated = ref(false)
const adminInfo = ref({
  name: '管理员'
})

// 登录表单
const loginForm = ref({
  username: '',
  password: ''
})
const loginRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const loginFormRef = ref()

const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      // 验证管理员账号
      if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
        musicStore.adminLogin({
          username: 'admin',
          name: '系统管理员'
        })
        isAuthenticated.value = true
      } else {
        ElMessage.error('管理员账号或密码错误')
      }
    }
  })
}

const handleLogout = () => {
  musicStore.logout()
  isAuthenticated.value = false
}

// 菜单管理
const activeMenu = ref('users')
const handleMenuSelect = (index) => {
  activeMenu.value = index
}

// 用户管理
// 用户管理部分
const users = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@music.com',
    isAdmin: true,
    registerTime: '2023-01-01 10:00:00',
    avatar: 'https://via.placeholder.com/150',
    favorites: [],
    recentlyPlayed: []
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    isSinger: false,
    registerTime: '2023-01-02 10:00:00',
    avatar: 'https://via.placeholder.com/150',
    favorites: [
      { id: 1, title: '七里香', artist: '周杰伦', album: '七里香', duration: '04:00', collectTime: '2023-05-01 14:30:00' }
    ],
    recentlyPlayed: [
      { id: 1, title: '七里香', artist: '周杰伦', album: '七里香', duration: '04:00', playTime: '2023-05-10 20:30:00' }
    ]
  }
])

const userSearchQuery = ref('')

const userPage = ref({
  current: 1,
  size: 10,
  total: 50
})

const currentUser = ref({})
const userDetailVisible = ref(false)

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.username.includes(userSearchQuery.value) ||
    user.email.includes(userSearchQuery.value)
  )
})

const fetchUsers = () => {
  // 模拟获取用户数据
  console.log('Fetching users...')
}

const searchUsers = () => {
  // 模拟搜索用户
  console.log('Searching users...')
}

const handleUserPageChange = (page) => {
  userPage.value.current = page
  fetchUsers()
}

const viewUserDetail = (user) => {
  currentUser.value = user
  userDetailVisible.value = true
}

const deleteUser = (id) => {
  users.value = users.value.filter(user => user.id !== id)
  ElMessage.success('用户删除成功')
}

// 歌手管理
const singers = computed(() => musicStore.singers)
const singerSearchQuery = ref('')
const singerPage = ref({
  current: 1,
  size: 10,
  total: 30
})
const singerDialogVisible = ref(false)
const isEditingSinger = ref(false)
const singerForm = ref({
  name: '',
  description: '',
  avatar: '',
  tags: []
})
const singerFormRef = ref()
const tagInputVisible = ref(false)
const tagInputValue = ref('')
const singerRules = {
  name: [{ required: true, message: '请输入歌手名', trigger: 'blur' }],
  description: [{ required: true, message: '请输入歌手简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传歌手头像', trigger: 'blur' }]
}

const filteredSingers = computed(() => {
  return singers.value.filter(singer =>
    singer.name.includes(singerSearchQuery.value) ||
    singer.description.includes(singerSearchQuery.value)
  )
})

const fetchSingers = () => {
  // 模拟获取歌手数据
  console.log('Fetching singers...')
}

const searchSingers = () => {
  // 模拟搜索歌手
  console.log('Searching singers...')
}

const handleSingerPageChange = (page) => {
  singerPage.value.current = page
  fetchSingers()
}

const showAddSingerDialog = () => {
  singerForm.value = {
    name: '',
    description: '',
    avatar: '',
    tags: []
  }
  isEditingSinger.value = false
  singerDialogVisible.value = true
}

const editSinger = (singer) => {
  singerForm.value = { ...singer }
  isEditingSinger.value = true
  singerDialogVisible.value = true
}

const deleteSinger = (id) => {
  musicStore.deleteSinger(id)
  ElMessage.success('歌手删除成功')
}

// 模拟上传相关（直接加在 script 里）
const mockUploadAction = '/mock-api/upload' // 随便填，不影响
const imageKey = ref(0)

const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }

  // 生成临时 URL 模拟上传成功
  const tempUrl = URL.createObjectURL(file)
  handleAvatarSuccess({ url: tempUrl })
  return false // 阻止真实请求
}

// 原有的 handleAvatarSuccess 保持不变（如果没有就新增）
const handleAvatarSuccess = (res) => {
  singerForm.value.avatar = res.url
  imageKey.value += 1 // 强制更新图片预览
}

const removeTag = (tag) => {
  singerForm.value.tags = singerForm.value.tags.filter(t => t !== tag)
}

const showTagInput = () => {
  tagInputVisible.value = true
}

const addTag = () => {
  if (tagInputValue.value) {
    singerForm.value.tags.push(tagInputValue.value)
    tagInputValue.value = ''
  }
  tagInputVisible.value = false
}

const submitSingerForm = () => {
  singerFormRef.value.validate(valid => {
    if (valid) {
      if (isEditingSinger.value) {
        musicStore.updateSinger(singerForm.value.id, singerForm.value)
        ElMessage.success('歌手信息更新成功')
      } else {
        musicStore.addSinger(singerForm.value)
        ElMessage.success('歌手添加成功')
      }
      singerDialogVisible.value = false
    }
  })
}

// 数据统计
const statistics = ref({
  userCount: 1024,
  singerCount: 56,
  songCount: 3287,
  playCount: 256890
})

onMounted(() => {
  fetchUsers()
  fetchSingers()
})
</script>

<style scoped>
.admin-container {
  height: 100vh;
  background-color: #f0f2f5;
}

/* 登录表单样式 */
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2d3a4b;
}

.login-card {
  width: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  margin-top: 20px;
}

/* 管理后台主样式 */
.admin-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left .title {
  font-size: 18px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
}

.welcome {
  margin-right: 15px;
  font-size: 14px;
}

.admin-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.admin-sidebar {
  width: 200px;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}

.sidebar-menu {
  border-right: none;
}

.admin-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f0f2f5;
}

/* 管理卡片样式 */
.management-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.search-input {
  width: 200px;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}

/* 用户详情样式 */
.user-detail-container {
  padding: 10px;
}

.user-basic-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.user-info {
  margin-left: 20px;
}

.user-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.user-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.user-data-tabs {
  margin-top: 20px;
}

/* 统计卡片样式 */
.statistics-card {
  margin-bottom: 20px;
}

.statistics-overview {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 0;
}

.stat-item {
  text-align: center;
  padding: 20px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.statistics-charts {
  margin-top: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.chart-container {
  height: 300px;
}

.chart-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f7fa;
  color: #999;
  border-radius: 4px;
}

/* 头像上传样式 */
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-main {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    height: auto;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-input {
    width: 100%;
  }
}

.chart-img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.chart-img:hover {
  transform: scale(1.02);
}

/* 错误处理 */
.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  color: #909399;
}
</style>