/**********************************************************************
 * Project           : Simple Person management tool
 *
 * Author            : Daniel Pfeffer
 *
 * Date created      : 02.08.2018
 *
 * Purpose           : Tool to display and manage persons
 *
 ***********************************************************************/

import {Component, OnInit} from '@angular/core';
import {Person} from './Person';
import {HttpService} from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title: string;              // title of the angular app
    persons: Array<Person>;     // Array of person
    selectedPerson: Person;     // currently selected person (when clicked on)
    hoveredPerson: Person;      // currently hovered person (when hovered over)
    nameToChange: string;       // ngModel of the name
    lastNameToChange: string;   // ngModel of the surname
    filter: string;             // filter for display
    http: HttpService;          // HttpService instance
    visibleLeft = false;
    visibleRight = true;
    maxPersons: number;
    // Country list to get a random country
    private countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre & Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts & Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks & Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
    // size of country list that it wont validate each time a new person is added
    private readonly max: number;

    ngOnInit(): void {
        this.getData();
    }

    constructor(http: HttpService) {
        this.http = http;
        this.title = 'Hausübung 1';
        this.max = this.countryList.length;
        this.filter = '';
    }

    // get data from service
    private getData(): void {
        // Subscribe to asynchronus service
        this.http.getData().subscribe(data => {
            // Dunno y it works but fuck it
            this.persons = <Array<Person>>data;
            this.sort('id');
        });
        this.http.count().subscribe(data => {
            this.maxPersons = <number>data;
        });
    }

    addUser(): void {
        // Generated values for person
        const lastID = this.persons[this.persons.length - 1] !== undefined ? this.persons[this.persons.length - 1].id + 1 : 1;
        const gender = Math.random() > 0.505 ? 'M' : 'W';
        const email = this.nameToChange + this.lastNameToChange + '@example.com';
        const country = this.randCountryGenerate();
        const age = Math.floor(Math.random() * Math.floor(90));
        const isReg = Math.random() > 0.5;
        // declare new person and push to array
        const newUser: Person = new Person(lastID, gender, this.nameToChange, this.lastNameToChange, email, country, age, isReg);
        this.http.insert(newUser).subscribe();
        this.persons.push(newUser);
        // clear input fields
        this.nameToChange = null;
        this.lastNameToChange = null;
    }

    // generate a country randomly out of the countryList array
    private randCountryGenerate(): string {
        const countryID = Math.floor(Math.random() * Math.floor(this.max));
        return this.countryList[countryID];
    }

    // returns the background color for each person which has the same country as the hovered person
    returnColor(person: Person): { 'background-color': any } {
        let color;
        if (this.hoveredPerson !== undefined) {
            if (this.hoveredPerson.country === person.country) {
                color = 'grey';
            } else {
                color = 'white';
            }
        } else {
            color = 'white';
        }
        return {
            'background-color': color
        };
    }

    // function call and param for the sort algorithm
    sort(sortAfter): void {
        this.persons.sort(this.dynSort(sortAfter));
    }

    // return a sort function which compare after the given property
    dynSort(property): (a, b) => any {
        let result;
        return function (a, b) {
            if (a[property] < b[property]) {
                result = -1;
            } else {
                if (a[property] > b[property]) {
                    result = 1;
                } else {
                    result = 0;
                }
            }
            return result;
        };
    }

    // filter the whole name after the filter variable
    filterInName(person: Person): boolean {
        if (this.filter !== '') {
            return person.lastname.toLowerCase().includes(this.filter.toLowerCase());
        }
        return true;
    }

    // delete the given person out of the array
    deleteThis(person: Person) {
        const index = this.persons.indexOf(person, 0);
        if (index > -1) {
            this.persons.splice(index, 1);
            this.http.delete(person.id).subscribe();
        }
    }

    toggle(person: Person) {
        const tempPerson: Person = new Person(person.id, person.gender, person.firstname, person.lastname, person.email, person.country, person.age, person.registered);
        this.http.update(tempPerson, person.id).subscribe();
    }

    changePage(prefix: boolean): void {
        if (prefix) {
            this.http.setPage(1);
        } else {
            this.http.setPage(-1);
        }
        this.http.getData().subscribe(data => {
            this.persons = <Array<Person>>data;
            this.sort('id');
        });

        this.visibleLeft = this.http.getPage() !== 1;
        this.visibleRight = Math.floor(this.maxPersons / 10) + 1 !== this.http.getPage();
    }
}
