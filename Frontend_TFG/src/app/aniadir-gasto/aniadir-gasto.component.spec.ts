import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AniadirGastoComponent } from './aniadir-gasto.component';

describe('AniadirGastoComponent', () => {
  let component: AniadirGastoComponent;
  let fixture: ComponentFixture<AniadirGastoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AniadirGastoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
