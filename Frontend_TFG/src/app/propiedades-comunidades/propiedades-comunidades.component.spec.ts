import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropiedadesComunidadesComponent } from './propiedades-comunidades.component';

describe('PropiedadesComunidadesComponent', () => {
  let component: PropiedadesComunidadesComponent;
  let fixture: ComponentFixture<PropiedadesComunidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PropiedadesComunidadesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropiedadesComunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
