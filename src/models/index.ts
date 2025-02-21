export class Person {
    constructor(
        private _id: number,
        private _name: string
    ) { }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}

export class Bill {
    constructor(
        private _id: number,
        private _title: string,
        private _sponsorId: number
    ) { }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get sponsorId(): number {
        return this._sponsorId;
    }
}


export enum VoteType {
    YEA = 1,
    NAY = 2
}

export class VoteResult {
    constructor(
        private _id: number,
        private _legislatorId: number,
        private _voteId: number,
        private _voteType: VoteType
    ) { }

    get id(): number {
        return this._id;
    }

    get legislatorId(): number {
        return this._legislatorId;
    }

    get voteId(): number {
        return this._voteId;
    }

    get voteType(): VoteType {
        return this._voteType;
    }
}

export class Vote {
    constructor(
        private _id: number,
        private _billId: number
    ) { }

    get id(): number {
        return this._id;
    }

    get billId(): number {
        return this._billId;
    }
}