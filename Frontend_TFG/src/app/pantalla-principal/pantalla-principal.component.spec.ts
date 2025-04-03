import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PantallaPrincipalComponent } from './pantalla-principal.component';

describe('PantallaPrincipalComponent', () => {
  let component: PantallaPrincipalComponent;
  let fixture: ComponentFixture<PantallaPrincipalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PantallaPrincipalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
