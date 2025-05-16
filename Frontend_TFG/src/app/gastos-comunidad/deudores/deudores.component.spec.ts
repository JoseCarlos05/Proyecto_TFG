import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeudoresComponent } from './deudores.component';

describe('DeudoresComponent', () => {
  let component: DeudoresComponent;
  let fixture: ComponentFixture<DeudoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeudoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeudoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
