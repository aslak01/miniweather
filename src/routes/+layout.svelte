<script lang="ts">
  import "@fontsource/inter";
  import "@fontsource/inter/800.css";
  import "../app.css";
  import { dev } from "$app/environment";
</script>

<main>
  {#if dev}
    <div class="square">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</main>

<style>
  main {
    position: relative;
    max-width: 480px;
    max-height: 280px;
  }
  .square {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid red;
    width: 480px;
    height: 280px;
  }
</style>
