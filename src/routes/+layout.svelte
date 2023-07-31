<script lang="ts">
  import "@fontsource/inter";
  import "@fontsource/inter/800.css";
  import "../app.css";
</script>

<main>
  <slot />
</main>

<style>
  main {
    max-width: 480px;
    max-height: 280px;
  }
</style>
