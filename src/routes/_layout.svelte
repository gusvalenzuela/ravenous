<script lang="ts">
  import Nav from '../components/Nav.svelte'

  export let segment: string
</script>

<style>
  main {
    /* height: calc(100vh - 57px); */

    width: 100%;
    /* max-width: 56em; */
    background-color: white;
    padding: 0;
    margin: auto;
    box-sizing: border-box;
  }
  /* desktop constraint */
  /* @media (hover: hover) and (min-width: 480px) {
    max-inline-size: 480px;
    max-block-size: 848px;
  } */
</style>

<Nav segment="{segment}" />

<main class="main">
  <slot />
</main>
