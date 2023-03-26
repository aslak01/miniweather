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
		font-size: 1.8rem;
	}
	.train strong {
		font-weight: 800;
	}
	span,
	.delay {
		font-size: 1.2rem;
	}
	.delay {
		display: inline;
	}
</style>
