import React, {useState, useEffect} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return (
		<div className='App container'>

			<NavBar currentUser={currentUser} />

			<Switch>

				<Route path="/login" render={(props) => {
					return <LogIn {...props} onLoginSuccess={onLoginSuccess} />
				}} />

				<Route path="/logout" render={() => {
					return <LogOut onLogOut={logOut} />
				}} />

				{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
				<Route path="/signup" render={(props) => {
					return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />
				}} />

				<Route path="/machine" render={() => {
					return currentUser
						? <Machine profile={currentUser} />
						: <Redirect to="/login" />
				}} />

				<Route path="/" component={Home} />

			</Switch>
		</div>
	)

}

export default App