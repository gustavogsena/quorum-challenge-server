import { Service } from "typedi";
import { DBClient } from "@src/utils/";
import { Bill, Person, VoteType } from "@src/models";
import { GetBillsDTO } from "./dtos";
import { NotFoundError } from "routing-controllers";


type BillWithDetails = {
    id: number,
    title: string,
    sponsorId: number,
    sponsor: Person | null;
    votesResult: { voteId: number, result: { support: number; oppose: number } }[];
};

@Service()
export class BillsRepository {
    constructor(private readonly client: DBClient) { }

    async getBills(params?: GetBillsDTO): Promise<BillWithDetails[]> {
        const bills = await this.client.bills();
        const legislators = await this.client.legislators();
        const voteResults = await this.client.voteResults();
        const votes = await this.client.votes();

        const reponse = bills.map((bill: Bill) => {
            const sponsor = legislators.find(legislator => legislator.id === bill.sponsorId)
            const billVotes = votes.filter(vote => vote.billId === bill.id)
            const hasBeenVoted = !!billVotes && billVotes.length;
            const billVotesResult = hasBeenVoted
                ? billVotes.map(vote =>
                ({
                    voteId: vote.id,
                    result: voteResults
                        .filter(voteResult => voteResult.voteId === vote.id)
                        .reduce((acc, current) => current.voteType === VoteType.YEA ? { ...acc, support: acc.support + 1 } : { ...acc, oppose: acc.oppose + 1 }, { support: 0, oppose: 0 })
                })) : []

            const data = {
                id: bill.id,
                title: bill.title,
                sponsorId: bill.sponsorId,
                sponsor: sponsor ?? null,
                votesResult: billVotesResult
            }

            return data
        })

        const result = reponse.slice(params?.offset, params?.limit)
        return result;
    }

    async getBillById(id: number) {
        const bills = await this.client.bills();
        const bill = bills.find(bill => bill.id === id);
        if (!bill) throw new NotFoundError("Bill not found");

        const legislators = await this.client.legislators();
        const voteResults = await this.client.voteResults();
        const votes = await this.client.votes();

        const sponsor = legislators.find(legislator => legislator.id === bill.sponsorId)
        const vote = votes.find(vote => vote.billId === bill.id)
        const billVotes = votes.filter(vote => vote.billId === bill.id)
        const hasBeenVoted = !!billVotes && billVotes.length;
        const billVotesResult = hasBeenVoted
            ? billVotes.map(vote =>
            ({
                voteId: vote.id,
                result: voteResults
                    .filter(voteResult => voteResult.voteId === vote.id)
                    .reduce((acc, current) => current.voteType === VoteType.YEA ? { ...acc, support: acc.support + 1 } : { ...acc, oppose: acc.oppose + 1 }, { support: 0, oppose: 0 })
            })) : []

        const data = {
            id: bill.id,
            title: bill.title,
            sponsorId: bill.sponsorId,
            sponsor: sponsor ?? null,
            votesResult: billVotesResult
        }

        return data;
    }
}