import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { SphereComponent } from './sphere/sphere.component';
import { CupComponent } from './cup/cup.component';
import { CylinderComponent } from './cylinder/cylinder.component';
import { ImageGraphicsComponent } from './image-graphics/image-graphics.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CubeComponent, 
    SphereComponent, 
    CupComponent, 
    CylinderComponent,
    ImageGraphicsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'product-configurator';
}
