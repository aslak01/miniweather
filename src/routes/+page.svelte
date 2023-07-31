<script lang="ts">
  import type { PageData } from "./$types";
  import { weathericons } from "$lib/weathericons";
  import Linechart from "$lib/components/linechart.svelte";
  import Histogram from "$lib/components/histogram.svelte";
  import Train from "$lib/components/train.svelte";

  export let data: PageData;

  let loaded = false;

  const height = 220;
  const width = 480;
  const margins = {
    inline: 55,
    block: 20,
  };

  // const { iconkey, rain, temps, instant } = data.weather;
  const { rain, temps, iconkey } = data.weather;
  const icon = weathericons[iconkey];
  const northbound = data.splitTrains.northbound;

  loaded = true;
</script>

{#if loaded}
  <div class="weather">
    <!-- <article class="main"> -->
    <!--   <h1>{Math.round(instant.air_temperature)}°</h1> -->
    <div class="main-icon">
      <svelte:component this={icon} />
    </div>
    <!-- </article> -->
    <div class="change">
      <div class="rain" style="--width: {width + 'px'}">
        <div class="line">
          <Histogram data={rain} {height} {width} {margins} />
        </div>
      </div>
      <div class="temps" style="--width: {width + 'px'}">
        <div class="line">
          <Linechart data={temps} {height} {width} {margins} />
        </div>
      </div>
    </div>
  </div>
  <div class="trains">
    {#each northbound as train}
      <Train {train} />
    {/each}
  </div>
{/if}

<style>
  .change {
    display: grid;
    grid: 100% 100%;
  }
  .change > div {
    grid-area: 1 / 1;
  }
  .weather {
    display: grid;
    gap: 1rem;
    grid-template-columns: 100px auto;
    width: 100%;
    max-width: 480px;
    max-height: 280px;
    overflow: hidden;
    position: relative;
    /* align-content: center; */
  }
  /* .main { */
  /*   text-align: center; */
  /*   padding-left: 0.5rem; */
  /* } */
  /* .main h1 { */
  /*   font-size: 3rem; */
  /*   margin-bottom: 0; */
  /* } */
  .rain,
  .temps {
    display: grid;
    grid-template-columns: var(--width) auto;
  }
  .main-icon {
    display: grid;
    align-content: center;
    position: absolute;
    top: 0;
    right: 50%;
    transform: translateX(50%);
    z-index: 20000;
    height: 70px;
    width: 70px;
    background: white;
    border: 1px solid black;
    border-radius: 50%;
    /* padding: 2px; */
  }
  .trains {
    background: black;
    color: white;
    /* padding-inline: 0.5rem; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 56px;
  }
</style>
