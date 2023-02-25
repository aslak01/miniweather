<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import wi from '$lib/weathericon/svg';

	const LAT = env.PUBLIC_LAT,
		LON = env.PUBLIC_LON;

	const getForecast = async (lat: string, lon: string) => {
		const req = await fetch(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
		);
		const res = await req.json();
		const forecasts = res.properties.timeseries;
		// TODO Improve forecast selection?
		const currForecast = forecasts[1];
		const now = currForecast.data.instant;
		const coming = currForecast.data.next_6_hours;

		return coming.summary.symbol_code;
	};

	let symbol = '';

	$: console.log('symbol', symbol);

	onMount(async () => {
		LAT && LON ? (symbol = await getForecast(LAT, LON)) : '';
	});
</script>

<div>
	<p>Weather</p>
  <img src={wi[symbol]} />
	{symbol}
</div>
