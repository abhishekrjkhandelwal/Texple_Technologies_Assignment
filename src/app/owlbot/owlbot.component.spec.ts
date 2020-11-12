import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlbotComponent } from './owlbot.component';

describe('OwlbotComponent', () => {
  let component: OwlbotComponent;
  let fixture: ComponentFixture<OwlbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwlbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwlbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
