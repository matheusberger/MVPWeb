import React from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import * as firebase from 'firebase';
import _ from 'lodash';


export default class RefSearch extends React.Component {

	method = '';

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

		var button = document.getElementById("sellButton");
		if(this.state.product !== {}) {
			button.disabled = false;
		}
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

	submitSale = (size) => {
		this.updateStock(size);

		let saleRef = firebase.database().ref('/stores/' + this.state.storeUID + '/sales/' + this.state.product.brandKey + '/' + this.state.key + '/' + this.method + '/' + size);
		
		saleRef.once('value', snapshot => {
		    var updates = {};
		   	updates['/stores/' + this.state.storeUID + '/sales/' + this.state.product.brandKey + '/' + this.state.key + '/' + this.method + '/' + size] = snapshot.val() + 1;
		  	updates['/stores/' + this.state.storeUID + '/products/' + this.state.key] = this.state.product;
		   	firebase.database().ref().update(updates);
		});

	  	
	}

	updateStock = (size) => {
		var updatedStock = JSON.parse(JSON.stringify(this.state.product));
		updatedStock.stock[size] = updatedStock.stock[size] - 1;
		
		if(!updatedStock.stock[size]) {
			delete updatedStock.stock[size];
		}	

	  	this.setState({
	  		key: this.state.key,
	  		storeUID: this.state.storeUID,
	  		product: updatedStock
	  	});
	}

	render() {
		var saleButtons = _.map(this.state.product.stock, (amount, size) => {
			return (
				<div className="column">
					<button key={size} onClick={ () => this.submitSale(size) }>{ 'Vender ' + size }</button>
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
					<div id="sellButton" className="column">
						<Popup trigger={<button> Vender</button>} position="right center">
					    	<div>
					    		<select 
					    		name="method"
					    		onChange={e => this.method = e.target.value}>
					    			<option value="" disabled>Escolha o método de pagamento</option>
					    			<option value="card">Cartão</option>
					    			<option value="cash">Dinheiro</option>
					    		</select>
					    		<br/>
					    		<div className="row">
					    			{saleButtons}
					    		</div>
					    	</div>
						</Popup>
					</div>
				</div>
			</div>
		);
	}
}