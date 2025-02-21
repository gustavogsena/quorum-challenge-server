import 'reflect-metadata';
import Container from 'typedi';
import { describe, expect, it, vitest, beforeEach } from 'vitest';
import { CSVReader, DBClient } from '@src/utils';

const DEFAULT_CONFIG = {
    bills: {
        headers: ['id', 'sponsorId', 'title'],
        mock: [{ id: 123, sponsorId: 321, title: "First Bill", }, { id: 125, sponsorId: 521, title: "Second Bill" }]
    },
    legislators: {
        headers: ['id', 'name'],
        mock: [{ id: 321, name: 'First legislators' }, { id: 523, name: 'Second legislators' }]
    },
    voteResults: {
        headers: ['id', 'legislatorId', 'voteId', 'voteType'],
        mock: [{ id: 982, legislatorId: 321, voteId: 3344, voteType: 1 }, { id: 523, legislatorId: 17941, voteId: 3344, voteType: 2 }]
    },
    votes: {
        headers: ['id', 'billId'],
        mock: [{ id: 3344, billId: 123 }, { id: 3355, billId: 125 }]
    },
}

describe('#DBClient Suite Test', () => {
    const csvReader = Container.get(CSVReader);
    const dbClient = Container.get(DBClient)
    const spyCSVReader = vitest.spyOn(csvReader, 'csvToJSON');

    beforeEach(() => {
        vitest.resetAllMocks()
    })

    it('should return an array with valid bills', async () => {
        spyCSVReader.mockResolvedValue(DEFAULT_CONFIG.bills.mock);
        const result = await dbClient.bills()
        const expected = DEFAULT_CONFIG.bills.mock;
        const isHeadersValid = result.every((item) => Object.keys(item).join(',') === DEFAULT_CONFIG.bills.headers.join(','))

        expect(result).toStrictEqual(expected)
        expect(isHeadersValid).toBeTruthy()
    })

    it('should return an array with valid legislators', async () => {
        spyCSVReader.mockResolvedValue(DEFAULT_CONFIG.legislators.mock);
        const result = await dbClient.legislators()
        const expected = DEFAULT_CONFIG.legislators.mock;
        const isHeadersValid = result.every((item) => Object.keys(item).join(',') === DEFAULT_CONFIG.legislators.headers.join(','))

        expect(result).toStrictEqual(expected)
        expect(isHeadersValid).toBeTruthy()
    })


    it('should return an array with valid voteResults', async () => {
        spyCSVReader.mockResolvedValue(DEFAULT_CONFIG.voteResults.mock);
        const result = await dbClient.voteResults()
        const expected = DEFAULT_CONFIG.voteResults.mock;
        const isHeadersValid = result.every((item) => Object.keys(item).join(',') === DEFAULT_CONFIG.voteResults.headers.join(','))

        expect(result).toStrictEqual(expected)
        expect(isHeadersValid).toBeTruthy()
    })


    it('should return an array with valid votes', async () => {
        spyCSVReader.mockResolvedValue(DEFAULT_CONFIG.votes.mock);
        const result = await dbClient.votes()

        const expected = DEFAULT_CONFIG.votes.mock;
        const isHeadersValid = result.every((item) => Object.keys(item).join(',') === DEFAULT_CONFIG.votes.headers.join(','))

        expect(result).toStrictEqual(expected)
        expect(isHeadersValid).toBeTruthy()
    })

})