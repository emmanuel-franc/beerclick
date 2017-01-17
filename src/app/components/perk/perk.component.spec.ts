/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerkComponent } from './perk.component';

describe('PerkComponent', () => {
  let component: PerkComponent;
  let fixture: ComponentFixture<PerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
