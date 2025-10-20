# 🔄 Liskov Substitution Principle (LSP)

## 📝 Interview Definition

> "Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." — Barbara Liskov

**LSP states that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program. This means that derived classes must honor the contracts, behavior, and properties of the base class, ensuring that the software remains consistent and reliable also when new subclasses are introduced.**

## 🎯 In Simpler Words

Think of a family where a parent promises to do certain tasks, like driving or cooking. Any child who steps in for the parent must also do these tasks properly, without changing how things are supposed to work.

## 📋 Example from Screenshot

If you have a parent class `Vehicle` that "can move," any child class like `Car`, `Bike`, or `Boat` should also be able to "move" without issues.

If one child (like RowBoat) starts saying, "I can't move the way others do," it breaks the promise, and the substitution no longer works smoothly.

## 🚨 The Interview Problem

**Interviewer**: "When does LSP get violated?"

**Your Answer**: When you encounter situations where:
- You replaced a parent class with a child class and suddenly your application started throwing exceptions
- You found yourself checking the specific type of an object before operating on it (`instanceof`)
- You had to override a method in a subclass to throw an exception or provide empty implementation
- Client code breaks when using derived classes instead of base classes

## 💳 Interview Example: Payment Processing System

*This builds on the OCP example - shows how SOLID principles work together!*

### ❌ LSP Violation (Bad)

```typescript
// Base class contract
abstract class PaymentMethod {
  abstract processPayment(amount: number): boolean;
  
  // Base class promises this behavior
  refund(amount: number): boolean {
    console.log(`Refunding $${amount}`);
    return true;
  }
  
  // All payment methods should support fees calculation
  calculateFees(amount: number): number {
    return amount * 0.03; // 3% default fee
  }
}

class CreditCardPayment extends PaymentMethod {
  processPayment(amount: number): boolean {
    console.log(`Processing credit card payment: $${amount}`);
    return true;
  }
  
  // Follows LSP - behaves as expected
  refund(amount: number): boolean {
    console.log(`Credit card refund: $${amount}`);
    return true;
  }
}

class CashPayment extends PaymentMethod {
  processPayment(amount: number): boolean {
    console.log(`Processing cash payment: $${amount}`);
    return true;
  }
  
  // ❌ LSP Violation - breaks the contract!
  refund(amount: number): boolean {
    throw new Error("Cash payments cannot be refunded!");
  }
  
  // ❌ LSP Violation - changes expected behavior
  calculateFees(amount: number): number {
    return 0; // Cash has no fees, but this breaks client expectations
  }
}

class GiftCardPayment extends PaymentMethod {
  private balance: number = 1000;
  
  // ❌ LSP Violation - strengthens preconditions
  processPayment(amount: number): boolean {
    if (amount > this.balance) {
      throw new Error("Insufficient gift card balance!");
    }
    console.log(`Processing gift card payment: $${amount}`);
    this.balance -= amount;
    return true;
  }
}

// Client code that expects LSP compliance
class PaymentProcessor {
  processWithRefund(payment: PaymentMethod, amount: number): void {
    if (payment.processPayment(amount)) {
      console.log("Payment successful");
      
      // ❌ This will break with CashPayment!
      payment.refund(amount * 0.1); // Partial refund
      
      // ❌ Fee calculation behavior is inconsistent
      const fees = payment.calculateFees(amount);
      console.log(`Fees: $${fees}`);
    }
  }
}

// Usage - LSP violations cause runtime errors
const processor = new PaymentProcessor();
processor.processWithRefund(new CreditCardPayment(), 100); // ✅ Works
processor.processWithRefund(new CashPayment(), 100);       // ❌ Crashes!
processor.processWithRefund(new GiftCardPayment(), 1500);  // ❌ Crashes!
```

### ✅ LSP-Compliant Approach (Good)

```typescript
// Proper abstraction that follows LSP
interface PaymentMethod {
  processPayment(amount: number): boolean;
  isRefundable(): boolean;
  getPaymentType(): string;
}

interface RefundablePayment extends PaymentMethod {
  refund(amount: number): boolean;
}

interface FeeBasedPayment extends PaymentMethod {
  calculateFees(amount: number): number;
}

// Implementations that honor contracts
class CreditCardPayment implements RefundablePayment, FeeBasedPayment {
  processPayment(amount: number): boolean {
    console.log(`Processing credit card payment: $${amount}`);
    return true;
  }
  
  refund(amount: number): boolean {
    console.log(`Credit card refund: $${amount}`);
    return true;
  }
  
  calculateFees(amount: number): number {
    return amount * 0.03; // 3% fee
  }
  
  isRefundable(): boolean {
    return true;
  }
  
  getPaymentType(): string {
    return "CreditCard";
  }
}

class CashPayment implements PaymentMethod {
  processPayment(amount: number): boolean {
    console.log(`Processing cash payment: $${amount}`);
    return true;
  }
  
  isRefundable(): boolean {
    return false; // Clear contract - cash is not refundable
  }
  
  getPaymentType(): string {
    return "Cash";
  }
}

class GiftCardPayment implements RefundablePayment {
  private balance: number = 1000;
  
  processPayment(amount: number): boolean {
    // Proper precondition handling without breaking LSP
    if (amount <= 0) {
      return false; // Validates input but doesn't throw
    }
    
    if (amount > this.balance) {
      return false; // Returns false instead of throwing
    }
    
    console.log(`Processing gift card payment: $${amount}`);
    this.balance -= amount;
    return true;
  }
  
  refund(amount: number): boolean {
    console.log(`Gift card refund: $${amount}`);
    this.balance += amount;
    return true;
  }
  
  isRefundable(): boolean {
    return true;
  }
  
  getPaymentType(): string {
    return "GiftCard";
  }
}

// Client code that respects LSP
class PaymentProcessor {
  processPayment(payment: PaymentMethod, amount: number): boolean {
    const success = payment.processPayment(amount);
    
    if (success) {
      console.log(`${payment.getPaymentType()} payment successful`);
      
      // Handle fees if supported
      if ('calculateFees' in payment) {
        const fees = (payment as FeeBasedPayment).calculateFees(amount);
        console.log(`Fees: $${fees}`);
      }
    }
    
    return success;
  }
  
  processRefund(payment: PaymentMethod, amount: number): boolean {
    // Check capability before attempting refund
    if (!payment.isRefundable()) {
      console.log(`${payment.getPaymentType()} payments are not refundable`);
      return false;
    }
    
    if ('refund' in payment) {
      return (payment as RefundablePayment).refund(amount);
    }
    
    return false;
  }
}

// Usage - LSP compliance ensures no surprises
const processor = new PaymentProcessor();

const creditCard = new CreditCardPayment();
const cash = new CashPayment();
const giftCard = new GiftCardPayment();

// All work as expected with their base interface
processor.processPayment(creditCard, 100); // ✅ Works
processor.processPayment(cash, 100);       // ✅ Works
processor.processPayment(giftCard, 100);   // ✅ Works

// Refunds handled properly
processor.processRefund(creditCard, 50);   // ✅ Refunds
processor.processRefund(cash, 50);         // ✅ Gracefully declined
processor.processRefund(giftCard, 50);     // ✅ Refunds
```

## 📊 Interview Comparison Table

| Aspect | LSP Violation | LSP Compliant |
|--------|---------------|---------------|
| **Exception Handling** | Throws unexpected exceptions | Returns false or handles gracefully |
| **Contract Adherence** | Changes expected behavior | Honors base class contracts |
| **Client Code** | Needs type checking | Works uniformly with all subtypes |
| **Substitutability** | Cannot replace parent safely | Perfect substitution possible |
| **Runtime Behavior** | Unpredictable failures | Consistent, reliable behavior |

## 🎯 Interview Key Rules for LSP

### **Preconditions cannot be strengthened**
```typescript
// ❌ Bad - child is more restrictive
class BaseValidator {
  validate(input: string): boolean {
    return input.length > 0; // Any non-empty string
  }
}

class EmailValidator extends BaseValidator {
  validate(input: string): boolean {
    // ❌ Strengthens precondition - now requires email format
    return input.includes('@') && input.length > 5;
  }
}

// ✅ Good - maintain or weaken preconditions
class EmailValidator extends BaseValidator {
  validate(input: string): boolean {
    // ✅ Same or weaker precondition
    return input.length > 0 && this.isValidEmail(input);
  }
  
  private isValidEmail(input: string): boolean {
    return input.includes('@');
  }
}
```

### **Postconditions cannot be weakened**
```typescript
// ❌ Bad - child provides weaker guarantees
class DataProcessor {
  process(data: any[]): any[] {
    return data.sort(); // Guarantees sorted output
  }
}

class FastProcessor extends DataProcessor {
  process(data: any[]): any[] {
    // ❌ Weakens postcondition - doesn't sort!
    return data;
  }
}

// ✅ Good - maintain or strengthen postconditions
class OptimizedProcessor extends DataProcessor {
  process(data: any[]): any[] {
    // ✅ Same or stronger postcondition
    const sorted = data.sort();
    return this.removeDuplicates(sorted); // Even better!
  }
}
```

## 🚗 Real-World Interview Analogy

**Interviewer**: "Give me a real-world example of LSP"

**Your Answer**: "Think of a car rental service:
- When you rent a 'car', you expect it to start, drive, and brake
- Whether they give you a sedan, SUV, or hatchback (subtypes), all should work the same way
- If they gave you a broken car that won't start, or a go-kart that can't brake properly, it violates LSP
- You should be able to drive any 'car' they provide without changing how you operate it"

## ⚠️ Common Interview Pitfalls

**Interviewer**: "What are the signs of LSP violations?"

1. **Type Checking in Client Code**: `if (payment instanceof CashPayment)`
2. **Empty Method Implementations**: Methods that do nothing or throw "Not Supported"
3. **Different Exception Types**: Child classes throwing exceptions parent doesn't
4. **Behavioral Changes**: Methods that work differently than expected
5. **Conditional Logic Based on Type**: Different behavior for different subtypes

## 🎯 When to Apply LSP (Interview Answer)

- When designing **inheritance hierarchies**
- When implementing **polymorphic behavior**
- When creating **framework code** that others will extend
- When **refactoring** code with type checking
- When ensuring **API contracts** are maintained

## 🏆 Interview Summary

**Key Takeaway**: LSP ensures that inheritance creates true "is-a" relationships where child objects can completely replace parent objects without breaking functionality.

**Interview Confidence Booster**: "LSP is about keeping promises. If a parent class promises certain behavior, all children must honor that promise. This enables true polymorphism and makes code predictable and reliable."

**Connection to Other SOLID Principles**:
- **SRP**: Each class has one responsibility to maintain
- **OCP**: Extensions should not break existing contracts
- **ISP**: Interfaces should not force implementations that can't be fulfilled
- **DIP**: Depend on abstractions that follow LSP

**Remember**: LSP violations often indicate poor inheritance design. Consider composition or interface segregation as alternatives when LSP is hard to maintain.
