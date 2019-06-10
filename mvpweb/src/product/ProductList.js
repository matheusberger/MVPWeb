import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import './ProductList.css'

export default class ProductList extends React.Component {

	productRef = {};

	constructor(props) {
		super(props);

		this.state = {
			products: [],
			storeUID: this.props.location.state.storeUID
		};

		this.updateProductList = this.updateProductList.bind(this);
	}

	componentDidMount() {
		this.getProducts(this.updateProductList);
	}

	componentWillUnmount() {
		this.productRef.off();
	}

	getProducts(updateFunction) {
	  	var database = firebase.database();
	  	this.productRef = database.ref().child('stores').child(this.state.storeUID).child('products');

	  	this.productRef.on('child_added', function(snapShot) {
	    	updateFunction(snapShot.val(), snapShot.key);
	  	});
	}

	updateProductList = (newProduct, key) => {
	  	var products = this.state.products.slice();
	  	newProduct.key = key;
	  	products.push(newProduct);
	  	this.setState({
	    	products: products,
	    	storeUID: this.state.storeUID
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
							state: {product: product, storeUID: this.state.storeUID}
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