import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
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
	    	products: products
	  });
	}

	render() {
		var products = _.map(this.state.products, (product, index) => {
		  	return (
		  		<div key={index} className="row">
		  			<div className="column">
		  				<label>{product.description}</label>
		  			</div>
		  			<div className="column">
		  				<label>{product.brand}</label>
		  			</div>
		  			<div className="column">
		  				<label>R${product.price}</label>
		  			</div>
		  			<div className="column">
		  				<label>{JSON.stringify(product.stock)}</label>
		  			</div>
		  			<div className="column">
						<Link to={{
							pathname: "/produtos/imprimir",
							state: {product: product}
						}}>Imprimir Etiquetas</Link>
					</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				<h1> Produtos </h1>
				<div className="row">
					<div className="column">
						<h2>Descrição</h2>
					</div>
					<div className="column">
						<h2>Marca</h2>
					</div>
					<div className="column">
						<h2>Preço</h2>
					</div>
					<div className="column">
						<h2>Estoque</h2>
					</div>
				</div>
				{products}
			</div>
		);
	}
}