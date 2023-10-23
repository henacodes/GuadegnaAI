<script>

    import { onMount, onDestroy } from "svelte"
    let videoEl;
    let imageBase64 = "";
    let cameraMode = "user";
    import 'iconify-icon'



    const startVid = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: 1000,
          height: 1000,
          facingMode: { exact: cameraMode },
        },
      });
      console.log(stream);
      videoEl.srcObject = stream;
      videoEl.style.display = "block";
      imageBase64 = "";
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const stopVideo = () =>{
   if (videoEl?.srcObject){
    const stream = videoEl.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoEl.srcObject = null;
    videoEl.style.display = "none";
   }
  }
  async function performOCR(imageData) {
    const worker = await createWorker("eng");
    (async () => {
      const {
        data: { text },
      } = await worker.recognize(imageData);
      console.log(text);
      alert(text);
      await worker.terminate();
    })();
  }
  async function captureImage() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg");
    imageBase64 = dataURL;
    videoEl.style.display = "none";
    console.log(imageBase64)
    stopVideo()
    console.log("after", imageBase64)
  }


 

  onMount(() =>{
    startVid()
  })

  onDestroy(() =>{
    stopVideo()
  })
</script>

<div class="card p-4 variant-soft-surface w-[80vw]">
    <div class="flex flex-col items-center" >
        <!-- svelte-ignore a11y-media-has-caption -->
        
       {#if imageBase64}
       <img class="w-[60%] rounded-md" src={imageBase64} alt="" />
       {:else}
       <video bind:this={videoEl} autoplay class=" w-[60%] rounded-md "  />

       {/if}
        <div class="flex flex-col items-center ">   
           {#if !imageBase64}
              <button on:click={captureImage} type="button" class="btn-icon variant-filled">
                <iconify-icon icon="mdi:camera" class="flex items-center" ></iconify-icon>
            </button>
           {/if}
          <div>
          {#if imageBase64}
            <button on:click={() => performOCR(imageBase64)} type="button" class="btn btn-sm variant-filled">Extract</button>
          {:else}
          <button
                on:click={() => {
            cameraMode = "environment";
            startVid();
            }}>Rear camera</button
            >
          {/if}
          
           </div>
        </div>
    </div>
</div>