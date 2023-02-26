<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { getWeather, getIcon, getRain, getTemps } from '$lib/functions/index';
	import { weathericons } from '$lib/weathericons';
	import type { WeathericonKey } from '$lib/weathericons';
	import type { Timeseries, DataAndTime } from '$lib/types';
	import Rain from '$lib/components/rain.svelte';
	import Temp from '$lib/components/temp.svelte';
	import Linechart from '$lib/components/linechart.svelte';
	import Raindrop from '$lib/icons/raindrop.svelte';
	import Thermometer from '$lib/icons/thermometer.svelte';

	const LAT = env.PUBLIC_LAT,
		LON = env.PUBLIC_LON;

	let loaded = false;
	let weather: void | null | Timeseries = null;
	let icon: ConstructorOfATypedSvelteComponent | null = null;
	let rain: null | DataAndTime[] = null;
	let temps: null | DataAndTime[] = null;

	onMount(async () => {
		LAT && LON
			? (weather = await getWeather(LAT, LON).then((res: Timeseries[]) => {
					console.log(res);
					(icon as ConstructorOfATypedSvelteComponent) =
						weathericons[getIcon(res) as WeathericonKey];

					rain = getRain(res, 6);
					temps = getTemps(res, 6);
					loaded = true;
			  }))
			: (weather = null);
	});
</script>

<div>
	{#if loaded}
		{#if icon}
			<div class="icon">
				<svelte:component this={icon} />
			</div>
		{/if}
		{#if temps}
			<div class="temps">
				<div class="icon">
					<Thermometer />
				</div>
				<div class="line">
					<Linechart data={temps} />
				</div>
				{#each temps as temp}
					<Temp {temp} />
				{/each}
			</div>
		{/if}
		{#if rain}
			<div class="rain">
				<div class="icon">
					<Raindrop />
				</div>

				<div class="line">
					<Linechart data={rain} />
				</div>
				{#each rain as r}
					<Rain rain={r} />
				{/each}
			</div>
		{/if}
	{/if}
</div>

<style>
	.rain,
	.temps {
		display: flex;
	}
	.icon {
		height: 40px;
		width: 40px;
	}
	.line {
		width: 100px;
		height: 100px;
	}
</style>
