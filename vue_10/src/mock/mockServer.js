import Mock from 'mockjs'
import books from './books.json'
Mock.mock('/mock/getBooks','get',{
  code: 200,
  data: books
})
