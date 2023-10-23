<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	
	

	const modal = {
	type: 'component',
	component: 'ExtractText',
	};
							

</script>


<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token mt-3 ">
	<button on:click={() => modalStore.trigger(modal)}  class="input-group-shim"> <iconify-icon icon="mdi:camera"></iconify-icon>
	</button>
	<input class="input focus:outline-none border-none pl-3 py-2  " type="text" placeholder="Write your prompt here" />
	<button class="variant-filled-primary">Send</button>
</div>
					