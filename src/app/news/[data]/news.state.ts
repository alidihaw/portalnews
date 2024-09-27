import { Injectable } from '@angular/core';
import { State, StateContext, Selector, NgxsOnInit, NgxsSimpleChange, NgxsOnChanges, Action } from '@ngxs/store';
import { NewsAction } from './news.action';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { News } from './news.interface';
import { clone } from '../../app.utils';

export interface NewsStateModel {
    datas: News.Entity[];
    stories: News.Stories[];
    news: News.Entity | null;
    loaded: boolean;
}

@State<NewsStateModel>({
    name: 'news',
    defaults: {
        datas: [],
        stories: [],
        news: null,
        loaded: false,
    },
})
@Injectable()
export class NewsState implements NgxsOnInit, NgxsOnChanges {
    @Selector()
    static getDatas(state: NewsStateModel) {
        return state.datas;
    }
    @Selector()
    static getStories(state: NewsStateModel) {
        return state.stories;
    }

    @Selector()
    static getNews(state: NewsStateModel) {
        return state.news;
    }

    @Selector()
    static hasLoaded(state: NewsStateModel) {
        return state.loaded;
    }

    constructor() {}

    ngxsOnInit(ctx: StateContext<NewsStateModel>): void {
        console.log('ngxsOnInit');
    }

    ngxsOnChanges(change: NgxsSimpleChange) {
        console.log('prev state', change.previousValue);
        console.log('next state', change.currentValue);
    }

    @Action(NewsAction.SetNews)
    async setNews({ getState, patchState }: StateContext<NewsStateModel>, { news }: NewsAction.SetNews) {
        const state = getState();
        patchState({
            news: news,
            loaded: true,
        });
    }

    @Action(NewsAction.ClearNews)
    async clearNews({ getState, patchState }: StateContext<NewsStateModel>, { }: NewsAction.ClearNews) {
        const state = getState();
        patchState({
            news: null,
            loaded: false,
        });
    }

    @Action(NewsAction.SetAll)
    async setAll({ getState, patchState }: StateContext<NewsStateModel>, { datas }: NewsAction.SetAll) {
        const state = getState();
        patchState({
            datas: datas,
            loaded: true,
        });
    }

    @Action(NewsAction.SetAllStories)
    async SetAllStories({ getState, patchState }: StateContext<NewsStateModel>, { datas }: NewsAction.SetAllStories) {
        const state = getState();
        patchState({
            stories: datas,
            loaded: true,
        });
    }
    
    @Action(NewsAction.UpsertAll)
    async upsertAll({ getState, patchState }: StateContext<NewsStateModel>, { datas }: NewsAction.UpsertAll) {
        const state = getState();
        const itemExists = clone(state.datas) || [];
        datas?.forEach((i, index) => {
            const findIndex = itemExists.findIndex((e) => e._id === i._id);
            if (findIndex !== -1) {
                itemExists[findIndex] = i;
            } else {
                itemExists.push(i);
            }
        });

        patchState({
            datas: itemExists,
            loaded: true,
        });
    }

    @Action(NewsAction.ClearAll)
    async clearAll({ getState, patchState }: StateContext<NewsStateModel>, { }: NewsAction.ClearAll) {
        const state = getState();
        patchState({
            datas: [],
            loaded: false,
        });
    }

    @Action(NewsAction.Create)
    async create({ getState, patchState, setState }: StateContext<NewsStateModel>, { news }: NewsAction.Create) {
        console.log("create", news);
        const state = getState();
        setState(
            patch({
                datas: insertItem(news),
                loaded: true,
            }),
        );
    }

    @Action(NewsAction.Update)
    async update({ getState, patchState, setState }: StateContext<NewsStateModel>, { news }: NewsAction.Update) {
        console.log("update", news);
        const state = getState();
        setState(
            patch({
                datas: updateItem(item => item._id === news._id, patch(news)),
                loaded: true,
            }),
        );
    }

    @Action(NewsAction.Delete)
    async delete({ getState, patchState, setState }: StateContext<NewsStateModel>, { news }: NewsAction.Delete) {
        console.log("delete", news);
        const state = getState();
        setState(
            patch({
                datas: removeItem<News.Entity>((item) => item._id === news._id),
                loaded: true,
            }),
        );
    }
}
