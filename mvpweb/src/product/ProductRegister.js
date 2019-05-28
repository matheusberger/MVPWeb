import React from 'react';
import * as firebase from 'firebase';
import ProductForm from './ProductForm.js';
import { Link } from 'react-router-dom';
import nanoid from 'nanoid';

export default class ProductRegister extends React.Component {

	state = {
		storeUID: this.props.location.state.storeUID
	};

	onProductSubmit = (productData) => {
	  let produtcKey = nanoid(8);
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

	  product.stock = formatedStock;
	  product.price = parseInt(product.price);
	}

	render() {
		return (
			<div>
				<h1>Cadastro de Produtos</h1>
				<div>
					<ProductForm onSubmit={productData => this.onProductSubmit(productData)} storeUID={this.state.storeUID}/>
				</div>
				<br/>
				<div>
					<Link to="/">Pagina Inicial</Link>
				</div>
			</div>
		);
	}
}