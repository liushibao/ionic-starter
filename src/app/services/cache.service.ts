import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
    let str = window.localStorage.getItem("keys");
    this._keys = str != null ? JSON.parse(str) : {};
  }

  private _keys: { [key: string]: any };

  getObj<T>(key: string) {
    this._removeExpiredKey();
    let str = window.localStorage.getItem(key);
    return str ? <T>JSON.parse(str) : null;
  }

  setObj(key: string, obj: any, expire: number = environment.defaultExpire) {
    this._removeExpiredKey();
    let now = new Date();
    window.localStorage.setItem(key, JSON.stringify(obj));
    this._keys[key] = now.setSeconds(now.getSeconds() + expire);
    this._updateKeys();
  }

  expire(key: string, expire: number = environment.defaultExpire) {
    let now = new Date();
    this._keys[key] = now.setSeconds(now.getSeconds() + expire);
    this._updateKeys();
  }

  del(key: string) {
    window.localStorage.removeItem(key);
    delete this._keys[key];
    this._updateKeys();
  }

  clear() {
    this._keys = {};
    this._updateKeys();
  }

  _updateKeys() {
    // TODO ... change to use rxjs for thread safe, low priority
    window.localStorage.setItem("keys", JSON.stringify(this._keys));
  }

  _removeExpiredKey() {
    let now = new Date();
    let nowTick = now.getSeconds();
    let expiredKeys = Object.entries(this._keys).filter(t => t[1] < nowTick).map(t => t[0]);
    expiredKeys.forEach(t => {
      window.localStorage.removeItem(t);
      delete this._keys[t[0]]
    });
    this._updateKeys();
  }

}
