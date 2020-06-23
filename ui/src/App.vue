<template>
<div id="app">
	<nav class="navbar navbar-expand navbar-dark bg-dark">
		<!-- <a href="#" class="navbar-brand">{{ $t('global.openPharma') }}</a> -->
		<a href="#" class="navbar-brand"><img src="@/assets/ad6e8862-6603-49c0-a272-e438d7ca1a14_200x200.png"></a>
		<div class="navbar-nav mr-auto">
			<li class="nav-item">
				<a href="/clients" class="nav-link">{{ $t('global.clients') }}</a>
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


	<div class="container mt-3">
		<router-view/>
	</div>
</div>
</template>

<script>
// import i18n from '@/i18n'
export default {
	name: 'App',
	data() {
		return { langs: [] }
	},
	mounted () {
		console.log(this.$i18n.messages)
		debugger
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
