import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrCreateComponent } from './emr-create.component';

describe('EmrCreateComponent', () => {
  let component: EmrCreateComponent;
  let fixture: ComponentFixture<EmrCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
