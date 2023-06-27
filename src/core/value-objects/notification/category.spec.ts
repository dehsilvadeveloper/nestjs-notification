import { Category } from './category';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';

describe('Value Object Category', () => {
  it('should create', () => {
    const category = new Category(NotificationCategoryEnum.social);

    expect(category).toBeTruthy();
  });

  it('should not create without characters', () => {
    expect(() => {
      new Category('');
    }).toThrow('Category must have at least 1 character');
  });

  it('should not create with invalid category name', () => {
    const invalidCategoryName = 'gaming';

    expect(() => {
      new Category(invalidCategoryName);
    }).toThrow(`Category name ${invalidCategoryName} is not valid`);
  });
});
