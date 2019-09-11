<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/chat.css') }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
</head>
<body>

    <div id="app">
        <div class="userChat">
            <div class="userChat__header">
                <p>Пользователь: <span id="user_name">{{ Auth::user()->name }}</span></p>
            </div>
            <div class="userChat__chatArea" id="chat_arrea">
                <div id="messageArhea" class="userChat__chatArea__messageArea">
                    @foreach($messages as $message)
                        <div class="userChat__message">
                            <p class="userChat__message-autor">{{ $message->autor }}: </p>
                            <p class="userChat__message-message">{{ $message->message }}</p>
                            <p class="userChat__message-message_time">{{ $message->message_time }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="userChat__textArea" >
                <input  v-on:focus="writeMessage" @blur="dontWriteMessage" type="text" name="message" id="message-box" placeholder="Написать сообщение...">
                <button v-on:click="sendMessage" class="userChat__sendbutton">Отправить</button>
            </div>
        </div>

        @{{ messages }}

    <p id="event-text" class="event-text"></p>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.socket.io/socket.io-1.4.5.js"></script>    
    <!-- <script type="text/javascript" src="{{ asset('js\app.js') }}"></script> -->
    <script type="text/javascript" src="{{ asset('js/app.js') }}">


    </script>
</body>
</html>