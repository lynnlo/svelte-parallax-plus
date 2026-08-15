<script lang="ts">
  import { getContext, onMount, type Snippet } from "svelte";
  import { Spring } from "svelte/motion";
  import { type ParallaxContext } from "./Parallax.svelte";

  // Props
  export type ParallaxLayerProps = {
    children?: Snippet;
    class?: string;

    scrollSpeed?: number; // speed that the layer scrolls at
    offset?: number; // the vertical offset of the layer
  };

  let {
    children,
    class: className = "",
    scrollSpeed = 1,
    offset = 0,
  }: ParallaxLayerProps = $props();

  // Define variables
  let container: HTMLElement;

  // Define state variables
  let layerHeight = $state(0);
  const deltaScroll = new Spring(0);

  // Define a context object
  export type ParallaxLayerContext = {
    setPosition: (scrollTop: number, height: number) => void;
    setHeight: (height: number) => void;
  };

  let localContext: ParallaxLayerContext = {
    setPosition: (scrollTop: number, height: number) => {
      const deltaY = 2 * offset * height * scrollSpeed;
      deltaScroll.set(-(scrollTop * scrollSpeed) + deltaY);
    },
    setHeight: (height: number) => {
      // Set the height of the layer to the height of the container
      layerHeight = height;
    },
  };

  // Regiser this layer with the parallax context
  const parallaxContext = getContext<ParallaxContext>("parallax");

  onMount(() => {
    parallaxContext.registerLayer(localContext);

    return () => {
      parallaxContext.unregisterLayer(localContext);
    };
  });

  $effect(() => {
    const { stiffness, damping } = parallaxContext.getSpringConfig();
    deltaScroll.stiffness = stiffness;
    deltaScroll.damping = damping;
  });

  // Create a derived scroll translation
  const transform = $derived(`translate3d(0, ${deltaScroll.current}px, 0)`);
</script>

<div
  class="parallax-layer {className}"
  bind:this={container}
  style="transform: {transform}; height: {layerHeight}px;">
  {transform}
  {@render children?.()}
</div>

<style>
  .parallax-layer {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
  }
</style>
