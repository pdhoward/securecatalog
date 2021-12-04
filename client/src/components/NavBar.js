import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({currentUser}) => {
	console.log(`-----nav bar----`)
	let isCurrentUser = true
	if (currentUser.currentUser == null) isCurrentUser = false
	console.log(isCurrentUser)
	return (
		<div className='NavBar'>
			<NavLink to="/">Home</NavLink>
			{isCurrentUser
				? (
					<span>
						<NavLink to="/machine">Machine</NavLink>
						<NavLink to="/logout">Log Out</NavLink>
					</span>
				)
				: (
					<span>
						<NavLink to="/login">Log In</NavLink>
						<NavLink to="/signup">Sign Up</NavLink>
					</span>
				)
			}
		</div>
	)
}

export default NavBar