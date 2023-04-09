import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDivComponent } from './post-div.component';

describe('PostDivComponent', () => {
  let component: PostDivComponent;
  let fixture: ComponentFixture<PostDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
