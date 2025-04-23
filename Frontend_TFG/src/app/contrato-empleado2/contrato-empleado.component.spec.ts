import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContratoEmpleadoComponent2 } from './contrato-empleado.component';

describe('ContratoEmpleadoComponent', () => {
  let component: ContratoEmpleadoComponent2;
  let fixture: ComponentFixture<ContratoEmpleadoComponent2>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContratoEmpleadoComponent2],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoEmpleadoComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
