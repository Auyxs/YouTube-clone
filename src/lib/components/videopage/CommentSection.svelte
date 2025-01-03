<script>
    let {comments, logged_user} = $props();
    let writingComment = $state(false);
</script>

<div class="col-lg-12 pt-4">
    <h5>{comments.length} Comments</h5>

    <div class="container d-flex m-1 p-2 mb-4 mt-3">
        <div class="me-2">
          {#if logged_user != null}
            <img src="{logged_user.image}" alt="" class="profile rounded-circle" style="width: 40px;">
          {:else}
            <img src='https://www.gravatar.com/avatar/?d=mp' alt="" class="profile rounded-circle" style="width: 40px;">
          {/if}
        </div>

        <div class="container w-100">
            <form action="?/addcomment" method="POST">
              <textarea class="w-100" rows="1" name="comment" id="" placeholder="Add a comment..." onclick={() => writingComment = true}></textarea>

              {#if writingComment}
              <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-light btn-round me-2" onclick={() => writingComment = false}>Cancel</button>
                <button type="submit" class="btn btn-primary btn-round">Comment</button>
              </div>
              {/if}
            </form>
        </div>
        
    </div>

    {#each comments as comment}

    <div class="d-flex m-1 p-2">
      <div class="me-3">
        <img src="{comment.user.image || ''}" alt="User" class="rounded-circle profile" style="width: 40px; height: auto;" />
      </div>

      <div style="font-size: 14px">
        <p class="mb-1" >@{comment.user.username}</p>
        <p class="text-muted mb-0">{comment.body}</p>
      </div>

    </div>
    {/each}
</div>

<style>
      textarea {
    --padding: 10px;
    padding-left: 0;
    min-height: calc(1lh + 1 * var(--padding));
    max-height: calc(10lh + 1 * var(--padding));
    padding: var(--padding);
    line-height: 1;
    border: none;
    border-bottom: 1px solid grey;
    resize: none;
  }

  @supports (field-sizing: content) {
  textarea {
      min-height: calc(1lh + 1 * var(--padding));
      max-height: calc(10lh + 1 * var(--padding));
      field-sizing: content;
    }
  }

  textarea:focus {
      outline: none;
      border-color: 10px solid black;
  }

</style>