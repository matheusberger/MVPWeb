import React from 'react';
import { Link } from 'react-router-dom';
// import * as firebase from 'firebase';
import _ from 'lodash';

export default class Sales extends React.Component {

	salesRef = {};
	productsRef = {}

	state = {
			sales: [],
			storeUID: this.props.location.state.storeUID
	};

	componentDidMount() {
		
	}

	componentWillUnmount() {
		
	}

	render() {
		var products = _.map(this.state.products, (product, index) => {
		  	return (
		  		<div key={index} className="row">
		  			<div className="column">
		  				<label>{product.brand}</label>
		  			</div>
		  			<div className="column">
		  				<label>{product.description}</label>
		  			</div>
		  			<div className="column">
		  				<label>R${product.price}</label>
		  			</div>
		  			<div className="column">
		  				<label>{JSON.stringify(product.stock)}</label>
		  			</div>
		  			<div className="column">
						<label>R${}</label>
					</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				<h1> Vendas </h1>
				<div className="row">
					<div className="column">
						<h2>Marca</h2>
					</div>
					<div className="column">
						<h2>Descrição</h2>
					</div>
					<div className="column">
						<h2>Preço</h2>
					</div>
					<div className="column">
						<h2>Quantidade</h2>
					</div>
					<div className="column">
						<h2>Total</h2>
					</div>
				</div>
				{products}
			</div>
		);
	}
}