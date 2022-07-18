<template>
  	<div class="content">
		<section class="offices-list">
			<div class="section-header d-flex">
				<h4>
					Список офисов
				</h4>
				<nuxt-link to="/offices/create" class="btn btn-primary mx-5">
					Добавить новый офис
				</nuxt-link>
			</div>

			<div class="tab-navigation d-flex" v-if="checkedOffices.length > 0">
				<div class="tab-navigation-item">
					<button type="button" class="btn btn-light" :class="{'active': current_tabcontent === 'expires'}" @click="changeTab('expires')">
						Оплата
					</button>
				</div>
				<div class="tab-navigation-item">
					<button type="button" class="btn btn-light" :class="{'active': current_tabcontent === 'notifications'}" @click="changeTab('notifications')">
						Уведомления
					</button>
				</div>
				<div class="tab-navigation-item">
					<button type="button" class="btn btn-light" :class="{'active': current_tabcontent === 'deleting'}" @click="changeTab('deleting')">
						Удаление офисов
					</button>
				</div>
			</div>

			<div class="actions mt-2" v-if="current_tabcontent === 'expires' && checkedOffices.length > 0">
				<div class="form-group row">
					<div class="col-md-3">
						<select class="form-control" placeholder="Выберите период" v-model="expires_in">
							<option value="1">1 месяц</option>
							<option value="3">3 месяца</option>
							<option value="6">6 месяцев</option>
							<option value="12">12 месяцев</option>
						</select>
					</div>
					<div class="col-md-2">
						<button class="btn btn-warning" @click="updateOfficesExpiresDate">
							Продлить офисы
						</button>
					</div>
				</div>
			</div>

			<div class="actions mt-2" v-if="current_tabcontent === 'notifications' && checkedOffices.length > 0">
				<div class="form-group row">
					<div class="col-md-4">
						<button class="btn btn-success" @click="notification_modal_visible = true">
							Отправить офисам уведомление
						</button>
					</div>
				</div>
			</div>

			<div class="actions mt-2" v-if="current_tabcontent === 'deleting' && checkedOffices.length > 0">
				<div class="form-group row">
					<div class="col-md-4">
						<button class="btn btn-danger" @click="deleteOffices">
							Удалить выбранные офисы
						</button>
					</div>
				</div>
			</div>

			<div class="list-group mx-0 w-auto mt-4" v-if="offices && offices.length > 0">
				<widgets-offices-list v-for="office in offices" :key="office.id" :office="office" />
			</div>

			<div class="list-group mx-0 w-auto mt-4" v-else>
				<h5 class="text-muted">Список офисов пуст..</h5>
			</div>
		</section>


		<widgets-notification-modal v-if="notification_modal_visible" />

  	</div>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return {
			offices: [],
			checkedOffices: [],

			expires_in: 1,
			current_tabcontent: 'expires',

			notification_modal_visible: false,
		}
	},
  	created() {
		this.$nuxt.$off('sendNotification')
		this.$nuxt.$on('sendNotification', (data) => {
			this.sendNotification(data)
		})

		this.$nuxt.$off('closeModal')
		this.$nuxt.$on('closeModal', () => {
			this.notification_modal_visible = false
		})

		this.$nuxt.$off('checkedOffices')
		this.$nuxt.$on('checkedOffices', data => {
			if (data.target.checked) {
				this.checkedOffices.push(data.target.dataset.officeId)
			} else {
				this.checkedOffices.splice(this.checkedOffices.indexOf(data.target.dataset.officeId), 1)
			}
		})
	},
	async fetch(){
			await this.fetchOffices();
	},
  	methods: {
		async fetchOffices() {
			const response = (await this.$axios.get('/offices/all')).data;
			if(response.status) {
				this.offices = response.data;
			}
		},

		async sendNotification(data) {
			const response = (await this.$axios.post('/notifications/create', {
				offices: this.checkedOffices,
				title: data.title,
				message: data.message,
			})).data;
			if(response.status) {
				//this.notification_modal_visible = false
				this.$toast.success('Уведомление отправлено по выбраным офисам')
			}
		},

		async updateOfficesExpiresDate() {
			const response = (await this.$axios.post('/offices/update-expires-date', {
				offices: this.checkedOffices,
				expires_in: this.expires_in
			})).data;
			if(response.status) {
				this.$toast.success(response.message)
				window.location.reload();
			} else {
				this.$toast.error(response.message)
			}
		},

		async deleteOffices() {
			const response = (await this.$axios.post('/offices/delete', {
				offices: this.checkedOffices
			})).data;
			if(response.status) {
				this.$toast.success(response.message)
				window.location.reload();
			} else {
				this.$toast.error(response.message)
			}
		},

		changeTab(tabcontent) {
			this.current_tabcontent = tabcontent;
		}
  	}

}
</script>
