<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    display: grid;
    grid-template-rows: 1fr auto;
	height: calc(100vh - 57px);
	width:  100%;
    position: relative;
    /* max-width: 56em; */
    background-color: white;
    padding: .2em;
    margin: 0;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
