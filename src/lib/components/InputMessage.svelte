<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import chatStore from "../../stores/chatStore"
	import { onMount, onDestroy } from "svelte"
	import 'iconify-icon'
	import { v4 as uuidv4 } from 'uuid';
	import { PUBLIC_MAKESUIT_API_KEY } from "$env/static/public";
	import extractStore from '../../stores/extractStore';


	const modalStore = getModalStore();
	let prompt;
	const modal = {
	type: 'component',
	component: 'ExtractText',
	};
	let promptInput;
	const returnPromptTemplate = (userPrompt) =>{
		console.log(userPrompt)
		return `${JSON.stringify($chatStore.messages)}. This is what you and the user have talked in the last 
		couple of minutes, incase you need for the next question. "type:user" means the person asking you the 
		question and "type:bot" means the answer you gave to the user.
		please answer to the user's question here. "${userPrompt}" `
	}
	

	const handleInput = e =>{
		prompt = e.target.value
	}
	const generateResponse = async(prompt) =>{
		chatStore.update(curr =>{
			return{
				...curr,
				loading:true
			}
		})
		try {
			const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${PUBLIC_MAKESUIT_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: {
                text: returnPromptTemplate(prompt)
              },
            }),
          }
        );

        const data = await res.json();
		chatStore.update(curr =>{
			return{
				...curr,
				loading:false
			}
		})
		console.log(data)
		const result = data.candidates[0].output
		chatStore.update(curr =>{
			return{
				...curr,
				messages:[...curr.messages, { type:"bot", text:result, id:uuidv4() }]
			}
		})
		} catch (error) {
			console.log(error)
			chatStore.update(curr =>{
			return{
				...curr,
				loading:true
			}
		})
		}
	}
	const handleSend = () =>{
		if(prompt){
			chatStore.update(curr =>{
			return{
				...curr,
				messages:[...curr.messages, { type:"user", text:prompt, id:uuidv4() }]
			}
		})
		generateResponse(prompt)
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

	extractStore.subscribe(curr =>{
		promptInput.value = curr.extractedText
	})

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
	<input bind:this={promptInput} bind:value={prompt}  on:input={handleInput} class="input focus:outline-none border-none pl-3 py-2" type="text" placeholder="Write your prompt here" />
	<button on:click={handleSend} class="variant-filled-primary">Send</button>
</div>
					