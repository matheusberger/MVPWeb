import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';


export default class RefSearch extends React.Component {

	state = {
		ref: ''
	};

	onChange = (e) => {
		this.setState({
			ref: e.target.value
		});
	}

	render() {
		return (
			<div>
				<h1>Pesquisa por código</h1>
				<form>
					<label>digite o código: </label>
					<input value={this.state.ref} onChange={ e => this.onChange(e) } />
					<br/>
					<button onClick={ e => this.onSubmit(e) }>
						pesquisar
					</button>
				</form>
			</div>
		);
	}
}