# Inheritance in Object-Oriented Programming

## Table of Contents
1. [What is Inheritance?](#what-is-inheritance)
2. [Key Benefits of Inheritance](#key-benefits-of-inheritance)
3. [Types of Inheritance](#types-of-inheritance)
4. [How Inheritance Works](#how-inheritance-works)
5. [The `this` and `super` Keywords](#the-this-and-super-keywords)
6. [Real-World Examples](#real-world-examples)
7. [Method Overriding](#method-overriding)
8. [Constructor Inheritance](#constructor-inheritance)
9. [Inheritance vs Composition](#inheritance-vs-composition)
10. [When to Use Inheritance](#when-to-use-inheritance)
11. [Best Practices](#best-practices)
12. [Common Pitfalls](#common-pitfalls)

---

## What is Inheritance?

**Inheritance** is a fundamental Object-Oriented Programming concept that allows:

- **Mechanism where a new class (derived class) inherits properties and behaviors from an existing class (base class)**
- **Promotes code reuse and the creation of hierarchical relationships between classes**
- **Allows the derived class to override or extend the functionalities of the base class**
- **Supports polymorphic behavior**
- **Reduces code redundancy and enhances code organization**

### Core Concept
Inheritance is a fundamental OOP concept where a class can inherit properties and methods from another class. JavaScript ES6 and TypeScript both support class-based inheritance. Inheritance allows you to create a hierarchy of classes, making the code more reusable and maintainable.

### Real-World Analogy
Think of a **Vehicle Management System**:
- The base `Vehicle` class holds common attributes like `brand`, `model`, `year` and methods like `start()`, `stop()`, `getInfo()`
- Specialized vehicles like `Car`, `Motorcycle`, `Truck` inherit from `Vehicle` but add type-specific behavior
- All specialized vehicles inherit common data and behaviors from the `Vehicle` class, but can extend functionality to suit their specific needs

---

## Key Benefits of Inheritance

### 1. **Code Reusability**
Write common logic once in the parent class and share it across all subclasses, following the DRY (Don't Repeat Yourself) principle.

### 2. **Hierarchical Relationships**
Create clear and intuitive hierarchies that model real-world "is-a" relationships.

### 3. **Polymorphic Behavior**
Objects of different subclasses can be treated uniformly through their common parent interface.

### 4. **Ease of Maintenance**
Bug fixes or changes in shared logic only need to be made in one place - the superclass.

### 5. **Code Organization**
Logical grouping of related functionality reduces complexity and improves readability.

---

## Types of Inheritance

Based on the inheritance patterns, there are several types:

### 1. **Single Inheritance**
A subclass inherits from only one superclass.
```
Super Class
    ↓
Sub Class
```

### 2. **Hierarchical Inheritance**
Multiple subclasses inherit from a single superclass.
```
    Super Class
   ↙    ↓    ↘
Sub1  Sub2  Sub3
```

### 3. **Multi-Level Inheritance**
A subclass inherits from another subclass, creating a chain.
```
Super Class
    ↓
Sub Class 1
    ↓
Sub Class 2
```

### 4. **Multiple Inheritance**
A subclass inherits from multiple superclasses (Not directly supported in TypeScript/JavaScript, but can be achieved through interfaces).
```
Super Class 1   Super Class 2
      ↘           ↙
       Sub Class
```

### 5. **Hybrid Inheritance**
A combination of multiple inheritance types (Not directly supported in TypeScript/JavaScript).

**Note**: TypeScript/JavaScript supports Single, Hierarchical, and Multi-Level inheritance directly. Multiple inheritance is achieved through interfaces and mixins.

---

## How Inheritance Works

When a class inherits from another:
- The subclass inherits all **public** and **protected** fields and methods of the superclass
- The subclass can **override** inherited methods to provide different implementation
- The subclass can **extend** by adding new fields and methods
- **Private** members of the parent class are not accessible in the child class

---

## The `this` and `super` Keywords

### The `this` Keyword
- **The `this` keyword refers to the current instance of the class or object**
- **It is a reference to the context in which a function is executed**
- **The value of `this` depends on how the function is called**

### The `super` Keyword
- **The `super` keyword is used in classes to access and call methods on an object's parent class**
- **It is especially useful in the context of inheritance**

### Example Usage:
```typescript
class Vehicle {
  protected brand: string;
  protected model: string;
  
  constructor(brand: string, model: string) {
    this.brand = brand;    // 'this' refers to current instance
    this.model = model;
  }
  
  start(): void {
    console.log(`${this.brand} ${this.model} is starting...`);
  }
  
  getInfo(): string {
    return `Vehicle: ${this.brand} ${this.model}`;
  }
}

class Car extends Vehicle {
  private doors: number;
  
  constructor(brand: string, model: string, doors: number) {
    super(brand, model);   // 'super' calls parent constructor
    this.doors = doors;    // 'this' refers to current Car instance
  }
  
  start(): void {
    super.start();         // 'super' calls parent method
    console.log("Car engine started with ignition key");
  }
  
  getInfo(): string {
    const parentInfo = super.getInfo();  // Get parent's info
    return `${parentInfo}, Doors: ${this.doors}`;
  }
}
```

---

## Real-World Examples

### Example 1: Employee Management System

```typescript
// Base class - Employee
class Employee {
  protected employeeId: string;
  protected name: string;
  protected email: string;
  protected baseSalary: number;
  
  constructor(id: string, name: string, email: string, baseSalary: number) {
    this.employeeId = id;
    this.name = name;
    this.email = email;
    this.baseSalary = baseSalary;
  }
  
  // Common method for all employees
  getEmployeeInfo(): string {
    return `ID: ${this.employeeId}, Name: ${this.name}, Email: ${this.email}`;
  }
  
  // Base salary calculation
  calculateSalary(): number {
    return this.baseSalary;
  }
  
  // Common work method
  work(): void {
    console.log(`${this.name} is working...`);
  }
}

// Derived class - Manager
class Manager extends Employee {
  private teamSize: number;
  private bonus: number;
  
  constructor(id: string, name: string, email: string, baseSalary: number, teamSize: number) {
    super(id, name, email, baseSalary);  // Call parent constructor
    this.teamSize = teamSize;
    this.bonus = 0.2 * baseSalary;       // 20% bonus for managers
  }
  
  // Override salary calculation
  calculateSalary(): number {
    const baseSalary = super.calculateSalary();  // Get base salary
    return baseSalary + this.bonus;              // Add manager bonus
  }
  
  // Manager-specific method
  manageTeam(): void {
    console.log(`${this.name} is managing a team of ${this.teamSize} members`);
  }
  
  // Override work method
  work(): void {
    super.work();  // Call parent work method
    console.log(`${this.name} is also handling management tasks`);
  }
}

// Derived class - Developer
class Developer extends Employee {
  private programmingLanguages: string[];
  private experienceYears: number;
  
  constructor(id: string, name: string, email: string, baseSalary: number, 
              languages: string[], experience: number) {
    super(id, name, email, baseSalary);
    this.programmingLanguages = languages;
    this.experienceYears = experience;
  }
  
  // Override salary calculation based on experience
  calculateSalary(): number {
    const baseSalary = super.calculateSalary();
    const experienceBonus = this.experienceYears * 1000;  // $1000 per year of experience
    return baseSalary + experienceBonus;
  }
  
  // Developer-specific method
  code(): void {
    console.log(`${this.name} is coding in: ${this.programmingLanguages.join(', ')}`);
  }
  
  // Override work method
  work(): void {
    super.work();
    console.log(`${this.name} is writing code and debugging`);
  }
}

// Further inheritance - Senior Developer
class SeniorDeveloper extends Developer {
  private mentees: number;
  
  constructor(id: string, name: string, email: string, baseSalary: number,
              languages: string[], experience: number, mentees: number) {
    super(id, name, email, baseSalary, languages, experience);
    this.mentees = mentees;
  }
  
  // Override salary calculation with senior bonus
  calculateSalary(): number {
    const developerSalary = super.calculateSalary();
    const seniorBonus = 5000;  // Additional senior bonus
    return developerSalary + seniorBonus;
  }
  
  // Senior developer specific method
  mentorJuniors(): void {
    console.log(`${this.name} is mentoring ${this.mentees} junior developers`);
  }
  
  // Override work method
  work(): void {
    super.work();
    console.log(`${this.name} is also doing code reviews and mentoring`);
  }
}
```

### Usage Example:
```typescript
// Create different types of employees
const manager = new Manager("M001", "Alice Johnson", "alice@company.com", 80000, 5);
const developer = new Developer("D001", "Bob Smith", "bob@company.com", 70000, ["TypeScript", "Python"], 3);
const seniorDev = new SeniorDeveloper("SD001", "Carol Brown", "carol@company.com", 90000, ["TypeScript", "Go", "Rust"], 8, 3);

// Polymorphism - treat all as Employee
const employees: Employee[] = [manager, developer, seniorDev];

employees.forEach(emp => {
  console.log(emp.getEmployeeInfo());
  console.log(`Salary: $${emp.calculateSalary()}`);
  emp.work();
  console.log("---");
});

// Use specific methods
manager.manageTeam();
developer.code();
seniorDev.mentorJuniors();
```

### Example 2: Banking System

```typescript
// Base class - Account
abstract class Account {
  protected accountNumber: string;
  protected accountHolder: string;
  protected balance: number;
  
  constructor(accountNumber: string, accountHolder: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }
  
  // Common methods for all accounts
  getAccountInfo(): string {
    return `Account: ${this.accountNumber}, Holder: ${this.accountHolder}, Balance: $${this.balance}`;
  }
  
  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
  }
  
  // Abstract method - must be implemented by subclasses
  abstract withdraw(amount: number): boolean;
  
  getBalance(): number {
    return this.balance;
  }
}

// Savings Account
class SavingsAccount extends Account {
  private interestRate: number;
  private minimumBalance: number;
  
  constructor(accountNumber: string, accountHolder: string, initialBalance: number, interestRate: number = 0.03) {
    super(accountNumber, accountHolder, initialBalance);
    this.interestRate = interestRate;
    this.minimumBalance = 500;  // Minimum balance required
  }
  
  // Implement abstract withdraw method
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("Invalid withdrawal amount");
      return false;
    }
    
    if (this.balance - amount < this.minimumBalance) {
      console.log(`Withdrawal failed. Minimum balance of $${this.minimumBalance} required`);
      return false;
    }
    
    this.balance -= amount;
    console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    return true;
  }
  
  // Savings account specific method
  addInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Interest added: $${interest.toFixed(2)}. New balance: $${this.balance.toFixed(2)}`);
  }
}

// Checking Account
class CheckingAccount extends Account {
  private overdraftLimit: number;
  private transactionFee: number;
  
  constructor(accountNumber: string, accountHolder: string, initialBalance: number, overdraftLimit: number = 1000) {
    super(accountNumber, accountHolder, initialBalance);
    this.overdraftLimit = overdraftLimit;
    this.transactionFee = 2.50;
  }
  
  // Implement abstract withdraw method
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("Invalid withdrawal amount");
      return false;
    }
    
    const totalAmount = amount + this.transactionFee;
    
    if (this.balance - totalAmount < -this.overdraftLimit) {
      console.log(`Withdrawal failed. Overdraft limit of $${this.overdraftLimit} exceeded`);
      return false;
    }
    
    this.balance -= totalAmount;
    console.log(`Withdrew $${amount} (+ $${this.transactionFee} fee). New balance: $${this.balance}`);
    return true;
  }
  
  // Checking account specific method
  writeCheck(amount: number, payee: string): boolean {
    console.log(`Writing check to ${payee} for $${amount}`);
    return this.withdraw(amount);
  }
}

// Business Account
class BusinessAccount extends CheckingAccount {
  private businessName: string;
  private monthlyTransactionLimit: number;
  private transactionCount: number;
  
  constructor(accountNumber: string, accountHolder: string, businessName: string, 
              initialBalance: number, overdraftLimit: number = 5000) {
    super(accountNumber, accountHolder, initialBalance, overdraftLimit);
    this.businessName = businessName;
    this.monthlyTransactionLimit = 100;
    this.transactionCount = 0;
  }
  
  // Override withdraw to add transaction limit check
  withdraw(amount: number): boolean {
    if (this.transactionCount >= this.monthlyTransactionLimit) {
      console.log("Monthly transaction limit exceeded");
      return false;
    }
    
    const success = super.withdraw(amount);  // Call parent withdraw
    if (success) {
      this.transactionCount++;
    }
    return success;
  }
  
  // Business account specific method
  generateMonthlyReport(): void {
    console.log(`=== Monthly Report for ${this.businessName} ===`);
    console.log(this.getAccountInfo());
    console.log(`Transactions this month: ${this.transactionCount}/${this.monthlyTransactionLimit}`);
  }
  
  // Reset monthly counters
  resetMonthlyCounters(): void {
    this.transactionCount = 0;
    console.log("Monthly transaction counter reset");
  }
}
```

---

## Method Overriding

Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its parent class.

```typescript
class Animal {
  makeSound(): void {
    console.log("Some generic animal sound");
  }
  
  move(): void {
    console.log("Animal is moving");
  }
}

class Dog extends Animal {
  // Override the makeSound method
  makeSound(): void {
    console.log("Woof! Woof!");
  }
  
  // Override the move method
  move(): void {
    super.move();  // Call parent method first
    console.log("Dog is running on four legs");
  }
}

class Bird extends Animal {
  makeSound(): void {
    console.log("Tweet! Tweet!");
  }
  
  move(): void {
    console.log("Bird is flying");
  }
}
```

---

## Constructor Inheritance

When using inheritance, constructors require special attention:

```typescript
class Person {
  protected name: string;
  protected age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    console.log("Person constructor called");
  }
  
  introduce(): void {
    console.log(`Hi, I'm ${this.name}, ${this.age} years old`);
  }
}

class Student extends Person {
  private studentId: string;
  private course: string;
  
  constructor(name: string, age: number, studentId: string, course: string) {
    // Must call super() before using 'this'
    super(name, age);  // Call parent constructor first
    this.studentId = studentId;
    this.course = course;
    console.log("Student constructor called");
  }
  
  // Override introduce method
  introduce(): void {
    super.introduce();  // Call parent method
    console.log(`I'm studying ${this.course}, Student ID: ${this.studentId}`);
  }
  
  study(): void {
    console.log(`${this.name} is studying ${this.course}`);
  }
}
```

**Important Rules for Constructors:**
1. Child class constructor must call `super()` before using `this`
2. `super()` must be the first statement in the child constructor
3. All parent constructor parameters must be provided

---

## Inheritance vs Composition

Both inheritance and composition define relationships between classes but serve different purposes:

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| **Relationship** | "is-a" | "has-a" or "uses-a" |
| **Coupling** | Tightly coupled | Loosely coupled |
| **Flexibility** | Compile-time (fixed) | Runtime (dynamic) |
| **Code Reuse** | Through inheritance | Through delegation |
| **Best for** | Shared logic & hierarchy | Reusable and pluggable components |
| **Example** | Car extends Vehicle | Car has an Engine |

### Composition Example:
```typescript
// Instead of inheritance
class Engine {
  private horsepower: number;
  
  constructor(horsepower: number) {
    this.horsepower = horsepower;
  }
  
  start(): void {
    console.log(`Engine with ${this.horsepower}HP started`);
  }
  
  stop(): void {
    console.log("Engine stopped");
  }
}

class Car {
  private engine: Engine;  // Composition - Car "has-a" Engine
  private brand: string;
  
  constructor(brand: string, enginePower: number) {
    this.brand = brand;
    this.engine = new Engine(enginePower);  // Compose with Engine
  }
  
  start(): void {
    console.log(`Starting ${this.brand}`);
    this.engine.start();  // Delegate to Engine
  }
  
  stop(): void {
    console.log(`Stopping ${this.brand}`);
    this.engine.stop();  // Delegate to Engine
  }
}
```

---

## When to Use Inheritance

### ✅ Use Inheritance When:
1. **Clear "is-a" relationship** exists (Dog is an Animal, Car is a Vehicle)
2. **Shared behavior and data** should be inherited from parent
3. **Polymorphism** is needed - treating objects uniformly
4. **Logical hierarchy** models real-world relationships
5. **Template pattern** - parent defines algorithm, children implement steps

### ❌ Avoid Inheritance When:
1. **Relationship is "has-a"** or "uses-a" (use composition instead)
2. **Just want to reuse code** without logical relationship
3. **Need runtime flexibility** in behavior
4. **Would create deep inheritance chains**
5. **Violates Liskov Substitution Principle**

---

## Best Practices

### 1. **Favor Composition Over Inheritance**
```typescript
// Good - Composition
class Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

class UserService {
  private logger: Logger;
  
  constructor(logger: Logger) {
    this.logger = logger;  // Inject dependency
  }
  
  createUser(name: string): void {
    // Create user logic
    this.logger.log(`User ${name} created`);
  }
}

// Avoid - Inheritance just for reuse
class UserService extends Logger {  // Bad - no "is-a" relationship
  createUser(name: string): void {
    // Create user logic
    this.log(`User ${name} created`);
  }
}
```

### 2. **Keep Inheritance Hierarchies Shallow**
- Prefer max 3-4 levels of inheritance
- Deep hierarchies are hard to understand and maintain

### 3. **Use Abstract Classes for Template Methods**
```typescript
abstract class DataProcessor {
  // Template method - defines the algorithm
  processData(data: any): void {
    const validated = this.validateData(data);
    const transformed = this.transformData(validated);
    this.saveData(transformed);
  }
  
  // Steps implemented by subclasses
  abstract validateData(data: any): any;
  abstract transformData(data: any): any;
  abstract saveData(data: any): void;
}
```

### 4. **Follow the Liskov Substitution Principle**
Child objects should be substitutable for parent objects without breaking functionality.

### 5. **Use Protected for Inheritance**
- `private`: Not accessible in child classes
- `protected`: Accessible in child classes but not outside
- `public`: Accessible everywhere

---

## Common Pitfalls

### 1. **Misusing Inheritance for Code Reuse**
```typescript
// Bad - inheriting just to reuse methods
class Rectangle extends Point {  // Rectangle is not a Point!
  width: number;
  height: number;
}

// Good - use composition
class Rectangle {
  private topLeft: Point;  // Rectangle has a Point
  private width: number;
  private height: number;
}
```

### 2. **Creating Fragile Base Class Problem**
Changes in parent class can break child classes. Design parent classes carefully.

### 3. **Violating Liskov Substitution Principle**
```typescript
// Bad - Square cannot substitute Rectangle properly
class Rectangle {
  width: number;
  height: number;
  
  setWidth(w: number): void { this.width = w; }
  setHeight(h: number): void { this.height = h; }
}

class Square extends Rectangle {
  setWidth(w: number): void {
    this.width = w;
    this.height = w;  // Violates expected Rectangle behavior
  }
}
```

### 4. **Deep Inheritance Chains**
Avoid creating inheritance hierarchies more than 3-4 levels deep.

### 5. **Not Calling super() in Constructors**
```typescript
class Child extends Parent {
  constructor(value: string) {
    // Error: Must call super() before using 'this'
    this.value = value;  // ❌ This will cause an error
    super();
  }
}

// Correct way
class Child extends Parent {
  constructor(value: string) {
    super();          // ✅ Call super() first
    this.value = value;
  }
}
```

---

## Summary

**Inheritance** is a powerful OOP mechanism that:
- Enables code reuse through "is-a" relationships
- Creates logical hierarchies that model real-world concepts
- Supports polymorphism for flexible code design
- Should be used judiciously - prefer composition when the relationship isn't truly "is-a"

**Key Takeaways:**
- Use `super` to call parent constructors and methods
- Use `this` to refer to the current instance
- Override methods to provide specific implementations
- Follow SOLID principles, especially Liskov Substitution
- Keep inheritance hierarchies shallow and logical
- Consider composition as an alternative for better flexibility

Remember: Inheritance is about modeling relationships, not just sharing code. When in doubt, ask yourself: "Is this truly an 'is-a' relationship?" If not, consider composition instead.