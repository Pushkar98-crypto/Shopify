import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShoppingHomeComponent } from './user-shopping-home.component';

describe('UserShoppingHomeComponent', () => {
  let component: UserShoppingHomeComponent;
  let fixture: ComponentFixture<UserShoppingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShoppingHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShoppingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
