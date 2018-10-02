export class Person {
    id: number;
    gender: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    age: number;
    registered: boolean;

    constructor(id: number, gender: string, firstname: string, lastname: string, email: string, country: string, age: number, registered: boolean) {
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.country = country;
        this.age = age;
        this.registered = registered;
    }
}
