<script>
    import HorizontalVideoCard from '$lib/components/HorizontalVideoCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
    let {data} = $props();
</script>


<div class="container d-flex">
    <div class="bg-dark col-6 m-2 mt-5">
    </div>
    <div class="mt-5">
        {#each data.videos as video }
            <HorizontalVideoCard video={video}/>
        {/each}
    </div>

</div>
