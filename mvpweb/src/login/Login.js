import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Login extends React.Component {

	state = {
		email: '',
		uid: ''
	};

	componentDidMount() {
		console.log("montou o login");
		firebase.auth().signInWithEmailAndPassword("kamila@mepoupe.com", "taoboazinha").catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	// ...
		  	console.log(errorCode, errorMessage);
		});

		firebase.auth().onAuthStateChanged((user) => {
		  	if (user) {
		    	// User is signed in.
		    	var email = user.email;
		    	var uid = user.uid;
		    	
		    	this.setState({
		    		email: email,
		    		uid: uid
		    	});
		  	} else {
		    	// User is signed out.
		    	// ...
		  	}
		});
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<br/>
				<Link to="/">Voltar</Link>
			</div>
		);
	}
}