import React from 'react';
import * as firebase from 'firebase';
import ProductForm from './ProductForm.js';
import { Link } from 'react-router-dom';
import generate from 'nanoid/generate';
import _ from 'lodash';

export default class ProductRegister extends React.Component {

	state = {
		storeUID: this.props.location.state.storeUID,
		brands: []
	};

	componentDidMount() {
		this.getBrands(this.updateBrandList);
	}

	componentWillUnmount() {
		var database = firebase.database();
		database.ref().child('stores').child(this.state.storeUID).child('brands').off();
	}

	getBrands(updateFunction) {
	  	var database = firebase.database();
	  	let brandsRef = database.ref().child('stores').child(this.state.storeUID).child('brands');

	  	brandsRef.on('child_added', function(snapShot) {
	  		updateFunction(snapShot.val(), snapShot.key);
	  	});
	}

	updateBrandList = (newBrand, key) => {
	  	var brands = this.state.brands.slice();
	  	newBrand.key = key;
	  	brands.push(newBrand);
	 	this.setState({
	 		storeUID: this.state.storeUID,
	    	brands: brands
	  	});
	}

	onProductSubmit = (productData) => {
		const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	  	let produtcKey = generate(alphabet, 8);
	  	var updates = {};

	  	this.formatProduct(productData);
	  
	  	updates['/stores/' + this.state.storeUID + '/products/' + produtcKey] = productData;
	  	firebase.database().ref().update(updates);
	}

	formatProduct(product) {
	  	let stock = product.stock.slice();
	  	var formatedStock = {};
	  	stock.forEach( (item, index) => {
	    	formatedStock[item.name] = parseInt(item.amount);
	  	});

	  	_.map(this.state.brands, (brand, index) => {
	  		if (brand.name === product.brand) {
	  			product.brandKey = brand.key;
	  		}
	  	});

	  	product.stock = formatedStock;
	 	product.price = parseInt(product.price);
	}

	render() {
		return (
			<div>
				<h1>Cadastro de Produtos</h1>
				<div>
					<ProductForm onSubmit={productData => this.onProductSubmit(productData)} brands={this.state.brands}/>
				</div>
				<br/>
				<div>
					<Link to="/">Pagina Inicial</Link>
				</div>
			</div>
		);
	}
}