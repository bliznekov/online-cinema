import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { CreateActorDto } from './dto/create-actor.dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel)
		private readonly actorModel: ModelType<ActorModel>,
	) {}

	async bySlug(slug: string) {
		const doc = await this.actorModel.findOne({ slug }).exec()
		if (!doc) throw new NotFoundException('Actor not found')
		return doc
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
				],
			}
		}

		//Aggregation

		return this.actorModel
			.find(options)
			.select('-updateAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	/* Admin area */

	async byId(id: string) {
		return this.actorModel.findById(id).exec()
	}

	async create() {
		const defaultValue: CreateActorDto = {
			name: '',
			photo: '',
			slug: '',
		}
		const actor = await this.actorModel.create(defaultValue)
		return actor._id
	}

	async update(id: string, dto: CreateActorDto) {
		return this.actorModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string) {
		return this.actorModel.findByIdAndDelete(id).exec()
	}
}
