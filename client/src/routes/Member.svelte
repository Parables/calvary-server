<script>
  import { pop } from 'svelte-spa-router';
  import PageTitle from '../components/PageTitle.svelte';
  import https from 'https';
  export let params = {};

  let profile = {
    name: '',
    phoneNumber: '',
    dob: '',
    nationality: '',
    gender: '',
    postalAddress: '',
    branch: '',
    houseAddress: '',
    childCount: 1,
    maritalStatus: ''
  };

  var http = require('http');

  var options = {
    method: 'PATCH',
    hostname: ['localhost'],
    port: '3000',
    path: ['/profile'],
    headers: {
      'cache-control': 'no-cache'
    }
  };

  function PostOrPatch(post = true) {
    var req = http.request(options, function(res) {
      var chunks = [];

      res.on('data', function(chunk) {
        chunks.push(chunk);
      });

      res.on('end', function() {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    const data = JSON.stringify(profile);
    req.write(data);
    req.end();
  }

  function deleteMember() {}
</script>

<PageTitle title="Add New Member" />

<div class="px-4 py-10 overflow-y-auto h-120 ">
  <div class="flex items-center mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        bind:value="{profile.name}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>

    <div class="flex flex-col">
      <label for="postal-address">Postal Address:</label>
      <input
        type="text"
        id="postal-address"
        placeholder="Postal Address"
        bind:value="{profile.postalAddress}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex">
      <!--   <div class="flex flex-col">
        <label for="age">Age:</label>
        <input
          type="number"
          min=1
          max=200
          id="age"
          placeholder="Age"
                      bind:value={profile.postalAddress}
  class="w-24 px-4 py-2 mr-4 placeholder-gray-500 border border-gray-400 rounded"
        />
      </div> -->
      <div class="flex flex-col">
        <label for="phone">Phone Number:</label>
        <input
          type="number"
          min="10"
          max="10"
          id="phone"
          placeholder="Phone Number"
          bind:value="{profile.phoneNumber}"
          class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <label for="branch">Branch:</label>
      <input
        type="text"
        id="branch"
        placeholder="Branch"
        bind:value="{profile.branch}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        placeholder="Date of Birth"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>

    <div class="flex flex-col">
      <label for="house-address">House Address:</label>
      <input
        type="text"
        id="house-address"
        placeholder="House Address"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="nationality">Nationality:</label>
      <select
        id="nationality"
        placeholder="Nationality"
        bind:value="{profile.nationality}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400 rounded w-80"
      >
        <option class="disable">-- select option --</option>
        <option value="Ghana">Ghana</option>
        <option value="Togo">Togo</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="child-count">No. of children:</label>
      <input
        type="number"
        id="child-count"
        placeholder="No. of children"
        bind:value="{profile.childCount}"
        class="px-4 py-2 placeholder-gray-500 border border-gray-400 rounded w-80"
      />
    </div>
  </div>

  <div class="flex items-center pt-4 mx-auto justify-evenly">
    <div class="flex flex-col">
      <label for="gender">Gender:</label>
      <select
        id="gender"
        placeholder="Gender"
        bind:value="{profile.gender}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400 rounded w-80"
      >
        <option>-- select option --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label for="statuss">Marital status:</label>
      <select
        id="statuss"
        placeholder="Marital status"
        bind:value="{profile.maritalStatus}"
        class="px-4 py-2 placeholder-gray-500 bg-white border border-gray-400 rounded w-80"
      >
        <option>-- select option --</option>
        <option value="Married">Married</option>
        <option value="Single">Single</option>
        <option value="Divorced">Divorced</option>
        <option value="Widow/Widower">Widow/Widower</option>
      </select>
    </div>
  </div>

  <div class="flex justify-end px-6 py-4 mr-48">
    <button
      class="px-4 py-2 mr-6 bg-transparent rounded-md outline-none cursor-pointer focus:outline-none hover:text-white hover:bg-primary"
      on:click="{() => pop()}"
    >
      Cancel
    </button>
    <button
      class="px-4 py-2 bg-gray-200 rounded-md outline-none cursor-pointer focus:outline-none hover:text-white hover:bg-primary"
      on:click|preventDefault="{() => PostOrPatch(params.new === 'true' ? 'POST' : 'PATCH')}"
    >
      Save
    </button>
  </div>

</div>
