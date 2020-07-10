<template>
	<div id="updates" class="container">
			<button class="btn btn-info" v-on:click="updateBDPM()">Update BDPM</button>
	</div>
</template>
<script>
const axios = require('axios')
export default {
	name: 'Updates',
	data () {
		return {}
	},
	mounted () {
		// this.updateBDPM()
	},
	methods: {
		updateBDPM () {
			// Call API
			axios.put('/api/updates').then(
				result => {
					// console.log(result.data)
					// this.clients = result.data
				},
				error => {
					console.error(error)
				}
			)
		}
	}
}
</script>
<style>
</style>