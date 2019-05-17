import React from 'react';
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";

export default class Tag extends React.Component {

	componentDidMount() {
		this.savePDF();
	}

	savePDF() {
		const input = document.getElementById("capture");
		console.log(input);
	}

	render() {
		return (
			<div id="capture" style={{padding: 10, background: "#f5da55"}}>
				<label>OLHA A ETIQUETAA</label>
				<br/>
				<QRCode value="teste de novo"/>
				<PDFTag/>
			</div>
		);
	} 
}

export class PDFTag extends React.Component {

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