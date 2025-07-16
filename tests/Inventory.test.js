const Inventory = require('../src/models/Inventory');
const Sweet = require('../src/models/Sweet');
const OutOfStockError = require('../src/exceptions/OutOfStockError');

describe('Inventory', () => {
  let inventory;
  let chocolate, candy, pastry;

  beforeEach(() => 
  {
    inventory = new Inventory();
    chocolate = new Sweet(1, 'Chocolate Bar', 'chocolate', 1.99, 50);
    candy = new Sweet(2, 'Gummy Bears', 'candy', 0.99, 100);
    pastry = new Sweet(3, 'Croissant', 'pastry', 2.49, 30);
  });


  test('should add sweet to inventory', () => 
  {
    inventory.addSweet(chocolate);
    expect(inventory.getAllSweets()).toContain(chocolate);
    expect(inventory.getSweetById(1)).toEqual(chocolate);
  });


  test('should remove sweet from inventory', () => 
  {
    inventory.addSweet(chocolate);
    inventory.deleteSweet(1);
    expect(inventory.getAllSweets()).not.toContain(chocolate);
  });

  test('should return all sweets', () => 
  {
    inventory.addSweet(chocolate);
    inventory.addSweet(candy);
    expect(inventory.getAllSweets().length).toEqual(2);
  });

  test('should search sweets by name', () => 
  {
    inventory.addSweet(chocolate);
    inventory.addSweet(candy);
    const results = inventory.searchSweets({ name: 'Gummy' });
    expect(results.length).toEqual(1);
    expect(results[0]).toEqual(candy);
  });

  test('should search sweets by category', () => 
  {
    inventory.addSweet(chocolate);
    inventory.addSweet(candy);
    const results = inventory.searchSweets({ category: 'candy' });
    expect(results.length).toEqual(1);
    expect(results[0]).toEqual(candy);
  });

  test('should search sweets by price range', () => 
  {
    inventory.addSweet(chocolate);
    inventory.addSweet(candy);
    inventory.addSweet(pastry);
    const results = inventory.searchSweets({ minPrice: 1, maxPrice: 2 });
    expect(results.length).toEqual(1);
    expect(results[0]).toEqual(chocolate);
  });

  test('should sort sweets by price ascending', () => 
  {
    inventory.addSweet(chocolate);
    inventory.addSweet(candy);
    inventory.addSweet(pastry);
    const sorted = inventory.sortSweets('price', 'asc');
    expect(sorted[0]).toEqual(candy);
    expect(sorted[1]).toEqual(chocolate);
    expect(sorted[2]).toEqual(pastry);
  });

  test('should decrease quantity when purchasing', () => 
  {
    inventory.addSweet(chocolate);
    inventory.purchaseSweet(1, 10);
    expect(chocolate.quantity).toEqual(40);
  });

  test('should throw error when not enough stock', () => 
  {
    inventory.addSweet(chocolate);
    expect(() => inventory.purchaseSweet(1, 60)).toThrow(OutOfStockError);
  });

  test('should increase quantity when restocking', () => 
  {
    inventory.addSweet(chocolate);
    inventory.restockSweet(1, 20);
    expect(chocolate.quantity).toEqual(70);
  });

  test('should update sweet details', () => 
  {
    inventory.addSweet(chocolate);
    inventory.updateSweet(1, { name: 'Premium Chocolate', price: 2.49 });
    expect(chocolate.name).toEqual('Premium Chocolate');
    expect(chocolate.price).toEqual(2.49);
  });
  
});