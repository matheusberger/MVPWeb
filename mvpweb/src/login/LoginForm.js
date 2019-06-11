import React from 'react';

export default class LoginForm extends React.Component {
	state = {
		email: '',
		password: ''
	};

	change = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		return (
			<form>
				<div className="row">
					<input
					name="email"
					placeholder="email cadastrado"
					value={this.state.email} 
					onChange={ e => this.change(e) }
					/>
				</div>
				<div className="row">
					<input
					name="password"
					type='password'
					placeholder='senha' 
					value={this.state.password} 
					onChange={ e => this.change(e) }
					/>
				</div>
				<button onClick={e => this.onSubmit(e)}>
					login 
				</button>
			</form>
		);
	}
}