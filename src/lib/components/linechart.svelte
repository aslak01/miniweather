<script lang="ts">
  import * as d3 from "d3";
  import type { DataAndTime } from "$lib/types";
  import { clamp, selectEvenIndicesWithIndex } from "$lib/functions";

  export let data: DataAndTime[];
  export let height = 150;
  export let width = 130;
  export let stroke = 4;

  export let margins = {
    inline: 60,
    block: 35,
  };

  const first = data[0];
  const last = data[data.length - 1];

  const maxY = Math.max(...data.map((d) => d.value));
  const minY = Math.min(...data.map((d) => d.value));

  function minRange4(min: number, max: number) {
    let newMin = min;
    let newMax = max;

    if (max - min < 3) {
      newMin -= 2;
      newMax += 2;
    }

    return [newMin, newMax];
  }
  const yDomain = minRange4(minY, maxY);

  const xScale = d3
    .scaleTime()
    .domain([new Date(first.date), new Date(last.date).getTime()])
    .range([margins.inline, width - margins.inline]);

  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .nice()
    .range([height - margins.block, margins.block]);

  const scaleData = (d: DataAndTime): [number, number] => [
    xScale(new Date(d.date)),
    yScale(d.value),
  ];

  const scaledData = data.map(scaleData);
  // console.log(scaledData);

  const firstCoord = scaledData[0];
  const lastCoord = scaledData[scaledData.length - 1];

  const midnight = new Date().setHours(23, 59, 59, 59);
  const midnightX = xScale(midnight);

  // console.log(new Date(midnight).toLocaleTimeString(), midnightX);

  const noon = new Date().setHours(12, 0, 0, 0);
  const noonX = xScale(noon);

  // console.log(new Date(noon).toLocaleTimeString(), noonX);

  const line = d3.line().curve(d3.curveCardinal)(scaledData);

  let initialLegend: SVGTextElement;
  $: boxSize = initialLegend && initialLegend.getBBox();

  let finalLegend: SVGTextElement;
  $: lastLegendSize = finalLegend && finalLegend.getBBox();
  // console.log(data.map((d) => new Date(d.date).toLocaleTimeString()));

  const icondata = selectEvenIndicesWithIndex(data);
</script>

<svg
  viewBox={`0 0 ${width} ${height}`}
  {height}
  {width}
  style="--stroke-width: {stroke}"
>
  <path d={line} />

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
    id="midnightLine"
  />

  {#if finalLegend}
    <circle
      class:negative={last.value < 0}
      cy={lastLegendSize.y + lastLegendSize.height / 2}
      cx={lastLegendSize.x + lastLegendSize.width / 2}
      r={Math.max(lastLegendSize.width, lastLegendSize.height) / 2 + 4}
    ></circle>
  {/if}

  <text
    class="legend"
    class:negative={last.value < 0}
    style="font-size: 2rem; font-weight: bold;"
    x={lastCoord[0] + 50}
    y={clamp(lastCoord[1], 30, height - margins.block)}
    bind:this={finalLegend}
    dominant-baseline="middle">{Math.round(last.value)}</text
  >

  {#if initialLegend}
    <circle
      class:negative={first.value < 0}
      cy={boxSize.y + boxSize.height / 2}
      cx={boxSize.x + boxSize.width / 2}
      r={Math.max(boxSize.width, boxSize.height) / 2 + 4}
    ></circle>
  {/if}

  <text
    class="legend"
    class:negative={first.value < 0}
    style="font-size: 2rem; font-weight: bold;"
    x={firstCoord[0] - 25}
    y={clamp(firstCoord[1], 30, height - margins.block - 30)}
    bind:this={initialLegend}
    dominant-baseline="middle">{Math.round(first.value)}</text
  >
  {#each icondata as h}
    {@const height = 40}
    {@const width = 40}
    {@const x = scaledData[h.index][0] - width / 2}
    {@const y = scaledData[h.index][1] - height / 2}
    {@const href = `wicons/${h.icon}.svg`}
    {@const r = height / 2}
    <circle class="background" cy={y + r} cx={x + r} {r} />
    <image {x} {y} {height} {width} {href} />
  {/each}
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
  text.legend.negative {
    fill: black;
  }
  circle {
    fill: black;
  }
  circle.negative {
    fill: white;
    stroke: black;
    stroke-width: 4px;
  }
  circle.background {
    fill: white;
  }
</style>
