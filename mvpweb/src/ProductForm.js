import React from 'react';

export default class ProductForm extends React.Component {
		state = {
		description: '',
		brand: '',
		price: '',
		stock: {}
	};

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
		return (
			<form>
				<input
				name="description"
				placeholder="descrição do produto"
				value={this.state.description} 
				onChange={ e => this.change(e) }
				/>
				<br/>
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