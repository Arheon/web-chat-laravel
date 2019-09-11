require('./bootstrap');
import EchoLibrary from "laravel-echo"

jQuery(document).ready(function($) {
    $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));

    var socket = io(':6001');



    window.Echo = new EchoLibrary({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001',
    });

    
    Echo.channel('chat')
    .listen('NewMessageAdded', (e) => {
        console.log(e.user, e.chatMessage);
    });

    Echo.channel('chat-room.1')
    .listen('NewMessageAdded', (e) => {
        console.log(e.user, e.chatMessage);
    });    


    jQuery('#message-box').focus(function(event) {
        console.log('Message writing');
        var username = jQuery('#user_name').text();

        

        var mess = {
            type: 'user_send_message',
            user: username
        };  

        socket.send(mess);
    });

    $('#message-box').focusout(function(event) {
        console.log('Message writing');
        var username = jQuery('#user_name').text();

        

        var mess = {
            type: 'user_unsend_message',
            user: username
        };  

        socket.send(mess);
    });

    socket.on('UserWriting', (data)=>{
        $('#event-text').text('Пользователь ' + data.data + ' набирает сообщение');
    });

    socket.on('UserUnWriting', (data)=>{
        $('#event-text').text('');
    });

    socket.on('UserSendMessage', (data)=>{
        $('#messageArhea').append('<div class="userChat__message">' 
            + '<p class="userChat__message-autor">' + data.username + ':</p>'
            + '<p class="userChat__message-message">' +data.message + '</p>'
            + '<p class="userChat__message-message_time">' + data.message_time +'</p>'
            + '</div>')
        $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));
    })

    jQuery('#send').on('click', function(){

        console.log('Сообщение отправляется');
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        //POST attributes
        var dateTime = date+' '+time;
        var username = jQuery('#user_name').text();
        var message = jQuery('#message-box').val();
        var csrf = $('meta[name="csrf-token"]').attr('content');

        console.log('Отправка сообщения\nДанные:\nАвтор: ' + username + "\Время отправки сообщения: " + dateTime + "\nСообщение: " + message + '\Токен: ' + csrf);

        var request = $.ajax({
            url: "/chat/message",
            method: "POST",
            headers: {
               'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data:
            {
                autor: username,
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
        var mess = {user : username, message : message, message_time: dateTime, type: 'message'};

        socket.send(mess);

        console.log('Сообщение отправлено');
        $('#chat_arrea').scrollTop($('#chat_arrea').prop('scrollHeight'));
        return false;
        
    }); 
});