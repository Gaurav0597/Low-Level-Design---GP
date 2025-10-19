# Abstraction in Object-Oriented Programming


## Table of Contents
1. [What is Abstraction?](#what-is-abstraction)
2. [Key Principles](#key-principles)
3. [Abstract Classes in TypeScript](#abstract-classes-in-typescript)
4. [Interfaces in TypeScript](#interfaces-in-typescript)
5. [Abstract Class vs Interface Comparison](#abstract-class-vs-interface-comparison)
6. [Interface vs Concrete Class Comparison](#interface-vs-concrete-class-comparison)
7. [Real-World Example: ATM System](#real-world-example-atm-system)
8. [When to Use What?](#when-to-use-what)
9. [Best Practices](#best-practices)

---

## What is Abstraction?

**Abstraction** is a fundamental principle of Object-Oriented Programming that focuses on:

- **Hiding the complex implementation details** and showing only the essential features of the object
- **Focuses on what an object does** rather than how it does it
- **Abstract classes and interfaces are used to achieve abstraction**
- **Simplifies complex systems** by breaking them into smaller, manageable units
- **Enhances code readability and reduces complexity**

### Real-World Analogy
When you use an ATM machine, you interact with simple operations like:
- Insert card → Enter PIN → Withdraw money

You don't need to know:
- How the ATM verifies your PIN with the bank
- How it communicates over networks
- How the cash dispensing mechanism works

All these complex details are **abstracted** away from you.

---

## Key Principles

1. **Hide Implementation Details**: Users interact with objects through a simple interface
2. **Focus on Behavior**: Define what an object should do, not how it does it
3. **Reduce Complexity**: Break down complex systems into manageable parts
4. **Improve Maintainability**: Changes to implementation don't affect the interface
5. **Enable Polymorphism**: Different implementations can be used interchangeably

---

## Abstract Classes in TypeScript

### Definition
**Abstract Class**: A class that cannot be instantiated on its own and is meant to be subclassed.

### Characteristics
- **Can have both abstract and concrete methods**
- **Can have member variables** with default values
- **Can have constructors** (but cannot be instantiated directly)
- **Cannot be instantiated** - serves as a base class for other classes
- **Can have access modifiers** (public, private, protected)

### Example: ATM Abstract Class
```typescript
abstract class ATM {
  protected bankName: string;
  
  constructor(bankName: string) {
    this.bankName = bankName;
  }
  
  // Abstract methods - must be implemented by subclasses
  abstract insertCard(): void;
  abstract enterPIN(pin: string): void;
  abstract withdraw(amount: number): void;
  
  // Concrete method - shared implementation
  printReceipt(): void {
    console.log(`Printing receipt from ${this.bankName} ATM...`);
  }
}

class SBIATM extends ATM {
  constructor() {
    super("SBI");
  }
  
  insertCard(): void {
    console.log("Card inserted in SBI ATM with chip reader");
  }
  
  enterPIN(pin: string): void {
    console.log("PIN entered using SBI's secure keypad");
  }
  
  withdraw(amount: number): void {
    console.log(`Withdrawing ₹${amount} from SBI ATM`);
  }
}
```

---

## Interfaces in TypeScript

### Definition
**Interface**: A reference type that defines a contract, specifying method signatures, properties, and the structure that classes should follow, without providing implementation.

### Characteristics
- **Can only have abstract methods** (method signatures only)
- **Cannot have constructors**
- **A class can implement multiple interfaces** (supports multiple inheritance of types)
- **Cannot contain instance fields or constructors**
- **All methods are abstract by default**
- **Cannot define access modifiers** - only defines method signatures and properties

### Example: ATM Interface
```typescript
interface IATM {
  insertCard(): void;
  enterPIN(pin: string): void;
  withdraw(amount: number): void;
  printReceipt(): void;
}

interface ISecureATM {
  biometricAuth(): void;
  encryptData(): void;
}

class ICICIATM implements IATM, ISecureATM {
  insertCard(): void {
    console.log("Card inserted in ICICI ATM with contactless reader");
  }
  
  enterPIN(pin: string): void {
    console.log("PIN entered using ICICI's touch screen");
  }
  
  withdraw(amount: number): void {
    console.log(`Withdrawing ₹${amount} from ICICI ATM`);
  }
  
  printReceipt(): void {
    console.log("Printing receipt from ICICI ATM");
  }
  
  biometricAuth(): void {
    console.log("Authenticating using fingerprint");
  }
  
  encryptData(): void {
    console.log("Encrypting transaction data");
  }
}
```

---

## Abstract Class vs Interface Comparison

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| **Definition** | A class that cannot be instantiated directly and may contain abstract methods that must be implemented by derived classes | An interface defines a contract, specifying method signatures, properties, and the structure that classes should follow, without providing implementation |
| **Instantiation** | Cannot be instantiated directly. It serves as a base class for other classes | Cannot be instantiated |
| **Method Implementation** | Can contain abstract methods (methods without implementation) that must be implemented by subclasses | Contains only method signatures, but no implementation |
| **Constructors** | Can have constructors to initialize class instances | Cannot have constructors |
| **Inheritance** | Can extend other classes (single inheritance) | Can be implemented by multiple classes, allowing for multiple inheritance of types |
| **Access Modifiers** | Can have access modifiers like public, private, protected to control visibility of class members | Cannot define access modifiers. It only defines method signatures and properties |
| **Multiple Inheritance** | Can inherit from only one class (single inheritance) | Can be implemented by multiple classes (supports multiple inheritance) |
| **Use Case** | Used to provide full behavior and attributes for objects. Can be subclassed to create objects | Used to enforce that a class must implement specific methods and properties, but without providing the actual behavior |

### When to Use Abstract Classes
```typescript
// Use when you have shared code and want to enforce structure
abstract class Vehicle {
  protected fuel: number = 100;
  
  // Shared implementation
  refuel(): void {
    this.fuel = 100;
    console.log("Vehicle refueled");
  }
  
  // Must be implemented by subclasses
  abstract start(): void;
  abstract stop(): void;
}
```

### When to Use Interfaces
```typescript
// Use when you want to define capabilities/contracts
interface Flyable {
  fly(): void;
  land(): void;
}

interface Swimmable {
  swim(): void;
  dive(): void;
}

// A class can implement multiple interfaces
class Duck implements Flyable, Swimmable {
  fly(): void { console.log("Duck flying"); }
  land(): void { console.log("Duck landing"); }
  swim(): void { console.log("Duck swimming"); }
  dive(): void { console.log("Duck diving"); }
}
```

---

## Interface vs Concrete Class Comparison

| Feature | Concrete Class (JavaScript/Node.js) | Interface (TypeScript in Node.js) |
|---------|-------------------------------------|-----------------------------------|
| **Definition** | A concrete class is a class that can be instantiated, which contains both method implementations and properties | An interface defines a contract, specifying method signatures, properties, and the structure that classes should follow, without providing implementation |
| **Instantiation** | Can be instantiated | Cannot be instantiated |
| **Method Implementation** | Contains method implementations that define how certain operations are performed | Contains only method signatures, but no implementation |
| **Constructors** | Can have constructors to initialize class instances | Cannot have constructors |
| **Inheritance** | Can extend other classes (single inheritance) | Can be implemented by multiple classes, allowing for multiple inheritance of types |
| **Access Modifiers** | Can use access modifiers like public, private, protected to control visibility of class members | Cannot define access modifiers. It only defines method signatures and properties |
| **Multiple Inheritance** | Can inherit from only one class (single inheritance) | Can be implemented by multiple classes (supports multiple inheritance) |
| **Use Case** | Used to provide full behavior and attributes for objects. Can be instantiated to create objects | Used to enforce that a class must implement specific methods and properties, but without providing the actual behavior |

---

## Real-World Example: ATM System

### Scenario
You're building an ATM system for multiple banks. Each bank has different implementations, but all ATMs should have basic functionality.

### Using Abstract Class Approach
```typescript
abstract class ATM {
  protected bankName: string;
  protected balance: number = 0;
  
  constructor(bankName: string) {
    this.bankName = bankName;
  }
  
  // Shared implementation for all ATMs
  checkBalance(): void {
    console.log(`Current balance: ₹${this.balance}`);
  }
  
  // Common receipt printing logic
  printReceipt(): void {
    console.log(`--- ${this.bankName} ATM Receipt ---`);
    console.log(`Transaction completed successfully`);
    console.log(`Thank you for using ${this.bankName} ATM`);
  }
  
  // Abstract methods - each bank implements differently
  abstract authenticate(pin: string): boolean;
  abstract withdraw(amount: number): void;
  abstract deposit(amount: number): void;
}

class SBIATM extends ATM {
  constructor() {
    super("State Bank of India");
    this.balance = 10000;
  }
  
  authenticate(pin: string): boolean {
    console.log("SBI: Authenticating using secure chip verification");
    return pin === "1234";
  }
  
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`SBI ATM: Withdrawn ₹${amount}`);
      this.printReceipt();
    } else {
      console.log("Insufficient balance");
    }
  }
  
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`SBI ATM: Deposited ₹${amount}`);
  }
}

class HDFCATM extends ATM {
  constructor() {
    super("HDFC Bank");
    this.balance = 15000;
  }
  
  authenticate(pin: string): boolean {
    console.log("HDFC: Authenticating using biometric + PIN");
    return pin === "5678";
  }
  
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`HDFC ATM: Processing withdrawal of ₹${amount}`);
      this.printReceipt();
    } else {
      console.log("Transaction failed: Insufficient funds");
    }
  }
  
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`HDFC ATM: Cash deposited ₹${amount}`);
  }
}
```

### Using Interface Approach
```typescript
interface IATM {
  authenticate(pin: string): boolean;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
  printReceipt(): void;
}

// Additional capabilities
interface IAdvancedATM {
  transferMoney(account: string, amount: number): void;
  payBills(billType: string, amount: number): void;
}

interface IBiometricATM {
  fingerprintAuth(): boolean;
  faceRecognition(): boolean;
}

class ModernICICIATM implements IATM, IAdvancedATM, IBiometricATM {
  private balance: number = 20000;
  
  authenticate(pin: string): boolean {
    console.log("ICICI: Multi-factor authentication");
    return this.fingerprintAuth() && pin === "9999";
  }
  
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`ICICI ATM: Smart withdrawal of ₹${amount}`);
      this.printReceipt();
    }
  }
  
  deposit(amount: number): void {
    this.balance += amount;
    console.log(`ICICI ATM: Intelligent deposit of ₹${amount}`);
  }
  
  checkBalance(): void {
    console.log(`ICICI ATM: Available balance ₹${this.balance}`);
  }
  
  printReceipt(): void {
    console.log("--- ICICI Bank Digital Receipt ---");
    console.log("Receipt sent to mobile & email");
  }
  
  transferMoney(account: string, amount: number): void {
    console.log(`Transferring ₹${amount} to account ${account}`);
  }
  
  payBills(billType: string, amount: number): void {
    console.log(`Paying ${billType} bill: ₹${amount}`);
  }
  
  fingerprintAuth(): boolean {
    console.log("Fingerprint verified ✓");
    return true;
  }
  
  faceRecognition(): boolean {
    console.log("Face recognition successful ✓");
    return true;
  }
}
```

### Usage Example
```typescript
// Using abstract class approach
const sbiATM: ATM = new SBIATM();
const hdfcATM: ATM = new HDFCATM();

function useATM(atm: ATM, pin: string) {
  if (atm.authenticate(pin)) {
    atm.checkBalance();
    atm.withdraw(5000);
  }
}

useATM(sbiATM, "1234");
useATM(hdfcATM, "5678");

// Using interface approach
const iciciATM: IATM = new ModernICICIATM();
const advancedATM: IAdvancedATM = new ModernICICIATM();

function processTransaction(atm: IATM) {
  if (atm.authenticate("9999")) {
    atm.withdraw(3000);
  }
}

processTransaction(iciciATM);
```

---

## When to Use What?

### Use Abstract Classes When:
1. **You have shared code** that multiple classes can reuse
2. **You want to provide default implementations** for some methods
3. **You need to store state** (member variables) that subclasses can access
4. **You have a clear "is-a" relationship** (Car is-a Vehicle)
5. **You want to control access** with private/protected members

**Example**: All vehicles have fuel, can refuel, but start differently
```typescript
abstract class Vehicle {
  protected fuel: number = 100;
  refuel(): void { this.fuel = 100; } // Shared implementation
  abstract start(): void; // Each vehicle starts differently
}
```

### Use Interfaces When:
1. **You want to define capabilities or contracts** that classes must follow
2. **You need multiple inheritance** (a class can implement multiple interfaces)
3. **You don't have shared code** to provide
4. **You want to enforce a "can-do" relationship** (Duck can-fly, can-swim)
5. **You're defining external contracts** for APIs or libraries

**Example**: Defining capabilities that different animals might have
```typescript
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

class Duck implements Flyable, Swimmable {
  fly(): void { /* Duck-specific flying */ }
  swim(): void { /* Duck-specific swimming */ }
}
```

### Decision Tree:
```
Do you have shared code/state?
├── YES → Use Abstract Class
└── NO → Do you need multiple inheritance?
    ├── YES → Use Interface
    └── NO → Either works, but Interface is more flexible
```

---

## Best Practices

### 1. Naming Conventions
```typescript
// Abstract classes: Use descriptive names
abstract class Vehicle { }
abstract class DatabaseConnection { }

// Interfaces: Often prefixed with 'I' or describe capability
interface IPayable { }
interface Drawable { }
interface Serializable { }
```

### 2. Keep Interfaces Small and Focused
```typescript
// Good: Single responsibility
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

// Better than one large interface
interface ReadWritable extends Readable, Writable { }
```

### 3. Use Abstract Classes for Template Methods
```typescript
abstract class DataProcessor {
  // Template method - defines the algorithm
  processData(data: any): void {
    const validated = this.validateData(data);
    const processed = this.transformData(validated);
    this.saveData(processed);
  }
  
  // Steps that subclasses must implement
  abstract validateData(data: any): any;
  abstract transformData(data: any): any;
  abstract saveData(data: any): void;
}
```

### 4. Combine Both When Needed
```typescript
interface ILogger {
  log(message: string): void;
}

abstract class BaseService implements ILogger {
  protected serviceName: string;
  
  constructor(name: string) {
    this.serviceName = name;
  }
  
  // Shared implementation
  log(message: string): void {
    console.log(`[${this.serviceName}] ${message}`);
  }
  
  // Abstract method
  abstract initialize(): void;
}
```

### 5. Favor Composition Over Inheritance
```typescript
// Instead of deep inheritance hierarchies
interface IEmailService {
  sendEmail(to: string, subject: string, body: string): void;
}

interface INotificationService {
  notify(message: string): void;
}

class UserService {
  constructor(
    private emailService: IEmailService,
    private notificationService: INotificationService
  ) {}
  
  registerUser(userData: any): void {
    // Register user logic
    this.emailService.sendEmail(userData.email, "Welcome", "Welcome to our service");
    this.notificationService.notify("New user registered");
  }
}
```

---

## Summary

**Abstraction** is about simplifying complex systems by:
- Hiding implementation details
- Focusing on what objects do, not how they do it
- Using abstract classes and interfaces to define contracts
- Making code more maintainable and flexible

**Remember**: 
- Abstract classes = shared code + enforced structure
- Interfaces = contracts + multiple inheritance
- Both cannot be instantiated directly
- Both enable polymorphism and cleaner code architecture

Choose the right tool based on your specific needs and the relationships between your classes.