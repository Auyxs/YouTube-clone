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

    <div class="me-3">
      <a href="/login"><img src="https://via.placeholder.com/40" alt="User" class="rounded-circle" /></a>
    </div>
  </div>
</nav>
