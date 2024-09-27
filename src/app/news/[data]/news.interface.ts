
export namespace News {
    export interface Entity {
        _id: any;
        pub_date: string;
        uri: string;
        snippet: string;
        multimedia: any;
        headline?: any;
        id: any;
        source: string;
        lead_paragraph: string;
        abstract: string;
        url: string;
        web_url: string;
    }
    export interface Stories {
        title: string;
        published_date: string;
        multimedia: any;
        url: string;
    }
}