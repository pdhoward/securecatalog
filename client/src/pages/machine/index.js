import React, {useState} from 'react'
import Card from '../../components/Card'
import vipImage from './vip.png'
import API from '../../utils/API'


const Machine = ({profile}) => {
	const [joke, setJoke] = useState("")
	const [password, setPassword] = useState("")

	console.log('inside of machine')
	console.log(profile)

	const handleClick = (token) => {
		API.getSecret(token).then(result => {
			console.log(result.data)
			if (result.data.message = "Invalid Token") {
				setJoke('No Joke - invalid token')
				return}
			if (result.data[0].joke) setJoke(result.data[0].joke)
			if (result.data[0].password) setPassword(result.data[0].password)
		})
	}

	return (
		<div className='VIP'>
		  <div className='row'>
			 <div className='column column-33 column-offset-33 '>
    			<img src={vipImage} height={90} width={90} alt="VIP" />
				<h4>Welcome {profile.currentUser.name}!</h4>
				<h6>{profile.currentUser.email}</h6>
				<div className="padded-multiline">
  					<p>    					
      					{profile.currentUser.token}
    				</p>
				</div>
				
				<button onClick={() => handleClick(profile.token)}>Get Secret Joke</button>
				{joke ? <Card
			 	 	password = {password}
			 	 	joke = {joke}			  
				/> : <></> }
			 </div>			 
			
		  </div>		  
		 
		</div>
	)
}

export default Machine 