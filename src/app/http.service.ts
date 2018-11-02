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
    private readonly size;
    private _page;

    // Constructor because nice
    constructor(http: HttpClient) {
        this.http = http;
        this.size = 10;
        this._page = 1;
    }

    public setPage(value) {
        this._page += value;
    }

    public getPage() {
        return this._page;
    }

    // returns the given url as an observeable object
    public getData() {
        return this.http.get('http://localhost:8080/rest/persons/find?page=' + this._page + '&size=' + this.size);
    }

    // ask server to delete id
    public delete(id: number) {
        return this.http.delete('http://localhost:8080/rest/persons/delete/' + id);
    }

    // insert a new person
    public insert(person: Person) {
        return this.http.post('http://localhost:8080/rest/persons/insert', person.toJSON(), this.options);
    }

    // update a given person
    public update(person: Person, id: number) {
        return this.http.post('http://localhost:8080/rest/persons/update/' + id, person.toJSON(), this.options);
    }

    public count() {
        return this.http.get('http://localhost:8080/rest/persons/count');
    }
}
