import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PonerComunicadosComponent } from './poner-comunicados.component';

describe('PonerComunicadosComponent', () => {
  let component: PonerComunicadosComponent;
  let fixture: ComponentFixture<PonerComunicadosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PonerComunicadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PonerComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
