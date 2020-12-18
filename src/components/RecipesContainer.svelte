<script lang="ts">
  import { slide } from 'svelte/transition'
  // import type Recipe from '../../utils/Recipe'
  export let recipeCollection: { id: number; recipes?: any[] }
  export let classList: string[]
  export let stackOrder: number
  export let offset: number

  // kudos to Ben Holmes for this implementation of a svelte-y carousel
  // https://dev.to/bholmesdev/making-an-animated-image-carousel-the-easy-way-with-svelte-49ln
  let currentCarouselIndex = 0
  // creating an array (of one) containing just the recipe list at our current index.
  $: currentRecipeList = recipeCollection[currentCarouselIndex]

  const handleSavingRecipe = (recipeToSave: {
    slug: string
    title?: string
    id: number
  }) => {
    // retrieve any locally saved recipes from storage (or empty array if none found)
    let locallySavedRecipes = JSON.parse(
      window.localStorage.getItem(`ravenous-saved-recipes-v1`) || '[]'
    )
    // if new recipe received is already in saved cache, return
    // TODO: this should be done by disabling the saved button
    if (
      locallySavedRecipes.findIndex(
        (savedRecipe: any) => savedRecipe.id === recipeToSave.id
      ) >= 0
    ) {
      return
    }

    // push the new data (recipe) received when user clicks "save data" button
    locallySavedRecipes.push(recipeToSave)
    // re-save with the new recipe added
    window.localStorage.setItem(
      `ravenous-saved-recipes-v1`,
      JSON.stringify(locallySavedRecipes)
    )
  }
</script>

<style>
  section {
    height: 100%;
    width: 100%;
    position: absolute;
    display: grid;
    grid: auto 1fr / 1fr;
    z-index: var(--stack-order);
    transform: translate(calc(var(--offset) * 1px));
  }
  header {
    position: relative;
    text-align: center;
  }

  section img {
    /* height: 100%; */
    max-height: 250px;
    max-width: 100%;
  }
  h1 {
    color: brown;
  }
  section div {
    justify-content: space-around;
  }

  .footer {
    position: relative;
    width: 100%;
  }
  .footer button {
    padding: 0.5rem 1rem;
    height: 250px;
    font-size: larger;
    border: 1px transparent;
  }
  .footer button.prev,
  .footer button.next {
    position: absolute;
    width: 33.33%;
    top: -255px;
  }
  .footer button.prev {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.452), transparent);
    left: 0;
    text-align: left;
  }
  .footer button.next {
    background: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0.452),
      transparent
    );
    right: 0;
    text-align: right;
  }
</style>

<section
  style="--stack-order:{stackOrder}; --offset:{offset}"
  class="{classList && classList.join(' ')}"
  id="recipe-{currentCarouselIndex}"
>
  <slot />
</section>
