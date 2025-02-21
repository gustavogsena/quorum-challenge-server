import { Get, HttpCode, JsonController, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";
import { BillsService } from "./bills.service";
import { GetBillsDTO } from "./dtos";
import { CONSTANTS } from "@src/utils/";

@Service()
@JsonController('/bills')
export class BillsController {
    constructor(private readonly billsService: BillsService) { }

    @HttpCode(200)
    @Get('/')
    async getBills(@QueryParams() { limit, offset }: GetBillsDTO) {
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
