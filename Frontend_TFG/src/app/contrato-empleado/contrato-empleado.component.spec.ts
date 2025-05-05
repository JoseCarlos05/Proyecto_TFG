import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContratoEmpleadoComponent } from './contrato-empleado.component';

describe('ContratoEmpleadoComponent', () => {
  let component: ContratoEmpleadoComponent;
  let fixture: ComponentFixture<ContratoEmpleadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContratoEmpleadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
