<template>
<vk-offcanvas-content>
	<vk-navbar>
		<vk-navbar-nav>
			<vk-navbar-logo slot="right"> TEST </vk-navbar-logo>
			<vk-navbar-item>
				<form action="javascript:void(0)">
					<input class="uk-input uk-form-width-medium uk-margin-small-right" type="text" placeholder="Job" v-model="query">
					<vk-button @click="search" :disabled="loading">Найти</vk-button>
					<vk-button @click="clear">Сбросить</vk-button>
				</form>
			</vk-navbar-item>
		</vk-navbar-nav>
	</vk-navbar>
	<div v-if="loading">
		<div class="loader-container">
			<vk-spinner ratio></vk-spinner>
		</div>
	</div>
	<div class="uk-section"  v-if="suggestions.length && !loading">
		<vk-table :data="suggestions" striped hoverable row-selectable>
			<vk-table-column title="Logo" cell="company_logo" shrinked>
				<img slot-scope="{ cell }" class="uk-preserve-width" :src="cell" width="40" alt="" />
			</vk-table-column>
			<vk-table-column title="Company" cell="company"></vk-table-column>
			<vk-table-column title="Title" cell="title"></vk-table-column>
			<vk-table-column title="Location" cell="location"></vk-table-column>
			<vk-table-column cell="id">
				<nuxt-link slot-scope="{ cell }" :to="'/detail/' + cell"> 
					<vk-button>Open</vk-button>
				</nuxt-link>
			</vk-table-column>
		</vk-table>
		<vk-pagination :page.sync="page" :perPage="50" :total="1000">
			<vk-pagination-page-prev></vk-pagination-page-prev>
			<vk-pagination-pages></vk-pagination-pages>
			<vk-pagination-page-next></vk-pagination-page-next>
		</vk-pagination>
	</div>
</vk-offcanvas-content>

</template>

<script>

import {mapGetters, mapActions} from 'vuex';

export default {
	data() {
		return {
			query: '',
			page: 1,
			loading: false,
		}
	},
  components: {
    
  },
  computed: {
	...mapGetters({
		suggestions: 'search/suggestions'
	})
  },
  methods: {
	  ...mapActions({
		  findJob: 'search/findJob',
		  clear: 'search/clear'
	  }),
	  search() {
		  this.loading = true;
		  this.findJob({description: this.query, page: this.page - 1}).finally(() => {
		  	this.loading = false;
		  });
	  },
	  toJob(job) {
		  job
	  }
  },
  watch: {
	  page() {
		  this.search();
	  }
  }
}
</script>

<style lang="scss">

.loader-container {
	display: flex;
	justify-content: center;
	margin-top: 100px;
	width: 100%;
}

</style>

