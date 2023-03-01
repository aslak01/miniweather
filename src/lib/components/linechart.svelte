<script lang="ts">
	import * as d3 from 'd3';
	import type { DataAndTime } from '$lib/types';
	import { dateToHour } from '$lib/functions';

	export let data: DataAndTime[];

	export let height = 70;
	export let width = 200;

	export let margins = {
		inline: 50,
		block: 15
	};

	const first = data[0];
	const last = data[data.length - 1];

	const maxY = Math.max(...data.map((d) => d.value));
	const minY = Math.min(...data.map((d) => d.value));
	console.log(data);

	const xScale = d3
		.scaleTime()
		.domain([new Date(first.date), new Date(last.date).getTime()])
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

	const line = d3.line().curve(d3.curveCardinal)(scaledData);
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
		stroke-width: 2px;
	}
	text.first {
		text-anchor: end;
	}
	text.last {
		text-anchor: start;
	}
</style>
