import React from 'react';
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'

export default class Tag extends React.Component {

	savePDF() {
		html2canvas(document.querySelector("#capture")).then(canvas => {
			const imgData = canvas.toDataURL('image/png');
		});
	}

	render() {
		return (
			<div id="capture">
				<label>OLHA A ETIQUETAA</label>
				<br/>
				<QRCode value="teste de novo"/>
			</div>
		);
	} 
}