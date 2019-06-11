import React from 'react';

export default class BrandForm extends React.Component {
	state = {
		name: '',
		owner: '',
		email: '',
		phone: '',
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
			phone: '',
			percentage: '',
			rent: ''
		});
	}

	render() {
		return (
			<form>
				<div className="row">
					<div className="half">
						<label>nome da marca</label>
					</div>
					<div className="half">
						<input
						name="name"
						placeholder="Marca legal"
						value={this.state.name} 
						onChange={ e => this.change(e) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="half">
						<label>nome do resposável</label>
					</div>
					<div className="half">
						<input
						name="owner"
						placeholder='Fulano da Silva' 
						value={this.state.owner} 
						onChange={ e => this.change(e) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="half">
						<label>email de contato da marca</label>
					</div>
					<div className="half">
						<input
						name="email"
						placeholder='marca@email.com' 
						value={this.state.email} 
						onChange={ e => this.change(e) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="half">
						<label>telefone de contato da marca</label>
					</div>
					<div className="half">
						<input
						name="phone"
						placeholder='(00) 99999-9999' 
						value={this.state.phone} 
						onChange={ e => this.change(e) }
						/>
					</div>
				</div>
				<div className="row">
					<div className="half">
						<label>porcentagem que a marca paga</label>
					</div>
					<div className="half">
						<input
						name='percentage'
						type="number"
						placeholder='15' 
						value={this.state.percentage} 
						onChange={ e => this.change(e) }
						/>
					<label> % </label>
					</div>
				</div>
				<div className="row">
					<div className="half">
						<label>valor do aluguel da marca</label>
					</div>
					<div className="half">
						<label>R$ </label>
						<input
						name='rent'
						type="number"
						placeholder='200' 
						value={this.state.rent} 
						onChange={ e => this.change(e) }
						/>
					</div>
				</div>
				<button onClick={e => this.onSubmit(e)}>
					Cadastrar 
				</button>
			</form>
		);
	}
}