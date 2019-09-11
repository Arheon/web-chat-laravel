<template>
	<div class="userChat__message">
        <p class="userChat__message-autor">{{ message.autor }}: </p>
        <p class="userChat__message-message">{{ message.message }}</p>
        <p class="userChat__message-message_time">{{ message.message_time }}</p>
    </div>
</template>