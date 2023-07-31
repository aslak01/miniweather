<script lang="ts">
  import * as d3 from "d3";
  import type { DataAndTime } from "$lib/types";
  import {
    generateFeltonLine,
    generateClosedFeltonPolygon,
    generatePoissonPoints,
  } from "$lib/functions";

  export let data: DataAndTime[];

  export let height = 150;
  export let width = 130;
  export let stroke = 3;

  export let margins = {
    inline: 35,
    block: 15,
  };

  const first = data[0];
  const last = data[data.length - 1];

  const minOne = (n: number) => (n > 1 ? n : 1.1);
  const maxY = minOne(Math.max(...data.map((d) => d.value)));
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

  // const scaleData = (d: DataAndTime): [number, number] => [
  // 	xScale(new Date(d.date)),
  // 	yScale(d.value)
  // ];

  // const scaledData = data.map(scaleData);

  // const firstCoord = scaledData[0];
  // const lastCoord = scaledData[scaledData.length - 1];

  const midnight = new Date().setHours(0, 0, 0);
  const midnightX = xScale(midnight);

  const noon = new Date().setHours(12, 0, 0);
  const noonX = xScale(noon);

  const feltonData = generateFeltonLine(
    data,
    xScale,
    xAccessor,
    yScale,
    yAccessor,
  );

  const points = generatePoissonPoints(width, height - margins.block / 4, 12);
  const closedPoly = generateClosedFeltonPolygon(
    data,
    xScale,
    xAccessor,
    yScale,
    yAccessor,
  );

  // const line = d3.line().curve(d3.curveLinear)(scaledData);
  const line = d3.line().curve(d3.curveLinear)(feltonData);
  // const line = d3.line().curve(d3.curveLinear)(closedPoly);
</script>

<svg
  viewBox={`0 0 ${width} ${height}`}
  {height}
  {width}
  style="--stroke-width: {stroke}"
>
  <!-- <defs> -->
  <!-- 	<filter x="0" y="0" width="1" height="1" id="bg-solid"> -->
  <!-- 		<feFlood flood-color="white" result="bg" /> -->
  <!-- 		<feMerge> -->
  <!-- 			<feMergeNode in="bg" /> -->
  <!-- 			<feMergeNode in="SourceGraphic" /> -->
  <!-- 		</feMerge> -->
  <!-- 	</filter> -->
  <!-- </defs> -->
  <!-- The following technique is from: -->
  <!-- https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/ -->
  <!-- <filter id="outline"> -->
  <!-- 	<feMorphology -->
  <!-- 		in="SourceAlpha" -->
  <!-- 		result="DILATED" -->
  <!-- 		operator="dilate" -->
  <!-- 		radius="5" -->
  <!-- 	/> -->
  <!-- 	<feFlood -->
  <!-- 		flood-color="rgba(255, 255, 255, 1)" -->
  <!-- 		flood-opacity="1" -->
  <!-- 		result="BACKGROUND" -->
  <!-- 	/> -->
  <!-- 	<feComposite in="BACKGROUND" in2="DILATED" operator="in" result="OUTLINE" /> -->
  <!---->
  <!-- 	<feMerge> -->
  <!-- 		<feMergeNode in="OUTLINE" /> -->
  <!-- 		<feMergeNode in="SourceGraphic" /> -->
  <!-- 	</feMerge> -->
  <!-- </filter> -->

  <line
    x1={noonX}
    x2={noonX + 1}
    y1={margins.block}
    y2={height - margins.block}
    stroke="black"
  />

  <!-- midnight line  -->
  <line
    x1={midnightX}
    x2={midnightX + 1}
    y1={margins.block}
    y2={height - margins.block}
    stroke="black"
  />
  {#each points as point}
    {#if d3.polygonContains(closedPoly, [point[0], point[1]])}
      <circle class="stipple" cx={point[0]} cy={point[1]} r={2.5} />
    {/if}
  {/each}

  <!-- <text -->
  <!-- 	class="first" -->
  <!-- 	filter="url(#bg-solid)" -->
  <!-- 	x={firstCoord[0] - 5} -->
  <!-- 	y={firstCoord[1]} -->
  <!-- 	dominant-baseline="middle">{first.value}</text -->
  <!-- > -->
  <path d={line} />
  {#each [0, 5, 10, 15, 20, 25, 30] as n}
    <text
      class="last"
      x={width - margins.inline + 5}
      y={yScale(n)}
      alignment-baseline="middle"
      >{n}
    </text>
    <line
      x1={margins.inline}
      x2={width - margins.inline}
      y1={yScale(n)}
      y2={yScale(n)}
      stroke="black"
    />
  {/each}
  <!-- noon line  -->
  <!-- <text -->
  <!-- 	class="last" -->
  <!-- 	filter="url(#bg-solid)" -->
  <!-- 	x={lastCoord[0] + 5} -->
  <!-- 	y={lastCoord[1]} -->
  <!-- 	dominant-baseline="middle">{last.value}</text -->
  <!-- > -->
</svg>

<style>
  svg path {
    fill: none;
    stroke-width: var(--stroke-width);
  }
  svg path,
  svg line {
    stroke: #888;
  }
  svg text {
    fill: black;
  }
  svg circle {
    fill: #888;
  }
  /* text.first { */
  /* 	text-anchor: end; */
  /* } */
  text.last {
    text-anchor: start;
  }
  .stipple {
    stroke-width: 0px;
  }
</style>
