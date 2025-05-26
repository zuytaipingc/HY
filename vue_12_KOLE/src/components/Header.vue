<template>
  <header class="site-header">
    <div class="header-container">
      <!-- 网站Logo -->
      <RouterLink to="/" class="logo">
        <span class="logo-text">MUSIC</span>
        <span class="logo-accent">HUB</span>
      </RouterLink>

      <!-- 桌面导航 -->
      <nav class="desktop-nav">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="active"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- 用户控制区 -->
      <div class="user-controls">
        <template v-if="isLoggedIn">
          <ElDropdown trigger="click">
            <span class="user-avatar">
              <!-- 这里替换为方案二的代码 -->
              <img 
                src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/person-circle-outline.svg" 
                alt="用户头像"
                class="avatar-img"
              >
            </span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>个人中心</ElDropdownItem>
                <ElDropdownItem>我的收藏</ElDropdownItem>
                <ElDropdownItem divided @click="store.logout">退出登录</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </template>
        <template v-else>
          <RouterLink to="/login" class="login-btn">登录</RouterLink>
          <RouterLink to="/register" class="register-btn">注册</RouterLink>
        </template>
      </div>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="toggleMenu">
        <span class="menu-icon"></span>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <transition name="slide-down">
      <div v-show="isMenuOpen" class="mobile-menu">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          @click="toggleMenu"
        >
          {{ item.name }}
        </RouterLink>
        <div class="mobile-auth" v-if="!isLoggedIn">
          <RouterLink to="/login" class="mobile-login">登录</RouterLink>
          <RouterLink to="/register" class="mobile-register">注册</RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>