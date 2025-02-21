
import path from "path";

export const CONSTANTS = {
    paths: {
        bills: path.resolve(__dirname, '../database/bills.csv'),
        legislators: path.resolve(__dirname, '../database/legislators.csv'),
        vote_results: path.resolve(__dirname, '../database/vote_results.csv'),
        votes: path.resolve(__dirname, '../database/votes.csv'),
    },
    status: {
        success: 'success',
        error: 'error',
    }
}