import { writable, derived} from 'svelte/store';

export const deckNum = writable(8);
export const aceCount = writable(0);
export const twoCount = writable(0);
export const threeCount = writable(0);
export const fourCount = writable(0);
export const fiveCount = writable(0);
export const sixCount = writable(0);
export const sevenCount = writable(0);
export const eightCount = writable(0);
export const nineCount = writable(0);
export const tenCount = writable(0);
export const jackCount = writable(0);
export const queenCount = writable(0);
export const kingCount = writable(0);

export const shoe = derived(
    [deckNum, aceCount, twoCount, threeCount, fourCount, fiveCount, sixCount, sevenCount, eightCount, nineCount, tenCount, jackCount, queenCount, kingCount],
    ([$deckNum, $aceCount, $twoCount, $threeCount, $fourCount, $fiveCount, $sixCount, $sevenCount, $eightCount, $nineCount, $tenCount, $jackCount, $queenCount, $kingCount]) => {
    return {
        '2': (4*$deckNum)-$twoCount,
        '3': (4*$deckNum)-$threeCount,
        '4': (4*$deckNum)-$fourCount,
        '5': (4*$deckNum)-$fiveCount,
        '6': (4*$deckNum)-$sixCount,
        '7': (4*$deckNum)-$sevenCount,
        '8': (4*$deckNum)-$eightCount,
        '9': (4*$deckNum)-$nineCount,
        '10': (4*$deckNum)-$tenCount,
        'J': (4*$deckNum)-$jackCount,
        'Q': (4*$deckNum)-$queenCount,
        'K': (4*$deckNum)-$kingCount,
        'A': (4*$deckNum)-$aceCount
    }
});