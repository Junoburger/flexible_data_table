import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
	const metaprops = new Array(20).fill("metaprop");
	const assets = new Array(20).fill("asset");

	const table = useRef(null) as any;
	// const [resizer, setResizer] = useState<HTMLDivElement>();

	// const mouseMoveHandler

	// const mouseUpHandler

	// const mouseDownHandler = useCallback((e: any, elem: any) => {
	// 	// Get the mouse position

	// 	// Calculate the width of column
	// 	const styles = window.getComputedStyle(elem);
	// 	const width = parseInt(styles.width, 10);
	// 	console.log(e);

	// 	// Attach listeners for document's events
	// 	// document.addEventListener("mousemove", (e) => mouseMoveHandler(e, elem));

	// 	e.target?.classList.add("resizing");
	// }, []);

	useEffect(() => {
		// const thead = document.querySelector(".table-head") as HTMLHtmlElement;
		// const columns = thead.querySelectorAll("th");
		// let _resizer: HTMLDivElement;
		// Array.from(columns).forEach((col) => {
		// 	_resizer = document.createElement("div");
		// 	_resizer.classList.add("resizer");
		// 	_resizer.style.height = `${table.current.offsetHeight}px`;
		// 	// Add a resizer element to the column
		// 	col.appendChild(_resizer);
		// 	createResizer(_resizer, col);
		// });
		// function createResizer(rez: any, col: any) {
		// 	rez.addEventListener("mousedown", (e: any) => mouseDownHandler(e, col));
		// }
		// return () => _resizer.removeEventListener("mousedown", mouseDownHandler);
	}, []);

	return (
		<div className="wrapper">
			<table className="masked-table" ref={table}>
				<thead className="table-head">
					<tr className="snappy-row">
						<th>Title</th>
						{metaprops.map((heading, i) => {
							return <th key={i}>{`${heading} ${i}`}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{assets.map((asset, index) => {
						return (
							<React.Fragment key={index}>
								<tr className="snappy-row">
									<th>
										<input type="checkbox" /> Title: {asset}
										{index}
									</th>
									{metaprops.map((heading, i) => (
										<td key={i}>{`${heading} ${i}`}</td>
									))}
								</tr>
								<tr className="divider" />
							</React.Fragment>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
