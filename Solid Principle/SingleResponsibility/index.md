# 🧩 Single Responsibility Principle (SRP)

## 💭 What is this?

The Single Responsibility Principle (SRP) states that

> A class should have one, and only one, reason to change.

**This principle states that a class should only have one responsibility. Furthermore, it should only have one reason to change.**

In simple terms, each class or module in your program should focus on doing just one thing well.
It's the "S" in the SOLID design principles.

## 🎯 How does this principle help us to build better software?

Let's see a few of its benefits:

### **Testing**
A class with one responsibility will have far fewer test cases. When a class focuses on a single concern, it's easier to write comprehensive tests that cover all scenarios without dealing with complex interdependencies.

### **Lower Coupling**
Less functionality in a single class will have fewer dependencies. This means the class is less likely to be affected by changes in other parts of the system, making it more stable and maintainable.

### **Organization**
Smaller, well-organized classes are easier to search than monolithic ones. When each class has a clear, single purpose, developers can quickly locate and understand the relevant code for any given functionality.

## 🍽️ Real-World Analogy

Imagine a restaurant.
You wouldn't assign one person to:

* Cook the food 🍳
* Take customer orders 🧾
* Clean the tables 🧹
* Handle accounting 💰

Instead, you hire:

* A chef to cook
* A waiter to serve
* A cleaner to maintain hygiene
* An accountant to manage money

Each person has a single responsibility, making the restaurant efficient and manageable.
Your code should work the same way.

## ⚙️ Why We Need It

Without SRP, classes become God classes — doing too many unrelated tasks.
This causes:

* 🧨 Frequent breakages — one change affects multiple areas
* 🧩 Hard-to-read and maintain code
* 🧪 Difficult testing — too many dependencies
* 🔄 Reduced reusability

With SRP:

* Each class has one clear purpose
* Code is easier to understand, test, and extend
* Changes in one part don't affect others

## 💻 Example Code

### ❌ Before (Violating SRP)

```typescript
class Employee {
    private name: string;
    private email: string;
    private salary: number;

    calculateSalary(): void {
        // Complex salary logic
    }

    saveToDatabase(): void {
        // DB logic
    }

    generatePayslip(): void {
        // Format payslip PDF
    }

    sendPayslipEmail(): void {
        // Send email with payslip
    }
}
```

**Problem:**
One class is handling salary, database, PDF generation, and email — four different responsibilities.

### ✅ After (Following SRP)

```typescript
class Employee {
    constructor(private name: string, private email: string, private baseSalary: number) {}
    getName() { return this.name; }
    getEmail() { return this.email; }
    getBaseSalary() { return this.baseSalary; }
}

class PayrollCalculator {
    calculateNetPay(employee: Employee): number {
        const tax = employee.getBaseSalary() * 0.2;
        const benefits = 1000;
        return employee.getBaseSalary() - tax + benefits;
    }
}

class EmployeeRepository {
    save(employee: Employee): void {
        console.log(`Saving ${employee.getName()} to DB...`);
    }
}

class PayslipGenerator {
    generate(employee: Employee, netPay: number): string {
        return `Payslip for ${employee.getName()} - Net Pay: ₹${netPay}`;
    }
}

class EmailService {
    sendPayslip(employee: Employee, payslip: string): void {
        console.log(`Emailing payslip to ${employee.getEmail()}`);
    }
}
```

Now, each class has one reason to change — achieving clean, modular design.

## 🕓 When to Use

Use SRP when:

* Your class or module starts doing multiple unrelated tasks
* You find yourself frequently modifying the same class for different reasons
* Code becomes hard to test or maintain
* You want to decouple logic (like separating business logic, persistence, and presentation)

## 💼 Use Case

**Payroll System**

* `Employee` → holds employee data
* `PayrollCalculator` → handles pay calculation logic
* `EmployeeRepository` → saves data to DB
* `PayslipGenerator` → creates the payslip format
* `EmailService` → sends payslip emails

Each component can evolve independently — for example, changing tax rules only affects PayrollCalculator.

## 🧾 Conclusion

The Single Responsibility Principle helps in:

* Building modular, maintainable, and testable code
* Reducing coupling and side effects
* Making your system adaptable to change

> ✅ In short: "Do one thing, do it well, and do it in one place."
