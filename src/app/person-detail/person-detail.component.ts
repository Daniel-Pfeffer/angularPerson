import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Person} from '../Person';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent {
    @Input() person: Person;
    @Output() deleted = new EventEmitter<Person>();
    @Output() toggle = new EventEmitter<Person>();
    visibility = false;
    selectedPerson: Person;
    nameToChange: string;
    lastNameToChange: string;

    // Delete function to send to main part
    deleteThis() {
        this.deleted.emit(this.person);
    }

    // get Image of either man or woman
    returnImg(): string {
        return this.person.gender === 'M' ? 'assets/man.png' : 'assets/woman.png';
    }

    // toggle the visibility of the editing part
    toggleVisible(): void {
        this.visibility = !this.visibility;
        this.selectedPerson = null;
        this.nameToChange = '';
        this.lastNameToChange = '';
        if (!this.visibility) {
            this.toggled();
        }
        // asynchronus call to /delete/{id}
    }

    toggled(): void {
        this.toggle.emit(this.person);
    }

    // function to change the name of selected person when input is made
    changeName(person: Person): void {
        if (this.selectedPerson !== undefined) {
            person.firstname = this.nameToChange;
        }
    }

    // same as changeName but for surname
    changeLastName(selectedPerson: Person): void {
        if (this.selectedPerson !== undefined) {
            selectedPerson.lastname = this.lastNameToChange;
        }
    }
}
