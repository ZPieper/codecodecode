import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditauthComponent } from './editauth.component';

describe('EditauthComponent', () => {
  let component: EditauthComponent;
  let fixture: ComponentFixture<EditauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
