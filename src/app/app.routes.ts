import { Routes } from '@angular/router';
import { NotFoundComponent } from './notfound/notfound.component';
import { NewsComponent } from './news/feature/news.component';
import { NewsDetailComponent } from './news/ui/newsdetail/newsdetail.component';

export const routes: Routes = [ 
    {  
        path: '',
        component: NewsComponent,
        canActivate: [],
    },
    {  
        path: 'detail/:id',
        component: NewsDetailComponent,
        canActivate: []
    },
    {  
        path: '404',
        component: NotFoundComponent,
        canActivate: []
    },
    { path: '**', redirectTo: '/404' },
];
