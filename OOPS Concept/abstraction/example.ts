// Abstraction in OOP

//-------------------------------------------------------------------------------------------//
// 1. Using Abstract Classes
//-------------------------------------------------------------------------------------------//
//@ts-ignore
abstract class Vehicle {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
  abstract start(): void; // abstract method must be implemented in derived classes

  displayBrand(): void {
    // concrete method that can be inherited
    console.log(`Brand: ${this.brand}`);
  }
}
// const myVehicle = new Vehicle("Generic"); 
// Error: Cannot create an instance of an abstract class
class Bike extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
  start(): void {
    console.log(`${this.brand} bike is starting.`);
    // implementing the abstract method and it is neccessary to implemt abstarct method
    // otherwise error will be thrown
    //Concrete Method is option to implement
  }
}
//@ts-ignore
// const MyBike = new Bike("Yamaha");
// MyBike.start();
// MyBike.displayBrand();
//@ts-ignore
class ElectricCar extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
  start(): void {
    console.log(`${this.brand} car is starting.`);
  }
}

// Explanation
// The abstract class Vehicle defines the structure. Every vehicle must have a brand and a way to start.
// The Bike subclass provides its own implementation of start().
//you don't need to know the details of how start() works for each vehicle. You just call start(), and the correct behavior happens for that specific subclass (e.g., Bike or ElectricCar).
//  This is abstraction: hiding the implementation details and exposing only what is necessary.


// Example 2 
abstract class ATM {
  abstract insertCard(): void;
  abstract enterPIN(pin: string): void;
  abstract withdraw(amount: number): void;

  printReceipt(): void {
    console.log("Printing receipt...");
  }
}

// ATM is an abstract class. You cannot create an ATM directly.
// It defines what every ATM must do, but not how.
class SBIATM extends ATM {
  insertCard(): void {
    console.log("Card inserted in SBI ATM.");
  }
  enterPIN(pin: string): void {
    console.log("PIN entered in SBI ATM.");
  }
  withdraw(amount: number): void {
    console.log(`Withdrawing ₹${amount} from SBI ATM.`);
  }
}
//-------------------------------------------------------------------------------------------//
// 2. Using Interfaces
//-------------------------------------------------------------------------------------------//
interface IATM {
  insertCard(): void;
  enterPIN(pin: string): void;
  withdraw(amount: number): void;
  printReceipt(): void;
}

class ICICIATM implements IATM {
  insertCard(): void {
    console.log("Card inserted in SBI ATM.");
  }
  enterPIN(pin: string): void {
    console.log("PIN entered in SBI ATM.");
  }
  withdraw(amount: number): void {
    console.log(`Withdrawing ₹${amount} from SBI ATM.`);
  }
  printReceipt(): void {
    console.log("Printing receipt from SBI ATM.");
  }
  // shutdown(): void {
  //   console.log("Shutting down SBI ATM.");
  // }
  // Added new method in class which is not present in interface that is giving error
}
// Usage
const atm: IATM = new ICICIATM();
atm.insertCard();
atm.enterPIN("1234");
atm.withdraw(500);
atm.printReceipt();
// console.log(atm.shutdown()); // Error: Property 'shutdown' does not exist on type 'IATM'.

//---------------------------------------------------------------------------------------------//
//  Example 3 using Interfaces and Abstract Classes - standardization of behavior
//---------------------------------------------------------------------------------------------//
interface Swimmable {
  swim(): void;
}

abstract class Animal1 {
  abstract makeSound(): void;
  eat(): void {
    console.log("Eating...");
  }
}

class Fish extends Animal1 implements Swimmable {
  makeSound(): void {
    console.log("Blub blub");
  }
  swim(): void {
    console.log("Fish is swimming");
  }
}