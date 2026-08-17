# Svelte Parallax Plus

A small libraray to support parallax scrolling for Svelte 5

Heavily inspired by [svelte-parallax](https://github.com/kindoflew/svelte-parallax). This project is a complete rewrite of svelte-parallax to work with modern Svelte and typescript.

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

## API

### Parallax

The parallax container provides context information (like height and scroll position) to each parallax layer.

|           |              |                                                                                          |               |
| --------- | ------------ | ---------------------------------------------------------------------------------------- | ------------- |
| Prop      | Type         | Description                                                                              | Default Value |
| stiffness | number [0-1] | [Optional] The stiffness of the spring. Lower values are more elastic.                   | 0.1           |
| damping   | number [0-1] | [Optional] How much damping the spring recieves.                                         | 0.3           |
| height    | number       | [Optional] How many pixels should the container be. Auto calculated when left undefined. |               |
| disabled  | bolean       | If disabled the scrolling effect stops.                                                  |               |

#### Example: Elastic scrolling

```svelte
<Parallax stiffness={0.1} damping={0.1}>
  <ParallaxLayer scrollSpeed={0.5}>
    ...
  </ParallaxLayer>
</Parallax>
```

#### Example: Setting scroll behavior with runes

```svelte
<script lang="ts">
  ...

  let stopScroll = $state<boolean>(false);
</script>
<Parallax disabled={stopScroll}>
  <ParallaxLayer scrollSpeed={0.5}>
    ...
  </ParallaxLayer>
</Parallax>
```

### Parallax Layer

The parallax layer shifts its content based on information provided by the parallax container and its config.

|                 |                  |                                                                                                                    |               |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------- |
| Prop            | Type             | Description                                                                                                        | Default Value |
| **scrollSpeed** | number           | How fast the layer scrolls compared to the parent container. 0 is the same speed. Can be negative.                 | 0             |
| scrollDirection | number [0-2]     | [Optional] The direction that the scrolls. Represented as a multiple of PI. 0: right, 0.5: up, 1: left, 1.5: down. | 1.5           |
| bindingBox      | [number, number] | [Optional] The thresholds where the scrolling effect triggers.                                                     | [-1, 1]       |
| offsetX         | number           | The X offset of the layer as a ratio of the container's width.                                                     | 0             |
| offsetY         | number           | The Y offset of the layer as a ratio of the container's height.                                                     | 0             |
| scale         | number           | The scale of the layer.                                                     | 1             |