import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase'


//turn this into controled component
export default class ProductForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			product: {
				description: '',
				brand: '',
				price: '',
				stock: {},
			},
			brands: []
		};

		this.updateBrandList = this.updateBrandList.bind(this);

		this.getBrands(this.updateBrandList);
	}

	getBrands(updateFunction) {
	  	var database = firebase.database();
	  	let brandsRef = database.ref().child('marcas');

	  	brandsRef.on('child_added', function(snapShot) {
	  		updateFunction(snapShot.val());
	  	});
	}

	updateBrandList = (newBrand) => {
	  	var brands = this.state.brands.slice();
	  	brands.push(newBrand);
	 	this.setState({
	    	brands: brands
	  	});
	  	console.log(this.state.brands)
	}

	change = (e) => {
		let changed = JSON.parse(JSON.stringify(this.state.product));
		changed[e.target.name] = e.target.value;
		this.setState({
			product: changed
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.product);
		this.setState({
			product: {
				description: '',
				brand: '',
				price: '',
				stock: {},
			},
			brands: []
		});
	}

	render() {
		var brands = _.map(this.state.brands, (brand, index) => {
			return <option key={index}> { brand.name } </option>;
		});

		return (
			<form>
				<input
				name="description"
				placeholder="descrição do produto"
				value={this.state.product.description} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<label>
					Escolha a Marca
				</label>
				<select 
				name="brand"
				onChange={(e) => this.change(e)}>
					{brands}
				</select>
				<br/>
				<label>
					R$
				</label>
				<input
				name="price"
				placeholder='preço do produto' 
				value={this.state.product.price} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<button onClick={e => this.onSubmit(e)}>
					Cadastrar 
				</button>
			</form>
		);
	}
}