import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAccountDetailComponent } from './personal-account-detail.component';

describe('PersonalAccountDetailComponent', () => {
  let component: PersonalAccountDetailComponent;
  let fixture: ComponentFixture<PersonalAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalAccountDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
