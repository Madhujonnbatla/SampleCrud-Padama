import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: "http://localhost:54585/api";
  constructor(private _http: HttpClient) { }
  CreateStudent(obj: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + "/Student/CreateorUpdate", obj).pipe(map(this.extractdata), catchError(this.handleError<any>("Failed to load the Dropdown")));
  }
  Getstudentsall() {
    return this._http.get<any>(this.baseUrl + "/Student").pipe(tap(), catchError(this.handleError<any>("Failed to load the Dropdown")));
  }
  Delete(objdelete: any) {
    return this._http.get<any>(this.baseUrl + "/Student/Delete", objdelete).pipe(tap(), catchError(this.handleError<any>("Failed to load the Dropdown")));
  }
  extractdata(res: Response) {
    let body = res;
    console.log(body);
    return body || {};
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation}failed:${error.message}');
      return of(result as T);
    };
  }
}
