
<script>
    import { Avatar } from "@skeletonlabs/skeleton"
	export let text;
</script>
<div class="grid grid-cols-[auto_1fr] gap-2 my-3 ">
	<Avatar src="https://i.pravatar.cc/" width="w-12" />
	<div class="card p-4 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">Bot</p>
			<small class="opacity-50">Today</small>
		</header>
		<p>{text}</p>
	</div>
</div>
			



					