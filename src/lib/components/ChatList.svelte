<script>
    import UserMessage from "./UserMessage.svelte";
    import BotMessage from "./BotMessage.svelte";
    import chatStore from "../../stores/chatStore";
    import { onMount, afterUpdate } from "svelte";


    let chatList;
    let msg;



    const scrollToBottom = () =>{
        chatList.scrollTop = chatList.scrollHeight
    }

    onMount(() =>{

        const unsubscribe = chatStore.subscribe((value) =>{
            scrollToBottom()
        })

        return () => {
            unsubscribe()
        }
        
    })

    afterUpdate(() =>{
        scrollToBottom()
    })
</script>


<div bind:this={chatList
}  class="card p-4 max-h-[70vh] h-[70vh]  overflow-auto space-y-4">
	{#each $chatStore.messages as message}
        <div bind:this={msg} >
            {#if message.type == "user"}
            <UserMessage text={message.text} id={message.id}   />
            {:else}
            <BotMessage text={message.text} id={message.id}  />
        {/if}
        </div>
    {/each}
    {#if $chatStore.loading}
        <p>Bro is thinking ....</p>
    {/if}
    
</div>
			