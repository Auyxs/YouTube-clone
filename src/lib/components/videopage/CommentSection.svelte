<script>
  import { enhance } from "$app/forms";
  import CollapseMenu from "../CollapseMenu.svelte";
  import CommentCard from "./CommentCard.svelte";

  let { comments, logged_user, videoId } = $props();
  let writingComment = $state(false);
  let videocomments = $state(comments);

  const handleAddComment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const res = await fetch("/api/comment", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const comment = {
        user: logged_user,
        body: formData.get("comment"),
      };
      videocomments.push(comment);
      event.target.reset();
    }
  };
</script>

<div class="col-lg-12 pt-4">
  <h5>{comments.length} Comments</h5>

  <div class="container d-flex m-1 p-2 mb-4 mt-3">
    <div class="me-2">
      {#if logged_user != null}
        <img
          src={logged_user.image}
          alt=""
          class="profile rounded-circle"
          style="width: 40px;"
        />
      {:else}
        <img
          src="https://www.gravatar.com/avatar/?d=mp"
          alt=""
          class="profile rounded-circle"
          style="width: 40px;"
        />
      {/if}
    </div>

    <div class="container w-100">
      <form onsubmit={(event) => handleAddComment(event)}>
        <input type="hidden" name="videoId" value={videoId} />
        <textarea
          class="w-100"
          rows="1"
          name="comment"
          id=""
          placeholder="Add a comment..."
          onclick={() => (writingComment = true)}
        ></textarea>

        {#if writingComment}
          <div class="d-flex justify-content-end mt-2">
            <button
              class="btn btn-light btn-round me-2"
              onclick={() => (writingComment = false)}>Cancel</button
            >
            <button type="submit" class="btn btn-primary btn-round"
              >Comment</button
            >
          </div>
        {/if}
      </form>
    </div>
  </div>

  {#each videocomments as comment}
    <CommentCard {comment} {logged_user} />
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
