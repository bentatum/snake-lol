<script lang="ts">
  import Button from "../Button";
  import useStripe from "../../../utils/use-stripe";
  import { writable } from "svelte/store";
  import { stores } from "@sapper/app";

  const { session } = stores();
  const stripe = useStripe($session.STRIPE_PUBLIC_KEY);
  const loading = writable(false);
  const onClick = async () => {
    loading.set(true);
    const { id } = await fetch($session.API_URL + "/stripe-checkout", {
      method: "post",
      body: JSON.stringify({
        successUrl: `${window.location.href}/success`,
        cancelUrl: window.location.href,
      }),
    }).then((r) => r.json());
    $stripe.redirectToCheckout({ sessionId: id });
  };

  $: disabled = $loading || !$stripe;
</script>

<Button {...$$props} loading={$loading} {disabled} on:click={onClick}>
  <slot />
</Button>
