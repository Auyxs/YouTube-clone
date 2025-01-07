<script>
  import { goto } from "$app/navigation";

  let { video, liked, logged_user } = $props();

  const handleLike = async () => {
    if (!logged_user) {
      goto("/login");
      return;
    }

    const method = liked ? "DELETE" : "POST";

    if (!liked) video.like++;
    else video.like--;
    liked = !liked;

    await fetch("/api/like", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId: video.id }),
    });
  }
</script>

<form
  onsubmit={handleLike}
>
  <button
    type="submit"
    class={`btn ${liked ? "btn-dark" : "btn-light"} btn-left btn-round px-3 py-2 d-flex align-items-center`}
  >
    <span class="material-symbols-outlined me-2">thumb_up</span>
    {video.like}
  </button>
</form>

<style>
  .btn-left {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: 1px solid rgb(175, 175, 175);
  }
</style>
