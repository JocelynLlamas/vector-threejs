import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-image-graphics',
  standalone: true,
  templateUrl: './image-graphics.component.html',
  styleUrls: ['./image-graphics.component.scss']
})
export class ImageGraphicsComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  ngAfterViewInit(): void {
    this.initThree();
  }

  initThree(): void {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.nativeElement, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 10);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: loader.load('textures/ball.png')
    });

    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.animate();
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
