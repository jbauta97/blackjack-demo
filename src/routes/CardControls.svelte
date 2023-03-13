<script>
    import Stepper from "./Stepper.svelte"
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
</script>

<div class="cards-grid">
    <Stepper cardName={'2'} bind:cardCount={$twoCount}></Stepper>
    <Stepper cardName={'3'} bind:cardCount={$threeCount}></Stepper>
    <Stepper cardName={'4'} bind:cardCount={$fourCount}></Stepper>
    <Stepper cardName={'5'} bind:cardCount={$fiveCount}></Stepper>
    <Stepper cardName={'6'} bind:cardCount={$sixCount}></Stepper>
    <Stepper cardName={'7'} bind:cardCount={$sevenCount}></Stepper>
    <Stepper cardName={'8'} bind:cardCount={$eightCount}></Stepper>
    <Stepper cardName={'9'} bind:cardCount={$nineCount}></Stepper>
    <Stepper cardName={'10'} bind:cardCount={$tenCount}></Stepper>
    <Stepper cardName={'J'} bind:cardCount={$jackCount}></Stepper>
    <Stepper cardName={'Q'} bind:cardCount={$queenCount}></Stepper>
    <Stepper cardName={'K'} bind:cardCount={$kingCount}></Stepper>
    <Stepper cardName={'A'} bind:cardCount={$aceCount}></Stepper>
</div>

<style>
    .cards-grid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-radius: 8px;
        gap: 4px;
        padding: 4px;
    }
    @media (max-width: 640px) {
		.cards-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>