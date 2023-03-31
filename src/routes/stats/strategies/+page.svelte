<script>
    import { currentPage } from "../../stores";
	
	$currentPage = 'stats/strategies';

    const cards = ['2','3','4','5','6','7','8','9','10','A'];
    const values = ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
    let count = 0;
    let screenWidth = 1200;

    $: basicStrategy = { bindCount:count,
        5: {2: "Hit", 3: "Hit", 4: "Hit", 5: "Hit", 6: "Hit", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        6: {2: "Hit", 3: "Hit", 4: "Hit", 5: "Hit", 6: "Hit", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        7: {2: "Hit", 3: "Hit", 4: "Hit", 5: "Hit", 6: "Hit", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        8: {2: "Hit", 3: "Hit", 4: "Hit", 5: "Hit", 6: "Hit", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        9: {2: getDeviation(1,1,"Double","Hit"), 3: "Double", 4: "Double", 5: "Double", 6: "Double", 7: getDeviation(4,1,"Double","Hit"), 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        10: {2: "Double", 3: "Double", 4: "Double", 5: "Double", 6: "Double", 7: "Double", 8: "Double", 9: "Double", 10: getDeviation(4,1,"Double","Hit"), A: getDeviation(3,1,"Double","Hit")},
        11: {2: "Double", 3: "Double", 4: "Double", 5: "Double", 6: "Double", 7: "Double", 8: "Double", 9: "Double", 10: "Double", A: getDeviation(0,1,"Double","Hit")},
        12: {2: getDeviation(4,1,"Stand","Hit"), 3: getDeviation(2,1,"Stand","Hit"), 4: getDeviation(0,-1,"Hit","Stand"), 5: getDeviation(-1,-1,"Hit","Stand"), 6: getDeviation(-3,-1,"Hit","Stand"), 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        13: {2: getDeviation(0,-1,"Hit","Stand"), 3: getDeviation(-2,-1,"Hit","Stand"), 4: "Stand", 5: "Stand", 6: "Stand", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        14: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Hit", 8: "Hit", 9: "Hit", 10: "Hit", A: "Hit"},
        15: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Hit", 8: "Hit", 9: "Hit", 10: getDeviation(4,1,"Stand","Hit"), A: "Hit"},
        16: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Hit", 8: "Hit", 9: getDeviation(5,1,"Stand","Hit"), 10: getDeviation(0,1,"Stand","Hit"), A: "Hit"},
        17: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Stand", 8: "Stand", 9: "Stand", 10: "Stand", A: "Stand"},
        18: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Stand", 8: "Stand", 9: "Stand", 10: "Stand", A: "Stand"},
        19: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Stand", 8: "Stand", 9: "Stand", 10: "Stand", A: "Stand"},
        20: {2: "Stand", 3: "Stand", 4: "Stand", 5: "Stand", 6: "Stand", 7: "Stand", 8: "Stand", 9: "Stand", 10: "Stand", A: "Stand"}
    };
    // checks if count is > or < required count for deviation. Returns new move if true
    // Direction represents > or <. Use > by default and if move is negative we just multiply by -1 to invert
    function getDeviation(reqCount, direction, newMove, oldMove){
        return (count*direction) >= (reqCount*direction) ? newMove:oldMove;
    }
</script>
<svelte:window bind:innerWidth={screenWidth}/>
<h1>Basic Strategy Chart Tool(WIP)</h1>
<div class="count-slider">
    <p>Unfortunately only includes illustrious 18 deviations until we get a better source</p>
    <p>Count: {count}</p>
    <input type="range" bind:value={count} min="-20" max="20" step="1">
</div>
<div class="strategy-table">
    <div class="strategy-heading">Dealer Card</div>
    <div class="strategy-leftLabel">Player Hand</div>
    {#each cards as card}
        <div class="strategy-topRow">{card}</div>
    {/each}
    {#each values as value}
        <div class="strategy-leftLabel">{value}</div>
        {#each cards as card}
            <div class="strategy--{basicStrategy[value][card]}">{screenWidth > 640 ? basicStrategy[value][card]:Array.from(basicStrategy[value][card])[0]}</div>
        {/each}
    {/each}
</div>
<style>
    .strategy-table{
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        background-color: #fff2;
        border-radius: 4px;
        padding: 8px;
    }
    .strategy-table div{
        border: 1px solid #000;
        padding: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .7s ease-in-out;
    }
    .strategy-heading{
        grid-column: span 11;
    }
    .strategy-heading,.strategy-leftLabel, .strategy-topRow{
        background-color: #fff3;
    }
    .strategy--Hit{
        background-color: #00f8;
    }
    .strategy--Double{
        background-color: #0f08;
    }
    .strategy--Stand{
        background-color: #f008;
    }
    .count-slider{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .count-slider p{
        margin: 0;
    }
    .count-slider input{
        width: 300px;
        max-width: 100%;
    }
</style>