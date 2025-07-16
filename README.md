Sweet Shop Management System

A Node.js inventory management system for a sweet shop, built with Test-Driven Development (TDD) and clean architecture principles.

## Features
- **CRUD Operations**: Add, view, update, and delete sweets
- **Inventory Management**: Purchase/restock with quantity validation
- **Search & Sort**: Filter by name, category, or price range
- **Error Handling**: Custom exceptions for business rules
- **100% Test Coverage**: Jest unit tests for all features

## Tech Stack
- **Runtime**: Node.js (v18+)
- **Testing**: Jest (v30)
- **Architecture**: MVC pattern

## Project Structure

<img width="445" height="199" alt="image" src="https://github.com/user-attachments/assets/b2456cee-e898-4580-a673-9b5ac88a93e2" />


## Installation
1. Clone the repo:
   ```bash
   https://github.com/prakrutipanchal/Sweet_Shop_Management_System.git
   cd sweet-shop

2. Install dependencies:
   npm install

## Running Tests
  npm test

## Sample Output

   PASS  tests/Sweet.test.js
   PASS  tests/Inventory.test.js
  
  Test Suites: 2 passed, 2 total
  Tests:       14 passed, 14 total

## Usage Examples

1. Initialize Inventory:
   
  const Inventory = require('./src/models/Inventory');
  const Sweet = require('./src/models/Sweet');
  
  const inventory = new Inventory();
  const chocolate = new Sweet(1, 'Chocolate Bar', 'chocolate', 1.99, 50);

2. Core Operations:
   
   // Add sweet
   
  inventory.addSweet(chocolate);
  
  // Purchase 10 units
  
  inventory.purchaseSweet(1, 10); 
  
  // Restock
  
  inventory.restockSweet(1, 20);
  
  // Search
  
  const results = inventory.searchSweets({ 
    category: 'chocolate', 
    maxPrice: 2.00 
  });
    
       
