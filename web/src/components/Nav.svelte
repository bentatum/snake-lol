<!--<script lang="ts">
	import { List, ListItem, NavigationDrawer } from "smelte";
	export let segment: string;
	let selected: string;
	$: selected = segment === undefined ? "home" : segment;

	const menu = [
		{
			to: ".",
			text: "home",
			ariaCurrent: segment === undefined ? "page" : undefined,
		},
		{
			to: "about",
			text: "about",
			ariaCurrent: segment === "about" ? "page" : undefined,
		},
		{
			to: "blog",
			text: "blog",
			ariaCurrent: segment === "blog" ? "page" : undefined,
		},
	];
</script><style>
</style><NavigationDrawer persistent elevation={3}>
	<List items={menu}>
		<span slot="item" let:item class="cursor-pointer">
			<a aria-current={item.ariaCurrent} href={item.to}>
				<ListItem
					selected={selected === item.text}
					{...item}
					dense
					navigation />
			</a></span>
	</List>
</NavigationDrawer> -->
