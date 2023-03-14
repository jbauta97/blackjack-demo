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
            let dOdds = dealerbust2([dealerCardNum], $shoe, 0, 0);
            dBustOdds = parseInt(10000*(dOdds[0]/dOdds[1]))/100;
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

    function dealerbust2(hand, shoe, bustOutcomes, totalOutcomes){
        let bustas = bustOutcomes ? bustOutcomes:0;
        let totals = totalOutcomes ? totalOutcomes:0;
        //get odds of busting
        //return same if we count if we dont wanna hit
        //recursive call if dealer will keep hitting
        let handValue = getHandValue(hand);
        let isSoft = handIsSoft(hand);
        if ((handValue > 17 && isSoft) || (handValue >= 17 && !isSoft)){
            // hand is done
            return [bustas, totals];
        } else if(handValue > 21 && !isSoft){
            // busts
            let lastCardQty = parseInt(shoe[hand.slice(-1)[0]]);
            return [bustas+lastCardQty, totals+lastCardQty];
        }
        else{
            // soft 17 or lower so continue to draw
            Object.keys(shoe).forEach(card => {
                if (shoe[card] > 0){
                    let nextHand = [...hand, card];
                    let nextHandValue = getHandValue(nextHand);
                    let nextHandIsSoft = handIsSoft(nextHand);
                    if (nextHandValue > 21 && !nextHandIsSoft){
                        bustas += parseInt(shoe[card]);
                        totals += parseInt(shoe[card]);
                    }
                    else if((nextHandValue > 17 && nextHandIsSoft) || (nextHandValue >= 17 && !nextHandIsSoft)){
                        totals += parseInt(shoe[card]);
                    }
                    else {
                        let nextShoe = {...shoe};
                        nextShoe[card] -= 1;
                        let deeperResults = dealerbust2(nextHand, nextShoe, bustas, totals);
                        bustas += parseInt(deeperResults[0])
                        totals += parseInt(deeperResults[1]);
                    }
                }
            });
        }
        return [bustas, totals];
    }
    
    function getHandValue(hand){
        let handval = 0;
        let num_aces = count(hand, 'A');
        let card_value = 0;
        hand.forEach(card => {
            if (card == 'A'){
                card_value = 11;
            }
            else if (['K','Q','J'].includes(card)){
                card_value = 10;
            }
            else{
                card_value = getCardValue(card);
            }
            handval += card_value;
        });
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
    function count(arr, value) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
            count++;
            }
        }
        return count;
    }
</script>
<div class="dealer-wrapper">
    <fieldset class="card-select" on:change={()=>{getDealerJuicerOdds()}}>
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
    </fieldset>
</div>
<div>{juicerOdds}% chance dealer has a 17 or higher</div>
<div>Broken WIP {dBustOdds}% chance of dealer busting</div>
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