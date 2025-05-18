import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificacionesComunidadComponent } from './notificaciones-comunidad.component';

describe('NotificacionesComunidadComponent', () => {
  let component: NotificacionesComunidadComponent;
  let fixture: ComponentFixture<NotificacionesComunidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NotificacionesComunidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
