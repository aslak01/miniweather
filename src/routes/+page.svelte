<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { weathericons } from '$lib/weathericons';
	import type { WeathericonKey } from '$lib/weathericons';
	import type { Timeseries } from '$lib/types';

	const LAT = env.PUBLIC_LAT,
		LON = env.PUBLIC_LON;

	const getWeather = async (lat: string, lon: string): Promise<Timeseries[]> => {
		const req = await fetch(
			`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
		);
		const res = await req.json();
		console.log(res);
		return res.properties.timeseries;
	};

	const getIcon = (w: Timeseries[]): WeathericonKey => {
		return w[1].data.next_6_hours.summary.symbol_code as WeathericonKey;
	};

	const getTemps = (w: Timeseries[]): number[] => {
		const nextTemps = w.reduce(
			(acc: number[], val: { data: { instant: { details: { air_temperature: number } } } }) => {
				acc.push(val.data.instant.details.air_temperature);
				return acc;
			},
			[]
		);

		return nextTemps.slice(2, 6);
	};
	const getRain = (w: Timeseries[]): number[] => {
		const nextRain = w.reduce(
			(
				acc: number[],
				val: { data: { next_1_hours: { details: { precipitation_amount: number } } } }
			) => {
				if ('next_1_hours' in val.data) {
					acc.push(val.data.next_1_hours?.details.precipitation_amount);
				}
				return acc;
			},
			[]
		);

		return nextRain.slice(2, 6);
	};

	let loaded = false;
	let weather;
	let symbol = '';
	let icon: ConstructorOfATypedSvelteComponent | null = null;
	let rain;
	let temps;
	$: console.log('symbol', symbol);

	onMount(async () => {
		LAT && LON
			? (weather = await getWeather(LAT, LON).then((res) => {
					console.log('res', res);
					loaded = true;
					(icon as ConstructorOfATypedSvelteComponent) =
						weathericons[getIcon(res) as WeathericonKey];

					rain = getRain(res);
					temps = getTemps(res);
			  }))
			: '';
	});
</script>

<div>
	{#if loaded}
		{#if icon}
			<svelte:component this={icon} />
		{/if}
		{#each temps as temp}
			{temp},
		{/each}
		{#each rain as r}
			{r},
		{/each}
	{/if}
</div>
