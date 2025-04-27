<template>
    <div style="background-color: pink; width: 260px; margin: 0 auto; padding: 15px; text-align: center;">
      <ul style="list-style-type: disc; padding-left: 0; margin-left: 10px;">
        <li v-for="(news, index) in newsList" :key="index">
          <span style="display: inline-block; width: 90px;">
            <button @click="showNewsDetail(news)">查看新闻</button>
          </span>
          <span style="color: blue; display: inline-block;">{{ news.title }}</span>
        </li>
      </ul>
      <div v-if="selectedNews" class="news-detail">
        <ul style="list-style-type: disc; padding-left: 0; margin-left: 10px;">
          <li>编号：{{ selectedNews.id }}</li>
          <li>标题：{{ selectedNews.title }}</li>
          <li>内容：{{ selectedNews.content }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newsList: [
          { id: '001', title: '新闻001', content: '国内新闻' },
          { id: '002', title: '新闻002', content: '国际新闻' }
        ],
        selectedNews: null
      };
    },
    methods: {
      showNewsDetail(news) {
        this.selectedNews = news;
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    background-color: skyblue;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
  }
  
  .news-detail ul {
    margin-top: 10px;
  }
  
  .news-detail li {
    text-align: center;
    margin-bottom: 5px;
  }
  </style>