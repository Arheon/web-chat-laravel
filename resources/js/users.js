//Подключение компонентов из файла bootstrap
require('./bootstrap');

//Подключение компонента Vue
window.Vue = require('vue');
window.axios = require('axios');

//Подключение компонента message-block
Vue.component('message-block', require('./components/message-block.vue').default);


const users = new Vue({
  el: '#users',
  data() {
  	return {
	    user_list: [],
	    autor: null,
  	};
  },
  created: ()=>{
  	$('#id').css('display', 'none');
  	this.autor = $('#id').text();
	console.log('Приложение запущено');
  },
  methods:{
  	getUsers: ()=>{
  		var input = $('#search').val();
  		if(input != ''){

  			console.log('Id Пользователя ' + this.autor);

  			axios.get('/user', {
  				params: {
  					search_input: input,
  					autor: this.autor
  				}
  			}).then(response => {
  				users.user_list = [];
  				var parsejson = $.parseJSON(response.data.replace('string', ''));
  				
  				for(i in parsejson.users){
  					var userId = parsejson.users[i].id;
  					if(userId != this.autor){
  						users.user_list.push({"name" : parsejson.users[i].name, "id" : parsejson.users[i].id});
  					}else{
  						
  					}
  				}
  				console.log(this.user_list);
  			})
  		}else{
  			users.user_list = [];
  		}
  	},
  	allertUser: (user)=>{
  		var request = $.ajax({
            url: "/alertUser",
            method: "POST",
            headers: {
               'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data:
            {
                from_id: this.autor,
                to_id: user.id,
            },
            datatype: "json"
        });
  	}
  }
});
