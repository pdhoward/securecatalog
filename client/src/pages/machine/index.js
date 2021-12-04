import React, {useState} from 'react'
import Card from '../../components/Card'
import vipImage from './vip.png'
import API from '../../utils/API'


const Machine = ({profile}) => {
	const [joke, setJoke] = useState("")
	const [password, setPassword] = useState("")

	const handleClick = (token) => {
		API.getSecret(token).then(result => {
			console.log(result.data)
			if (result.data[0].joke) setJoke(result.data[0].joke)
			if (result.data[0].password) setPassword(result.data[0].password)
		})
	}

	return (
		<div className='VIP'>
		  <div className='row'>
			 <div className='column column-33 column-offset-33 '>
    			<img src={vipImage} height={90} width={90} alt="VIP" />
				<h4>Welcome {profile.name}!</h4>
				<h6>{profile.email}</h6>
				<div className="padded-multiline">
  					<p>    					
      					{profile.token}
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