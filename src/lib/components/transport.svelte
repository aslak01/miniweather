<script lang="ts">
  import Train from "$lib/icons/train.svelte";
  import Bus from "$lib/icons/bus.svelte";
  import type { TransportRelevantInfoWithType } from "$lib/types";
  export let transport: TransportRelevantInfoWithType;
</script>

<div class="train">
  {#if transport.type === "bus"}
    <Bus></Bus>
  {:else if transport.type === "train"}
    <Train></Train>
  {/if}
  <!-- <span>{transport.publicCode}</span> -->
  <strong>{transport.minsFromHour}</strong>
  {#if transport.delay > 0}
    <div class="delay">
      {#if transport.delay > 5}
        <span>!!</span>
      {:else if transport.delay > 10}
        <span>!!!</span>
      {:else if transport.delay > 15}
        <span>!!!!</span>
      {:else if transport.delay > 20}
        <span>!!!!</span>
      {/if}
      <strong>{transport.delay}</strong>
    </div>
  {/if}
</div>

<style>
  .train {
    font-size: 1.8rem;
  }
  .train strong {
    font-weight: 800;
  }
  span,
  .delay {
    font-size: 1.2rem;
  }
  .delay {
    display: inline;
  }
</style>
