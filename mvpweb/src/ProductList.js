import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import PrintableTagList from './Tag.js';
import './ProductList.css'

export default class ProductList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			products: []
		};

		this.updateProductList = this.updateProductList.bind(this);
	}

	componentDidMount() {
		this.getProducts(this.updateProductList);
	}

	componentWillUnmount() {
		var database = firebase.database();
		database.ref().child('produtos').off();
	}

	getProducts(updateFunction) {
	  	var database = firebase.database();
	  	let productRef = database.ref().child('produtos');

	  	productRef.on('child_added', function(snapShot) {
	    	updateFunction(snapShot.val(), snapShot.key);
	  	});
	}

	updateProductList = (newProduct, key) => {
	  	var products = this.state.products.slice();
	  	newProduct.key = key;
	  	products.push(newProduct);
	  	this.setState({
	    	brands: this.state.brands,
	    	products: products
	  });
	}

	render() {
		// var tags = _.map(this.state.products, (product, index) => {
		//   	return <PrintableTagList key={index} product={product}/>
		// });

		var tags = _.map(this.state.products, (product, index) => {
		  	return (
		  		<div key={index} class="row">
		  			<div class="column">
		  				<label>{product.description}</label>
		  			</div>
		  			<div class="column">
		  				<label>{product.brand}</label>
		  			</div>
		  			<div class="column">
		  				<label>R${product.price}</label>
		  			</div>
		  			<div class="column">
		  				<label>{JSON.stringify(product.stock)}</label>
		  			</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				<h1> Lista de Produtos </h1>
				<div class="row">
					<div class="column">
						<h2>Descrição</h2>
					</div>
					<div class="column">
						<h2>Marca</h2>
					</div>
					<div class="column">
						<h2>Preço</h2>
					</div>
					<div class="column">
						<h2>Estoque</h2>
					</div>
				</div>
				{tags}
			</div>
		);
	}
}