import { Get, HttpCode, JsonController, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";
import { GetLegislatorsDTO } from "./dtos";
import { CONSTANTS } from "@src/utils/";
import { LegislatorsService } from "./legislators.service";

@Service()
@JsonController('/legislators')
export class LegislatorsController {
    constructor(private readonly legislatorsService: LegislatorsService) { }

    @HttpCode(200)
    @Get('/')
    async getLegislators(@QueryParams() { limit, offset }: GetLegislatorsDTO) {
        const legislatorsData = await this.legislatorsService.getLegislators({ limit, offset })

        return {
            status: CONSTANTS.status.success,
            data: legislatorsData
        }
    }

    @HttpCode(200)
    @Get('/:id')
    async getLegislatorById(@Param('id') id: number) {
        const legislator = await this.legislatorsService.getLegislatorById(id)

        return {
            status: CONSTANTS.status.success,
            data: legislator
        }
    }
}
