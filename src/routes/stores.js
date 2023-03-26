import { writable, derived} from 'svelte/store';

export const currentPage = writable('Home');
export const bodyScrollable = writable(true);
