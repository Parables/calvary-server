<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Members from './routes/Member.svelte';
  import { push } from 'svelte-spa-router';
  let routes = {
    '/': Home,
    '/members/:new/:id?': Members
  };

  function conditionsFailed(event) {
    console.error('Caught event conditionsFailed', event.detail);
    replace('/wild/conditions-failed');
  }

  function routeLoaded(event) {
    console.info('Caught event routeLoaded', event.detail);
  }
</script>

<!-- Parent Body -->
<div class="flex h-screen font-sans antialiased">

  <!-- Main Content -->
  <div class="flex flex-col flex-1 pb-4 overflow-hidden bg-gray-100">
    <div
      class="inset-x-0 flex items-center justify-between px-4 py-4 bg-white shadow-md z-1500"
    >
      <h1 class="p-4 font-sans text-xl font-semibold text-primary">
        Calvary Blood Church
      </h1>

      <button
        class="px-4 py-2 bg-gray-200 rounded-md outline-none cursor-pointer focus:outline-none hover:text-white hover:bg-primary"
        on:click="{() => push('/members/true')}"
      >
        Register member
      </button>

    </div>
    <!-- Router -->
    <div id="content" class="flex-1 px-4 pt-2 mt-2 overflow-hidden ">
      <Router
        {routes}
        on:conditionsFailed="{conditionsFailed}"
        on:routeLoaded="{routeLoaded}"
      />
    </div>
  </div>
</div>
