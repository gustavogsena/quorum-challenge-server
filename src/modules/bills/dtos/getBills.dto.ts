import { IsInt, IsNumber, IsOptional } from "class-validator"


const MESSAGES = {
    limit: {
        invalid: "Invalid limit"
    },
    offset: {
        invalid: "Invalid offset"
    },
}

export class GetBillsDTO {
    @IsOptional()
    @IsNumber({}, { message: MESSAGES.limit.invalid })
    limit: number

    @IsOptional()
    @IsInt({ message: MESSAGES.offset.invalid })
    offset: number

    constructor() {
        this.limit = 20;
        this.offset = 0;
    }
}