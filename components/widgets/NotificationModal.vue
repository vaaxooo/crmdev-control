<template>
	<div class="modal fade show" id="staticBackdropLive" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLiveLabel" style="display: block;" aria-modal="true" role="dialog">
		<div class="overlay"></div>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLiveLabel">Отправить уведомление офисам</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="title">Заголовок уведомления</label>
						<input type="text" class="form-control" id="title" v-model="data.title" placeholder="Заголовок уведомления">
					</div>
					<div class="form-group mt-3">
						<label for="message">Текст уведомления</label>
						<textarea class="form-control" id="message" v-model="data.message" placeholder="Текст уведомления" rows="3"></textarea>
					</div>
				</div>
				<div class="modal-footer mt-2">
					<button type="button" class="btn btn-primary" @click="send">Отправить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'NotificationModal',
	data() {
		return {
			data: {
				title: '',
				message: ''
			}
		}
	},
	methods: {
		send() {
			this.$nuxt.$emit('sendNotification', this.data)
		},

		closeModal() {
			this.$nuxt.$emit('closeModal')
		}
	}
}

</script>