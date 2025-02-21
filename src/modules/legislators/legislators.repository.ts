import Container, { Service } from "typedi";
import { DBClient } from "@src/utils";
import { VoteType } from "@src/models";
import { GetLegislatorsDTO } from "./dtos";

@Service()
export class LegislatorsRepository {
    constructor(private readonly client: DBClient) {
        this.client = Container.get(DBClient)
    }

    async getLegislators(params?: GetLegislatorsDTO) {
        const legislators = await this.client.legislators();
        const bills = await this.client.bills();
        const voteResults = await this.client.voteResults();
        const votes = await this.client.votes();

        const reponse = legislators.map(legislator => {
            const votesResultsByLegislator = voteResults.filter(voteResult => voteResult.legislatorId === legislator.id);

            const votesInformation = votes.map(vote => {
                const bill = bills.find(bill => bill.id === vote.billId);
                const currentVoteResult = votesResultsByLegislator.find(voteResult => voteResult.voteId === vote.id);
                const sponsor = legislators.find(l => l.id === bill?.sponsorId)

                return {
                    voteId: vote.id,
                    bill: {
                        ...bill,
                        sponsor: sponsor ?? null
                    },
                    vote: currentVoteResult?.voteType ?? null
                }
            });

            const total = votesInformation.reduce((acc, current) => {
                if (current.vote === VoteType.YEA) return { ...acc, support: acc.support + 1 };
                if (current.vote === VoteType.NAY) return { ...acc, oppose: acc.oppose + 1 }
                return acc;
            }, { support: 0, oppose: 0 })

            return {
                id: legislator.id,
                name: legislator.name,
                votes: votesInformation,
                total
            }

        })

        const offset = params?.offset && !!params.offset ? Number(params.offset) : 0
        const limit = params?.limit && !!params.limit ? Number(params.limit) + offset : 20 + offset;
        const result = reponse.slice(offset, limit);
        return result;
    }



    async getLegislatorById(id: number) {
        const legislators = await this.client.legislators();
        const legislator = legislators.find(legislator => legislator.id === id);
        if (!legislator) return {};
        const bills = await this.client.bills();
        const voteResults = await this.client.voteResults();
        const votes = await this.client.votes();

        const votesResultsByLegislator = voteResults.filter(voteResult => voteResult.legislatorId === legislator.id);
        const votesInformation = votes.map(vote => {
            const bill = bills.find(bill => bill.id === vote.billId);
            const currentVoteResult = votesResultsByLegislator.find(voteResult => voteResult.voteId === vote.id);
            const sponsor = legislators.find(l => l.id === bill?.sponsorId)

            return {
                voteId: vote.id,
                bill: {
                    ...bill,
                    sponsor: sponsor ?? null
                },
                vote: currentVoteResult?.voteType ?? null
            }
        });

        const total = votesInformation.reduce((acc, current) => {
            if (current.vote === VoteType.YEA) return { ...acc, support: acc.support + 1 };
            if (current.vote === VoteType.NAY) return { ...acc, oppose: acc.oppose + 1 }
            return acc;
        }, { support: 0, oppose: 0 })

        const data = {
            id: legislator.id,
            name: legislator.name,
            votes: votesInformation,
            total
        }

        return data;
    }
}