<script lang="ts">
  import * as d3 from "d3";
  import type { DataAndTime } from "$lib/types";

  export let data: DataAndTime[];
  export let height = 150;
  export let width = 130;
  export let stroke = 4;

  export let margins = {
    inline: 40,
    block: 15,
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
    yScale(d.value),
  ];

  const scaledData = data.map(scaleData);

  const firstCoord = scaledData[0];
  const lastCoord = scaledData[scaledData.length - 1];

  const midnight = new Date().setHours(0, 0, 0);
  const midnightX = xScale(midnight);

  const noon = new Date().setHours(12, 0, 0);
  const noonX = xScale(noon);

  const line = d3.line().curve(d3.curveCardinal)(scaledData);

  let initialLegend: SVGTextElement;
  $: boxSize = initialLegend && initialLegend.getBBox();
  $: console.log(boxSize);

  let finalLegend: SVGTextElement;
  $: lastLegendSize = finalLegend && finalLegend.getBBox();
</script>

<svg
  viewBox={`0 0 ${width} ${height}`}
  {height}
  {width}
  style="--stroke-width: {stroke}"
>
  <!-- <defs> -->
  <!--   <filter x="0" y="0" width="1" height="1" id="bg-solid"> -->
  <!--     <feFlood flood-color="white" result="bg" /> -->
  <!--     <feMerge> -->
  <!--       <feMergeNode in="bg" /> -->
  <!--       <feMergeNode in="SourceGraphic" /> -->
  <!--     </feMerge> -->
  <!--   </filter> -->
  <!-- </defs> -->

  <!-- filter="url(#bg-solid)" -->

  <path d={line} />

  <line
    x1={margins.inline}
    x2={width - margins.inline}
    y1={yScale(0)}
    y2={yScale(0)}
    stroke="black"
  />

  {#each [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30] as n}
    <text
      class="first"
      x={margins.inline - 5}
      y={yScale(n)}
      dominant-baseline="middle">{n}°</text
    >
    <line
      x1={margins.inline}
      x2={width - margins.inline}
      y1={yScale(n)}
      y2={yScale(n)}
      stroke="black"
    />
  {/each}

  <!-- noon line  -->
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

  {#if finalLegend}
    <circle
      cy={lastLegendSize.y + lastLegendSize.height / 2}
      cx={lastLegendSize.x + lastLegendSize.width / 2}
      r={Math.max(lastLegendSize.width, lastLegendSize.height) / 2 + 4}
      fill="black"
    ></circle>
  {/if}

  <text
    class="legend"
    style="font-size: 2rem; font-weight: bold;"
    x={lastCoord[0] + 40}
    y={lastCoord[1]}
    bind:this={finalLegend}
    dominant-baseline="middle">{Math.round(last.value)}</text
  >

  {#if initialLegend}
    <circle
      cy={boxSize.y + boxSize.height / 2}
      cx={boxSize.x + boxSize.width / 2}
      r={Math.max(boxSize.width, boxSize.height) / 2 + 4}
      fill="black"
    ></circle>
  {/if}

  <text
    class="legend"
    style="font-size: 2rem; font-weight: bold;"
    x={firstCoord[0] - 10}
    y={firstCoord[1]}
    bind:this={initialLegend}
    dominant-baseline="middle">{Math.round(first.value)}</text
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
  text.legend {
    text-anchor: end;
    fill: white;
    position: relative;
    z-index: 10000;
  }
  /* text.last { */
  /* 	text-anchor: start; */
  /* } */
</style>
