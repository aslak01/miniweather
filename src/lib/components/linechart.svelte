<script lang="ts">
	import * as d3 from 'd3';
	import type { DataAndTime } from '$lib/types';
	// import { dateToHour } from '$lib/functions';

	export let data: DataAndTime[];
	const hasAboveAndBelow0 = (arr: { value: number }[]) =>
		arr.some((obj) => Math.sign(obj.value) === 1) &&
		arr.some((obj) => Math.sign(obj.value) === -1);
	const crossesNegativeAxis = hasAboveAndBelow0(data);
	export let height = 70;
	export let width = 150;

	export let margins = {
		inline: 30,
		block: 15
	};

	const first = data[0];
	const last = data[data.length - 1];

	const maxY = Math.max(...data.map((d) => d.value));
	const minY = Math.min(...data.map((d) => d.value));

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
	<text
		class="first"
		x={firstCoord[0] - 5}
		y={firstCoord[1]}
		dominant-baseline="middle">{first.value}</text
	>
	<path d={line} />

	{#if crossesNegativeAxis}
		<line
			x1={xScale(new Date(first.date))}
			x2={xScale(new Date(last.date))}
			y1={yScale(0)}
			y2={yScale(0)}
			stroke="black"
		/>
	{/if}
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
		stroke-width: 2px;
	}
	text.first {
		text-anchor: end;
	}
	text.last {
		text-anchor: start;
	}
</style>
