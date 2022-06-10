<template>
	<div class="boxed">
		<h1>Gutenberg Project</h1>
		<p class="b">A social cataloging website that allows you to freely search its database of books, annotations,
			and reviews.</p>
		<div class="row mt">
			<div v-for="item in categories" :key="item" @click="$router.push(`/category/${item}`)" class="cp col-6">
				<div class="cat">
					<img :src="require(`../assets/img/${item}.svg`)" :alt="item">
					<span class="w100">{{ item }}</span>
					<img src="../assets/img/Next.svg" alt="next" class="float-right">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	data() {
		return {
			items: [],
			categories: [
				'Fiction',
				'Drama',
				'Humour',
				'Politics',
				'Philosophy',
				'History',
				'Adventure'
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.boxed {
	margin-top: 50px;
}
.mt {
	margin-top: 50px;
}
.cat {
	padding: 0 10px;
	background: #fff;
	margin-bottom: 20px;
	box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
	border-radius: 4px;
	height: 50px;
	align-items: center;
	display: flex;
	font-size: 20px;
	text-transform: uppercase;
	font-weight: bold;

	img {
		width: 25px;
		margin-right: 10px;
	}
}
</style>