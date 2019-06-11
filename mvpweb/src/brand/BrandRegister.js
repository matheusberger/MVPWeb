import React from 'react';
import * as firebase from 'firebase';
import BrandForm from './BrandForm.js';
import { Link } from 'react-router-dom';

export default class BrandRegister extends React.Component {

	state = {
		storeUID: this.props.location.state.storeUID
	};

	onBrandSubmit = (brandData) => {
	  	var database = firebase.database();
	  	var brandRef = database.ref().child('stores').child(this.state.storeUID).child('brands');
	  	var brandKey = brandRef.push().key;
	  	var updates = {};

	  	this.formatBrand(brandData);

	  	updates['/stores/' + this.state.storeUID + '/brands/' + brandKey] = brandData;
	  	firebase.database().ref().update(updates);
	}

	formatBrand(brand) {
	  	brand.rent = parseInt(brand.rent);
	  	brand.percentage = parseInt(brand.percentage);
	}

	render() {
		return (
			<div>
				<div>
					<Link to="/">voltar</Link>
				</div>
				<h1>Cadastro de Marcas</h1>
				<div className="centered">
					<BrandForm onSubmit={brandData => this.onBrandSubmit(brandData)}/>
				</div>
			</div>
		);
	}
}