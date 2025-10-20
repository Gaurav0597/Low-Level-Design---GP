# 🔗 Coupling and Cohesion in Software Engineering

## 📚 Table of Contents
1. [What is Coupling?](#what-is-coupling)
2. [What is Cohesion?](#what-is-cohesion)
3. [Loose Coupling vs Tight Coupling](#loose-coupling-vs-tight-coupling)
4. [High Cohesion vs Low Cohesion](#high-cohesion-vs-low-cohesion)
5. [Real-World Examples](#real-world-examples)
6. [Software Engineering Examples](#software-engineering-examples)
7. [Best Practices](#best-practices)
8. [Interview Questions](#interview-questions)

---

## 🔗 What is Coupling?

**Coupling** refers to the degree of interdependence between software modules. It measures how closely connected different parts of a system are.

### 🔓 Loose Coupling
- **Modules are minimally dependent on each other**
- **Changes in one module do not affect others**
- **Achieved through interfaces and dependency injection**

### 🔒 Tight Coupling
- **Modules are highly dependent on each other**
- **Changes in one module may break others**
- **Common in monolithic systems**

### 📱 Real-World Analogy
- **Loose Coupling**: Bluetooth headphones (independent devices) - you can change your phone or headphones without affecting the other
- **Tight Coupling**: Speakers on a phone (fixed connection) - if the phone breaks, the speakers are useless

---

## 🎯 What is Cohesion?

**Cohesion refers to how closely related the responsibilities of a module are.**

### ✅ High Cohesion (Tight Cohesion)
- **A module performs a single, well-defined task**
- **Responsibilities are strongly related**
- **Easy to understand and maintain**

### ❌ Low Cohesion
- **A module performs multiple unrelated tasks**
- **Harder to maintain and understand**
- **Violates Single Responsibility Principle**

### 🏢 Real-World Examples

#### High Cohesion Examples:
- **Kitchen**: Only handles food preparation and cooking
- **Library**: Only manages books and reading resources
- **Bank Teller**: Only handles financial transactions

#### Low Cohesion Examples:
- **General Store**: Sells food, clothes, electronics, repairs phones, cuts hair
- **Multi-purpose Room**: Used for meetings, storage, dining, exercise

---

## 🔄 Loose Coupling vs Tight Coupling

### 📊 Comparison Table

| Aspect | Loose Coupling | Tight Coupling |
|--------|----------------|----------------|
| **Dependencies** | Minimal dependencies | High dependencies |
| **Impact of Changes** | Changes don't affect others | Changes may break others |
| **Flexibility** | High flexibility | Low flexibility |
| **Testability** | Easy to test | Hard to test |
| **Reusability** | High reusability | Low reusability |
| **Maintenance** | Easy to maintain | Hard to maintain |

### 💻 Software Engineering Examples

#### ❌ Tight Coupling Example
```typescript
// Tightly coupled - UserService directly depends on EmailService
class EmailService {
  sendEmail(to: string, subject: string, body: string): void {
    console.log(`Sending email to ${to}: ${subject}`);
    // Email sending logic
  }
}

class UserService {
  private emailService: EmailService;
  
  constructor() {
    // Direct instantiation creates tight coupling
    this.emailService = new EmailService();
  }
  
  createUser(name: string, email: string): void {
    // User creation logic
    console.log(`Creating user: ${name}`);
    
    // Tightly coupled to EmailService
    this.emailService.sendEmail(
      email, 
      "Welcome", 
      `Welcome ${name}!`
    );
  }
}

// Problems:
// 1. Hard to test - can't mock EmailService
// 2. Hard to change - what if we want SMS instead?
// 3. UserService breaks if EmailService changes
```

#### ✅ Loose Coupling Example
```typescript
// Loosely coupled - using interfaces and dependency injection
interface NotificationService {
  send(to: string, message: string): void;
}

class EmailService implements NotificationService {
  send(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}

class SMSService implements NotificationService {
  send(to: string, message: string): void {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}

class UserService {
  constructor(private notificationService: NotificationService) {}
  
  createUser(name: string, contact: string): void {
    console.log(`Creating user: ${name}`);
    
    // Loosely coupled - depends on interface, not implementation
    this.notificationService.send(
      contact, 
      `Welcome ${name}!`
    );
  }
}

// Usage - flexibility in choosing notification method
const emailService = new EmailService();
const smsService = new SMSService();

const userServiceWithEmail = new UserService(emailService);
const userServiceWithSMS = new UserService(smsService);

// Benefits:
// 1. Easy to test - can inject mock services
// 2. Easy to change - just inject different service
// 3. UserService doesn't break when notification logic changes
```

---

## 🎯 High Cohesion vs Low Cohesion

### 📊 Examples from Screenshots

#### ✅ High Cohesion Example
**A class handling only user authentication:**
```typescript
class AuthenticationService {
  validateCredentials(username: string, password: string): boolean {
    // Only authentication-related logic
    return this.checkUsername(username) && this.verifyPassword(password);
  }
  
  private checkUsername(username: string): boolean {
    return username.length >= 3;
  }
  
  private verifyPassword(password: string): boolean {
    return password.length >= 8;
  }
  
  generateAuthToken(userId: string): string {
    return `token_${userId}_${Date.now()}`;
  }
}
```

#### ❌ Low Cohesion Example
**A class managing user authentication, payment processing, and email notifications:**
```typescript
class UserManager {
  // Authentication logic
  validateCredentials(username: string, password: string): boolean {
    return username.length >= 3 && password.length >= 8;
  }
  
  // Payment processing logic
  processPayment(amount: number, cardNumber: string): boolean {
    console.log(`Processing payment of $${amount}`);
    return true;
  }
  
  // Email notification logic
  sendWelcomeEmail(email: string): void {
    console.log(`Sending welcome email to ${email}`);
  }
  
  // File upload logic
  uploadProfilePicture(file: File): string {
    console.log("Uploading profile picture");
    return "uploaded_url";
  }
}

// Problems:
// 1. Multiple unrelated responsibilities
// 2. Hard to maintain - changes in payment affect authentication
// 3. Hard to test - need to mock multiple concerns
// 4. Violates Single Responsibility Principle
```

### ✅ Refactored with High Cohesion
```typescript
// Each class has a single, well-defined responsibility
class AuthenticationService {
  validateCredentials(username: string, password: string): boolean {
    return username.length >= 3 && password.length >= 8;
  }
  
  generateAuthToken(userId: string): string {
    return `token_${userId}_${Date.now()}`;
  }
}

class PaymentService {
  processPayment(amount: number, cardNumber: string): boolean {
    console.log(`Processing payment of $${amount}`);
    return this.validateCard(cardNumber) && this.chargeCard(amount);
  }
  
  private validateCard(cardNumber: string): boolean {
    return cardNumber.length === 16;
  }
  
  private chargeCard(amount: number): boolean {
    return amount > 0;
  }
}

class EmailService {
  sendWelcomeEmail(email: string): void {
    console.log(`Sending welcome email to ${email}`);
  }
  
  sendPasswordResetEmail(email: string): void {
    console.log(`Sending password reset email to ${email}`);
  }
}

class FileUploadService {
  uploadProfilePicture(file: File): string {
    console.log("Uploading profile picture");
    return this.generateUploadUrl(file.name);
  }
  
  private generateUploadUrl(filename: string): string {
    return `https://cdn.example.com/${filename}`;
  }
}
```

---

## 🌍 Real-World Examples

### 🏥 Hospital System

#### High Cohesion Examples:
- **Pharmacy Department**: Only handles medication
- **Radiology Department**: Only handles imaging
- **Emergency Department**: Only handles emergencies

#### Low Cohesion Example:
- **General Department**: Handles surgery, pharmacy, radiology, billing, and cleaning

### 🏢 Office Building

#### Loose Coupling:
- **Departments**: Marketing, HR, Finance work independently
- **Utilities**: Each department can change internet providers without affecting others
- **Equipment**: Printers can be replaced without affecting computers

#### Tight Coupling:
- **Shared Systems**: If the main server goes down, all departments stop working
- **Integrated Software**: Changing one module affects all other modules

---

## 💻 Software Engineering Examples

### 🛒 E-commerce System

#### ✅ Good Design (High Cohesion + Loose Coupling)
```typescript
// High cohesion - each service has one responsibility
interface PaymentGateway {
  processPayment(amount: number, paymentDetails: any): boolean;
}

class StripePaymentGateway implements PaymentGateway {
  processPayment(amount: number, paymentDetails: any): boolean {
    console.log(`Processing ${amount} via Stripe`);
    return true;
  }
}

class PayPalPaymentGateway implements PaymentGateway {
  processPayment(amount: number, paymentDetails: any): boolean {
    console.log(`Processing ${amount} via PayPal`);
    return true;
  }
}

class OrderService {
  constructor(private paymentGateway: PaymentGateway) {}
  
  processOrder(orderDetails: any): boolean {
    console.log("Processing order...");
    
    // Loosely coupled - depends on interface
    return this.paymentGateway.processPayment(
      orderDetails.amount, 
      orderDetails.payment
    );
  }
}

class InventoryService {
  updateStock(productId: string, quantity: number): void {
    console.log(`Updating stock for ${productId}: ${quantity}`);
  }
  
  checkAvailability(productId: string): boolean {
    console.log(`Checking availability for ${productId}`);
    return true;
  }
}

class EmailNotificationService {
  sendOrderConfirmation(email: string, orderDetails: any): void {
    console.log(`Sending order confirmation to ${email}`);
  }
  
  sendShippingNotification(email: string, trackingNumber: string): void {
    console.log(`Sending shipping notification to ${email}`);
  }
}

// Usage - loose coupling allows flexibility
const stripePayment = new StripePaymentGateway();
const paypalPayment = new PayPalPaymentGateway();

const orderServiceWithStripe = new OrderService(stripePayment);
const orderServiceWithPayPal = new OrderService(paypalPayment);
```

#### ❌ Bad Design (Low Cohesion + Tight Coupling)
```typescript
class OrderManager {
  // Multiple responsibilities - violates cohesion
  processOrder(orderDetails: any): boolean {
    // Order processing
    console.log("Processing order...");
    
    // Tightly coupled payment processing
    if (orderDetails.paymentMethod === "stripe") {
      console.log("Processing via Stripe");
      // Stripe-specific code
    } else if (orderDetails.paymentMethod === "paypal") {
      console.log("Processing via PayPal");
      // PayPal-specific code
    }
    
    // Inventory management
    console.log("Updating inventory...");
    
    // Email sending
    console.log("Sending confirmation email...");
    
    // SMS sending
    console.log("Sending SMS notification...");
    
    // File operations
    console.log("Generating invoice PDF...");
    
    return true;
  }
}
```

---

## 📋 Best Practices

### 🎯 Achieving Loose Coupling

1. **Use Interfaces**: Define contracts rather than depending on concrete classes
```typescript
interface Logger {
  log(message: string): void;
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log(`File: ${message}`);
  }
}

class DatabaseLogger implements Logger {
  log(message: string): void {
    console.log(`DB: ${message}`);
  }
}
```

2. **Dependency Injection**: Inject dependencies rather than creating them
```typescript
class UserService {
  constructor(
    private logger: Logger,
    private emailService: EmailService
  ) {}
}
```

3. **Event-Driven Architecture**: Use events for communication
```typescript
class EventBus {
  private listeners: Map<string, Function[]> = new Map();
  
  emit(event: string, data: any): void {
    const handlers = this.listeners.get(event) || [];
    handlers.forEach(handler => handler(data));
  }
  
  on(event: string, handler: Function): void {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
  }
}
```

### 🎯 Achieving High Cohesion

1. **Single Responsibility Principle**: Each class should have one reason to change
2. **Group Related Functions**: Keep related operations together
3. **Minimize Public Interface**: Expose only what's necessary

---

## 🎤 Interview Questions & Answers

### Q1: "What's the difference between coupling and cohesion?"
**Answer**: 
- **Coupling** measures how dependent modules are on each other (we want LOW coupling)
- **Cohesion** measures how related responsibilities within a module are (we want HIGH cohesion)
- **Goal**: Low coupling between modules, high cohesion within modules

### Q2: "Give me a real-world example of tight vs loose coupling"
**Answer**:
- **Tight Coupling**: Desktop computer where CPU, RAM, and motherboard are integrated - if one fails, you might need to replace multiple parts
- **Loose Coupling**: Modular laptop with USB peripherals - you can change keyboard, mouse, or external drive independently

### Q3: "How do you reduce coupling in code?"
**Answer**:
1. Use interfaces and abstract classes
2. Implement dependency injection
3. Apply the Law of Demeter (don't talk to strangers)
4. Use event-driven architecture
5. Avoid deep inheritance hierarchies

### Q4: "What are the benefits of high cohesion?"
**Answer**:
1. **Easier to understand** - clear, focused responsibility
2. **Easier to maintain** - changes are localized
3. **Higher reusability** - focused modules can be reused
4. **Better testability** - single responsibility is easier to test
5. **Reduced complexity** - simpler mental model

### Q5: "Can you have high coupling with high cohesion?"
**Answer**: 
Yes, but it's not ideal. You might have modules that are internally well-organized (high cohesion) but heavily dependent on each other (high coupling). The goal is **high cohesion with low coupling**.

---

## 🏆 Summary

### 🎯 Key Takeaways

1. **Coupling**: Aim for **loose coupling** between modules
   - Modules should be independent
   - Changes shouldn't cascade
   - Use interfaces and dependency injection

2. **Cohesion**: Aim for **high cohesion** within modules
   - Each module should have a single, clear purpose
   - Related responsibilities should be grouped together
   - Follow Single Responsibility Principle

3. **Benefits**:
   - **Maintainability**: Easier to modify and extend
   - **Testability**: Easier to write unit tests
   - **Reusability**: Components can be reused in different contexts
   - **Scalability**: System can grow without becoming unwieldy

4. **Remember**: 
   - **High cohesion** = "Things that belong together, stay together"
   - **Loose coupling** = "Things that don't need each other, stay apart"

**Tip: Follow the Single Responsibility Principle (SRP)** to naturally achieve high cohesion and reduce coupling!
