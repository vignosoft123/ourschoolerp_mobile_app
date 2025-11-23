import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoint } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangandparmisionService {


  constructor(public http: HttpClient) { }

  getLangandPermissionCall(value: string): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      const storageKey = 'langandpermissioncall' + value;
      return this.http.get(ApiEndPoint + 'langandpermissioncall/index/' + value);
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'profile/index');
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }
  getStudentAttendence(classID: any): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'sattendance/index/' + classID);
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  getEvents(): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'event/index/');
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }
  getHolidays(): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'holiday/index/');
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  getMarks(): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'Mark/index/');
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  sendDeviceToken(payload: any) {
    return this.http.post(ApiEndPoint + 'Token/store_token', payload);
  }

  getyoutubelinks() {
    return this.http.get(ApiEndPoint + 'Youtube/links?schoolyear_id=5&class_id=1');
  }

  getInvoiceList(): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'Invoice/index/');
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }
  viewInvoice(id: any) {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'Invoice/view/' + id);
    } else {
      // Return an empty observable if token is not available
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  getAssignmentList() {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(ApiEndPoint + 'Assignment/index/');
    } else {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

  viewAssignment(assignmentID: any, classID: any): Observable<any> {
    const token = localStorage.getItem('tokenKey');
    if (token) {
      return this.http.get(
        ApiEndPoint + 'Assignment/view/' + assignmentID + '/' + classID
      );
    } else {
      return new Observable(observer => {
        observer.error('No token found');
        observer.complete();
      });
    }
  }

getInvoicePaymentList(invoiceID: any): Observable<any> {
  const token = localStorage.getItem('tokenKey');
  if (token) {
    return this.http.get(ApiEndPoint + 'Invoice/paymentlist/' + invoiceID);
  } else {
    return new Observable(observer => {
      observer.error('No token found');
      observer.complete();
    });
  }
}
  submitAssignmentAnswer(assignmentID: any, classID: any, payload: FormData): Observable<any> {
  const token = localStorage.getItem('tokenKey');
  if (token) {
    return this.http.post(
      ApiEndPoint + 'Assignment/submit/' + assignmentID + '/' + classID,
      payload
    );
  } else {
    return new Observable(observer => {
      observer.error('No token found');
      observer.complete();
    });
  }
}

}
