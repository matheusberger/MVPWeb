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
	}

	getBrands(updateFunction) {
	  	var database = firebase.database();
	  	let brandsRef = database.ref().child('marcas');

	  	brandsRef.on('value', function(snapShot) {
	  		_.map(snapShot.val(), (brand) => {
	  			updateFunction(brand);
	  		});
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
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		this.setState({
			description: '',
			brand: '',
			price: '',
			stock: {}
		});
	}

	componentDidMount() {
		this.getBrands(this.updateBrandList);
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
				value={this.state.description} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<label>
					Escolha a Marca
					<select>
						{brands}
					</select>
				</label>
				<br/>
				<input
				name="price"
				placeholder='preço do produto' 
				value={this.state.price} 
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