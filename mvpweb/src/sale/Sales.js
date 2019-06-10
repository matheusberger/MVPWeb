import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';

export default class Sales extends React.Component {

	brandsPath
	productsPath = {};
	salesPath = {};

	state = {
			brands: [],
			products: [],
			sales: [],
			storeUID: this.props.location.state.storeUID
	};

	componentDidMount() {
		this.getBrands();
	}

	componentWillUnmount() {
		
	}

	getBrands = () => {
		this.brandsPath = '/stores/' + this.state.storeUID + '/brands/';

		let brandsRef = firebase.database().ref(this.brandsPath);
		brandsRef.on('child_added', snapshot => {
			let brands = this.state.brands.slice();
			brands.push(snapshot.val());

			this.setState({
				brands: brands,
				products: this.state.products,
				sales: this.state.sales,
				storeUID: this.state.storeUID
			});

			this.getSalesForBrand(snapshot.key);
		});
	}

	getSalesForBrand = (brandKey) => {
		let date = new Date()
		this.salesPath = '/stores/' + this.state.storeUID + '/sales/' + brandKey + '/' + date.getMonth();

		let salesRef = firebase.database().ref(this.salesPath);
		salesRef.on('child_added', snapshot => {
			let sales = this.state.sales.slice();
			sales.push(snapshot.val());

			this.setState({
				brands: this.state.brands,
				products: this.state.products,
				sales: sales,
				storeUID: this.state.storeUID
			});
		});
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