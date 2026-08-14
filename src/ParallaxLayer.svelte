<script lang="ts">
  import { writable } from "svelte/store";

  let { children, class: className = "" } = $props<{
    children?: unknown;
    class?: string;
  }>();

  let y = writable(0);
  let innerHeight = writable(0);
</script>

<svelte:window bind:scrollY={$y} bind:innerHeight={$innerHeight} />

<div class="parallax-container {className}">
  {@render children?.()}
</div>

<style>
  .parallax-container {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
