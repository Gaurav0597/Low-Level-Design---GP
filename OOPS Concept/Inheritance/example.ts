 // ---------------------------------------------------------------------//
// Example 1: Basic Inheritance
 // ---------------------------------------------------------------------//

// protected key word allows access within the class and its subclasses
//private key word allows access only within the class

class Animal {
    protected name:string

    constructor(name:string){
        this.name = name 
    }

    // Method that will be inherited by all subclasses
    eat():void {
        console.log(`${this.name} is eating.`)
    }
}