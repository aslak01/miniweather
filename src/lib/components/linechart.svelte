<script lang="ts">
	import * as d3 from 'd3';
	import type { DataAndTime } from '$lib/types';

	export let data: DataAndTime[];

	export let height = 100;
	export let width = 100;

	const first = data[0];
	const last = data[data.length - 1];

	const maxY = Math.max(...data.map((d) => d.value));
	const minY = Math.min(...data.map((d) => d.value));
	console.log(data);

	const xScale = d3
		.scaleTime()
		.domain([new Date(first.date), new Date(last.date).getTime()])
		.range([0, width]);

	const yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0]).nice();

	const scaleData = (d: DataAndTime): [number, number] => [
		xScale(new Date(d.date)),
		yScale(d.value)
	];

	const scaledData = data.map(scaleData);

	const line = d3.line().curve(d3.curveCardinal)(scaledData);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {height} {width}>
	<d {line} />
</svg>

<style>
	svg d {
		stroke: black;
		stroke-width: 1px;
	}
</style>
