<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { Spring } from "svelte/motion";
  import { type ClassValue } from "svelte/elements";
  import { type ParallaxLayerContext } from "./ParallaxLayer.svelte";

  // Props
  export type ParallaxProps = {
    children?: Snippet;
    class?: ClassValue;

    stiffness?: number; // stiffness of the spring
    damping?: number; // damping of the spring

    height?: number; // optional height of the parallax container

    disabled?: boolean;
  };

  let {
    children,
    class: className = "",
    stiffness = 0.5,
    damping = 0.3,
    height: containerHeight = 0,
    disabled = false,
  }: ParallaxProps = $props();

  // Define variables
  let container: HTMLElement;

  // Define state variables
  let y = $state(0);
  let innerWidth = $state(0);
  let innerHeight = $state(0);
  let yTop = $state(0);
  let width = $state(0);
  let height = $state(0);
  const scrollSpring = new Spring(0, { precision: 0.01 });

  // Set up scroll config on mount
  $effect(() => {
    scrollSpring.stiffness = stiffness;
    scrollSpring.damping = damping;
  });

  // Update dimensions on mount and on resize
  function updateDimensions() {
    if (container) {
      width = container.getBoundingClientRect().width;

      yTop = container.getBoundingClientRect().top + y;
      height = containerHeight > 0 ? containerHeight : innerHeight;
    }
  }

  $effect(() => {
    updateDimensions();
  });

  // Set up layers
  export type ParallaxContext = {
    getSpringConfig: () => { stiffness: number; damping: number };
    registerLayer: (layer: ParallaxLayerContext) => void;
    unregisterLayer: (layer: ParallaxLayerContext) => void;
  };

  const layers = $state<ParallaxLayerContext[]>([]);
  setContext<ParallaxContext>("parallax", {
    getSpringConfig() {
      return { stiffness, damping };
    },
    registerLayer: (layer: ParallaxLayerContext) => {
      layers.push(layer);
    },
    unregisterLayer: (layer: ParallaxLayerContext) => {
      const index = layers.indexOf(layer);
      if (index !== -1) {
        layers.splice(index, 1);
      }
    },
  });

  // Update layers on scroll
  $effect(() => {
    const scrollTop = y - yTop;
    for (const layer of layers) {
      layer.setPosition(scrollTop, width, height, disabled);
      layer.setHeight(height);
    }
  });
</script>

<svelte:window
  bind:scrollY={y}
  bind:innerHeight
  bind:innerWidth
  on:resize={updateDimensions} />

<div
  class="parallax-container {className}"
  bind:this={container}
  style="height: {height}px;">
  {@render children?.()}
</div>

<style>
  .parallax-container {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
</style>
