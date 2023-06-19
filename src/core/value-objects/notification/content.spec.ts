import { Content } from './content';

describe('Value Object Content', () => {
  it('should create', () => {
    const content = new Content('You received a friendship solicitation.');

    expect(content).toBeTruthy();
  });

  it('should not create without characters', () => {
    expect(() => {
      new Content('');
    }).toThrow('Content must be between 1 and 255 characters');
  });

  it('should not create with more than 255 characters', () => {
    expect(() => {
      new Content('a'.repeat(300));
    }).toThrow('Content must be between 1 and 255 characters');
  });
});
