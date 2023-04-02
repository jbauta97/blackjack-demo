<script>
    import { currentPage } from "./stores";
    $currentPage = 'Home';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	Home
	<p>Hello this is a brief introduction to the site showcasing our purpose and how it can benefit our users.</p>
	<p>Maybe put an ad here idk. Or a CTA</p>
	<p><a href="stake.us/?c=a050028c33">Start playing for real here</a></p>
	<div class="showcase">
		<ul>Here are some interactive tools you can use for your research/practice
			<li><a href='/stats'>Statistics/odds tool</a></li>
			<li><a href='/stats/strategies'>interactive basic strategy chart</a></li>
			<li>Practice mode(coming soon)</li>
		</ul>
		<ul>Start here if you want detailed explanations on everything you need to know about playing blackjack from basic rules to advanced counting strategies
			<li><a href="/learn">Learn home</a></li>
			<li><a href="/learn/BasicStrategy">Basic Strategy</a></li>
			<li>More coming</li>
		</ul>
	</div>
	<p>possibly another ad here</p>
</div>

<style>
	.showcase{
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}
	ul{
		background-color: #fff1;
		padding: 8px;
		border-radius: 8px;
		list-style: none;
	}
	@media (max-width: 640px) {
	}
</style>
