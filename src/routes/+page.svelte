<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
  import { onMount } from "svelte";
	import ChatContainer from "../lib/components/ChatContainer.svelte";
	import chatStore from "../stores/chatStore";

	onMount(() =>{
		chatStore.subscribe((vl) =>{
			console.log(vl)
		})
	})
</script>
<div class="container h-full mx-auto flex justify-center items-center">
	
	<ChatContainer ></ChatContainer>
</div>


<style lang="postcss">

</style>
