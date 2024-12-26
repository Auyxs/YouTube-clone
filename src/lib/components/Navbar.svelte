<script>
  export let logged_user = null;

  let isDropdownOpen = false 

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return 
    isDropdownOpen = false
  }
</script>

<nav class="navbar navbar-expand-lg sticky-top">
<div class="container-fluid">
  <div>
    <button class="btn rounded-circle">
      <span class="material-symbols-outlined">menu</span>
    </button>
    
    <a href="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" alt="YouTube Logo" style="height: 25px;">
    </a>
  </div>

  <form class="d-flex w-25">
    <input class="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-light search-btn d-flex align-items-center justify-content-center" type="submit">
      <span class="material-symbols-outlined">search</span>
    </button>
  </form>

  {#if logged_user !== null}
    <div class="dropdown" on:focusout={handleDropdownFocusLoss}>
      <button on:click={()=> isDropdownOpen = !isDropdownOpen} class="bg-transparent border-0 p-0">
        <img src="{logged_user.image}" alt="User" class="rounded-circle profile" style="width: 40px; height: 40px; cursor: pointer;" />
      </button>

      {#if isDropdownOpen}
        <div class="shadow-lg bg-white rounded p-2" style="min-width: 250px; position: absolute; top: 100%; right: 0; ">
          <div class="px-3 py-3 d-flex">
            <img src="{logged_user.image}" alt="User" class="rounded-circle profile me-3" style="width: 40px; height: 40px;" />
            <div>
              {logged_user.firstName} {logged_user.lastName}
              <br>
              <p class="fw-medium">@{logged_user.username}</p>
              <a href="/channel/@{logged_user.username}" class="text-decoration-none">View your channel</a>
            </div>
          </div>
          
          <hr class="my-1 p-1">
    
          <div class="px-3 py-2 d-flex align-items-center">
            <a href="/login" class="text-reset text-decoration-none d-flex align-items-center">
              <span class="material-symbols-outlined me-4">
                switch_account
              </span>
              Switch account
            </a>
          </div>
          
          <div class="px-3 py-2 d-flex align-items-center">
            <form action="/logout" method="POST">
              <button type="submit" class="d-flex align-items-center bg-transparent border-0">
                  <span class="material-symbols-outlined me-4">
                      logout
                  </span>
                  Sign Out
              </button>
            </form>
          </div>


        </div>
      {/if}

    </div>

  {:else}
      <div>
        <a href="/login" class="btn btn-round btn-light border d-flex align-items-center me-2">
          <span class="material-symbols-outlined me-2">
            account_circle
          </span>
          Sign in
        </a>
      </div>
  {/if}

</div>
</nav>


<style>  
  .navbar {
    background-color: white;
    box-shadow: 2px 0 5px rgba(148, 148, 148, 0.137);
  }


  .search-input {
    border-radius: 30px; 
    padding-left: 20px; 
    font-size: 16px;      
  }

  .search-input:focus {
    box-shadow: none; 
  }

  .search-btn {
    border: 1px solid rgb(180, 180, 180); 
    border-radius: 30px;
    padding: 10px 20px; 
  }

  .search-btn span {
    font-size: 18px;  
  }
</style>

