import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGraphicsComponent } from './image-graphics.component';

describe('ImageGraphicsComponent', () => {
  let component: ImageGraphicsComponent;
  let fixture: ComponentFixture<ImageGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGraphicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
