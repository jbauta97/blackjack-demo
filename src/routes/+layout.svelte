<script>
	import './styles.css';
	import CardControls from "./stats/CardControls.svelte";
    import HandValue from "./stats/HandValue.svelte";
    import Header from "./Header.svelte";

</script>

<div class="app">
	<Header></Header>

	<main>
		<slot />
		
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		margin-top: 60px;
		width: 100%;
		max-width: 1200px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (max-width: 640px) {
		main{
			max-width: 100vw;
		}
	}

</style>

