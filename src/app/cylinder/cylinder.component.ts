import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cylinder',
  standalone: true,
  imports: [],
  templateUrl: './cylinder.component.html',
  styleUrl: './cylinder.component.scss'
})
export class CylinderComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic that does not depend on ViewChild references
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.animate();
  }

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cylinder!: THREE.Mesh;

  private createScene(): void {
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    // this.renderer.setSize(width, height);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Cylinder
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32); // (radiusTop, radiusBottom, height, radialSegments)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cylinder = new THREE.Mesh(geometry, material);
    this.scene.add(this.cylinder);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.cylinder.rotation.x += 0.01;
    this.cylinder.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
