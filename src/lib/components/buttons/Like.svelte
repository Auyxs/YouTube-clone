<script>    
    let {video, liked} = $props();
</script>

<form action={liked ? '?/removelike' : '?/like'} method="POST">
    <button type="submit" class={`btn ${liked ? 'btn-dark' : 'btn-light'} btn-left btn-round px-3 py-2 d-flex align-items-center`}>
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