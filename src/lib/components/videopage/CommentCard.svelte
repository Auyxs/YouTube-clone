<script>
  import { fly } from "svelte/transition";
  import CollapseMenu from "../CollapseMenu.svelte";

  let { comment, logged_user } = $props();
  let showCollapse = $state(false);

  const handleDeleteComment = async () => {
    const formData = new FormData();
    formData.append("comment", comment.body);
    formData.append("videoId", comment.videoId);
    console.log(formData);
    const res = await fetch("/api/comment", {
      method: "DELETE",
      body: formData,
    });

    if (res.ok) {
      comment = null;
      event.target.reset();
    }
  };

  const handleCollapseFocusLoss = ({ relatedTarget, currentTarget }) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    showCollapse = false;
  };
</script>

{#if comment}
  <div class="d-flex m-1 p-2" transition:fly onfocusout={(handleCollapseFocusLoss)}>
    <div class="me-3">
      <img
        src={comment.user.image || ""}
        alt="User"
        class="rounded-circle profile"
        style="width: 40px; height: auto;"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between w-100">
      <div class="pe-3" style="font-size: 14px">
        <p class="mb-1">@{comment.user.username}</p>
        <p class="text-muted mb-0">{comment.body}</p>
      </div>
      <div>
        <button
          class="border-0 bg-transparent"
          onclick={() => (showCollapse = !showCollapse)}
        >
          <span class="material-symbols-outlined"> more_vert </span>
        </button>

        {#if showCollapse}
          {#if logged_user && logged_user.id == comment.user.id}
            <CollapseMenu handleDelete={handleDeleteComment} />
          {:else}
            <div
              class="rounded border position-absolute bg-white shadow-lg"
              style="z-index: 100; max-width: 200px;"
            >
              <div class="d-flex flex-column">
                <button
                  class="d-flex align-items-center border-0 btn w-100 pe-5 py-2"
                  aria-label="Delete playlist"
                >
                  <span class="material-symbols-outlined me-2">flag</span>
                  <p class="mb-0 fw-light">report</p>
                </button>
              </div>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
{/if}
