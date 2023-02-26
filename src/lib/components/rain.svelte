<script lang="ts">
	import type { DataAndTime } from '$lib/types';
	import { dateToHour } from '$lib/functions';
	export let rain: DataAndTime;
</script>

<div>{dateToHour(rain.date)}: {rain.value}</div>

<style>
	div {
		margin-right: 1rem;
	}
</style>
