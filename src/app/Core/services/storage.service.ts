import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    readonly userSubject = new BehaviorSubject<any>(null);

    constructor() {
        let storedUser: string|undefined
        if (typeof localStorage !== 'undefined') {
            storedUser = localStorage.getItem('user')?.toString();
        }
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    setUser(user: string) :void{
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
        }
        this.userSubject.next(user);
    }

    clearUser():void{
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('user');
        }
        this.userSubject.next(null);
    }
}