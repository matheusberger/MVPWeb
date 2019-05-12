import React from 'react';

export default class BrandForm extends React.Component {
	state = {
		name: '',
		owner: '',
		email: '',
		percentage: '',
		rent: ''
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
			name: '',
			owner: '',
			email: '',
			percentage: '',
			rent: ''
		});
	}

	render() {
		return (
			<form>
				<input
				name="name"
				placeholder="Nome da marca"
				value={this.state.name} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<input
				name="owner"
				placeholder='Nome do(a) resposável' 
				value={this.state.owner} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<input
				name="email"
				placeholder='Email de contato da marca' 
				value={this.state.email} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<input
				name='percentage'
				placeholder='Porcentagem que a marca paga' 
				value={this.state.percentage} 
				onChange={ e => this.change(e) }
				/>
				<br/>
				<input
				name='rent'
				placeholder='Valor do aluguel da marca' 
				value={this.state.rent} 
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