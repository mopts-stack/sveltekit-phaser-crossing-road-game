<script lang="ts">
	import Phaser from 'phaser';

	import { onMount } from 'svelte';
	import Hud from './Hud.svelte';
	import { config } from '$lib/phaser';

	let gameContainer: HTMLCanvasElement;

	onMount(async () => {
		config.canvas = gameContainer;
		new Phaser.Game(config);
	});
</script>

<Hud />

<div>
	<canvas bind:this={gameContainer} width={window.innerWidth} height={window.innerHeight} />
</div>
