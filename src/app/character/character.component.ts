import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  private initThreeJS(): void {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasRef.nativeElement.appendChild(renderer.domElement);
    renderer.setClearColor(0x87CEEB);  

    const camera =new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(40, 30, 90);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.PointLight(0xffffff, 3, 0, 0);
    camera.add(light);

    // Crear cuerpo (cilindro)
    const bodyGeometry = new THREE.CylinderGeometry(5, 5, 15, 32);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x6495ED });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 7.5; // Centrar el cuerpo
    scene.add(body);

    // Crear cabeza (semiesfera)
    const headGeometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x6495ED });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 15; // Colocar la cabeza sobre el cuerpo
    scene.add(head);

    // Ojos
    const eyeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-2, 18, 4.5);
    scene.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(2, 18, 4.5);
    scene.add(rightEye);

    // Pupilas
    const pupilGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-2, 18, 5.5);
    scene.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(2, 18, 5.5);
    scene.add(rightPupil);

    // Boca (Arco)
    const curve = new THREE.EllipseCurve(
      0, 0, // Centro
      2, 1, // Radio x e y
      0, Math.PI, // Angulo de inicio y final
      false, // Sentido horario
      0 // Rotación
    );
    const points = curve.getPoints(50);
    const mouthGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const mouthMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const mouth = new THREE.Line(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 13, 5);
    mouth.rotation.x = Math.PI;
    scene.add(mouth);
    

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
