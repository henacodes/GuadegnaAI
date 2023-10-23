
<script>
	import { clipboard } from '@skeletonlabs/skeleton';
	import "iconify-icon"

	export let text;
	export let id;
	

</script>
<div class="grid grid-cols-[auto_1fr] gap-2 my-3 ">
	<iconify-icon style="color: #3b82f6; font-size: 30px" icon="carbon:bot" class="text-primary  "  ></iconify-icon>
	<div class="card p-4 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">Bot</p>
			<button use:clipboard={{ element: id }}><iconify-icon style="color: #ffffff; font-size: 20px" icon="bxs:copy" class="text-primary  "  ></iconify-icon></button>

		</header>
		<p data-clipboard={id} >{text}</p>
	</div>
</div>
			






					