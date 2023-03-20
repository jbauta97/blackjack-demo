<script>
    import { shoe } from './stores';
    import { deckNum } from './stores';
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
    import { countStrategy } from './stores';
    let handVal = 0;
    let pBust = 0;
    let count = 0;
    let trueCount = 0;
    let tenOdds = 0;
    let penString = '';
    let playerCard1 = 'card-0';
    let playerCard2 = 'card-0';
    $: playerCard1Num = playerCard1.split('card-')[1];
    $: playerCard2Num = playerCard2.split('card-')[1];

    shoe.subscribe(onUpdate => {
        getBustOdds();
        getCount();
        get10Odds();
        handlePlayerOdds();
    });

    function handlePlayerOdds(){
        if (!playerCard1Num || !playerCard2Num){playerCard1Num = '0';playerCard2Num='0';}
        handVal = getCardValue(playerCard1Num)+getCardValue(playerCard2Num);
        getBustOdds();
    }

    function getBustOdds(){
        let totalCards = 0;
        let bustCards = 0;
        let minBustValue = 21 - handVal;
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
            if (getCardValue(card) > minBustValue){
                bustCards += $shoe[card];
            }
        });
        let odds = bustCards / totalCards;
        pBust = 100*odds;
        pBust = parseInt(100*pBust)/100;
    }
    function getCardValue(card){
        if (card === 'A'){
            return 1;
        }
        else if (['K', 'Q', 'J'].includes(card)){
            return 10;
        }
        else{
            return parseInt(card);
        }
    }
    function getCount(){
        let totalCards = 0;
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
        });
        let maxCards = $deckNum * 52;
        let penetration = (maxCards - totalCards) / maxCards;
        penString = `${maxCards-totalCards} / ${maxCards}`;
        switch ($countStrategy){
            case 'Hi-Lo': 
                let bigCards = $tenCount + $jackCount + $queenCount + $kingCount + $aceCount;
                let smallCards = $twoCount + $threeCount + $fourCount + $fiveCount + $sixCount;
                count = smallCards - bigCards;
                break;
            case 'Hi-Opt II':
                let tencards = $tenCount + $jackCount + $queenCount + $kingCount;
                count = $twoCount+$threeCount+(2*$fourCount)+(2*$fiveCount)+$sixCount+$sevenCount+(-2*tencards);
                break;
            case 'Zen':
                let tens = $tenCount + $jackCount + $queenCount + $kingCount;
                count = $twoCount-$aceCount+$threeCount+(2*$fourCount)+(2*$fiveCount)+(2*$sixCount)+$sevenCount-(2*tens);
                break;
            default:
                console.log('ah crap');
        }
        trueCount = penetration * count;
        trueCount = parseInt(100*trueCount)/100;
    }
    function get10Odds(){
        let totalCards = 0;
        let tens = 0;
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
            if (getCardValue(card) == 10){
                tens += $shoe[card];
            }
        });
        tenOdds = 100*(tens / totalCards);
        tenOdds = parseInt(100*tenOdds)/100;
    }
    function clearHand(){
        handVal = 0;
        getBustOdds();
    }
</script>
<div class="handValue">
    <div class="hand-label">Hand Value:</div>
    <input class="hand-input" type="number" bind:value="{handVal}" on:change={getBustOdds}>
    <button class="hand-clear" on:click={clearHand}>Clear</button>
</div>
<div class="player-wrapper">
    <fieldset class="card-select" on:change={handlePlayerOdds}>
        <legend>Select player cards:</legend>
        <input type="radio" id="player-card-A-1" name="player-card-1" value="card-A" bind:group={playerCard1}>
        <label for="player-card-A-1">A</label>
        <input type="radio" id="player-card-2-1" name="player-card-1" value="card-2" bind:group={playerCard1}>
        <label for="player-card-2-1">2</label>
        <input type="radio" id="player-card-3-1" name="player-card-1" value="card-3" bind:group={playerCard1}>
        <label for="player-card-3-1">3</label>
        <input type="radio" id="player-card-4-1" name="player-card-1" value="card-4" bind:group={playerCard1}>
        <label for="player-card-4-1">4</label>
        <input type="radio" id="player-card-5-1" name="player-card-1" value="card-5" bind:group={playerCard1}>
        <label for="player-card-5-1">5</label>
        <input type="radio" id="player-card-6-1" name="player-card-1" value="card-6" bind:group={playerCard1}>
        <label for="player-card-6-1">6</label>
        <input type="radio" id="player-card-7-1" name="player-card-1" value="card-7" bind:group={playerCard1}>
        <label for="player-card-7-1">7</label>
        <input type="radio" id="player-card-8-1" name="player-card-1" value="card-8" bind:group={playerCard1}>
        <label for="player-card-8-1">8</label>
        <input type="radio" id="player-card-9-1" name="player-card-1" value="card-9" bind:group={playerCard1}>
        <label for="player-card-9-1">9</label>
        <input type="radio" id="player-card-10-1" name="player-card-1" value="card-10" bind:group={playerCard1}>
        <label for="player-card-10-1">10</label>
        <!--<input type="radio" id="player-card-J-1" name="player-card-1" value="card-J" bind:group={playerCard1}>
        <label for="player-card-J-1">J</label>
        <input type="radio" id="player-card-Q-1" name="player-card-1" value="card-Q" bind:group={playerCard1}>
        <label for="player-card-Q-1">Q</label>
        <input type="radio" id="player-card-K-1" name="player-card-1" value="card-K" bind:group={playerCard1}>
        <label for="player-card-K-1">K</label>-->
        
        <input type="radio" id="player-card-A-2" name="player-card-2" value="card-A" bind:group={playerCard2}>
        <label for="player-card-A-2">A</label>
        <input type="radio" id="player-card-2-2" name="player-card-2" value="card-2" bind:group={playerCard2}>
        <label for="player-card-2-2">2</label>
        <input type="radio" id="player-card-3-2" name="player-card-2" value="card-3" bind:group={playerCard2}>
        <label for="player-card-3-2">3</label>
        <input type="radio" id="player-card-4-2" name="player-card-2" value="card-4" bind:group={playerCard2}>
        <label for="player-card-4-2">4</label>
        <input type="radio" id="player-card-5-2" name="player-card-2" value="card-5" bind:group={playerCard2}>
        <label for="player-card-5-2">5</label>
        <input type="radio" id="player-card-6-2" name="player-card-2" value="card-6" bind:group={playerCard2}>
        <label for="player-card-6-2">6</label>
        <input type="radio" id="player-card-7-2" name="player-card-2" value="card-7" bind:group={playerCard2}>
        <label for="player-card-7-2">7</label>
        <input type="radio" id="player-card-8-2" name="player-card-2" value="card-8" bind:group={playerCard2}>
        <label for="player-card-8-2">8</label>
        <input type="radio" id="player-card-9-2" name="player-card-2" value="card-9" bind:group={playerCard2}>
        <label for="player-card-9-2">9</label>
        <input type="radio" id="player-card-10-2" name="player-card-2" value="card-10" bind:group={playerCard2}>
        <label for="player-card-10-2">10</label>
        <!--<input type="radio" id="player-card-J-2" name="player-card-2" value="card-J" bind:group={playerCard2}>
        <label for="player-card-J-2">J</label>
        <input type="radio" id="player-card-Q-2" name="player-card-2" value="card-Q" bind:group={playerCard2}>
        <label for="player-card-Q-2">Q</label>
        <input type="radio" id="player-card-K-2" name="player-card-2" value="card-K" bind:group={playerCard2}>
        <label for="player-card-K-2">K</label>-->
    </fieldset>
</div>
<div class="bust-prob">{pBust}% chance of busting on next hit</div>
<div class="trad-count">{$countStrategy} count is {count}. True count is {trueCount}.</div>
<div>Penetration: {penString}</div>
<div>{tenOdds}% chance next card is a 10/face(doesn't include aces)</div>
<style>
    .handValue{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        background-color: #000;
        width: fit-content;
        margin: 0 auto 8px;
        padding: 0 8px;
        padding-right: 0;
        display: none;
    }
    .hand-input{
        margin: 0;
        height: 1.4rem;
        background: none;
        border: none;
        color: #fff;
        width: 64px;
    }
    .hand-clear{
        margin: 0;
    }
    .card-select{
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        background-color: #fff1;
        border: none;
        padding: 16px;
        border-radius: 8px;
    }
    .card-select input{
        display: none;
    }
    .card-select label{
        background-color: #f2f2f2;
        color: #212121;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }
    .card-select label:hover{
        box-shadow: inset 0 0 0 1px #000;
        font-weight: 700;
        border-radius: 4px;
    }
    .card-select input:checked + label{
        box-shadow: inset 0 0 0 2px #000;
        font-weight: 700;
        border-radius: 4px;
    }
</style>