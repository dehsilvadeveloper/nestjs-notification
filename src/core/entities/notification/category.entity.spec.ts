import { CategoryEntity } from './category.entity';
import { NotificationCategoryEnum } from '../../../shared/enums/notification-category.enum';

describe('Entity CategoryEntity', () => {
  it('should create', () => {
    const content = new CategoryEntity(NotificationCategoryEnum.social);

    expect(content).toBeTruthy();
  });

  it('should not create without characters', () => {
    expect(() => {
      new CategoryEntity('');
    }).toThrow('Category must have at least 1 character');
  });

  it('should not create with invalid category name', () => {
    const invalidCategoryName = 'gaming';

    expect(() => {
      new CategoryEntity(invalidCategoryName);
    }).toThrow(`Category name ${invalidCategoryName} is not valid`);
  });
});
