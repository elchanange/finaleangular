import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastpostComponent } from './fastpost.component';

describe('FastpostComponent', () => {
  let component: FastpostComponent;
  let fixture: ComponentFixture<FastpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
