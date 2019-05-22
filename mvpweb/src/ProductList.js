import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import PrintableTagList from './Tag.js';

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
		let productRef = database.ref().child('produtos').off();
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
		var tags = _.map(this.state.products, (product, index) => {
		  	return <PrintableTagList key={index} product={product}/>
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				{tags}
			</div>
		);
	}
}