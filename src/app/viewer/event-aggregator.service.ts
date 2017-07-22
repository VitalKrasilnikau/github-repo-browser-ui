import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventAggregatorService {

  private _subjectMap = {};

  publish<T>(type: string, data: T): void {
    this._ensureSubject<T>(type);
    this._subjectMap[type].next(data);
  }

  listen<T>(type: string): Observable<T> {
    this._ensureSubject<T>(type);
    return this._subjectMap[type];
  }

  unsubscribe(type: string): void {
    if (this._subjectMap[type]) {
      this._subjectMap[type].dispose();
      delete this._subjectMap[type];
    }
  }

  private _ensureSubject<T>(type: string) {
    if (!this._subjectMap[type]) {
      this._subjectMap[type] = new Subject<T>();
    }
  }
}
