import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";
import _ from 'lodash';
import './Tag.css';

export class Tag extends React.Component {
	render() {
		return (
			<div className="Tag" style={{width: 250}}>
					<div className="QRCODE">
						<div className="TagRow">
							<QRCode value={JSON.stringify(this.props)} size={100}/>
						</div>
						<div className="TagRow">
							<label>{this.props.product.key}</label>
						</div>
					</div>
					<div className="TagInfo">
						<div className="TagRow">
							<label>{this.props.product.brand}</label>
						</div>
						<div className="TagRow">
							<label>{this.props.product.description}</label>
						</div>
						<div className="TagRow">
							<label>R$ {this.props.product.price}</label>
						</div>
						<div className="TagRow">
							<label>Tamanho: {this.props.product.size}</label>
						</div>
					</div>
			</div>
		);
	} 
}

export default class PrintableTagList extends React.Component {

	getTagForInstance = (instance, index) => {
		if(instance) {
			return (
				<div className="half">
					<Tag key={instance.key + index + '1'} product={instance} />
				</div>
			);
		}
	}

	render() {
		const ref = React.createRef();
		const options = {
		    orientation: "portrait",
		    unit: "px",
		    format: [595, 842]
		};

		var instances = [];
		var pairs = [];
		pairs.push([])
		var pairIndex = 0;
		var tags = [];

		_.map(this.props.product.stock, (amount, size) => {
			var productInstance = _.omit(this.props.product, 'stock');
			productInstance.size = size;

			for (var i = amount - 1; i >= 0; i--) {
				instances.push(productInstance);
			}
		});

		// tags = _.map(tags, (product, index) => {
		// 	if(!(index % 2)) {
		// 		console.log('multiplo de 2');
		// 	}
		// 	return <Tag key={product.key + index} product={product} />
		// });

		_.map(instances, (instance, index) => {
			pairs[pairIndex].push(instance);
			if(index % 2) {
				pairIndex = pairIndex + 1;
				pairs.push([]);
			}
		});

		tags = _.map(pairs, (pair, index) => {
			const first = pair[0];
			const second = pair[1];
			return (
				<div className="row">
					<div className="half">
						{this.getTagForInstance(first, index)}
					</div>
					<div className="half">
						{this.getTagForInstance(second, index)}
					</div>
				</div>
			);
		})

		return (
			<div>
				<ReactToPdf targetRef={ref} filename="etiquetas.pdf" options={options} x={0} y={10}>
				    {({toPdf}) => (
				        <button onClick={toPdf}>Imprimir Etiquetas!</button>
				    )}
				</ReactToPdf>
				<div className="Page" style={{width: 595, height: 842}} ref={ref}>
					{tags}
				</div>
	    	</div>
		);
	}
}