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
    let handVal = 0;
    let pBust = 0;
    let tradCount = 0;
    let trueCount = 0;
    let tenOdds = 0;
    let penString = '';

    shoe.subscribe(onUpdate => {
        getBustOdds();
        getCount();
        get10Odds();
    });

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
        let bigCards = $tenCount + $jackCount + $queenCount + $kingCount + $aceCount;
        let smallCards = $twoCount + $threeCount + $fourCount + $fiveCount + $sixCount;
        tradCount = smallCards - bigCards;
        trueCount = penetration * tradCount;
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
<div class="bust-prob">{pBust}% chance of busting on next hit</div>
<div class="trad-count">Hi-Lo count is {tradCount}. True count is {trueCount}. Penetration: {penString}</div>
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
</style>