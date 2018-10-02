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

    deleteThis() {
        this.deleted.emit(this.person);
    }
}
