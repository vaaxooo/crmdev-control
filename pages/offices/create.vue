<template>
  	<div class="content">
		<h5>
			Добавление нового офиса
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
					<label for="domain">Домен офиса</label>
					<input type="text" class="form-control" id="domain" v-model="office.domain" :class="{'is-invalid': errors.domain}">
					<span class="text-danger" v-if="errors.address">Не указан домен офиса</span>
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
					<label for="provider">IP-адрес офиса</label>
					<input type="text" class="form-control" id="provider" v-model="office.provider" :class="{'is-invalid': errors.provider}">
					<span class="text-danger" v-if="errors.provider">Не указан IP-адрес офиса</span>
				</div>
			</div>

			<div class="col-md-6 mt-3">
				<div class="form-group">
					<label for="expires_in">Период оплаты</label>
					<select class="form-control" @change="changeExpiresDate" v-model="temp_expires_in" :class="{'is-invalid': errors.expires_in}">
						<option value="1">1 месяц</option>
						<option value="3">3 месяца</option>
						<option value="6">6 месяцев</option>
						<option value="12">12 месяцев</option>
					</select>
					<span class="text-danger" v-if="errors.expires_in">Не выбран период оплаты</span>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6 mt-3">
				<div class="form-group">
					<button type="submit" class="btn btn-success" @click="createOffice">Добавить офис</button>
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
  	name: 'IndexPage',
  	data() {
		return {
			office: {
				name: '',
				address: '',
				domain: '',
				provider: '',
				expires_in: new Date((new Date()).setMonth((new Date()).getMonth() + 1))
			},

			temp_expires_in: 1,
			errors: []
		}
	},
  	methods: {
		async createOffice() {
			this.errors = [];
			this.validateOfficeParams()

			if(this.errors.length == 0) {
				const response = (await this.$axios.post('/offices', {
					name: this.office.name,
					address: this.office.address,
					domain: this.office.domain,
					provider: this.office.provider,
					expires_in: new Date(this.office.expires_in)
				})).data;
				if(response.status) {
					this.$toast.success(response.message);
					this.office.name = ''
					this.office.address = ''
					this.office.domain = ''
					this.office.provider = ''
					this.office.expires_in = ''
				} else {
					this.$toast.error(response.message);
				}
			}
		},

		changeExpiresDate() {
			let current_date = new Date();
			current_date = new Date(current_date.setMonth(current_date.getMonth() + +this.temp_expires_in));
			this.office.expires_in = current_date;
		},

		validateOfficeParams() {	
			if(this.office.name.length == 0) {
				this.errors.push('name')
			}
			if(this.office.address.length == 0) {
				this.errors.push('address')
			}
			if(this.office.expires_in.length == 0) {
				this.errors.push('expires_in')
			}
		}
  	}
}
</script>
