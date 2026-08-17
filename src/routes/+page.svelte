<script lang="ts">
  import Parallax from "$lib/Parallax.svelte";
  import ParallaxLayer from "$lib/ParallaxLayer.svelte";
</script>

<Parallax>
  <ParallaxLayer scrollSpeed={-1}>
    <div style="background: lightsalmon; height: 100%;">
      <h1>Svelte Parallax Plus</h1>
    </div>
  </ParallaxLayer>
</Parallax>

<Parallax>
  <ParallaxLayer
    scrollSpeed={1}
    style="display: flex; justify-content: flex-start;">
    <div style="background: wheat; opacity: 0.5; width: 50%; height: 100%;">
      <h1>Svelte Parallax Plus</h1>
    </div>
  </ParallaxLayer>
  <ParallaxLayer
    scrollSpeed={-1}
    style="display: flex; justify-content: flex-end;">
    <div style="background: lightblue; opacity: 0.5; width: 50%; height: 100%;">
      <h3>A simple, yet powerful library for modern svelte.</h3>
    </div>
  </ParallaxLayer>
</Parallax>

<Parallax sections={2} stiffness={0.05}>
  <ParallaxLayer scrollSpeed={1} bindingBox={[0, 1]} sections={2}>
    <ParallaxLayer
      scrollSpeed={1}
      scrollDirection={2}
      scrollWidth={4}
      bindingBox={[-0.5, 0]}
      style="display:flex">
      <div
        style="background: seagreen; width: 100%; height: 20%; margin: auto 0;">
        <h2 style="color:mintcream;">Create powerful scenes that stick.</h2>
      </div>
    </ParallaxLayer>
  </ParallaxLayer>
</Parallax>

<Parallax>
  <ParallaxLayer
    scrollSpeed={1}
    scrollDirection={0}
    scrollWidth={4}
    bindingBox={[-0.5, 0]}
    style="display:flex">
    <div
      style="background: palevioletred; width: 100%; height: 50%; margin: auto 0;">
    </div>
  </ParallaxLayer>

  <ParallaxLayer
    scrollSpeed={1}
    scrollDirection={1}
    bindingBox={[-0.5, 0]}
    scrollWidth={4}
    style="display:flex">
    <div
      style="background: palevioletred; width: 100%; height: 50%; margin: auto 0;">
    </div>
  </ParallaxLayer>

  <ParallaxLayer
    scrollSpeed={2}
    scrollDirection={1 / 2}
    bindingBox={[-0.5, 0]}
    style="display:flex">
    <div
      style="background: transparent; width: 100%; height: 50%; margin: auto 0; gap: 32px; overflow: hidden;">
      <h1 style="color:mintcream;">Try it out now.</h1>
      <ul>
        <li>
          <a href="https://github.com/lynnlo/svelte-parallax-plus"> Github </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/svelte-parallax-plus"> NPM </a>
        </li>
        <li>
          <a
            href="https://svelte.dev/playground/0ecb4b85c16c4e4ca3e9256376f4af6e?version=latest">
            Demo
          </a>
        </li>
      </ul>
    </div>
  </ParallaxLayer>
</Parallax>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1,
  h2,
  h3 {
    font-family:
      system-ui,
      -apple-system,
      Roboto,
      Ubuntu,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;

    color: black;
  }

  h1 {
    font-size: 32pt;
  }

  h2 {
    font-size: 24pt;
  }

  h3 {
    font-size: 16pt;
  }

  ul {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 24pt;
    gap: 16px;
  }

  a {
    font-family:
      system-ui,
      -apple-system,
      Roboto,
      Ubuntu,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;

    color: lightcyan;
  }

  a:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;

    color: blue;
  }
</style>
