import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import API from '../utils/API'


function SignUp({onSignUpSuccess, history}) {
	
	const [fields, setFields] = useState({ name: '', email: '', password: ''})

	let navigate = useNavigate();

	const onInputChange = (evt) => {
		setFields({...fields, [evt.target.name]: evt.target.value })
		
	}
	const onFormSubmit = (evt) => {
		evt.preventDefault()
		API.signUp(fields).then(user => {			
			setFields({...fields, name: '', email: '', password: '' })
			if(user) {
				onSignUpSuccess(user)
				navigate('/', {replace: true})
			}
		})
	}	
	
	const { name, email, password } = fields
	return (
		<div className='SignUp'>
			<div className='row'>
				<div className='column column-33 column-offset-33'>
					<h1>Sign Up</h1>
					<form onSubmit={onFormSubmit}>
						<input 
							type="text" 
							placeholder="Name" 
							name="name" 
							value={name} 
							onChange={onInputChange}
						/>
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
						<button>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	)
	
}

export default SignUp