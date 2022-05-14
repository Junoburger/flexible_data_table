import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<{
		styles: JSX.Element | any;
		html: string | any;
		head?: JSX.Element[];
	}> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = (await Document.getInitialProps(ctx)) as DocumentInitialProps;

			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{sheet.getStyleElement()}
						<link
							rel="stylesheet"
							href="https://use.typekit.net/poh0rcg.css"
							// ETHNO
							// font-family: ethnocentric, sans-serif;
							// BDR
							// font-family: bdr-mono, sans-serif;
							// BITCOUNT
							// font-family: bitcount-mono-single-circle, sans-serif;
							// font-family: bitcount-mono-single-line-sq, sans-serif;
							// font-family: bitcount-mono-single-plus, sans-serif;
							// font-family: bitcount-mono-single-square, sans-serif;
							// TRANSDUCER
							// font-family: transducer-condensed, sans-serif;
							// font-family: transducer-extended, sans-serif;
							// font-family: transducer, sans-serif;
							// Mono45 Headline
							// font-family: mono45-headline, monospace;
						/>
					</React.Fragment>
				),
				head: [<></>],
			};
		} finally {
			// catch (err) {
			//     console.error(err, "Error when setting initial props")
			// }
			sheet.seal();
		}
	}
}
