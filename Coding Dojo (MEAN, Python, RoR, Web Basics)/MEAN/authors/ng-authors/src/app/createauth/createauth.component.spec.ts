import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateauthComponent } from './createauth.component';

describe('CreateauthComponent', () => {
  let component: CreateauthComponent;
  let fixture: ComponentFixture<CreateauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
