import React from 'react';
import QRCode from 'qrcode.react'

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
			</div>
		);
	} 
}