import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";
import _ from 'lodash';
import './Tag.css';

export class Tag extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="QRCODE">
					<QRCode value={JSON.stringify(this.props)}/>
				</div>
				<div className="TagInfo">
					<br/>
					<label>{this.props.product.brand}</label>
					<br/>
					<label>{this.props.product.description}</label>
					<br/>
					<label>{this.props.product.key}</label>
					<br/>
					<label>R$ {this.props.product.price}</label>
					<br/>
					<label>Tamanho: {this.props.product.size}</label>
				</div>
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

		var tags = [];

		_.map(this.props.product.stock, (amount, size) => {
			var productInstance = _.omit(this.props.product, 'stock');
			productInstance.size = size;

			for (var i = amount - 1; i >= 0; i--) {
				tags.push(productInstance);
			}
		});

		tags = _.map(tags, (product, index) => {
			if(!(index % 2)) {
				console.log('multiplo de 2');
			}
			return <Tag key={product.key + index} product={product} />
		});

		return (
			<div>
				<ReactToPdf targetRef={ref} filename="etiquetas.pdf" options={options} x={0}>
				    {({toPdf}) => (
				        <button onClick={toPdf}>Imprimir Etiquetas!</button>
				    )}
				</ReactToPdf>
				<div className="App" style={{width: 1240, height: 1754}} ref={ref}>
					{tags}
				</div>
	    	</div>
		);
	}
}