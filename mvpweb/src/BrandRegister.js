import React from 'react';
import * as firebase from 'firebase';
import BrandForm from './BrandForm.js';
import { Link } from 'react-router-dom';

export default class BrandRegister extends React.Component {

	onBrandSubmit = (brandData) => {
	  	var database = firebase.database();
	  	var brandRef = database.ref().child('marcas');
	  	var brandKey = brandRef.push().key;
	  	var updates = {};

	  	this.formatBrand(brandData);

	  	updates['/marcas/' + brandKey] = brandData;
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
					<BrandForm onSubmit={brandData => this.onBrandSubmit(brandData)}/>
				</div>
				<div>
					<Link to="/">Pagina Inicial</Link>
				</div>
			</div>
		);
	}
}