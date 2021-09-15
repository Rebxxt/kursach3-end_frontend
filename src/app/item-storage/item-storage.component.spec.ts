import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStorageComponent } from './item-storage.component';

describe('ItemStorageComponent', () => {
  let component: ItemStorageComponent;
  let fixture: ComponentFixture<ItemStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
