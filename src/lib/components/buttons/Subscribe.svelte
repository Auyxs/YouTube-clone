<script>
    export let subscribed;
    export let channelId; 
</script>

{#if !subscribed}
    <form action="/api/subscribe" method="POST">
        <input type="hidden" name="channelId" value={channelId} />
        <button type="submit" class="btn btn-round btn-dark px-3 py-2" style="font-size: 14px;">Subscribe</button>
    </form>
{:else}
    <form action="/api/unsubscribe" method="POST">
        <input type="hidden" name="channelId" value={channelId} />
        <button class="btn btn-round btn-light px-3 py-2" style="font-size: 14px;">Subscribed</button>
    </form>            
{/if}
