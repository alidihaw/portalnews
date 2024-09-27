import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppData } from '../../../app.data';
import { Store } from '@ngxs/store';
import { NewsState } from '../../[data]/news.state';
import { News } from '../../[data]/news.interface';
import { first } from 'rxjs';
import { NgtCanvas } from 'angular-three';
import { Scene } from '../../feature/scene.component';

@Component({
  selector: 'app-newsdetail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgtCanvas],
  providers: [],
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsDetailComponent {
  readonly Scene = Scene;
  $stories = inject(Store).select(NewsState.getStories);
  $articles = inject(Store).select(NewsState.getDatas);

  article!: News.Entity;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appData: AppData,
  ) {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.goBack();
    }
    this.$articles?.subscribe((a) => {
      if (a?.length > 0) {
        const article = a.find((i) => i.id === id);
        console.log("article", article, a, id);
        if (!article) {
          this.goBack();
          return;
        }
        this.article = article!;
      }
    })
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
