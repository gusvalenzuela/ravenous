<script context="module" lang="ts">
  // svelte's preload function contains a session parameter
  // session is loaded in middleware (server.js)
  export async function preload(
    _page: any,
    session: { TASTY_API_KEY?: string }
  ) {
    const { TASTY_API_KEY } = session

    // what's returned here will be available to the page
    return { tasty_token: TASTY_API_KEY }
  }
</script>

<script lang="ts">
  // export let tasty_token: string;
  import { fade } from 'svelte/transition'
  import { foods as LuckyArray } from '../utils/FeelingLucky.js'
  import { sampleResponse } from '../../._dev/SampleRecipeResponse'
  import RecipesContainer from '../components/RecipesContainer/index.svelte'
  // import { Recipe } from "../utils/Recipe.js";
  let userInput = undefined
  let isUpdating = false
  interface RecipeType {
    name: string
    original_video_url?: string
    thumbnail_url?: string
  }
  let currentRecipes: RecipeType[] = []

  async function grabRecipes(term: string) {
    return sampleResponse
    // let recipeFetch = await fetch(
    //   "https://tasty.p.rapidapi.com/recipes/list?&q=" +
    //     term +
    //     "&from=0&sizes=50",
    //   {
    //     headers: {
    //       "x-rapidapi-host": "tasty.p.rapidapi.com",
    //       "x-rapidapi-key": tasty_token,
    //     },
    //   }
    // );

    // return await recipeFetch.json();
  }

  const handleFeelingLucky = async () => {
    var rnum = Math.floor(Math.random() * LuckyArray.length)
    let term = LuckyArray[rnum]
    localStorage.setItem(`search-term-last`, term)
    // send to findRecipe function
    // adding a term overrides userinput
    handleFindRecipe(term.toLowerCase())
  }
  const handleFindRecipe = async (searchTerm?: any) => {
    if (isUpdating) return

    isUpdating = true // disable click
    let response = await grabRecipes(searchTerm || userInput) // find recipe from API
    if (response) {
      isUpdating = false
      console.log(response.results)
    }
    if (response.results && response.results.length > 0) {
      response.results.map((recipe: RecipeType) => {
        return {
          name: recipe.name,
          video_url: recipe.original_video_url,
          thumbnail_url: recipe.thumbnail_url,
        }
      })
      currentRecipes = response.results
    }
  }
</script>

<style>
  /* search bar CSS  */
  .hero-search {
    position: relative;
    align-items: center;
    background: url('../s-o-c-i-a-l-c-u-t-hwy3W3qFjgM-unsplash.jpg') center
      center no-repeat;
    background-size: cover;
    flex: 1 1 100%;
    padding-bottom: 30px; /* to cover for photo credit */
  }
  .results {
    flex: 1 1 100%;
  }
  .hero-section {
    align-items: center;
    display: flex;
    max-height: 60vh;
    justify-content: center;
    text-align: center;
    padding: 2em 0;
  }

  .hero-section-text {
    color: #fefefe;
    text-shadow: 1px 1px 2px #0a0a0a;
  }

  span.photo-credit {
    position: absolute;
    font-size: small;
    color: rgba(255, 255, 255, 0.438);
    text-shadow: 1px 1px 4px #000;
    bottom: 5px;
    right: 5px;
  }
  .hero-search-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .hero-search-form {
    align-items: center;
    background: #fefefe42;
    border-radius: 4px;
    display: flex;
    padding: 0.25rem;
    width: 90%;
    max-width: 800px;
    margin-top: 1em;
  }

  .hero-search-form label {
    color: #8a8a8a;
    font-weight: bold;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
  }
  .hero-search-form input {
    width: 100%;
  }

  .hero-search-form input,
  .hero-search-form .button {
    margin-bottom: 0;
    float: right;
  }
</style>

<svelte:head>
  <title>Ravenous</title>
</svelte:head>
<link rel="stylesheet" href="css/index.css" />
<header class="hero-search">
  <div class="hero-search-content">
    <div
      class="hero-section"
      style="display:{currentRecipes.length > 0 && 'none'}"
    >
      <div class="hero-section-text">
        <h1>
          {#each `RAVENOUS` as char, i}
            <span in:fade="{{ delay: 250 + i * 150 }}">{char}</span>
          {/each}
        </h1>
        <h5>Easy, Beautiful, Recipe Search</h5>
      </div>
    </div>
    <form
      class="hero-search-form"
      id="search-form"
      on:submit|preventDefault="{handleFindRecipe}"
    >
      <label for="find-recipe">Find:</label>
      <input
        id="find-recipe"
        type="search"
        bind:value="{userInput}"
        placeholder="(search for a cuisine, a meal, or an ingredient)"
      />
      <button type="submit" class="button" disabled="{isUpdating}">🔍</button>
    </form>
    <button
      on:click="{handleFeelingLucky}"
      class="menu-buttons"
      disabled="{isUpdating}"
      id="feeling-lucky"
    >
      Hot Recipes
    </button>
    <!-- <a href="/map" class="menu-buttons">Find My Grocery Store</a> -->
  </div>
  <span
    class="photo-credit"
    style="font-size:{currentRecipes.length > 0 && 'xx-small'}"
  >
    Photo by
    <a
      href="https://unsplash.com/@socialcut?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
    >
      S O C I A L . C U T
    </a>
    on
    <a
      href="https://unsplash.com/s/photos/recipe-book?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
    >
      Unsplash
    </a>
  </span>
  <div id="modals-div" class="">
    <div id="recipe-modal" class="modal">
      <!-- Recipe Modal content -->
      <div class="modal-content" id="recipe-modal-content"></div>
    </div>
  </div>
</header>

{#if currentRecipes.length > 0}
  <div id="results-div" class="results">
    <RecipesContainer currentRecipes="{currentRecipes}" />
  </div>
{/if}

<!-- Float Button -->
