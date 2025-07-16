class Sweet 
{
  constructor(id, name, category, price, quantity) 
  {
    if (quantity < 0) throw new Error('Quantity cannot be negative');
    if (price < 0) throw new Error('Price cannot be negative');
    
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  updateDetails({ name, category, price, quantity }) 
  {  
    if (name) this.name = name;
    if (category) this.category = category;
    
    if (price !== undefined) 
    {
      if (price < 0) throw new Error('Price cannot be negative');
      this.price = price;  
    }
    
    if (quantity !== undefined) 
    {
      if (quantity < 0) throw new Error('Quantity cannot be negative');
      this.quantity = quantity; 
    }
  }
}

module.exports = Sweet;