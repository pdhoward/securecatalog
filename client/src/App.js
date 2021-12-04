import React, {useState, useEffect} from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import API from './utils/API'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import LogOut from './pages/LogOut'
import SignUp from './pages/SignUp'
import Machine from './pages/machine'

const App= () => {

	const [currentUser, setCurrentUser] = useState(API.getCurrentUser())
	
	const onLoginSuccess = (user) => {
		setCurrentUser({ ...currentUser, currentUser: API.getCurrentUser() })
	}

	const logOut = () => {
		API.logOut()
		setCurrentUser({ ...currentUser, currentUser: null })
	}
	
	useEffect(() =>{
		setCurrentUser({ ...currentUser, currentUser: API.getCurrentUser() })
		
	}, [])

	console.log(`----------------inside of app-----------`)
	console.log(API.getCurrentUser())
	
	return (
		<div className='App container'>		
			<NavBar currentUser={currentUser} />			
			<Routes>
				<Route path="/login" element = {<LogIn onLoginSuccess={onLoginSuccess} /> } />
				<Route path="/logout" element = {<LogOut onLogOut={logOut} />} />				
				<Route path="/signup" element = { <SignUp onSignUpSuccess={onLoginSuccess} /> } />
				<Route path="/machine" element = { currentUser
						? <Machine profile={currentUser} />
						: <Navigate to="/login" /> } />
				<Route path="/" component={Home} />
			</Routes>			

		</div>
	)

}

export default App