<script>
	import DealerOdds from './DealerOdds.svelte';
	import HandValue from './HandValue.svelte';
	import CardControls from './CardControls.svelte';
	import { deckNum } from './stores';
    import { countStrategy } from './stores';
	import { currentPage } from "../stores";
	
	$currentPage = 'Statistics';

	let isOpen = false;
    let openClass = '';

    let countStrategies = [
		{ id: 1, text: `Hi-Lo` },
		{ id: 2, text: `Hi-Opt II` },
		{ id: 3, text: `Zen` }
	];
    function togglePopup(){
        isOpen = !isOpen;
        openClass = isOpen ? 'settings-popup--open' : '';
    }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<div>
		<button class="btn icon-btn" on:click={togglePopup}>
        	<svg viewBox="0 0 24 24" focusable="false" class="icon"><g><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z"></path></g></svg>
    	</button>
	</div>
	<div class="odds-wrapper">
		<div><DealerOdds /></div>
		<div><HandValue></HandValue></div>
	</div>
	<CardControls></CardControls>
</div>
<div class="settings-popup {openClass}">
    <div class="backdrop" on:click={togglePopup}></div>
    <div class="modal">
        <h1>Settings</h1>
        <div class="settings-grid">
            <div class="setting-option">
                <div class="setting-label">Decks:</div>
                <input type="number" class="setting-input" bind:value="{$deckNum}" min="1" max="12" step="1">
            </div>
            <div class="setting-option">
                <div class="setting-label">Counting Strategy:</div>
                <select bind:value={$countStrategy}>
                    {#each countStrategies as strategy}
			            <option value={strategy.text}>
				            {strategy.text}
			            </option>
		            {/each}
                </select>
            </div>
        </div>
    </div>
</div>

<style>
	.odds-wrapper{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.odds-wrapper div{
		width: 100%;
	}
	.settings-popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        display: none;
    }
    .settings-popup--open{
        display: flex;
    }
    .backdrop{
        background-color: #0004;
        position: fixed;
        width: 100vw;
        height: 100vh;
    }
    .modal{
        background-color: #fff;
        color: #212121;
        border-radius: 4px;
        width: 600px;
        height: auto;
        padding: 16px;
        z-index: 1;
    }
    .settings-grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .setting-option{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .setting-label{
        font-size: 1.2rem;
    }
	@media (max-width: 640px) {
		.odds-wrapper{
			flex-direction: column;
		}
		.settings-popup{
            max-width: 100vw;
        }
		.settings-grid {
			grid-template-columns: repeat(1, 1fr);
		}
        .setting-option{
            justify-content: space-between;
        }
	}
</style>
