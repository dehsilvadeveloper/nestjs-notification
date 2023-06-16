import { ContentEntity } from './content.entity';

describe('Entity ContentEntity', () => {
  it('should create', () => {
    const content = new ContentEntity('You received a friendship solicitation.');

    expect(content).toBeTruthy();
  });

  it('should not create without characters', () => {
    expect(() => {
      new ContentEntity('');
    }).toThrow('Content must be between 1 and 255 characters');
  });

  it('should not create with more than 255 characters', () => {
    expect(() => {
      new ContentEntity('a'.repeat(300));
    }).toThrow('Content must be between 1 and 255 characters');
  });
});
