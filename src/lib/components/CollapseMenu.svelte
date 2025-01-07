<script>
    let {handleDelete} = $props();
</script>

<div
  class="rounded border position-absolute bg-white shadow-lg"
  style="z-index: 100; max-width: 200px;"
>
  <div class="d-flex flex-column">
    <!-- Delete Button -->
    <button
      onclick={() => handleDelete()}
      class="d-flex align-items-center border-0 btn w-100 pe-5 py-2"
      aria-label="Delete playlist"
    >
      <span class="material-symbols-outlined me-2">delete</span>
      <p class="mb-0 fw-light">Delete</p>
    </button>

    <!-- Edit Button -->
    <button
      class="d-flex align-items-center border-0 btn w-100 pe-5 py-2"
      aria-label="Edit playlist"
    >
      <span class="material-symbols-outlined me-2">edit</span>
      <p class="mb-0 fw-light">Edit</p>
    </button>
  </div>
</div>

<style>
    .btn:hover {
      background-color: #f7f7f7;
      border-radius: 10px;
      color: rgb(53, 53, 53);
    }
</style>