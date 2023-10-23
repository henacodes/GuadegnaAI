<script>
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch} from '@skeletonlabs/skeleton';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import ExtractText from "../lib/components/ExtractText.svelte"
	initializeStores();

	const modalRegistry = {
	ExtractText: { ref: ExtractText },
	// ...
};
</script>

<!-- App Shell -->
<AppShell>
	<Modal components={modalRegistry} />
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Guadegna AI</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
