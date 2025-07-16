const OutOfStockError = require('../exceptions/OutOfStockError');
const Sweet = require('./Sweet');

class Inventory 
{
  constructor() 
  {
    this.sweets = [];
    this.nextId = 1;
  }

  addSweet(sweet) 
  {
    if (!(sweet instanceof Sweet)) throw new Error('Invalid sweet type');

    sweet.id = this.nextId++;
    this.sweets.push(sweet);
    return sweet.id;
  }

  deleteSweet(id) 
  {
    this.sweets = this.sweets.filter(sweet => sweet.id !== id);
  }

  getSweetById(id) 
  {
    return this.sweets.find(s => s.id === id);
  }

  getAllSweets() 
  {
    return [...this.sweets]; 
  }

  updateSweet(id, updates) 
  {
    const sweet = this.sweets.find(s => s.id === id); 
    if (!sweet) throw new Error('Sweet not found');
    sweet.updateDetails(updates); 
  }

  searchSweets({ name, category, minPrice, maxPrice }) 
  {
    return this.sweets.filter(sweet => 
    {
      const nameMatch = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
      const categoryMatch = category ? sweet.category === category : true;
      const minPriceMatch = minPrice !== undefined ? sweet.price >= minPrice : true;
      const maxPriceMatch = maxPrice !== undefined ? sweet.price <= maxPrice : true;
      
      return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
    });
  }

  sortSweets(by = 'name', order = 'asc') 
  {
    const sorted = [...this.sweets];
    sorted.sort((a, b) => {
      let comparison = 0;
      if (a[by] > b[by]) comparison = 1;
      if (a[by] < b[by]) comparison = -1;
      
      return order === 'desc' ? -comparison : comparison;
    });
    return sorted;
  }

  purchaseSweet(id, quantity) 
  {
    const sweet = this.getSweetById(id);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < quantity) {
      throw new OutOfStockError(`Not enough stock for ${sweet.name}. Available: ${sweet.quantity}`);
    }
    sweet.quantity -= quantity;
  }

  restockSweet(id, quantity) 
  {
    const sweet = this.getSweetById(id);
    if (!sweet) throw new Error('Sweet not found');
    sweet.quantity += quantity;
  }
}

module.exports = Inventory;