<template>
	<div class="container-fluid p-0">
		<template-header />

		<div class="container clearfix mt-5">
			<Nuxt />
		</div>
	</div>
</template>

<script>
export default {
	name: 'default',
	layout: 'default',
	data() {
		return {
			message: 'Hello Vue!'
		}
	}
}
</script>