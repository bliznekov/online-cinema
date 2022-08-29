import axios, { axiosClassic } from 'api/interceptors'
import { getActorsUrl } from 'config/api.config'

import { IActor } from '@/shared/types/movie.types'

export const ActorService = {
	async delete(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},
}
