import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Person} from './Person';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private http: HttpClient;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private options = {headers: this.headers};

    // Constructor because nice
    constructor(http: HttpClient) {
        this.http = http;
    }

    // returns the given url as an observeable object
    public getData() {
        return this.http.get('http://localhost:8080/rest/persons/findAll');
    }

    // ask server to delete id
    public delete(id: number) {
        return this.http.delete('http://localhost:8080/rest/persons/delete/' + id);
    }

    public insert(person: Person) {
        return this.http.post('http://localhost:8080/rest/persons/insert', person.toJSON(), this.options);
    }

    public update(person: Person, id: number) {
        return this.http.post('http://localhost:8080/rest/persons/update/' + id, person.toJSON(), this.options);
    }
}
