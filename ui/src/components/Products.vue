<template>
	<div id="products-list" class="container">
		<div>
			<div class="">
				<h1 class="text-center">Product List</h1>
				<!-- <table class="table">
					<tr v-for="(line) in clients" v-bind:key="line.uuid" v-bind:title="line.numSS">
						<td class="text-left">{{line.lastName}}</td>
						<td class="text-left">{{line.firstName}}</td>
						<td class="text-left">{{ $d(new Date(line.birthDate), "short") }}</td>
						<td class="text right">
							<button class="btn btn-info" v-on:click="editClient(line)">{{$t('buttons.edit-button')}}</button>
							<button class="btn btn-danger" v-on:click="deleteClient(line.uuid)">{{$t('buttons.delete-button')}}</button>
						</td>
					</tr>
				</table> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Products',
	data () {
		return {}
	},
	mounted () {
		this.getProducts()
	},
	methods: {
		getProducts () {

			// Call API
			// axios.get('/api/clients').then(
			// 	result => {
			// 		console.log(result.data)
			// 		this.clients = result.data
			// 	},
			// 	error => {
			// 		console.error(error)
			// 	}
			// )
		}
	}
}
</script>
<style>
</style>