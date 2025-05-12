import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PonerSancionesComponent } from './poner-sanciones.component';

describe('PonerSancionesComponent', () => {
  let component: PonerSancionesComponent;
  let fixture: ComponentFixture<PonerSancionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PonerSancionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PonerSancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
