<script lang="ts">
  import { slide, fade } from 'svelte/transition'
  // import type Recipe from '../../utils/Recipe'
  interface RecipeListType {
    name: string
    original_video_url?: string
    thumbnail_url?: string
    recipes?: Array<any>
  }
  export let currentRecipes: RecipeListType[]

  // kudos to Ben Holmes for this implementation of a svelte-y carousel
  // https://dev.to/bholmesdev/making-an-animated-image-carousel-the-easy-way-with-svelte-49ln
  let currentCarouselIndex = 0
  // creating an array (of one) containing just the recipe list at our current index.
  $: currentRecipeList = currentRecipes[currentCarouselIndex]

  const carousel = () => {
    let lastIndex = currentRecipes.length - 1
    function prev() {
      // hold the new previous integer in variable
      let newPrev = (currentCarouselIndex - 1) % currentRecipes.length
      // if the new index is less than the first (i.e. 0), return last index
      // otherwise return the new index
      return (currentCarouselIndex = newPrev < 0 ? lastIndex : newPrev)
    }
    function next() {
      // hold the new next integer in variable
      let newNext = (currentCarouselIndex + 1) % currentRecipes.length
      // if the new index is more than the last (i.e. [array].length - 1), return 0 (first index)
      // otherwise return the new index
      return (currentCarouselIndex = newNext > lastIndex ? 0 : newNext)
    }
    return { prev, next }
  }

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
    position: relative;
    display: grid;
    margin: auto;
    width: 100%;
    max-width: 800px;
    justify-content: center;
    justify-items: center;
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

<section id="recipe-{currentCarouselIndex}">
  <!-- 
       
  -->
  {#if currentRecipeList}
    <header class="recipe-list-name">
      <h1>{currentRecipeList.name}</h1>
    </header>
    <div>
      <img
        transition:slide
        src="{currentRecipeList.thumbnail_url}"
        alt="{currentRecipeList.name}"
      />
      <footer class="footer">
        <button class="prev" on:click="{carousel().prev}">◀</button>
        <button class="next" on:click="{carousel().next}">▶</button>
      </footer>
    </div>

    <!-- list the recipes associated with each list, if available -->
    {#if currentRecipeList.recipes}
      <ul>
        {#each currentRecipeList.recipes as recipe}
          <li>
            <h4>{recipe.name}</h4>
            <button
              class="save-recipe"
              on:click="{() => handleSavingRecipe(recipe)}"
            >SAVE RECIPE</button>
          </li>
        {/each}
      </ul>
    {/if}

    <!-- end of currentRecipeList -->
  {/if}
</section>
