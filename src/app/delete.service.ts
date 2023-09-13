import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private  http:HttpClient) {}

  public deleteMenuItem(itemId: string): any {
    let url = `http://localhost:8080/delete/${itemId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error deleting item:', error);
        return throwError(error); // Rethrow the error to propagate it
      })
    );
  }
}
