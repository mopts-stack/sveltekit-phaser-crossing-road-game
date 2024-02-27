import { writable } from 'svelte/store';

export const stat = writable<{
    death: number;
    wins: number;
}>({
    death: 0,
    wins: 0
});