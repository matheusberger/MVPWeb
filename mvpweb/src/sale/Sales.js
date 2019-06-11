import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import './Sales.css';

export default class Sales extends React.Component {

	state = {
			brands: [],
			products: [],
			sales: {},
			storeUID: this.props.location.state.storeUID
	};

	brandsPath = '/stores/' + this.state.storeUID + '/brands/';
	productsPath = 'stores/' + this.state.storeUID + '/products/';
	salesPaths = [];

	componentDidMount() {
		this.getBrands();
	}

	componentWillUnmount() {
		firebase.database().ref(this.brandsPath).off();
		firebase.database().ref(this.productsPath).off();

		this.salesPaths.forEach( path => {
			firebase.database().ref(path).off();
		});
	}

	getBrands = () => {
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
		let path = '/stores/' + this.state.storeUID + '/sales/' + brandKey + '/' + date.getFullYear() + '/' + date.getMonth();
		this.salesPaths.push(path);

		let salesRef = firebase.database().ref(path);
		salesRef.on('child_added', snapshot => {
			var sales = JSON.parse(JSON.stringify(this.state.sales));
			sales[snapshot.key] = snapshot.val();

			this.setState({
				brands: this.state.brands,
				products: this.state.products,
				sales: sales,
				storeUID: this.state.storeUID
			});

			this.getProduct(snapshot.key);
		});
	}

	getProduct = (productKey) => {
		let productRef = firebase.database().ref(this.productsPath + productKey);
		productRef.on('value', snapshot => {
			var newP = snapshot.val();
			delete newP.stock;
			newP.sales = this.state.sales[productKey];

			let products = this.state.products.slice();
			products.push(newP);

			this.setState({
				brands: this.state.brands,
				products: products,
				sales: this.state.sales,
				storeUID: this.state.storeUID
			});
		});
	}

	getTotalValue = (product) => {
		var total = 0;
		let cashSales = product.sales.cash;
		let cardSales = product.sales.card;


		return 100;
	}

	getValue = (product, method) => {
		var total = 0;
		let sales = product.sales[method]

		let sizes = Object.keys(sales);

		sizes.forEach(size => {
			total = total + (product.price * sales[size]);
		})

		return total;
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
		  				<label>R$ {product.price}</label>
		  			</div>
		  			<div className="column">
		  				<div className="row">
		  					<div className="half">
		  						<label>{JSON.stringify(product.sales.cash)}</label>
		  					</div>
		  					<div className="half">
		  						<label>{JSON.stringify(product.sales.card)}</label>
		  					</div>
		  				</div>
		  			</div>
		  			<div className="column">
							<div className="row">
								<div className="half">
									<label>R$ {this.getValue(product, 'cash')}</label>
								</div>
								<div className="half">
									<label>R$ {this.getValue(product, 'card')}</label>
								</div>
							</div>
						</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">voltar</Link>
				</div>
				<h1> Vendas </h1>
				<div className="centered">
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
							<div className="row">
								<h2>Vendas</h2>
								<div className="half">
									<h3>Dinheiro</h3>
								</div>
								<div className="half">
									<h3>Cartão</h3>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="row">
								<h2>Total</h2>
								<div className="half">
									<h3>Dinheiro</h3>
								</div>
								<div className="half">
									<h3>Cartão</h3>
								</div>
							</div>
						</div>
					</div>
					{products}
				</div>
			</div>
		);
	}
}