<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import chatStore from "../../stores/chatStore"
	import { onMount, onDestroy } from "svelte"
	const modalStore = getModalStore();
	import 'iconify-icon'

	
	let prompt;
	const modal = {
	type: 'component',
	component: 'ExtractText',
	};

	const handleInput = e =>{
		prompt = e.target.value
	}
	const handleSend = () =>{
		if(prompt){
			chatStore.update(curr =>{
			return{
				...curr,
				messages:[...curr.messages, { type:"user", text:prompt }]
			}
		})
		prompt = ""
		}
	}	
	
	
	onMount(() => {
   if (browser){
	window.addEventListener("keydown", (e) =>{
		if (event.key === "Enter" && prompt) {
			handleSend()
		}
	});
   }
  });

  // Remove event listener on component unmount
  onDestroy(() => {
    if(browser){
	window.removeEventListener("keydown", () =>{});
	}
  });
</script>


<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-3 ">
	<button on:click={() => modalStore.trigger(modal)}  class="input-group-shim"> 
		<iconify-icon icon="mdi:camera"></iconify-icon>
	</button>
	<input bind:value={prompt}  on:input={handleInput} class="input focus:outline-none border-none pl-3 py-2" type="text" placeholder="Write your prompt here" />
	<button on:click={handleSend} class="variant-filled-primary">Send</button>
</div>
					