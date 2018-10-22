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
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.email = email;
        this.country = country;
        this.age = age;
        this.registered = registered;
    }

    public toJSON(): string {
        let str: string;
        str = '{ \"id\": ' + this.id + ', \"firstname\": "' + this.firstname + '", \"lastname\": "' + this.lastname + '", \"gender\": "' + this.gender + '", \"email\": "' + this.email + '", \"country\": "' + this.country + '", \"age\": "' + this.age + '", \"registered\": "' + this.registered + '"}';
        return str;
    }
}
