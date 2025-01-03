<script>
  let { subscribed, channelId, incresesub, decreasesub, logged_user } = $props();

  async function handleFormSubmission(event, url) {
    event.preventDefault();
    if (!logged_user) return
    if (subscribed) decreasesub();
    else incresesub();
    subscribed = !subscribed;

    const formData = new FormData(event.target);
    await fetch(url, {
      method: "POST",
      body: formData,
    });
  }
</script>

<form
  onsubmit={(event) =>
    handleFormSubmission(
      event,
      subscribed === false ? "/api/subscribe" : "/api/unsubscribe"
    )}
>
  <input type="hidden" name="channelId" value={channelId} />
  <button
    type="submit"
    class="btn btn-round {subscribed === false
      ? 'btn-dark'
      : 'btn-light'} px-3 py-2"
    style="font-size: 14px;"
  >
    {subscribed === false ? "Subscribe" : "Subscribed"}
  </button>
</form>
