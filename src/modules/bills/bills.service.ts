import Container, { Service } from "typedi"
import { BillsRepository } from "./bills.repository"
import { GetBillsDTO } from "./dtos"

@Service()
export class BillsService {
    constructor(private readonly billsRepository: BillsRepository
    ) {
        this.billsRepository = Container.get(BillsRepository)
    }

    async getBills(params?: GetBillsDTO) {
        const bills = await this.billsRepository.getBills(params);

        return bills;
    }

    async getBillById(id: number) {
        const bills = await this.billsRepository.getBillById(id);

        return bills;
    }
}