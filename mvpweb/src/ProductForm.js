import React from 'react';
import _ from 'lodash';
import * as firebase from 'firebase'


//turn this into controled component
export default class ProductForm extends React.Component {
	numOfSizes = 1;

	constructor(props) {
		super(props);

		this.state = {
			product: {
				description: '',
				brand: '',
				price: '',
				stock: [{name: '', amount:0}],
			},
			brands: []
		};

		this.updateBrandList = this.updateBrandList.bind(this);
	}

	componentDidMount() {
		this.getBrands(this.updateBrandList);
	}

	componentWillUnmount() {
		var database = firebase.database();
		let productRef = database.ref().child('marcas').off();
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
	}

	change = (e) => {
		let updatedState = JSON.parse(JSON.stringify(this.state.product));
		updatedState[e.target.name] = e.target.value;
		this.setState({
			product: updatedState
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
				stock: [{name: '', amount:0}],
			},
			brands: []
		});
	}

	addSize = (e) => {
		e.preventDefault();
		var sizes = this.state.product.stock.slice();
		sizes.push({ name: '', amount: 0});

		let updatedState = JSON.parse(JSON.stringify(this.state));
		updatedState.product.stock = sizes;
		this.setState(updatedState);
	}

	changeStock = (e, index) => {

		let updatedState = JSON.parse(JSON.stringify(this.state));
		updatedState.product.stock[index][e.target.name] = e.target.value;
		this.setState(updatedState);
	}

	render() {
		var brands = _.map(this.state.brands, (brand, index) => {
			return <option key={index}> { brand.name } </option>;
		});

		var sizes = _.map(this.state.product.stock, (size, index) => {
			return (
				<div>
					<input 
					key={index} 
					name='name' 
					value={size.name} 
					onChange={e => this.changeStock(e, index)} 
					/>
					<input
					key={-index-1}
					type="number"
					name='amount'
					value={size.amount}
					onChange={e => this.changeStock(e, index)}
					/>
				</div>
				);
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
					Marca
				</label>
				<select 
				name="brand"
				placeholder="Escolha a marca"
				onChange={e => this.change(e)}>
				<option value="">Escolha a marca</option>
					{brands}
				</select>
				<br/>
				<label>
					R$
				</label>
				<input
				name="price"
				type="number"
				placeholder='preço do produto' 
				value={this.state.product.price} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<label>
					Tamanhos
				</label>
				{sizes}
				<button onClick={e => this.addSize(e)}>
					+
				</button>
				<br/>
				<button onClick={e => this.onSubmit(e)}>
					Cadastrar 
				</button>
			</form>
		);
	}
}