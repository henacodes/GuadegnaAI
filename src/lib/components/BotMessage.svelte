
<script>
	export let text;
	import "iconify-icon"

</script>
<div class="grid grid-cols-[auto_1fr] gap-2 my-3 ">
	<iconify-icon style="color: #3b82f6; font-size: 30px" icon="carbon:bot" class="text-primary  "  ></iconify-icon>
	<div class="card p-4 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">Bot</p>
			<small class="opacity-50">Today</small>
		</header>
		<p>{text}</p>
	</div>
</div>
			



					