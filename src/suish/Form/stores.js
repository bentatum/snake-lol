import { writable } from 'svelte/store'

export const values = writable({});
export const validatedValues = writable({});
export const errors = writable({});
export const touched = writable({});
export const isSubmitting = writable(false);