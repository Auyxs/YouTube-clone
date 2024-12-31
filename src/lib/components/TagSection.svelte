<script>
    export let tags = ["Music", "Animation", "Games", "News"]
</script>

<button class="btn me-2 tag tag-active">All</button>
{#each tags as tag }
    <button class="btn me-2 tag">{tag}</button>
{/each}


<style>
    .tag {
        background-color: rgb(240, 240, 240);
        font-weight: 500;
        border-radius: 10px;
        font-size: 14px;
    }
    .tag:hover {
        background-color: rgb(218, 218, 218);
    }
    .tag-active {
        background-color: rgb(21, 21, 21);
        color: white;
    }
</style>