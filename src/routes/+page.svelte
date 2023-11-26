<script lang="ts">
  import type { PageData } from "./$types";
  import Linechart from "$lib/components/linechart.svelte";
  import Histogram from "$lib/components/histogram.svelte";
  import Train from "$lib/components/train.svelte";

  export let data: PageData;

  let loaded = false;

  const height = 220;
  const width = 480;
  const margins = {
    inline: 75,
    block: 20,
  };

  const { rain, temps } = data.weather;

  const northbound = [];

  loaded = true;
</script>

{#if loaded}
  <div class="weather">
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
    {#if northbound && northbound.length}
      {#each northbound as train}
        <Train {train} />
      {/each}
    {/if}
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
    position: relative;
    grid-template-columns: 100px auto;
    gap: 1rem;
    width: 100%;
    max-width: 480px;
    max-height: 280px;
    overflow: hidden;
  }
  .rain,
  .temps {
    display: grid;
    grid-template-columns: var(--width) auto;
  }

  .trains {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: black;
    width: 100%;
    height: 56px;
    color: white;
  }
</style>
