import React from 'react';
import { Link } from 'react-router-dom';
import PrintableTagList from './Tag.js';

export default class TagPrintPage extends React.Component {

	render() {
		return (
			<div>
				<div>
					<Link to="/lista_produtos">Voltar</Link>
				</div>
				<PrintableTagList product={this.props.location.state.product} />
			</div>
		);
	}
}