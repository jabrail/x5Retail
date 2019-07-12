import axios from 'axios';
const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://jobs.github.com/';

export const get = (path, query = {}) => {
	return new Promise((resolve, reject) => {
		axios.get(corsUrl + apiUrl + path + queryString(query), {
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		})
			.then(r => { 
				resolve(r.data); 
			})
			.catch(r => {
				reject(r.response);
			});
	})
}

function queryString(query) {
	return Object.keys(query).length
		? '?' +
		Object.keys(query)
			.map(k => k + '=' + query[k])
			.join('&')
		: ''
}


export const api = () => {
	return {
		get: get,
		search(payload) {
			return get('positions.json', payload);
		},
		getJob(id) {
			return get(`positions/${id}.json`);
		},
		getGeodata(location){
			return axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${location}`)
		},
	}
}