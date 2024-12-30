<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  let { data, children } = $props();
</script>

<div>
  <Navbar logged_user={data.logged_user}/>
  <div class="d-flex">
    <div class="pt-5"> 
      <Sidebar logged_user={data.logged_user} subscriptions={data.subscriptions}/> 
    </div>

    <div class="responsive-container w-100" >
      {@render children()}
    </div>

  </div>
</div>

<style>
  .responsive-container {
    margin-left: 250px;
  }
  @media screen and (max-width: 1000px) {
  .responsive-container {
    margin-left: 0;
  }
}
</style>