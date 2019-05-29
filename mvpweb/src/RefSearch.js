import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';


export default class RefSearch extends React.Component {


	state = {
		key: '',
		storeUID: '',
		product: {}
	};

	componentDidMount() {
		this.setState({
			key: this.state.key,
			storeUID: this.props.location.state.storeUID,
			product: this.state.product
		});
	}

	componentWillUnmount() {
		if(this.state.key) {
			var database = firebase.database();
			database.ref().child('stores').child(this.state.storeUID).child('products').child(this.state.key).off();
		}
	}

	onChange = (e) => {
		this.setState({
			key: e.target.value,
			storeUID: this.state.storeUID,
			product: this.state.product
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		var database = firebase.database();

		if(this.state.key) {
			let productRef = database.ref().child('stores').child(this.state.storeUID).child('products').child(this.state.key);

			productRef.on('value', snapShot => {
				this.setState({
					key: this.state.key,
					storeUID: this.state.storeUID,
					product: snapShot.val()
				});
			});
		}
	}

	sell = (size) => {
		var updatedStock = JSON.parse(JSON.stringify(this.state.product));

		//create the sell object and save it to firebase here
		
		this.updatedStock(updatedStock, size);
	  	this.setState({
	  		key: this.state.key,
	  		storeUID: this.state.storeUID,
	  		product: updatedStock
	  	});
	}

	updateStock = (product, size) => {
		product.stock[size] = product.stock[size] - 1;
		
		if(!product.stock[size]) {
			delete product.stock[size];
		}

		var updates = {};
		updates['/stores/' + this.state.storeUID + '/products/' + this.state.key] = product;
	  	firebase.database().ref().update(updates);

	  	this.setState({
	  		key: this.state.key,
	  		storeUID: this.state.storeUID,
	  		product: product
	  	});
	}

	render() {
		var saleButtons = _.map(this.state.product.stock, (amount, size) => {
			return (
				<div className="column">
					<button key={size} onClick={ () => this.sell(size) }>{ 'Vender ' + size }</button>
				</div>
			);
		});

		return (
			<div>
				<Link to="/">Página Inicial</Link>
				<h1>Pesquisa por código</h1>
				<div>
					<form>
						<label>digite o código: </label>
						<input value={this.state.ref} onChange={ e => this.onChange(e) } />
						<button onClick={ e => this.onSubmit(e) }>
							pesquisar
						</button>
					</form>
				</div>
				<h2>Produto</h2>
				<div className="row">
					<div className="column">
						<label>{this.state.product.description}</label>
					</div>
					<div  className="column">
						<label>{JSON.stringify(this.state.product.stock)}</label>
					</div>
					{saleButtons}
				</div>
			</div>
		);
	}
}