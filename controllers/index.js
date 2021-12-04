const jwtDecode = require('jwt-decode')
const User = 	  require('../models/User.js')
const signToken = require('../auth').signToken

const jokes = [
	'I ate a clock yesterday, it was very time-consuming.',
	'Velcro—what a rip-off!',
	'Don\'t you hate it when someone answers their own questions? I do.',
	'I recently decided to sell my vacuum cleaner as all it was doing was gathering dust.',
	'What do you get a hunter for his birthday? A birthday pheasant',
	'What does a clam do on his birthday? He shellabrates!',
	'Q: Why was the cell phone wearing glasses? A: It lost its contacts.',
	'You know you\'re texting too much when... ...you\'re happy when you get stopped at a red light.',
	'Never trust math teachers who use graph paper. They\'re always plotting something.',
	'Q: What do you get if you divide the circumference of a jack-o-lantern by its diameter? A: Pumpkin pi',
	'Q: What do you call a number that can\'t keep still? A: A roamin\' numeral.',
	'Q: How do mathematicians scold their children? A: "If I\'ve told you n times, I\'ve told you n+1 times..."',
	'Did you hear about the monkeys who shared an Amazon account? They were Prime mates.',
	'Q: What\’s worse than raining cats and dogs? A: Hailing taxis',
	'Q: What\'s Irish and sits outside? A: Patio furniture'
]

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// this function is behind the firewall
	show: async (req, res) => {
		let userProfile = jwtDecode(req.params.id)		
		let joke = jokes[Math.floor(Math.random() * jokes.length)]
		// note we execute .lean() to convert a mongoose document to js doc
		let doc = await User.find({email: userProfile.email}).lean()		
		doc[0].joke = joke						
		res.json(doc)
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a JWT and return to client"
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}