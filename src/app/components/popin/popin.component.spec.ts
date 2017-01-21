/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PopinComponent } from './popin.component';

describe('PopinComponent', () => {
  let component: PopinComponent;
  let fixture: ComponentFixture<PopinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
