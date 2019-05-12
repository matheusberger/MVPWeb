import React from 'react';
import _ from 'lodash';


//turn this into controled component
export default class ProductForm extends React.Component {
	state = {
		description: '',
		brand: '',
		price: '',
		stock: {}
	};

	availableBrands = [];

	constructor(props) {
		super(props);

		this.state = {
			description: '',
			brand: '',
			price: '',
			stock: {}
		};
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

	render() {
		var brands = _.map(this.availableBrands, (brand) => {
			return <option value={brand.id}> { brand.name } </option>;
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
				<select>
					{brands}
				</select>
				<input
				name="brand"
				placeholder='marca' 
				value={this.state.brand} 
				onChange={ e => this.change(e) }
				/>
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