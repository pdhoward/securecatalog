import React from 'react'
import { Navigate } from 'react-router-dom'

class LogOut extends React.Component {

	componentDidMount() {
		this.props.onLogOut()
	}
	
	render() {
		return <Navigate to="/login" />
	}
}

export default LogOut