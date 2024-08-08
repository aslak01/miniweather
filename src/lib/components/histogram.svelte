<script lang="ts">
  import * as d3 from "d3";
  import type { DataAndTime } from "$lib/types";
  import {
    generateLowerNumbers,
    generateFeltonLine,
    generateClosedFeltonPolygon,
    generatePoissonPoints,
  } from "$lib/functions";

  export let data: DataAndTime[];

  $: hasRain = data.some((p) => p.value > 0);

  export let height = 150;
  export let width = 130;
  export let stroke = 3;

  export let padding = {
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
    .range([padding.inline, width - padding.inline]);

  const yScale = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([height - padding.block, padding.block])
    .nice();

  const feltonData = generateFeltonLine(
    data,
    xScale,
    xAccessor,
    yScale,
    yAccessor,
  );

  const points = generatePoissonPoints(width, height - padding.block / 4, 12);
  const closedPoly = generateClosedFeltonPolygon(
    data,
    xScale,
    xAccessor,
    yScale,
    yAccessor,
  );

  const max = Math.max(...data.map(yAccessor));

  const ticks = generateLowerNumbers(1)(max);

  // console.log(ticks);
  // console.log(max);

  // const line = d3.line().curve(d3.curveLinear)(scaledData);
  const line = d3.line().curve(d3.curveLinear)(feltonData);
  // const line = d3.line().curve(d3.curveLinear)(closedPoly);
</script>

{#if hasRain}
  <svg
    viewBox={`0 0 ${width} ${height}`}
    {height}
    {width}
    style="--stroke-width: {stroke}"
  >
    {#each points as point}
      {#if d3.polygonContains(closedPoly, [point[0], point[1]])}
        <circle class="stipple" cx={point[0]} cy={point[1]} r={2.5} />
      {/if}
    {/each}

    <path d={line} />
    {#if ticks}
      {#each ticks as n}
        <text
          class="last"
          x={width - padding.inline + 5}
          y={yScale(n)}
          alignment-baseline="middle"
          >{n}
        </text>
        <line
          x1={padding.inline}
          x2={width - padding.inline}
          y1={yScale(n)}
          y2={yScale(n)}
          stroke="black"
          stroke-dasharray="5"
        />
      {/each}
    {/if}
  </svg>
{/if}

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
  text.last {
    text-anchor: start;
  }
  .stipple {
    stroke-width: 0px;
  }
</style>
