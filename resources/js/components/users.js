//Подключение компонентов из файла bootstrap
require('./bootstrap');

//Подключение компонента Vue
window.Vue = require('vue');
window.axios = require('axios');

//Подключение компонента message-block
Vue.component('message-block', require('./components/message-block.vue').default);


const users = new Vue({
  el: '#users',
  data: {
    user_list: [],
    autor: null,
  },
  created: ()=>{
    console.log('Приложение запущено');
  }
  methods:{
  	getUsers: ()=>{
  		var input = $('#search').val();
  		console.log('Введено: ' + input);
  	}
  }
})
