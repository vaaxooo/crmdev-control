<template>
	<div>
		<label class="list-group-item d-flex gap-2">
			<input class="form-check-input flex-shrink-0" type="checkbox" value="" @change="checkedOffice" :data-office-id="data.id">
			<span>
				{{ data.name }}
				<small class="d-block text-muted">IP сервера: {{ data.address }}</small>
			</span>

			<span class="other-block">
				Проплачено до <b>{{ moment(data.expires_in).format('L')  }}</b>
				<small class="d-block text-muted">Статус: <b class="text-sucess">{{ checkStatus(data.expires_in) ? "Активен" : "Не оплачен" }}</b></small>
			</span>

			<span class="other-block">
				<b class="text-success" v-if="data.working">Офис работает</b>
				<b class="text-danger" v-else>Офис не работает</b>
			</span>

			<span class="other-block block-icon">
				<nuxt-link :to="'/offices/' + data.id" class="btn-link">
					<i class="material-icons">edit</i>
				</nuxt-link>
			</span>
		</label>
	</div>
</template>

<script>
import moment from 'moment'

export default {
	name: "OfficesList",
	props: {
		office: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			data: [],
			moment: moment
		}
	},
	async fetch(){
		this.data = this.office
	},
	methods: {

		checkStatus(date) {
			let current_date = new Date()
			let expires_in = new Date(this.office.expires_in)
			return current_date < expires_in
		},

		checkedOffice(e) {
			this.$nuxt.$emit('checkedOffices', e)
		}
	}
}
</script>