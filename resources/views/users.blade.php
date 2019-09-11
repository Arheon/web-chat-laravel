<!DOCTYPE html>
<html>
<head>
	<title>Пользователи</title>
	<meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>

	<div id="users">
		<div class="users-block">
			<p id="id">{{ Auth::user()->id }}</p>
			<p class="user" id="user">{{ Auth::user()->name }}</p>
			<div class="users-block__header"> 
				<input type="text" name="user" class="search-users" id="search" v-on:keyup="getUsers">
				<button class="search-users-btn">Найти</button>
			</div>
			<div class="users-block__users">
				<ul>
					<li v-for="(user, index) in user_list">
						@{{ user.id }} - @{{ user.name }}
						<button v-on:click="allertUser(user)">Добавить</button>
					</li>

				</ul>
			</div>
		</div>	
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript" src="{{ asset('js/users.js') }}"></script>

</body>
</html>