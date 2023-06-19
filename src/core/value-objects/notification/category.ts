import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';
//import { NotificationCategoryEnum } from '../../../shared/enums/notification-category.enum';

export class Category {
  private readonly category: string;

  constructor(category: string) {
    const isValidLength = this.validateCategoryLength(category);

    if (!isValidLength) {
      throw new Error('Category must have at least 1 character');
    }

    const isValidName = this.validateCategoryName(category);

    if (!isValidName) {
      throw new Error(`Category name ${category} is not valid`);
    }

    this.category = category.toLowerCase();
  }

  public get value(): string {
    return this.category;
  }

  private validateCategoryName(category: string): boolean {
    return Object.values<string>(NotificationCategoryEnum).includes(category);
  }

  private validateCategoryLength(category: string): boolean {
    return category.length > 0;
  }
}
