import { News } from "./news.interface";

export namespace NewsAction {
    export class SetNews {
        static readonly type = '[News] Set News';
        constructor(public news: News.Entity) {}
    }
    export class ClearNews {
        static readonly type = '[News] Clear News';
        constructor() {}
    }
    export class SetAllStories {
        static readonly type = '[News] Set All Stories';
        constructor(public datas: News.Stories[]) {}
    }
    export class SetAll {
        static readonly type = '[News] Set All';
        constructor(public datas: News.Entity[]) {}
    }
    export class UpsertAll {
        static readonly type = '[News] Upsert All';
        constructor(public datas: News.Entity[]) {}
    }
    export class ClearAll {
        static readonly type = '[News] Clear All';
        constructor() {}
    }
    export class Create {
        static readonly type = '[News] Create';
        constructor(public news: News.Entity) {}
    }
    export class Update {
        static readonly type = '[News] Update';
        constructor(public news: News.Entity) {}
    }
    export class Delete {
        static readonly type = '[News] Delete';
        constructor(public news: News.Entity) {}
    }
}
