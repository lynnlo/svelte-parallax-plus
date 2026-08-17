<script lang="ts">
  import Parallax from "$lib/Parallax.svelte";
  import ParallaxLayer from "$lib/ParallaxLayer.svelte";
</script>

<div style="height: 100vh;"></div>

<Parallax class="image-container">
  <ParallaxLayer scrollSpeed={0} class="bg-layer">
    <div class="background" style="filter: blur(2px);"></div>
  </ParallaxLayer>

  <ParallaxLayer scrollSpeed={-0.1} bindingBox={[-0.6, 0]} class="bg-layer">
    <img
      class="image"
      style="filter: blur(4px);"
      src="Background 3.png"
      alt="" />
  </ParallaxLayer>

  <ParallaxLayer
    scale={0.6}
    offsetX={-0.6}
    offsetY={0.5}
    scrollSpeed={0.1}
    scrollDirection={0}
    bindingBox={[-0.6, 0]}
    class="mid-layer">
    <img
      class="image"
      style="filter: blur(1px);"
      src="Background 2.png"
      alt="" />
  </ParallaxLayer>

  <ParallaxLayer
    scale={1}
    scrollSpeed={-0.2}
    scrollDirection={1.75}
    bindingBox={[-0.6, 0]}
    class="front-layer">
    <img
      class="image"
      style="filter: blur(2px);"
      src="Background 1.png"
      alt="" />
  </ParallaxLayer>
</Parallax>

<div style="height: 100vh;"></div>

<style>
  .background {
    height: 100%;
    background: linear-gradient(to bottom, #c3e3eb, #9cd6bf, #1e3622);
  }
  :global(.image-container) {
    width: 50%;
    margin: 0 auto;
  }
  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>
