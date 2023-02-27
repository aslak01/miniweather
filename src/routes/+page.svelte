<script lang="ts">
	import { onMount } from 'svelte';
	import { weathericons } from '$lib/weathericons';
	import type { WeathericonKey } from '$lib/weathericons';
	import type { DataAndTime } from '$lib/types';
	import type { PageData } from './$types';
	// import Rain from '$lib/components/rain.svelte';
	// import Temp from '$lib/components/temp.svelte';
	import Linechart from '$lib/components/linechart.svelte';
	import Histogram from '$lib/components/histogram.svelte';
	import Raindrop from '$lib/icons/raindrop.svelte';
	import Thermometer from '$lib/icons/thermometer.svelte';

	export let data: PageData;

	let loaded = false;
	let icon: ConstructorOfATypedSvelteComponent | null = null;
	let iconkey: null | WeathericonKey = null;
	let rain: null | DataAndTime[] = null;
	let temps: null | DataAndTime[] = null;

	onMount(async () => {
		if (
			typeof data !== 'undefined' &&
			typeof data.iconkey !== 'undefined' &&
			typeof data.rain !== 'undefined' &&
			typeof data.temps !== 'undefined'
		) {
			iconkey = data.iconkey;
			rain = data.rain;
			temps = data.temps;
			icon = weathericons[iconkey];

			loaded = true;
		}
	});
</script>

<div class="weather">
	{#if loaded}
		{#if icon}
			<div class="icon">
				<svelte:component this={icon} />
			</div>
		{/if}
		<div class="change">
			{#if temps}
				<div class="temps">
					<div class="icon">
						<Thermometer />
					</div>
					<div class="line">
						<Linechart data={temps} />
					</div>
					<!-- {#each temps as temp} -->
					<!-- 	<Temp {temp} /> -->
					<!-- {/each} -->
				</div>
			{/if}
			{#if rain}
				<div class="rain">
					<div class="icon">
						<Raindrop />
					</div>

					<div class="line">
						<Histogram data={rain} />
					</div>
					<!-- {#each rain as r} -->
					<!-- 	<Rain rain={r} /> -->
					<!-- {/each} -->
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.rain,
	.temps {
		display: flex;
	}
	/* .icon { */
	/* } */
	.line {
		width: 800px;
		height: 100px;
	}
	.weather {
		display: grid;
		grid-template-columns: 20% 80%;
		align-content: center;
	}
</style>
