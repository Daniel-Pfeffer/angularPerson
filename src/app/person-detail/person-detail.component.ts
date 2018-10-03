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
    visibility = false;
    selectedPerson: Person;
    nameToChange: string;
    lastNameToChange: string;

    deleteThis() {
        this.deleted.emit(this.person);
    }

    returnImg(): string {
        return this.person.gender === 'M' ? 'assets/man.png' : 'assets/woman.png';
    }

    toggleVisible(): void {
        this.visibility = !this.visibility;
        this.selectedPerson = null;
        this.nameToChange = '';
        this.lastNameToChange = '';
    }

    changeName(person: Person): void {
        if (this.selectedPerson !== undefined) {
            person.firstname = this.nameToChange;
        }
    }

    changeLastName(selectedPerson: Person): void {
        if (this.selectedPerson !== undefined) {
            selectedPerson.lastname = this.lastNameToChange;
        }
    }
}
