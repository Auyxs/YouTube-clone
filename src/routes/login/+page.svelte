<script>
	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();
</script>


<div class="container">
  <div class="row justify-content-center py-5">
    <div class="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mt-5">
      <div class="card border border-light-subtle rounded">
        <div class="card-body p-4 py-5">

          <h2 class="text-center">Hi User</h2>
          <h4 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h4>
          
          <form action="?/login" method="POST">
          
            {#if form?.incorrect}<p class="text-danger text-center">Invalid credentials!</p>{/if}
            <div class="row gy-2 overflow-hidden">
              <div class="col-12">
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" name="username" id="username" placeholder="" required>
                  <label for="username " class="form-label fw-light">Username</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" name="password" id="password" value="" placeholder="" required>
                  <label for="password" class="form-label fw-light">Password</label>
                </div>
              </div>
             
              <div class="d-flex justify-content-between align-items-center my-4">
                <a href="/login" class="text-decoration-none link-primary">Forgot password?</a>
                <button class="btn btn-primary col-4" type="submit">Log in</button>
              </div>

            </div>

            
          </form>

           
        </div>
      </div>
    </div>
  </div>
</div>
