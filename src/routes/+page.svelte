<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { weathericons } from '$lib/weathericons';

	const LAT = env.PUBLIC_LAT,
		LON = env.PUBLIC_LON;

	const getForecast = async (lat: string, lon: string) => {
		const req = await fetch(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
		);
		const res = await req.json();
    console.log(res)
		const forecasts = res.properties.timeseries;
		// TODO Improve forecast selection?
		const currForecast = forecasts[1];
    console.log(currForecast)
		const now = currForecast.data.instant;
		const coming = currForecast.data.next_6_hours;

		return coming.summary.symbol_code;
	};

	let symbol = '';
	let icon = '';

	$: console.log('symbol', symbol);

	onMount(async () => {
		LAT && LON ? (symbol = await getForecast(LAT, LON)) : '';
		symbol ? (icon = weathericons[symbol]) : '';
	});
</script>

<div>
	<p>Weather</p>
	{#if symbol}
    <svelte:component this={icon}/>
	{/if}
</div>
