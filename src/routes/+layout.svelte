<script lang="ts">
  import "@fontsource/inter";
  import "@fontsource/inter/800.css";
  import "../app.css";
  import { dev } from "$app/environment";
</script>

<main>
  {#if dev}
    <div class="centerer">
      <div class="square size-constrainer">
        <slot />
      </div>
    </div>
  {:else}
    <div class="size-constrainer">
      <slot />
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    align-items: start;
    height: 100%;
    min-height: 100dvh;
  }
  .size-constrainer {
    width: 480px;
    height: 280px;
  }
  .square {
    border: 2px solid red;
  }
  .centerer {
    display: grid;
    align-self: center;
    justify-self: center;
    margin-inline: auto;
  }
</style>
