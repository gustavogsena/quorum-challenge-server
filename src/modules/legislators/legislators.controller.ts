import { Get, HttpCode, JsonController, Param, QueryParam } from "routing-controllers";
import Container, { Service } from "typedi";
import { CONSTANTS } from "@src/utils/";
import { LegislatorsService } from "./legislators.service";

@Service()
@JsonController('/legislators')
export class LegislatorsController {
    constructor(private readonly legislatorsService: LegislatorsService) {
        this.legislatorsService = Container.get(LegislatorsService)
    }

    @HttpCode(200)
    @Get('/')
    async getLegislators(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number) {
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
