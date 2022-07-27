import { CreateGenreDto } from './dto/create-genre.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { GenreModel } from './genre.model'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
	) {}

	async bySlug(slug: string) {
		return this.GenreModel.findOne({ slug }).exec()
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.GenreModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async getCollections() {
		const genres = await this.getAll()
		const collections = genres
		// Need will write
		return collections
	}

	/* Admin area */

	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id).exec()

		if (genre) return genre
		throw new NotFoundException('Genre not found')
	}

	async create() {
		const defaultValue: CreateGenreDto = {
			description: '',
			icon: '',
			name: '',
			slug: '',
		}
		const genre = await this.GenreModel.create(defaultValue)
		return genre._id
	}

	async update(id: string, dto: CreateGenreDto) {
		return this.GenreModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string) {
		return this.GenreModel.findByIdAndDelete(id).exec()
	}
}
