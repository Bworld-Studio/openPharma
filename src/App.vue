<template>
	<div id="app">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<a href="#" class="navbar-brand">openPharma</a>
			<div class="navbar-nav mr-auto">
				<li class="nav-item">
					<a href="/clients" class="nav-link">Clients</a>
				</li>
				<li class="nav-item">
					<a href="/add" class="nav-link">Add</a>
				</li>
			</div>
		</nav>

		<div class="container mt-3">
			<router-view />
		</div>
	</div>
</template>
<script src="@/App.js"></script>
