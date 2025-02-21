import { Service } from "typedi";
import CSVReader from "./CSVReader";
import { CONSTANTS } from "./constants";
import { Bill, Person, Vote, VoteResult } from "@src/models";

export type ModelType = Person | Bill | Vote | VoteResult;

@Service()
export class DBClient {
    constructor(private readonly client: CSVReader) { }


    async bills(): Promise<Bill[]> {
        const bills = await this.client.csvToJSON<Bill>(CONSTANTS.paths.bills);
        return bills;
    }

    async legislators(): Promise<Person[]> {
        const legislators = await this.client.csvToJSON<Person>(CONSTANTS.paths.legislators);
        return legislators;
    }

    async voteResults(): Promise<VoteResult[]> {
        const voteResults = await this.client.csvToJSON<VoteResult>(CONSTANTS.paths.vote_results);
        return voteResults;
    }

    async votes(): Promise<Vote[]> {
        const votes = await this.client.csvToJSON<Vote>(CONSTANTS.paths.votes);
        return votes;
    }
}