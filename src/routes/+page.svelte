<script lang="ts">
	import { onMount } from 'svelte';
	import { weathericons } from '$lib/weathericons';
	import type { WeathericonKey, DataAndTime, Instant } from '$lib/types';
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
	let instant: null | Instant = null;
	let willRain = true;

	const height = 120;

	const width = 250;
	const margins = {
		inline: 30,
		block: 15
	};
	const hasRain = (el: { value: number }) => el.value > 0;

	onMount(async () => {
		// if (
		// typeof data !== 'undefined'
		// &&
		// typeof data.iconkey !== 'undefined' &&
		// typeof data.rain !== 'undefined' &&
		// typeof data.temps !== 'undefined'
		// ) {
		iconkey = data.iconkey;
		rain = data.rain;
		temps = data.temps;
		instant = data.instant;
		icon = weathericons[iconkey];
		willRain = data.rain.every(hasRain);

		loaded = true;
		// }
	});
</script>

<div class="weather">
	{#if loaded}
		{#if icon && instant}
			<article class="main">
				<h1>{instant.air_temperature}°</h1>
				<div class="main-icon">
					<svelte:component this={icon} />
				</div>
			</article>
		{/if}
		<div class="change">
			{#if temps}
				<div class="temps" style="--width: {width + 'px'}">
					<div class="line">
						<Linechart data={temps} {height} {width} {margins} />
					</div>
					<div class="icon">
						<Thermometer />
					</div>
					<!-- {#each temps as temp} -->
					<!-- 	<Temp {temp} /> -->
					<!-- {/each} -->
				</div>
			{/if}
			{#if rain}
				<div class="rain" style="--width: {width + 'px'}">
					{#if willRain}
						<div class="line">
							<Histogram data={rain} {height} {width} {margins} />
						</div>
						<div class="icon">
							<Raindrop />
						</div>
						<!-- {#each rain as r} -->
						<!-- 	<Rain rain={r} /> -->
						<!-- {/each} -->
					{:else}
						<div>Ikke noe nedbør</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.weather {
		display: grid;
		gap: 2rem;
		grid-template-columns: 100px auto;
		align-content: center;
	}
	.main {
		text-align: center;
		padding-left: 0.5rem;
	}
	.main h1 {
		font-size: 3rem;
		margin-bottom: 0;
	}
	.rain,
	.temps {
		display: grid;
		grid-template-columns: var(--width) auto;
	}
	.icon {
		display: grid;
		align-content: center;
		max-width: 40px;
		fill: #888;
	}
	.main-icon {
		display: grid;
		align-content: center;
	}
	/* .icon > svg { */
	/* 	max-height: 40px; */
	/* 	max-width: 40px; */
	/* } */
	/* .line { */
	/* 	width: 100%; */
	/* 	height: 100%; */
	/* } */
</style>
