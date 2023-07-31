<script lang="ts">
  import type { DataAndTime } from "$lib/types";
  import { dateToHour } from "$lib/functions";
  export let temp: DataAndTime;
</script>

<div>{dateToHour(temp.date)}: {temp.value}</div>

<style>
  div {
    margin-right: 1rem;
  }
</style>
