import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


export default class RefSearch extends React.Component {


	state = {
		ref: ''
	};

	componentWillUnmount() {
		if(this.state.ref) {
			var database = firebase.database();
			database.ref().child('stores').child('mepoupe!').child('products').child(this.state.ref).off();
		}
	}

	onChange = (e) => {
		this.setState({
			ref: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		var database = firebase.database();
		let productRef = database.ref().child('stores').child('mepoupe!').child('products').child(this.state.ref);

		productRef.on('value', snapShot => {
			console.log(snapShot.val());
		});
	}

	render() {
		return (
			<div>
				<Link to="/">Página Inicial</Link>
				<h1>Pesquisa por código</h1>
				<form>
					<label>digite o código: </label>
					<input value={this.state.ref} onChange={ e => this.onChange(e) } />
					<br/>
					<button onClick={ e => this.onSubmit(e) }>
						pesquisar
					</button>
				</form>
			</div>
		);
	}
}