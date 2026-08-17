# Svelte Parallax Plus

A small libraray to support parallax scrolling for Svelte 5

> [!WARNING]
> This library is still in early development, a working version is planned to release by 8/20/2026

Heavily inspired by [svelte-parallax](https://github.com/kindoflew/svelte-parallax). This project is a complete rewrite of svelte-parallax to work with modern Svelte.

## Installing

npm

```sh
npm i svelte-parallax-plus
```

pnpm

```sh
pnpm add svelte-parallax-plus
```

## Basic Usage

Below is a quickstart template

```svelte
<script>
  import { Parallax, ParallaxLayer } from 'svelte-parallax-plus';
</script>

<Parallax stiffness={0.1} damping={0.2}>
  <ParallaxLayer scrollSpeed={0} class="bg-layer">
    <div style="background: #ccf"></div>
  </ParallaxLayer>

  <ParallaxLayer scrollSpeed={0.1}>
    <img
      style="filter: blur(4px);"
      src="Background.png"
      alt="A background with a house and barn" />
  </ParallaxLayer>

  <ParallaxLayer
    scale={0.6}
    offsetX={-0.35}
    offsetY={1.6}
    scrollSpeed={0.2}>
    <img
      src="Subject.png"
      alt="A woman wearing a hat walking down a path" />
  </ParallaxLayer>

  <ParallaxLayer
    scrollSpeed={0.4}>
    <img
      style="filter: blur(2px);"
      src="Foreground.png"
      alt="A bush in the foreground" />
  </ParallaxLayer>
</Parallax>
```
