import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";
import _ from 'lodash';

export class Tag extends React.Component {
	render() {
		console.log(this.props.product);
		return (
			<div>
				<p>
					<label>{this.props.product.brand}</label>
					<br/>
					<label>{this.props.product.description}</label>
					<br/>
					<QRCode value={JSON.stringify(this.props)}/>
					<br/>
					<label>R$ {this.props.product.price}</label>
					<br/>
					<label>Tamanho: {this.props.product.size}</label>
				</p>
			</div>
		);
	} 
}

export default class PrintableTagList extends React.Component {

	render() {
		const ref = React.createRef();
		const options = {
		    orientation: "portrait",
		    unit: "px",
		    format: [1240, 1754]
		};

		var tags = _.map(this.props.product.stock, (amount, size) => {
			var productInstance = _.omit(this.props.product, 'stock');
			productInstance.size = size;
			return	<Tag key={productInstance.key + size} product={productInstance}/>;
		});

		return (
			<div>
				<ReactToPdf targetRef={ref} filename="etiquetas.pdf" options={options} x={0}>
				    {({toPdf}) => (
				        <button onClick={toPdf}>Generate pdf</button>
				    )}
				</ReactToPdf>
				<div style={{width: 1240, height: 1754}} ref={ref}>
					{tags}
				</div>

	    	</div>
		);
	}
}