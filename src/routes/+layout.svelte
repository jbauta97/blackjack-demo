<script>
	import './styles.css';
	import CardControls from "./CardControls.svelte";
    import HandValue from "./HandValue.svelte";
    import Header from "./Header.svelte";
	import { aceCount } from './stores';
    import { twoCount } from './stores';
    import { threeCount } from './stores';
    import { fourCount } from './stores';
    import { fiveCount } from './stores';
    import { sixCount } from './stores';
    import { sevenCount } from './stores';
    import { eightCount } from './stores';
    import { nineCount } from './stores';
    import { tenCount } from './stores';
    import { jackCount } from './stores';
    import { queenCount } from './stores';
    import { kingCount } from './stores';
	import { shoe } from './stores';
</script>

<div class="app">
	<Header></Header>

	<main>
		<HandValue></HandValue>
		<CardControls></CardControls>
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
		max-width: 240px;
		margin: 0 auto;
		margin-top: 48px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>

