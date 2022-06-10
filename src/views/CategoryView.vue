<template>
	<div class="books">
		<div class="header">
			<h2>
				<img src="../assets/img/Back.svg" alt="back" class="cp" @click="$router.push('/')">
				{{ book }}
			</h2>
			<div class="search">
				<img src="@/assets/img/Search.svg" alt="" class="search-icon">
				<input type="text" v-model="search" @input="debounceSearch" class="searchTerm" placeholder="Search">
				<img v-if="search" src="@/assets/img/Cancel.svg" @click="search=''" alt="cancel" class="cancel-icon">
			</div>
		</div>
		<div class="boxed">
			
			<div v-if="!isBusy && books.length==0" class="text-center">
				Book not found.
			</div>
			<div v-else>
				<div class="row">
					<div v-for="book in books" :key="book.id" class="col-md-2 mb-20" @click="goTo(book.formats['text/html'])">
						<img :src="book.formats['image/jpeg']" alt="" class="book-thumb rectangle">
						<h3 class="subtitle">{{book.title}}</h3>
						<span class="author">{{ book.authors[0]?.name }}</span>
					</div>
				</div>
				<div v-if="isBusy" class="text-center">
					Loading books...
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CategoryView',
	data() {
		return {
			search: '',
			books: [],
			nextPage: '',
			isBusy: false,
			debounce: null,
		}
	},
	mounted() {
		this.getBooks()
		window.onscroll = () => {
			let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

			if (bottomOfWindow && this.nextPage) {
				this.getBooks(this.nextPage)
			}
		}
	},
	methods: {
		async getBooks(url) {
			try {
				this.isBusy = true
				let res = {}
				if(url) {
					res = await window.axios.get(url);
				} else {
					res = await window.axios.get(`/books/?topic=${this.book}`);
				}
				if(res.data.results) {
					this.books = [...this.books, ...res.data.results]
					this.nextPage = res.data.next
				}
				this.isBusy = false
			} catch (err) {
				console.error(err)
				this.isBusy = false
			}
		},
		async searchBooks(txt) {
			if(txt.length > 0) {
				try {
					this.isBusy = true
					const res = await window.axios.get(`/books/?topic=${this.book}&search=${txt}`);
					if(res.data.results) {
						this.books = res.data.results
					}
					this.isBusy = false
				} catch (err) {
					console.error(err)
					this.isBusy = false
				}
			}
		},
		debounceSearch(event) {
			clearTimeout(this.debounce)
			this.debounce = setTimeout(() => {
				this.searchBooks(event.target.value)
			}, 500)
		},
		goTo(url) {
			window.location.href = url
		}
	},
	computed: {
		book() {
			return this.$route.params.book
		}
	}
}
</script>

<style lang="scss" scoped>
h2 {
	color: $blue;
	padding: 20px;
}

.mb-20 {
	margin-bottom: 20px;
}
.books {
	display: grid;
}

.header {
	background: #fff;

	.search {
		position: relative;
		display: flex;
		margin: 20px;

		.searchTerm {
			width: 100%;
			height: 40px;
			border-radius: 4px;
			outline: none;
			padding-right: 10px;
			padding-left: 40px;
			background: #eee;
			color: $blue;
			border: none;
			font-size: 16px;

			&:focus {
				border:1px solid $blue;
			}
		}

		.search-icon {
			position: absolute;
			padding: 13px;
		}
		.cancel-icon {
			right: 0;
			padding: 15px;
			position: absolute;
			cursor: pointer;
		}
	}
}
.searchButton {
	width: 40px;
	height: 36px;
	text-align: center;
	color: #fff;
	border-radius: 0 5px 5px 0;
	cursor: pointer;
	font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
	width: 30%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.subtitle {
	font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
}
.author {
	font-size: 12px;
    color: $grey;
	padding: 5px 0;
}
.book-thumb {
	width: 100%;
}
.ma {
	margin: auto;
}
</style>