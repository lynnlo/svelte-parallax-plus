<script lang="ts">
  import Parallax from "../../../src/Parallax.svelte";
  import ParallaxLayer from "../../../src/ParallaxLayer.svelte";
</script>

<div style="height: 25vh;"></div>
<Parallax>
  <ParallaxLayer scrollSpeed={0.5} class="bg-layer">
    <div class="bg-content">
      <h1>Background Layer</h1>
    </div>
  </ParallaxLayer>

  <ParallaxLayer class="mid-layer">
    <div class="mid-content">
      <h1>Midground Layer</h1>
    </div>
  </ParallaxLayer>
</Parallax>

<div style="height: 25vh;"></div>
