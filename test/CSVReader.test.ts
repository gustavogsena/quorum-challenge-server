import 'reflect-metadata';
import { beforeEach } from 'node:test';
import Container from 'typedi';
import { describe, expect, it, vitest } from 'vitest';
import path from "path";
import { CSVReader } from '@src/utils';

const DEFAULT_CONFIG = {
    paths: {
        emptyFile: path.resolve(__dirname, './mocks/emptyFile.csv'),
        validFile: path.resolve(__dirname, './mocks/validFile.csv'),
        notExists: path.resolve(__dirname, './mocks/notExists.csv'),
    }
}

describe('#CSVReader Suite Test', () => {
    const csvReader = Container.get(CSVReader)

    beforeEach(() => {
        vitest.resetAllMocks()
    })

    describe('#csvToJSON', () => {
        it('should return an empty array for an empty file', async () => {
            const filePath = DEFAULT_CONFIG.paths.emptyFile
            const result = await csvReader.csvToJSON(filePath)
            expect(result).toStrictEqual([])
        })

        it('should return an empty array for an empty file', async () => {
            const filePath = DEFAULT_CONFIG.paths.validFile
            const result = await csvReader.csvToJSON(filePath)
            const expected = [
                { id: 1, name: 'Pedro', profession: ' Developer', age: 55 },
                { id: 2, name: 'Gabriel', profession: ' Manager', age: 30 },
                { id: 3, name: 'Maria', profession: ' QA', age: 25 },
                { id: 4, name: 'Ricardo', profession: ' P.O', age: 35 },
                { id: 5, name: 'Julia', profession: ' Suporte', age: 25 }
            ]
            expect(result.length).toStrictEqual(5)
            expect(result).toStrictEqual(expected)
        })

        it('should return an empty array if file does not exist', async () => {
            const filePath = DEFAULT_CONFIG.paths.notExists
            const result = await csvReader.csvToJSON(filePath)
            const expected: any[] = []
            expect(result.length).toStrictEqual(0)
            expect(result).toStrictEqual(expected)
        })
    })
})