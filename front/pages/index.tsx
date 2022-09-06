import { getMovieUrl } from 'config/url.config'
import type { GetStaticProps, NextPage } from 'next'

import Home from '@/screens/home/Home'
import { IHome } from '@/screens/home/home.types'

import { ISlide } from '@/components/ui/slider/slider.types'

import { MovieService } from '@/services/movie/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

const HomePage: NextPage<IHome> = (props) => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getMovies()

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster,
		}))

		return {
			props: {
				slides,
			} as IHome,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
			} as IHome,
		}
	}
}

export default HomePage
