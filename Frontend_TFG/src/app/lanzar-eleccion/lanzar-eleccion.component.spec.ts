import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanzarEleccionComponent } from './lanzar-eleccion.component';

describe('LanzarEleccionComponent', () => {
  let component: LanzarEleccionComponent;
  let fixture: ComponentFixture<LanzarEleccionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LanzarEleccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanzarEleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
