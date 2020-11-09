import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrUpdateComponent } from './emr-update.component';

describe('EmrUpdateComponent', () => {
  let component: EmrUpdateComponent;
  let fixture: ComponentFixture<EmrUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
