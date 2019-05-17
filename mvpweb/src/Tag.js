import React from 'react';
import QRCode from 'qrcode.react';
import { PDFDownloadLink, Text, Page, Document, Canvas, StyleSheet } from '@react-pdf/renderer';

export default class Tag extends React.Component {

	// Create Document Component
	MyDocument() {
		return (
	    	<Page size="A4">
	      		<QRCode value="teste de novo"/>
	    	</Page>
		);
	}

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
				<PDFDownloadLink 
				document={<PDFTag/>}
				fileName="somename.pdf"
				>
				    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
				</PDFDownloadLink>
			</div>
		);
	} 
}

export class PDFTag extends React.Component {
	canvasStyle = StyleSheet.create({
		width: 400,
		height: 400
	});

	qrcode = () => {
		return (
			<QRCode 
				value="teste de novo"
				renderAs="canvas"
			/>
		);
	}

	render() {
		return (
	    	<Document>
	   	    	<Page size="A4">
	   	      		<Text>
	   	      			Testando essa doideira
	   	      		</Text>
	   	      		<Canvas
	   	      		style={this.canvasStyle}
	   	      		paint={(this.qrcode(), 200, 200)}
	   	      		/>
	   		    </Page>
	   		</Document>
		);
	}
}