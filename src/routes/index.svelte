<script context="module">
  // svelte's preload function contains a session parameter
  // session is loaded in middleware (server.js)
  export async function preload(page, session) {
    const { TASTY_API_KEY } = session;

    // what's returned here will be available to the page
    return { tasty_token: TASTY_API_KEY };
  }
</script>

<script lang="ts">
  export let tasty_token: string;
  import { foods as LuckyArray } from "../utils/FeelingLucky.js";
  import RecipesContainer from "../components/RecipesContainer/index.svelte";
  // import { Recipe } from "../utils/Recipe.js";
  let userInput = undefined;
  let isUpdating = false;
  interface RecipeType {
    name: string;
    original_video_url?: string;
    thumbnail_url?: string;
  }
  let currentRecipes: RecipeType[] = [];

  async function grabRecipes(term: string) {
    let recipeFetch = await fetch(
      "https://tasty.p.rapidapi.com/recipes/list?&q=" +
        term +
        "&from=0&sizes=50",
      {
        headers: {
          "x-rapidapi-host": "tasty.p.rapidapi.com",
          "x-rapidapi-key": tasty_token,
        },
      }
    );

    return await recipeFetch.json();
  }

  const handleFeelingLucky = async () => {
    var rnum = Math.floor(Math.random() * LuckyArray.length);
    let term = LuckyArray[rnum];
    localStorage.setItem(`earch-term-last`, term);
    // send to findRecipe function
    // adding a term overrides userinput
    handleFindRecipe(term.toLowerCase());
  };
  const handleFindRecipe = async (searchTerm?: any) => {
    if (isUpdating) return;

    isUpdating = true; // disable click
    let response = await grabRecipes(searchTerm || userInput); // find recipe from API
    if (response) {
      isUpdating = false;
    }
    if (response.results && response.results.length > 0) {
      response.results.map((recipe: RecipeType) => {
        return {
          name: recipe.name,
          video_url: recipe.original_video_url,
          thumbnail_url: recipe.thumbnail_url,
        };
      });
      currentRecipes = response.results;
    }
  };
</script>

<svelte:head>
  <title>Ravenous</title>
</svelte:head>
<link rel="stylesheet" href="css/index.css" />
<header class="hero-search">
  <div class="hero-search-content">
    <div class="hero-section">
      <div class="hero-section-text">
        <h1>Ravenous</h1>
        <h5>Easy, Beautiful Grocery Shopping</h5>
      </div>
    </div>
    <form
      class="hero-search-form"
      id="search-form"
      on:submit|preventDefault={handleFindRecipe}>
      <label for="find-recipe">Find:</label>
      <input
        id="find-recipe"
        type="search"
        bind:value={userInput}
        placeholder="(search for a cuisine, a meal, or an ingredient)" />
      <button type="submit" class="button" disabled={isUpdating}>🔍</button>
    </form>
    <button
      on:click={handleFeelingLucky}
      class="menu-buttons"
      id="feeling-lucky">
      Hot Recipes
    </button>
    <!-- <a href="/map" class="menu-buttons">Find My Grocery Store</a> -->
  </div>
  <div id="modals-div" class="">
    <div id="recipe-modal" class="modal">
      <!-- Recipe Modal content -->
      <div class="modal-content" id="recipe-modal-content" />
    </div>
  </div>
</header>

<div id="results-div" class="row medium-7 columns">
  {#if currentRecipes}
    <RecipesContainer {currentRecipes} />
  {/if}
</div>

<!-- Float Button -->
