import React from 'react';
import * as firebase from 'firebase';
import LoginForm from './LoginForm.js';

export default class Login extends React.Component {

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
		  	if (user) {
		    	window.location.href = "http://localhost:3000/";
		  	} else {
		    	// User is signed out.
		    	// ...
		  	}
		});
	}

	onLoginSubmit = (loginData) => {
	  firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password).catch(function(error) {
	    	// Handle Errors here.
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// ...
	    	console.log(errorCode, errorMessage);
	  });
	}

	render() {
		return (
			<div className="centered">
				<h1>Bem vindo ao Co.Junto!</h1>
				<LoginForm onSubmit={loginData => this.onLoginSubmit(loginData)} />
			</div>
		);
	}
}