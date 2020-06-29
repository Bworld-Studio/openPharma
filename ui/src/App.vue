<template>
<div id="app">
	<nav class="navbar navbar-expand navbar-dark bg-dark">
		<!-- <a href="#" class="navbar-brand">{{ $t('global.openPharma') }}</a> -->
		<a href="/" class="navbar-brand" style="font-family:'Ubuntu Medium"><img src="@/assets/logo.png" style="margin-right: 8px; width:41px">{{ $t('global.openPharma') }}</a>
		<div class="navbar-nav mr-auto">
			<li class="nav-item">
				<a href="/clients" class="nav-link">{{ $t('global.views.clients') }}</a>
			</li>
			<li class="nav-item">
				<a href="/products" class="nav-link">{{ $t('global.views.products') }}</a>
			</li>
		</div>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  	<div class="navbar-nav mr-auto locale-changer">
  	  <select v-model="$i18n.locale" class="form-control">
  	    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.lang">{{ lang.locale }}</option>
  	  </select>
  	</div>
	</nav>

	<div class="container-fluid">
		<router-view/>
	</div>
</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return { langs: [] }
	},
	mounted () {
		for (var property in this.$i18n.messages) {
			if (this.$i18n.messages.hasOwnProperty(property)) {
				this.langs.push( { 'lang': property, 'locale': this.$i18n.messages[property].global.locale } )
			}
		}
	}
}
</script>

<style>
#app {
  font-family: 'OpenSans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
	font-family: "Ubuntu Medium";
	src: url("~@/assets/fonts/Ubuntu-Medium.ttf") format('truetype');
}
@font-face {
	font-family: "OpenSans";
	src: url("~@/assets/fonts/OpenSans-Regular.ttf") format('truetype');
}
</style>