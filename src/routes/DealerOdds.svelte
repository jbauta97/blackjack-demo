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
    let sevenOdds = 0;
    let juicerOdds = 0;
    let dealerCard = 'card-0';
    let dBustOdds = 0;
    $: dealerCardNum = dealerCard.split('card-')[1];

    shoe.subscribe(onUpdate => {
        get7Odds();
        getDealerJuicerOdds();
        handleDealerOdds();
    });

    function handleDealerOdds(){
        if (dealerCardNum){
            let tmp = $shoe;
            let deckComp = {...tmp};
            let r = Object.keys(deckComp);
            let bussin = calculateBustProb([dealerCardNum], deckComp, r);
            dBustOdds = parseInt(10000*(bussin))/100;;
        }
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

    function get7Odds(){
        let totalCards = 0;
        let bigs = 0;
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
            if (card ==='A' || getCardValue(card) > 6){
                bigs += $shoe[card];
            }
        });
        sevenOdds = 100*(bigs / totalCards);
        sevenOdds = parseInt(100*sevenOdds)/100;
    }
    function getDealerJuicerOdds(){
        let totalCards = 0;
        let juicers = 0;
        let dealerVal = dealerCardNum === 'A' ? 11:getCardValue(dealerCardNum);
        Object.keys($shoe).forEach(card => {
            totalCards += $shoe[card];
            let cardVal = card ==='A' ? dealerVal > 10 ? 1 : 11 : getCardValue(card);
            if (dealerVal + cardVal > 16){
                juicers += $shoe[card];
            }
        });
        juicerOdds = 100*(juicers / totalCards);
        juicerOdds = parseInt(100*juicerOdds)/100;
    }

    function calculateBustProb(hand, deckComposition, ranks) {
        const handValue = getHandValue(hand);
        let isSoft = handIsSoft(hand);
        if (handValue > 21 && !isSoft){
            return 1;
        }
        else if ((handValue > 17 && isSoft) || (handValue >= 17 && !isSoft)) {
            return 0;
        }
        let bustProb = 0;
        let remainingCards = getShoeLength(deckComposition);
        // Iterate over all possible cards that could be drawn
        for (let i = 0; i < ranks.length; i++) {
            let rank = ranks[i];
            if (deckComposition[rank] > 0) {
            // Calculate probability of drawing this card
            let cardProb = deckComposition[rank] / remainingCards;
            
            // Decrement count for this rank in deckComposition
            deckComposition[rank]--;

            // Calculate probability of dealer busting with this card
            let newHand = [...hand, rank];
            let newDeckComposition = {...deckComposition};
            let prob = calculateBustProb(newHand, newDeckComposition, ranks);
            
            // Weight probability by probability of drawing this card
            bustProb += cardProb * prob;
            
            // Increment count for this rank in deckComposition
            deckComposition[rank]++;
            
            // Increment total cards remaining in the deck
            remainingCards++;
            }
        }
        return bustProb;
    }
    
    function getHandValue(hand){
        if (hand[0] == '0'){
            hand = hand.slice(1);
        }
        let handval = 0;
        let num_aces = count(hand, 'A');
        const cardValues = {
            'A': 11,
            'K': 10,
            'Q': 10,
            'J': 10,
            '10': 10,
            '9': 9,
            '8': 8,
            '7': 7,
            '6': 6,
            '5': 5,
            '4': 4,
            '3': 3,
            '2': 2
        };
        let card_value = 0;
        for (let i = 0; i < hand.length; i++) {
            card_value = cardValues[hand[i]];
            handval += card_value;
        }
        while (num_aces > 0 && handval > 21){
            handval -= 10;
            num_aces -= 1;
        }
        return handval;
    }
    function handIsSoft(hand, handValue){
        if (hand.includes('A')){
            let num_aces = count(hand, 'A');
            let a = num_aces > 1 ? (num_aces-1)+11*num_aces:11;
            let noAceHand = hand.filter(c => {
                return c !='A';
            });
            return handValue == getHandValue(noAceHand)+a;
        }
        else{
            return false;
        }
    }
    // kind of like python's arr.count
    // util to return num of occurences in an array
    function count(arr, value) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
            count++;
            }
        }
        return count;
    }
    function getShoeLength(thisShoe){
        let c = 0;
        Object.keys(thisShoe).forEach(card =>{
            c += thisShoe[card];
        });
        return c;
    }
</script>
<div class="dealer-wrapper">
    <fieldset class="card-select" on:change={()=>{getDealerJuicerOdds();handleDealerOdds();}}>
        <legend>Select a dealer up card:</legend>
        <input type="radio" id="card-A" name="dealer-card" value="card-A" bind:group={dealerCard}>
        <label for="card-A">A</label>
        <input type="radio" id="card-2" name="dealer-card" value="card-2" bind:group={dealerCard}>
        <label for="card-2">2</label>
        <input type="radio" id="card-3" name="dealer-card" value="card-3" bind:group={dealerCard}>
        <label for="card-3">3</label>
        <input type="radio" id="card-4" name="dealer-card" value="card-4" bind:group={dealerCard}>
        <label for="card-4">4</label>
        <input type="radio" id="card-5" name="dealer-card" value="card-5" bind:group={dealerCard}>
        <label for="card-5">5</label>
        <input type="radio" id="card-6" name="dealer-card" value="card-6" bind:group={dealerCard}>
        <label for="card-6">6</label>
        <input type="radio" id="card-7" name="dealer-card" value="card-7" bind:group={dealerCard}>
        <label for="card-7">7</label>
        <input type="radio" id="card-8" name="dealer-card" value="card-8" bind:group={dealerCard}>
        <label for="card-8">8</label>
        <input type="radio" id="card-9" name="dealer-card" value="card-9" bind:group={dealerCard}>
        <label for="card-9">9</label>
        <input type="radio" id="card-10" name="dealer-card" value="card-10" bind:group={dealerCard}>
        <label for="card-10">10</label>
        <input type="radio" id="card-J" name="dealer-card" value="card-J" bind:group={dealerCard}>
        <label for="card-J">J</label>
        <input type="radio" id="card-Q" name="dealer-card" value="card-Q" bind:group={dealerCard}>
        <label for="card-Q">Q</label>
        <input type="radio" id="card-K" name="dealer-card" value="card-K" bind:group={dealerCard}>
        <label for="card-K">K</label>
        <input type="radio" id="card-0" name="dealer-card" value="card-0" bind:group={dealerCard}>
        <label for="card-0">0</label>
    </fieldset>
</div>
<div>{juicerOdds}% chance dealer has a 17 or higher</div>
<div>{dBustOdds}% chance of dealer busting</div>
<style>
    .card-select{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
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