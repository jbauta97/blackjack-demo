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
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
        });
        let odds = (($deckNum*4) - cardCount) / totalCards;
        pCard = 100*odds;
        pCard = parseInt(100*pCard)/100;
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
        <input type="text" class="stepper-quantity" bind:value="{cardCount}" readonly>
        <button class="stepper-btn btn-inc" on:click={increment}>+</button>
    </div>
    <div class="card-prob">{pCard}% chance next card is {cardName}</div>
</div>

<style>
    .stepper-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
        padding: 8px;
        background: #1f1f23;
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 26%);
        width: calc(100% - 16px);
    }
    .stepper{
        display:flex;
    }
    .stepper-quantity{
        text-align: center;
        width: 48px;
        height: 48px;
        padding: 8px;
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
    .stepper-btn{
        width: 48px;
        height: 48px;
        cursor: pointer;
        transition: background .2s ease-in-out;
        background-color: #fff;
        font-size: 1.5rem;
        line-height: 1rem;
    }
    .stepper-btn:hover{
        box-shadow: inset 0 0 0 1px #000;
        border: 1px solid #000;
    }
    .stepper-btn.btn-inc:hover{
        background-color: #e2e2e2;
        font-weight: 700;
    }
    .stepper-btn.btn-dec:hover{
        background-color: #e2e2e2;
    }
    .card-prob{
        font-size: .97rem;
    }

</style>