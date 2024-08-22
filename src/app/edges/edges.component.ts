import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

@Component({
  selector: 'app-edges',
  standalone: true,
  imports: [],
  templateUrl: './edges.component.html',
  styleUrl: './edges.component.scss'
})
export class EdgesComponent implements OnInit, AfterViewInit {

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

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(15, 20, 30);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add(new THREE.AmbientLight(0x666666));
    const light = new THREE.PointLight(0xffffff, 3, 0, 0);
    camera.add(light);
    scene.add(new THREE.AxesHelper(20));

    const loader = new THREE.TextureLoader();
    const texture = loader.load('textures/disc.png');
    texture.colorSpace = THREE.SRGBColorSpace;

    const group = new THREE.Group();
    scene.add(group);

    let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);
    dodecahedronGeometry.deleteAttribute('normal');
    dodecahedronGeometry.deleteAttribute('uv');
    dodecahedronGeometry = BufferGeometryUtils.mergeVertices(dodecahedronGeometry);

    const vertices: THREE.Vector3[] = [];
    const positionAttribute = dodecahedronGeometry.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      vertices.push(vertex);
    }

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x0080ff,
      map: texture,
      size: 1,
      alphaTest: 0.5
    });

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.5,
      side: THREE.DoubleSide,
      transparent: true
    });

    const meshGeometry = new ConvexGeometry(vertices);
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    group.add(mesh);

    function animate() {
      group.rotation.y += 0.005;
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
