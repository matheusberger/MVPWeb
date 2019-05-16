import React from 'react';
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

export default class Tag extends React.Component {

	componentDidMount() {
		this.savePDF();
	}

	savePDF() {
		const input = document.querySelector("#capture");
		html2canvas(input).then(canvas => {
			const imgData = canvas.toDataURL('image/png');

			const pdf = new jsPDF();
			pdf.addImage(imgData, 'PNG', 0, 0);
			pdf.save("download.pdf");
		});
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