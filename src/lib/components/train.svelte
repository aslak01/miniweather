<script lang="ts">
	import type { RelevantTrainInfo } from '$lib/types';
	export let train: RelevantTrainInfo;
</script>

<div class="train">
	{train.line}: <strong>{train.time}</strong>
	{#if train.diff > 0}
		<strong>!! {train.diff}</strong>
	{/if}
</div>

<style>
	.train {
		font-size: 1.5rem;
	}
</style>
