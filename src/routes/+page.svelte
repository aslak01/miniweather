<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	const LAT = env.PUBLIC_LAT,
		LON = env.PUBLIC_LON;

	const getForecast = async () => {
		const req = await fetch(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`
		);
		const res = await req.json();
		const forecast = res.properties.timeseries;
		console.log(forecast);
	};

	onMount(() => {
		getForecast();
	});
</script>

<div>
	<p>Weather</p>
</div>
