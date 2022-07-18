<template>
  	<div class="content">
		<h5>
			Редактирование офиса "<span class="text-primary">{{ office.name }}</span>"
		</h5>

		<div class="row">
			<div class="col-md-6 mt-3">
				<div class="form-group">
					<label for="name">Название офиса</label>
					<input type="text" class="form-control" id="name" v-model="office.name" :class="{'is-invalid': errors.name}">
					<span class="text-danger" v-if="errors.name">Не указано название офиса</span>
				</div>
			</div>

			<div class="col-md-6 mt-3">
				<div class="form-group">
					<label for="address">IP-адрес сервера</label>
					<input type="text" class="form-control" id="address" v-model="office.address" :class="{'is-invalid': errors.address}">
					<span class="text-danger" v-if="errors.address">Не указан IP-адрес сервера</span>
				</div>
			</div>

			<div class="col-md-6 mt-3">
				<div class="form-group">
					<label for="domain">Домен офиса</label>
					<input type="text" class="form-control" id="domain" v-model="office.domain" :class="{'is-invalid': errors.domain}">
					<span class="text-danger" v-if="errors.address">Не указан домен офиса</span>
				</div>
			</div>

			<div class="col-md-6 mt-3">
				<div class="form-group">
					<label for="expires_in">Оплачен до </label>
					<span>{{ moment(office.expires_in).format('L') }}</span>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6 mt-3">
				<div class="form-group">
					<button class="btn btn-success" @click="updateOffice">Применить</button>
				</div>
			</div>
		</div>



		<h5 class="mt-5 mb-4">
			История транзакций
		</h5>

		<table class="table table-striped" v-if="transactions && transactions.length > 0">
			<thead>
				<tr>
				<th scope="col">Кошелёк</th>
				<th scope="col">Сумма</th>
				<th scope="col">Дата транзакции</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="transaction in transactions" :key="transaction.id">
					<th scope="row">{{ transaction.wallet }}</th>
					<td>
						<b class="text-success">{{ transaction.amount}} USD</b>
					</td>
					<td>{{ transaction.date}}</td>
				</tr>
			</tbody>
		</table>

		<div class="text-muted mt-3" v-else>
			<h5>Список транзакций пуст..</h5>
		</div>

  	</div>
</template>

<script>
import moment from 'moment'

export default {
  	name: 'IndexPage',
  	data() {
		return {
			office: {
				name: '',
				address: '',
				domain: '',
				expires_in: ''
			},

			transactions: [],

			errors: [],
			moment: moment
		}
	},
	async fetch() {
		await this.fetchOffice();
		await this.fetchTransactions();
	},
  	methods: {
		async fetchOffice() {
			const response = (await this.$axios.get('/offices/' + this.$route.params.id)).data;
			if(response.status) {
				this.office = response.data;
			}
		},

		async fetchTransactions() {
			const response = (await this.$axios.get('/offices/' + this.$route.params.id + '/transactions/')).data;
			if(response.status) {
				this.transactions = response.data;
			}
		},

		async updateOffice() {
			this.errors = [];
			this.validateOfficeParams()

			if(this.errors.length == 0) {
				const response = (await this.$axios.put('/offices/' + this.$route.params.id, {
					name: this.office.name,
					address: this.office.address,
					domain: this.office.domain,
					expires_in: this.office.expires_in
				})).data;
				if(response.status) {
					this.$toast.success(response.message)
				} else {
					this.$toast.error(response.message)
				}
			}
		},

		validateOfficeParams() {	
			if(this.office.name.length == 0) {
				this.errors.push('name')
			}
			if(this.office.address.length == 0) {
				this.errors.push('address')
			}
		}
  	}
}
</script>
