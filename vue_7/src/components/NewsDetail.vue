<template>
    <div style="background-color: pink; width: 300px; margin: 0 auto; padding: 20px;">
      <ul>
        <li>编号：{{ news.id }}</li>
        <li>标题：{{ news.title }}</li>
        <li>内容：{{ news.content }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        news: {}
      };
    },
    created() {
      const id = this.$route.params.id;
      // 这里简单模拟数据获取，实际应从后端接口获取
      if (id === '001') {
        this.news = { id: '001', title: '新闻001', content: '国内新闻' };
      } else if (id === '002') {
        this.news = { id: '002', title: '新闻002', content: '国际新闻' };
      }
    }
  };
  </script>    