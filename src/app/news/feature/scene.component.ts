import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend, NgtBeforeRenderEvent } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
  standalone: true,
  template: `
    <ngt-ambient-light [intensity]="0.5" />
    <ngt-spot-light [position]="10" [angle]="0.15" [penumbra]="1" />
    <ngt-point-light [position]="-10" />
    <ngt-mesh (beforeRender)="onBeforeRender($any($event))"
      [scale]="2">
      <ngt-box-geometry />
      <ngt-mesh-standard-material [color]="'red'" />
    </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Scene {
  onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
    event.object.rotation.x += 0.01;
  }
}
