import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Home: NextPage = () => {
	const metaprops = new Array(20).fill("metaprop");
	const random = useRef(Math.random);
	const assets = new Array(20).fill({ asset: `asset${random.current().toFixed(2)}` });

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
			<Table ref={table}>
				<THead>
					<TRow>
						<THeader scope="col">Title</THeader>
						{metaprops.map((heading, i) => {
							return <THeader key={i} scope="col">{`${heading} ${i}`}</THeader>;
						})}
					</TRow>
				</THead>
				<TBody>
					{assets.map((asset, index) => {
						return (
							<React.Fragment key={index}>
								<TRow>
									<THeader scope="row" className="long">
										<input type="checkbox" id={`select-asset${index}`} />
										<label htmlFor={`select-asset${index}`}>
											Title: {asset.asset}
										</label>
										<span>{index}</span>
									</THeader>
									{metaprops.map((heading, i) => (
										<TDataCell key={i}>{`${heading} ${i}`}</TDataCell>
									))}
								</TRow>
								<Divider />
							</React.Fragment>
						);
					})}
				</TBody>
			</Table>
		</div>
	);
};

export default Home;

const Table = styled.table`
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-areas: "head" "body";
	font-size: 120%;
	white-space: nowrap;
	overflow: auto;
	scroll-snap-type: x mandatory;
	/* overview */
	width: 85vw;
	height: 85vh;
	margin: 50px;

	/* scroll bar width, for use in mask calculations */
	--scrollbar-width: 8px;

	/* mask fade distance, for use in mask calculations */
	--mask-height: 32px;

	/* The CSS mask */
	/* The content mask is a linear gradient from top to bottom */
	--mask-image-content: linear-gradient(
		to right,
		rgb(0, 0, 0) var(--mask-height),
		rgb(0, 0, 0) var(--mask-height),
		rgb(0, 0, 0) calc(100% - var(--mask-height)),
		transparent
	);

	/* Here we scale the content gradient to the width of the container 
minus the scrollbar width. The height is the full container height */
	--mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

	/* The width of our black pixel is the width of the scrollbar.
The height is the full container height */
	--mask-size-scrollbar: var(--scrollbar-width) 100%;

	/* Apply the mask image and mask size variables */
	mask-image: var(--mask-image-content);

	mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

	/* Position the content gradient in the top left, and the 
scroll gradient in the top right */
	mask-position: 0 0, 100% 0;

	/* We don't repeat our mask images */
	mask-repeat: no-repeat, no-repeat;
`;

const THead = styled.thead`
	display: grid;
	grid-template-columns: subgrid;
	grid-template-rows: subgrid;
	position: sticky;
	top: 0;
	grid-area: head;
	z-index: 4;
	background-color: white;
	tr {
		--title-input-width: 220px;

		display: grid;
		grid-template-columns: minmax(var(--title-input-width), auto) repeat(
				20,
				minmax(200px, auto)
			);
		grid-template-rows: minmax(80px, auto);
		text-align: center;
	}
	th:first-child {
		/* position: sticky; */
		left: 0;
		background: white;
		z-index: 4;
		letter-spacing: 5px;
		text-align: left;
	}
`;

const TBody = styled.tbody`
	display: grid;
	grid-template-columns: subgrid;
	grid-area: body;
	grid-row-gap: 8px;
	tr {
		--title-input-width: 220px;

		display: grid;
		grid-template-columns: minmax(var(--title-input-width), auto) repeat(
				20,
				minmax(200px, auto)
			);
		grid-template-rows: minmax(80px, auto);
		/* grid-template-rows: subgrid; */
		text-align: center;
	}

	th:first-child {
		left: 0;
		background: rgb(48, 127, 183);
		z-index: 1;
		letter-spacing: 5px;
		text-align: left;
	}
`;

const TRow = styled.tr`
	grid-column-gap: 8px;
`;

const THeader = styled.th`
	position: sticky;
	top: 0;
	z-index: 2;

	padding: 0.5rem 1rem;
	scroll-snap-align: start;
`;

const TDataCell = styled.td`
	padding: 0.5rem 1rem;
	scroll-snap-align: start;
`;

const Divider = styled.tr`
	height: 0.5px;
	box-shadow: 0px -2px 4px 0px rgb(0, 0, 0);

	z-index: 2;
`;
