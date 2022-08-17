import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import { Meta } from '@/utils/meta/Meta'

import { IHome } from './home.types'

const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch MovieApp movies and TV shows online or stream right to your browser"
		>
			<h1>Home page</h1>
		</Meta>
	)
}

export default Home
