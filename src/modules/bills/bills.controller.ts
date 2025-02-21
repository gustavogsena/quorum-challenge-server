import { Get, HttpCode, JsonController, Param, QueryParam, QueryParams } from "routing-controllers";
import Container, { Service } from "typedi";
import { BillsService } from "./bills.service";
import { CONSTANTS } from "@src/utils/";

@Service()
@JsonController('/bills')
export class BillsController {
    constructor(private readonly billsService: BillsService) {
        this.billsService = Container.get(BillsService)
    }

    @HttpCode(200)
    @Get('/')
    async getBills(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number) {
        const billsResult = await this.billsService.getBills({ limit, offset })

        return {
            status: CONSTANTS.status.success,
            data: billsResult
        }
    }

    @HttpCode(200)
    @Get('/:id')
    async getBillById(@Param('id') id: number) {
        const billResult = await this.billsService.getBillById(id)

        return {
            status: CONSTANTS.status.success,
            data: billResult
        }
    }
}
