<script>
	
    import { Avatar } from "@skeletonlabs/skeleton"


	export let text;
</script>

<div class="grid grid-cols-[1fr_auto] gap-2">
	<div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
		<header class="flex justify-between items-center">
			<p class="font-bold">Me</p>
			<small class="opacity-50">TODAY</small>
		</header>
		<p>{text}</p>

		</div>
	<Avatar src="https://i.pravatar.cc/" width="w-12" />
</div>