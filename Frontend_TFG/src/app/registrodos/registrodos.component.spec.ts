import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrodosComponent } from './registrodos.component';

describe('RegistrodosComponent', () => {
  let component: RegistrodosComponent;
  let fixture: ComponentFixture<RegistrodosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RegistrodosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
