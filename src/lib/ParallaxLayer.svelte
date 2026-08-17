<script lang="ts">
  import { getContext, onMount, type Snippet } from "svelte";
  import { Spring } from "svelte/motion";
  import { type ClassValue } from "svelte/elements";
  import { type ParallaxContext } from "./Parallax.svelte";

  // Props
  export type ParallaxLayerProps = {
    children?: Snippet;
    class?: ClassValue;
    style?: string;

    scrollDirection?: number; // the angle of the scroll in radians / PI
    scrollSpeed: number; // speed that the layer scrolls at
    scrollWidth?: number; // how much the layer scrolls

    sections?: number;

    bindingBox?: [number, number]; // the area in which the layer will scroll

    offsetX?: number; // the horizontal offset of the layer
    offsetY?: number; // the vertical offset of the layer
    scale?: number;
  };

  let {
    children,
    class: className = "",
    style = "",
    scrollSpeed = 0,
    scrollDirection = 3 / 2,
    scrollWidth = 1,
    sections = 1,
    bindingBox = [-1, 1],
    offsetY = 0,
    offsetX = 0,
    scale = 1,
  }: ParallaxLayerProps = $props();

  // Define state variables
  let layerWidth = $state(0);
  let layerHeight = $state(0);
  const calculatedY = new Spring(0, { precision: 0.01 });
  const calculatedX = new Spring(0, { precision: 0.01 });

  // Define a clamp macro
  const clamp = (min: number, value: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  // Define a context object
  export type ParallaxLayerContext = {
    setPosition: (scrollTop: number, yTop: number, disabled: boolean) => void;
    setDimensions: (width: number, height: number) => void;
  };

  let localContext: ParallaxLayerContext = {
    setPosition: (scrollTop: number, yTop: number, disabled: boolean) => {
      // Position of the layer based on parent and offsets
      const posX = offsetX * layerWidth * scale;
      const posY = offsetY * layerHeight * scale;

      // If disabled, only set the offsets
      if (disabled) {
        calculatedX.set(posX);
        calculatedY.set(posY);
        return;
      }

      const bindedScroll = clamp(
        bindingBox[0] * layerHeight,
        scrollTop,
        bindingBox[1] * layerHeight,
      );

      const scaleFactor = Math.max(0.01, scale);
      const dX =
        bindedScroll * scrollSpeed * Math.cos(scrollDirection * Math.PI);
      const dY =
        bindedScroll * scrollSpeed * -Math.sin(scrollDirection * Math.PI);

      // Update the spring with the new position
      calculatedX.set(posX + (dX * scrollWidth) / scaleFactor);
      calculatedY.set(posY + (dY * scrollWidth) / scaleFactor);
    },
    setDimensions: (width: number, height: number) => {
      layerWidth = width;
      layerHeight = height * sections;
    },
  };

  // Regiser this layer with the parallax context
  const parallaxContext = getContext<ParallaxContext>("parallax");

  onMount(() => {
    if (!parallaxContext) {
      throw new Error(
        "ParallaxLayer must be used within a Parallax component.",
      );
    }

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
  style="transform: {transform}; scale: {scale}; height: {layerHeight}px; {style}">
  {@render children?.()}
</div>

<style>
  .parallax-layer {
    width: 100%;
    position: absolute;
    box-sizing: content-box;
  }
</style>
