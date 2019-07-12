<template>
<vk-offcanvas-content>
	<vk-navbar>
		<vk-navbar-nav>
			<vk-navbar-logo slot="right"> TEST </vk-navbar-logo>
			<vk-navbar-item>
				<nuxt-link to="/">
					<vk-button> Back </vk-button>
				</nuxt-link>
			</vk-navbar-item>
		</vk-navbar-nav>
	</vk-navbar>
	<div class="content">
		<div class="title">
			{{ job.title }}
		</div>
		<div class="logo">
			<a :href="job.company_url"> {{ job.company }}</a>
			<img :src="job.company_logo"/>
			
		</div>
		<div class="how-to-apply" v-html="job.how_to_apply"></div>
		<div class="description" v-html="job.description"></div>
		<div class="map-wrapper"  v-if="isMounted">
			<yandex-map :coords="position" class="map">
				<ymap-marker markerId="123" marker-type="placemark" :coords="position"></ymap-marker>
			</yandex-map>
		</div>
	</div>
</vk-offcanvas-content>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {

	async asyncData({ app, error }) {
		let job = {}
		
		let id = app.context.route.params.id;

		await app.$api
			.getJob(id)
			.then(r => {
				if (r) {
					job = r;
				} else {
					error({ statusCode: 404, message: 'Job not found' });
				}
			})
			.catch(e => {
				console.log(e)
			});

		await app.$api
			.getGeodata(job.location)
			.then((res) => {
				job.locationData = res.data.response.GeoObjectCollection.featureMember[0];
			})
			.catch(e => {
				console.log(e)
			});

		return { job, id }
	},
	data() {
		return {
			isMounted: false,
			map: {}
		}
	},
	computed: {
		position() {
			return this.job.locationData.GeoObject.Point.pos.split(' ').reverse();
		}
	},
  mounted() {
	  this.isMounted = true;
  },
}
</script>

<style lang="scss">

.content {
	width: 600px;
	padding: 32px;

	.logo  {
		
		display: flex;
		justify-content: space-between;

		a {
			margin: auto 0;
			
		}
		img {
			max-width: 200px;
			max-height: 60px;
		}
	}
	& > div {
		margin-top: 20px;
	}

	.map-wrapper {
		.ymap-container {
			height: 400px;
		}
	}
}
</style>

