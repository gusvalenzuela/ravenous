<script lang="ts">
  interface RecipeType {
    name: string;
    original_video_url?: string;
    thumbnail_url?: string;
  }
  export let currentRecipes: RecipeType[];
  // console.log(currentRecipes);
</script>

<style>
  p {
    font-size: large;
  }
</style>

<section>
  {#each currentRecipes as recipe}
    <p>{recipe.name}</p>
  {/each}
</section>
