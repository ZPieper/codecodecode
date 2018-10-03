import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequotesComponent } from './createquotes.component';

describe('CreatequotesComponent', () => {
  let component: CreatequotesComponent;
  let fixture: ComponentFixture<CreatequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
