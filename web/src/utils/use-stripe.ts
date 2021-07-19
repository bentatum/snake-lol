import { loadStripe } from "@stripe/stripe-js/pure";
import type { Stripe } from "@stripe/stripe-js";
import { writable } from "svelte/store";
import { onMount } from "svelte";
import type { Writable } from "svelte/store";

export default function useStripe(key: string): Writable<Stripe> {
  let stripe = writable<Stripe>(null);
  onMount(async () => {
    const foo = await loadStripe(key);
    stripe.set(foo);
  });
  return stripe;
}
