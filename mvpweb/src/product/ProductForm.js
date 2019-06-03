import React from 'react';
import _ from 'lodash';

export default class ProductForm extends React.Component {
	numOfSizes = 1;
	uniqueSize = false;

	state = {
		product: {
			description: '',
			brand: '',
			price: '',
			ref: '',
			stock: [{name: '', amount:0}],
		},
	};

	change = (e) => {
		let updatedState = JSON.parse(JSON.stringify(this.state.product));
		updatedState[e.target.name] = e.target.value;
		this.setState({
			product: updatedState,
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		var product = JSON.parse(JSON.stringify(this.state.product));
		
		if(this.uniqueSize && this.numOfSizes === 1) {
			product.stock[0].name = 'U';
		}

		this.props.onSubmit(product);
		this.setState({
			product: {
				description: '',
				brand: '',
				price: '',
				ref: '',
				stock: [{name: '', amount:0}],
			},
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
		var brands = _.map(this.props.brands, (brand, index) => {
			return <option key={brand.key + index}> { brand.name } </option>;
		});

		var sizes = _.map(this.state.product.stock, (size, index) => {
			return (
				<div>
					<input 
					id="sizeName"
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
				<h2>
					Informações do Produto
				</h2>
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
					Referência/Código
				</label>
				<input
				name='ref'
				placeholder='referencia do produto'
				value={this.state.product.ref}
				onChange={ e => this.change(e) }
				/>
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
				<h2>
					Tamanhos
				</h2>
				<label>
					Tamanho único?
				</label>
				<input 
				type="checkbox" 
				onChange={ () => {
					this.uniqueSize = !this.uniqueSize;
					let button = document.getElementById("addSize");
					let sizeName = document.getElementById("sizeName");

					button.disabled = !button.disabled;
					sizeName.disabled = !sizeName.disabled;
				}}
				/>
				{sizes}
				<button id="addSize" onClick={e => this.addSize(e)}>
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