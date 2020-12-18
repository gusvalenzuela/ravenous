<script lang="ts">
  import { fade } from 'svelte/transition'
  export let segment: string
</script>

<style>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    z-index: 99;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
  span {
    text-decoration: none;
    padding: 1em 0;
    font-weight: bolder;
    display: inline-block;
  }
</style>

<nav>
  <ul>
    <li>
      {#each `RAVENOUS` as char, i}
        <span in:fade="{{ delay: 250 + i * 150 }}">{char}</span>
      {/each}
    </li>
    <li>
      <a
        aria-current="{segment === undefined ? 'page' : undefined}"
        href="#home"
      >Home</a>
    </li>
    <li>
      <a
        aria-current="{segment === 'ingredients' ? 'page' : undefined}"
        href="recipes"
      >♥ Recipes</a>
    </li>
    <li>
      <a
        aria-current="{segment === 'map' ? 'page' : undefined}"
        href="map"
      >🗺</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- <li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li> -->
  </ul>
</nav>
