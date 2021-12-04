import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import API from '../utils/API'

function LogIn({onLoginSuccess, history}) {
	
	const [fields, setFields] = useState({ email: '', password: '', isValid: true});

	let navigate = useNavigate()

	const onInputChange = (evt) => {
		setFields({...fields, [evt.target.name]: evt.target.value })		
	}

	const onFormSubmit = (evt) => {
		evt.preventDefault()
		API.logIn(fields).then(user => {		
			if (user) {
				onLoginSuccess(user)
				setFields({...fields, email: '', password: '', isValid: true })
				navigate('/', {replace: true})				
			} else {
				setFields({...fields, email: '', password: '', isValid: false })
			}
		})
	}	
	
	const { email, password, isValid } = fields
	return (
		<div className='LogIn'>
			<div className='row'>
				<div className='column column-33 column-offset-33'>
					<h1>Log In</h1>
					<form  onSubmit={onFormSubmit}>
						<input 
							type="text" 
							placeholder="Email" 
							name="email" 
							value={email} 
							onChange={onInputChange}
						/>
						<input 
							type="password" 
							placeholder="Password" 
							name="password" 
							value={password} 
							onChange={onInputChange}
						/>
						<button>Log In</button>
					</form>
					{isValid ? <h4>Hello. We appreciate your business</h4>
  						: <h4>The email or password was incorrect. Please try again</h4>}
				</div>
			</div>
		</div>
	)
	
}

export default LogIn