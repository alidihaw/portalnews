import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AppData } from '../../app.data';
import { Store } from '@ngxs/store';
import { NewsState } from '../[data]/news.state';
import * as THREE from 'three';
import { extend, NgtBeforeRenderEvent } from 'angular-three';
import { NgtCanvas } from 'angular-three';
import { Scene } from './scene.component';

extend(THREE);
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgtCanvas],
  providers: [],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  readonly Scene = Scene;
  $stories = inject(Store).select(NewsState.getStories);
  $articles = inject(Store).select(NewsState.getDatas);

  constructor(
    private router: Router,
    public appData: AppData,
  ) {
  }

  async ngOnInit() {
  }

  goToLink(url: string) {
    this.router.navigateByUrl('/detail/' + url);
  }
  goBack() {
    this.router.navigateByUrl('/');
  }
}
