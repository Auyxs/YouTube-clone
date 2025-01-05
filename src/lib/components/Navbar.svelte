<script>
  import SignIn from "./buttons/SignIn.svelte";
  let { logged_user } = $props();
  let isDropdownOpen = $state(false);

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    if ( relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget))
      return;
    isDropdownOpen = false;
  };
</script>

<nav class="navbar navbar-expand-lg fixed-top p-2 bg-white">
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center">
      <button
        class="btn me-3 rounded-circle d-flex align-items-center justify-content-center"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>

      <a href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          alt="YouTube Logo"
          style="height: 20px;"
        />
      </a>
    </div>

    <form class="col-2 col-sm-4 col-md-6">
      <div class="d-flex">
        <input
          class="form-control search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          class="btn search-btn d-flex align-items-center justify-content-center"
          type="submit"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
    </form>

    {#if logged_user !== null}
      <div class="dropdown" onfocusout={handleDropdownFocusLoss}>
        <button
          onclick={() => (isDropdownOpen = !isDropdownOpen)}
          class="bg-transparent border-0 p-0"
        >
          <img
            src={logged_user.image}
            alt="User"
            class="rounded-circle profile"
            style="width: 40px; height: 40px; cursor: pointer;"
          />
        </button>

        {#if isDropdownOpen}
          <div
            class="shadow-lg bg-white rounded p-2"
            style="min-width: 250px; position: absolute; top: 100%; right: 0; "
          >
            <div class="px-3 py-3 d-flex">
              <img
                src={logged_user.image}
                alt="User"
                class="rounded-circle profile me-3"
                style="width: 40px; height: 40px;"
              />
              <div>
                {logged_user.firstName}
                {logged_user.lastName}
                <br />
                <p class="fw-medium">@{logged_user.username}</p>
                <a
                  href="/channel/@{logged_user.username}"
                  class="text-decoration-none">View your channel</a
                >
              </div>
            </div>

            <hr class="my-1 p-1" />

            <div class="px-3 py-2 d-flex align-items-center">
              <a
                href="/login"
                class="text-reset text-decoration-none d-flex align-items-center"
              >
                <span class="material-symbols-outlined me-4">
                  switch_account
                </span>
                Switch account
              </a>
            </div>

            <div class="px-3 py-2 d-flex align-items-center">
              <form action="/api/logout" method="POST">
                <button
                  type="submit"
                  class="d-flex align-items-center bg-transparent border-0"
                >
                  <span class="material-symbols-outlined me-4"> logout </span>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <SignIn />
    {/if}
  </div>
</nav>

<style>
  .search-input {
    padding-left: 20px;
    font-size: 16px;
    font-weight: 300;
    border-radius: 30px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid rgb(210, 210, 210);
  }

  .search-input:focus {
    box-shadow: none;
  }

  .search-btn {
    border-radius: 30px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1px solid rgb(210, 210, 210);
    background-color: rgb(245, 245, 245);
    padding-left: 20px;
  }
  .search-btn:hover {
    border: 1px solid rgb(210, 210, 210);
    background-color: rgb(235, 235, 235);
  }
</style>
