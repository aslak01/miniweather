<script lang="ts">
	import type { RelevantTrainInfo } from '$lib/types';
	export let train: RelevantTrainInfo;
</script>

<div class="train">
	<span>{train.line}</span>
	<strong>{train.time}</strong>
	{#if train.delay > 0}
		<div class="delay">
			<span>!!</span><strong>{train.delay}</strong>
		</div>
	{/if}
</div>

<style>
	.train {
		font-size: 1.3rem;
		max-width: 480px;
	}
	.train:first-child {
		padding-left: 0.5rem;
	}
	.train:last-child {
		padding-right: 0.5rem;
	}
	span,
	.delay {
		font-size: 1rem;
	}
	.delay {
		display: inline;
	}
</style>
