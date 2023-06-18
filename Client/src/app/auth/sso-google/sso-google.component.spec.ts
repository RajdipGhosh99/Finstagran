import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoGoogleComponent } from './sso-google.component';

describe('SsoGoogleComponent', () => {
  let component: SsoGoogleComponent;
  let fixture: ComponentFixture<SsoGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsoGoogleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsoGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
