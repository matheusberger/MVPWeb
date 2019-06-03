import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import './BrandList.css'

export default class BrandList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			brands: [],
			storeUID: this.props.location.state.storeUID
		};

		this.updateBrandList = this.updateBrandList.bind(this);
	}

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
	    	brands: brands,
	    	storeUID: this.state.storeUID
	  	});
	}

	render() {
		var brands = _.map(this.state.brands, (brand, index) => {
		  	return (
		  		<div key={index} className="row">
		  			<div className="brandColumn">
		  				<label>{brand.name}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.email}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.phone}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>R${brand.rent}</label>
		  			</div>
		  			<div className="brandColumn">
		  				<label>{brand.percentage}%</label>
		  			</div>
		  		</div>
		  	);
		});

		return (
			<div>
				<div>
					<Link to="/">Página Principal</Link>
				</div>
				<h1> Marcas </h1>
				<div className="row">
					<div className="brandColumn">
						<h2>Nome</h2>
					</div>
					<div className="brandColumn">
						<h2>Email</h2>
					</div>
					<div className="brandColumn">
						<h2>Telefone</h2>
					</div>
					<div className="brandColumn">
						<h2>Aluguel</h2>
					</div>
					<div className="brandColumn">
						<h2>Porcentagem</h2>
					</div>
				</div>
				{brands}
			</div>
		);
	}
}