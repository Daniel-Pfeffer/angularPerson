import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private http: HttpClient;

    // Constructor because nice
    constructor(http: HttpClient) {
        this.http = http;
    }
    // returns the given url as an observeable object
    public getData() {
        return this.http.get('/assets/persons.json');
    }
}
