<script lang="ts">
	import * as d3 from 'd3';
	import type { DataAndTime } from '$lib/types';
	import { dateToHour } from '$lib/functions';

	export let data: DataAndTime[];

	export let height = 100;
	export let width = 300;

	export let margins = {
		inline: 50,
		block: 15
	};

	const first = data[0];
	const last = data[data.length - 1];

	const maxY = Math.max(...data.map((d) => d.value));
	const minY = Math.min(...data.map((d) => d.value));

	const xAccessor = (d) => new Date(d.date);
	const yAccessor = (d) => d.value;

	const xScale = d3
		.scaleTime()
		.domain([new Date(first.date), new Date(last.date)])
		.range([margins.inline, width - margins.inline * 2]);

	const yScale = d3
		.scaleLinear()
		.domain([minY, maxY])
		.range([height - margins.block * 2, margins.block])
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
		const segmentWidth = xScale(xAccessor(data[1])) - xScale(xAccessor(data[0]));
		const connectorWidth = segmentWidth * 0.05; // 5% on each side

		// start with the first point, as it (and the last point) are special cases
		let result = [[xScale(xAccessor(data[0])), yScale(yAccessor(data[0]))]];
		// TODO: Add a bounds check here
		for (let i = 1; i < data.length - 1; i++) {
			result.push([xScale(xAccessor(data[i])) - connectorWidth, yScale(yAccessor(data[i - 1]))]);
			result.push([xScale(xAccessor(data[i])) + connectorWidth, yScale(yAccessor(data[i]))]);
		}
		// Add the final point
		result.push([
			xScale(xAccessor(data[data.length - 1])),
			yScale(yAccessor(data[data.length - 1]))
		]);
		return result;
	}
	const feltonData = generateFeltonLine(data, xScale, xAccessor, yScale, yAccessor);
	console.log(data);
	console.log(feltonData);

	// const line = d3.line().curve(d3.curveLinear)(scaledData);
	const line = d3.line().curve(d3.curveLinear)(feltonData);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {height} {width}>
	<text class="first" x={firstCoord[0]} y={firstCoord[1]} dominant-baseline="middle"
		>{dateToHour(first.date) + ' ' + first.value}</text
	>
	<path d={line} />
	<text class="last" x={lastCoord[0]} y={lastCoord[1]} dominant-baseline="middle"
		>{dateToHour(last.date) + ' ' + last.value}</text
	>
</svg>

<style>
	svg path {
		fill: none;
		stroke: black;
		stroke-width: 1px;
	}
	text.first {
		text-anchor: end;
	}
	text.last {
		text-anchor: start;
	}
</style>