<script lang="ts">
  import { getContext, onMount, type Snippet } from "svelte";
  import { Spring } from "svelte/motion";
  import { type ClassValue } from "svelte/elements";
  import { type ParallaxContext } from "./Parallax.svelte";

  // Props
  export type ParallaxLayerProps = {
    children?: Snippet;
    class?: ClassValue;

    scrollSpeed?: number; // speed that the layer scrolls at
    offsetY?: number; // the vertical offset of the layer
    offsetX?: number; // the horizontal offset of the layer
    scale?: number;
  };

  let {
    children,
    class: className = "",
    scrollSpeed = 1,
    offsetY = 0,
    offsetX = 0,
    scale = 1,
  }: ParallaxLayerProps = $props();

  // Define variables
  let container: HTMLElement;

  // Define state variables
  let layerHeight = $state(0);
  const calculatedY = new Spring(0, { precision: 0.01 });
  const calculatedX = new Spring(0, { precision: 0.01 });

  // Define a context object
  export type ParallaxLayerContext = {
    setPosition: (
      scrollTop: number,
      width: number,
      height: number,
      disabled: boolean,
    ) => void;
    setHeight: (height: number) => void;
  };

  let localContext: ParallaxLayerContext = {
    setPosition: (
      scrollTop: number,
      width: number,
      height: number,
      disabled: boolean,
    ) => {
      if (disabled) {
        calculatedX.set(offsetX * width);
        calculatedY.set(offsetY * height);
        return;
      }
      // Calculate the position of the layer based on the scroll position, speed, and offset
      const dX = offsetX * width;
      const dY = offsetY * height * scrollSpeed;
      // Update the spring with the new position
      calculatedX.set(dX);
      calculatedY.set((scrollTop * scrollSpeed) / Math.max(0.01, scale) + dY);
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
    calculatedY.stiffness = stiffness;
    calculatedY.damping = damping;
  });

  // Create a derived scroll translation
  const transform = $derived(
    `translate3d(${calculatedX.current}px, ${calculatedY.current}px, 0)`,
  );
</script>

<div
  class="parallax-layer {className}"
  bind:this={container}
  style="transform: {transform}; scale: {scale}; height: {layerHeight}px;">
  {@render children?.()}
</div>

<style>
  .parallax-layer {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
  }
</style>
