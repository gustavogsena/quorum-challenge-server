import fsSync from 'node:fs'
import Papa from 'papaparse'
import { Service } from 'typedi'
import * as changeCase from "change-case";

export type CSV_READER_DEFAULT_OPTIONS = {
    csvToJSON: {
        options: {
            encoding: BufferEncoding
        }
    }
}

type CSV_TYPE_PARSER = typeof Papa;

@Service()
class CSVReader {
    private readonly csvParser: CSV_TYPE_PARSER;

    constructor(parser: CSV_TYPE_PARSER) {
        this.csvParser = parser ?? Papa
    }

    async csvToJSON<T>(filePath: string, options: CSV_READER_DEFAULT_OPTIONS['csvToJSON']['options'] = { encoding: 'utf8' }): Promise<T[]> {
        if (!fsSync.existsSync(filePath)) return [];

        const csvFile = fsSync.readFileSync(filePath, options);

        const result = this.csvParser.parse(csvFile, {
            header: true,
            transformHeader: (header) => changeCase.camelCase(header),
            dynamicTyping: true,
        });

        return result.data as T[]
    }
}

export default CSVReader;