import { Service } from "typedi"
import { LegislatorsRepository } from "./legislators.repository"
import { GetLegislatorsDTO } from "./dtos"

@Service()
export class LegislatorsService {
    constructor(
        private readonly legislatorsRepository: LegislatorsRepository,
    ) { }

    async getLegislators(params?: GetLegislatorsDTO) {
        const legislators = await this.legislatorsRepository.getLegislators(params)

        return legislators
    }

    async getLegislatorById(id: number) {
        const legislators = await this.legislatorsRepository.getLegislatorById(id)

        return legislators
    }
}