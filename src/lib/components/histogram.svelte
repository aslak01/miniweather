<script lang="ts">
	import * as d3 from 'd3';
	import type { DataAndTime } from '$lib/types';
	// import { dateToHour } from '$lib/functions';

	export let data: DataAndTime[];

	export let height = 70;
	export let width = 150;
	export let stroke = 4;

	export let margins = {
		inline: 20,
		block: 15
	};

	const first = data[0];
	const last = data[data.length - 1];

	const maxY = Math.max(...data.map((d) => d.value));
	const minY = Math.min(...data.map((d) => d.value));

	const xAccessor = (d: DataAndTime) => new Date(d.date);
	const yAccessor = (d: DataAndTime) => d.value;

	const xScale = d3
		.scaleTime()
		.domain([new Date(first.date), new Date(last.date)])
		.range([margins.inline, width - margins.inline]);

	const yScale = d3
		.scaleLinear()
		.domain([minY, maxY])
		.range([height - margins.block, margins.block])
		.nice();

	const scaleData = (d: DataAndTime): [number, number] => [
		xScale(new Date(d.date)),
		yScale(d.value)
	];

	const scaledData = data.map(scaleData);

	const firstCoord = scaledData[0];
	const lastCoord = scaledData[scaledData.length - 1];

	function generateFeltonLine(
		data: DataAndTime[],
		xScale: (arg: Date) => number,
		xAccessor: (arg: DataAndTime) => Date,
		yScale: (arg: number) => number,
		yAccessor: (arg: DataAndTime) => number
	): [number, number][] {
		// this is only correct because of 0-based arrays and # segments = # points - 1
		// const segments = data.length;
		const segmentWidth =
			xScale(xAccessor(data[1])) - xScale(xAccessor(data[0]));
		const connectorWidth = segmentWidth * 0.05; // 5% on each side

		// start with the first point, as it (and the last point) are special cases
		let result = [[xScale(xAccessor(data[0])), yScale(yAccessor(data[0]))]];
		// TODO: Add a bounds check here
		for (let i = 1; i < data.length - 1; i++) {
			result.push([
				xScale(xAccessor(data[i])) - connectorWidth,
				yScale(yAccessor(data[i - 1]))
			]);
			result.push([
				xScale(xAccessor(data[i])) + connectorWidth,
				yScale(yAccessor(data[i]))
			]);
		}
		// Add the final point
		result.push([
			xScale(xAccessor(data[data.length - 1])),
			yScale(yAccessor(data[data.length - 1]))
		]);
		return result as [number, number][];
	}
	const feltonData = generateFeltonLine(
		data,
		xScale,
		xAccessor,
		yScale,
		yAccessor
	);

	// const line = d3.line().curve(d3.curveLinear)(scaledData);
	const line = d3.line().curve(d3.curveLinear)(feltonData);
</script>

<svg
	viewBox={`0 0 ${width} ${height}`}
	{height}
	{width}
	style="--stroke-width: {stroke}"
>
	<text
		class="first"
		x={firstCoord[0] - 5}
		y={firstCoord[1]}
		dominant-baseline="middle">{first.value}</text
	>
	<path d={line} />
	<text
		class="last"
		x={lastCoord[0] + 5}
		y={lastCoord[1]}
		dominant-baseline="middle">{last.value}</text
	>
</svg>

<style>
	svg path {
		fill: none;
		stroke: black;
		stroke-width: var(--stroke-width);
	}
	text.first {
		text-anchor: end;
	}
	text.last {
		text-anchor: start;
	}
</style>
