import {api} from '~/plugins/api.js'

export default ({$axios}, inject) => {
    inject('api', api($axios));
}