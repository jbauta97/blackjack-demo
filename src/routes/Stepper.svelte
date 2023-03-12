<script>
    import { shoe } from './stores';
    import { deckNum } from './stores';
    export let cardName;
    export let cardCount
    
    let pCard = 0;
    getOdds();

    shoe.subscribe(onUpdate => {
        getOdds();
    })

    function getOdds(){
        let totalCards = 0;
        console.log($shoe);
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
        });
        let odds = (($deckNum*4) - cardCount) / totalCards;
        pCard = 100*odds;
        return odds;
    }
    function decrement(){
        cardCount = cardCount==0 ? cardCount : cardCount-1;
    }
    function increment(){
        cardCount = cardCount==$deckNum*4 ? cardCount : cardCount+1;
    }
</script>
<div class="stepper-wrapper">
    <div class="card-title">{cardName}</div>
    <div class="stepper">
        <button class="stepper-btn btn-dec" on:click={decrement}>-</button>
        <input type="number" class="stepper-quantity" bind:value="{cardCount}" readonly>
        <button class="stepper-btn btn-inc" on:click={increment}>+</button>
    </div>
    <div class="card-prob">{pCard}% chance next card is {cardName}</div>
</div>

<style>
    .stepper-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .stepper{
        display:flex;
    }
    .stepper-quantity{
        text-align: center;
        width: 64px;
        padding: 0 16px;
    }
    input[type='number']::-webkit-inner-spin-button, 
    input[type='number']::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0;
        width: 0px;
    }
    .card-title{
        font-size: 2rem;
        font-weight: 700;
    }

</style>