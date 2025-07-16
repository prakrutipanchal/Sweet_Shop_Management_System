const Sweet = require('../src/models/Sweet');

describe('Sweet', () => {
  test('should create a sweet with all required properties', () => {
    const sweet = new Sweet(1, 'Chocolate Bar', 'chocolate', 1.99, 50);
    
    expect(sweet.id).toBe(1);
    expect(sweet.name).toBe('Chocolate Bar');
    expect(sweet.category).toBe('chocolate');
    expect(sweet.price).toBe(1.99);
    expect(sweet.quantity).toBe(50);
  });

  test('should throw error when quantity is negative', () => {
    expect(() => new Sweet(1, 'Chocolate Bar', 'chocolate', 1.99, -1))
      .toThrow('Quantity cannot be negative');
  });

  test('should throw error when price is negative', () => {
    expect(() => new Sweet(1, 'Chocolate Bar', 'chocolate', -1.99, 10))
      .toThrow('Price cannot be negative');
  });
});