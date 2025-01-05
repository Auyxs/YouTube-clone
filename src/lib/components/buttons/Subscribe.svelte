<script>
  import { goto } from "$app/navigation";

  let { subscribed, channelId, incresesub, decreasesub, logged_user } =
    $props();

  const updateUI = () => {
    if (subscribed) decreasesub();
    else incresesub();
    subscribed = !subscribed;
  };

  async function handleFormSubmission(event, url) {
    event.preventDefault();
    try {
      if (!logged_user) {
        goto("/login");
        return
      }
      updateUI();

      const formData = new FormData(event.target);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      console.log(response)
      if (!response.ok) {
        console.error("Failed to update subscription:", await response.text());
        updateUI();
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      updateUI();
    }
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
