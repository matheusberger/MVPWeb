import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";

export default class Tag extends React.Component {
	render() {
		return (
			<div>
				<label>{this.props.product.brand}</label>
				<br/>
				<label>{this.props.product.description}</label>
				<br/>
				<QRCode value={JSON.stringify(this.props)}/>
				<br/>
				<label>{this.props.product.price}</label>
				<pre>  </pre>
				<label>{this.props.product.size}</label>
			</div>
		);
	} 
}

export class Printable extends React.Component {

	qrcode = () => {
		return(
			<QRCode value="teste de novo" renderAs="svg"/>
		);
	}

	render() {
		const ref = React.createRef();
		const options = {
		    orientation: "portrait",
		    unit: "px",
		    format: "a4"
		};
		return (
			<div>
				<ReactToPdf targetRef={ref} filename="etiquetas.pdf" options={options} x={-110}>
				    {({toPdf}) => (
				        <button onClick={toPdf}>Generate pdf</button>
				    )}
				</ReactToPdf>
				<div style={{width: 595, height: 842}} ref={ref}>
					<label> MMM0MMM </label>
					<br/>
					{this.qrcode()}
				</div>

	    	</div>
		);
	}
}