import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-cup',
  standalone: true,
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private cup!: THREE.Group;

  ngOnInit(): void {
    // Initialization can be done here if necessary
  }

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }

  private initThree() {
    // Crear la escena
    this.scene = new THREE.Scene();

    // Configurar el renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Configurar la cámara
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(10, 15, 20);
    this.scene.add(this.camera);

    // Configurar los controles
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Añadir luz ambiental y luz puntual
    this.scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // Crear la geometría de la taza
    this.cup = new THREE.Group();

    // Crear el cuerpo de la taza
    const cupGeometry = new THREE.CylinderGeometry(5, 5, 10, 32, 1, true); // cuerpo hueco
    const cupMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0bd, side: THREE.DoubleSide });
    const cupMesh = new THREE.Mesh(cupGeometry, cupMaterial);
    cupMesh.position.y = 5;  // Elevar la taza para que quede sobre el plano

    // Crear el fondo de la taza
    const baseGeometry = new THREE.CircleGeometry(5, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0bd });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.rotation.x = -Math.PI / 2; // Rotar para que quede horizontal
    baseMesh.position.y = 0;

    // Crear el asa de la taza
    const handleGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0bd });
    const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
    handleMesh.position.set(6, 5, 0); // Posicionar a la derecha del cuerpo de la taza
    handleMesh.rotation.z = Math.PI / 2;

    // Añadir todas las partes al grupo de la taza
    this.cup.add(cupMesh);
    this.cup.add(baseMesh);
    this.cup.add(handleMesh);
    this.scene.add(this.cup);
  }

  // Método de animación
  private animate() {
    requestAnimationFrame(() => this.animate());
    this.cup.rotation.y += 0.01;  // Rotar la taza
    this.renderer.render(this.scene, this.camera);
  }

  // Ajuste del tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
