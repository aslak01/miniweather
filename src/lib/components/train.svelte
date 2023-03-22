<script lang="ts">
	import type { RelevantTrainInfo } from '$lib/types';
	import { minsToHrMins } from '$lib/functions';
	export let train: RelevantTrainInfo;
</script>

<div class="train">
	<span>
		{train.line}:
	</span>
	<strong>{minsToHrMins(train.time)}</strong>
	{#if train.diff > 0}
		<strong>!! {train.diff}</strong>
	{/if}
</div>

<style>
	.train {
		font-size: 1.3rem;
		max-width: 480px;
		padding-inline: 0.5rem;
	}
	span {
		font-size: 1rem;
	}
</style>
