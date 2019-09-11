//Подключение компонентов из файла bootstrap
require('./bootstrap');

//Подключение компонента Vue
window.Vue = require('vue');
window.axios = require('axios');

//Подключение компонента message-block
Vue.component('message-block', require('./components/message-block.vue').default);



const app = new Vue({
    el: '#app',
    data:{
      socket: null,
    	messages: {},
    	autor: ''
    },
    mounted: function () {
      $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));
      this.createSocketSettings();
      this.getUserName();
      console.log('Пользователь: ', this.autor);
  	},
  	methods:{
  		getUserName: ()=>{
  			this.autor = $('#user_name').text();
  		},
      sendMessage: ()=>{
        console.log('uuuuuu');
        console.log('Пользователь отправляет сообщение', this.autor);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        //POST attributes
        var dateTime = date+' '+time;
        var username = this.autor;
        var message = jQuery('#message-box').val();
        var csrf = $('meta[name="csrf-token"]').attr('content');

        var request = $.ajax({
            url: "/chat/message",
            method: "POST",
            headers: {
               'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data:
            {
                autor: this.autor,
                message_time: dateTime,
                message: message
            },
            datatype: "json"
        });

        request.done(function(msg) {

        });

        request.fail(function(jqXHR, textStatus) {

        });
        
        console.log('Сообщение отправлено в бд');
        var mess = {user : this.autor, message : message, message_time: dateTime, type: 'message'};

        this.socket.send(mess);

        console.log('Сообщение отправлено');
        $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));
        return false;
      },
      writeMessage:()=>{
        var mess = {
          type: 'user_send_message',
          user: this.autor
        };  

          this.socket.send(mess);
      },
      dontWriteMessage:()=>{
        var mess = {
          type: 'user_unsend_message',
          user: this.autor
        };  

        this.socket.send(mess);
      },
      createSocketSettings: ()=>{
        this.socket = io(':6001');

        this.socket.on('UserWriting', (data)=>{
            $('#event-text').text('Пользователь ' + data.data + ' набирает сообщение');
        });

        this.socket.on('UserUnWriting', (data)=>{
            $('#event-text').text('');
        });

        this.socket.on('UserSendMessage', (data)=>{
            this.message = data;
            $('#messageArhea').append('<div class="userChat__message">' 
                + '<p class="userChat__message-autor">' + data.username + ':</p>'
                + '<p class="userChat__message-message">' +data.message + '</p>'
                + '<p class="userChat__message-message_time">' + data.message_time +'</p>'
                + '</div>')
            $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));
        });
      },
  	},
});

