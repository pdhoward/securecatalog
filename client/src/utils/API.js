import axios from 'axios'
import jwtDecode from 'jwt-decode'

const API = {
	getToken: function() {
		return localStorage.getItem('token')
	},
	setToken: function(token) {
		localStorage.setItem('token', token)
		return token
	},
	getCurrentUser: function() {
		const token = this.getToken()
		if (token) {
			let decoded = jwtDecode(token);
			console.log(decoded)
		}
		
		if(token) return {...jwtDecode(token), token}
		return null
	},
	logIn: function(credentials) {	
		const {email, password} = credentials
		return axios.post('/api/users/authenticate', {email, password})
			.then((serverResponse) => {
				const token = serverResponse.data.token
				if(token) {
					// sets token as an included header for all subsequent api requests
					axios.defaults.headers.common['token'] = this.setToken(token)
					
					return jwtDecode(token)
				} else {
					return false
				}
			})
	},
	signUp: function(userInfo) {
		const {name, email, password} = userInfo
		return axios.post('/api/users', {name, email, password})
		.then((serverResponse) => {			
			const token = serverResponse.data.token
			if(token) {				
				axios.defaults.headers.common['token'] = this.setToken(token)				
				return jwtDecode(token)
			} else {
				return false
			}
		})
	},
	logOut: function() {
		localStorage.removeItem('token')
		delete axios.defaults.headers.common.token
		return true
	},
	getSecret: function(token){		
		return axios.get(`/api/users/${token}`)
		.then((serverResponse) => {				
			return serverResponse
		})
	}
}
axios.defaults.headers.common['token'] = API.getToken()

export default API
