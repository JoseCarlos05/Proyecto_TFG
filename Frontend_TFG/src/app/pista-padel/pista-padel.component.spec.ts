import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PistaPadelComponent } from './pista-padel.component';

describe('PistaPadelComponent', () => {
  let component: PistaPadelComponent;
  let fixture: ComponentFixture<PistaPadelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PistaPadelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PistaPadelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
