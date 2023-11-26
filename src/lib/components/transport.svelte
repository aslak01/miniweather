<script lang="ts">
  import type { TransportRelevantInfo } from "$lib/types";
  export let transport: TransportRelevantInfo;
</script>

<div class="train">
  <span>{transport.publicCode}</span>
  <strong>{transport.minsFromHour}</strong>
  {#if transport.delay > 0}
    <div class="delay">
      <span>!!</span><strong>{transport.delay}</strong>
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
