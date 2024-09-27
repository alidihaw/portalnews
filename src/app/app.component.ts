import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../@core/loader/loader/loader.component';
import { AppData } from './app.data';
import { NewsService } from './news/[data]/news.service';
import { Observable } from 'rxjs';
import { Scene } from './news/feature/scene.component';
import { NgtCanvas } from 'angular-three';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent, NgtCanvas],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  readonly Scene = Scene;
  constructor(
    public appData: AppData,
    private newsService: NewsService,
  ) {
    this.splashScreen();
  }

  async ngOnInit() {
    this.appData.changesIsLoading(true);
    await this.getTopNews();
    await this.getNews();
    setTimeout(() => {
      this.appData.changesIsLoading(false);
    }, 1000);
  }

  getTopNews() {
    return new Promise((resolve, reject) => {
      this.newsService.getTopNews().subscribe((r) => {
        return resolve(r);
      }, (error) => {
        return resolve([]);
      })
    });
  }
  
  getNews() {
    return new Promise((resolve, reject) => {
      this.newsService.getNews().subscribe((r) => {
        return resolve(r);
      }, (error) => {
        return resolve([]);
      })
    });
  }

  splashScreen() {
    let timeout = 500;
    const splashScreen = document?.getElementById('splashscreen');
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, timeout);
    }
  }
}
