<script>
	import Sidebar from "$lib/components/Sidebar.svelte";
  import TagSection from "$lib/components/TagSection.svelte";
  import VideoCard from "$lib/components/VideoCard.svelte";

	let { data, children } = $props();
</script>


<style>
    .channel-banner {
      background-image: url('https://via.placeholder.com/1500x400?text=Channel+Banner');
      background-size: cover;
      height: 250px;
      position: relative;
    }
    
    .nav-link:hover {
      border-bottom: 1px solid black;
    }
    
  </style>

<Sidebar />
<div class="w-100">

<section class="channel-header m-5 p-5 mt-0 mb-0 pt-0 pb-0">
    <div class="channel-banner d-flex align-items-end rounded m-3 mt-0">
    </div>
  
    <div class=" d-flex m-3 mt-0 mb-0">
      <img src="{data.user.image}" alt="Channel Avatar" class="profile rounded-circle m-3" style="height: 180px; width: auto;">
      <div class="m-4">
        <h1>{data.user.username}</h1>
        <p>@{data.user.username} • {data.videos[0].views.toLocaleString()} followers • {data.videos.length} videos</p>
        <p>Channel about description</p>
        <button class="btn btn-dark btn-round subscribe-btn">Subscribe</button>
      </div>
  
    </div>
  </section>

  <div class="container-fluid" style="border-bottom: 1px solid lightgray;">
    <div class="ms-5 ps-5">
      <div class="d-flex justify-content-start">
        <ul class="list-unstyled d-flex mb-0">
          <li class="me-3">
            <a class="nav-link p-2" href="/">Home</a>
          </li>
          <li class="me-3">
            <a class="nav-link p-2" href="/">Videos</a>
          </li>
          <li class="me-3">
            <a class="nav-link p-2" href="/">Community</a>
          </li>
          <li class="me-3">
            <a class="nav-link p-2" href="/">About</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {@render children()}
</div>
