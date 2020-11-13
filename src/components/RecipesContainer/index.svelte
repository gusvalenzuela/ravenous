<script>
  export let currentRecipes;
  console.log(currentRecipes);
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
