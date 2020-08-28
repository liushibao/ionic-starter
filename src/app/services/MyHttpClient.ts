import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MyHttpClient extends HttpClient {

    buildUrl = (url, options) => {
        let newUrl = new URL(location.href);
        if (options)
            Object.entries(options).filter(t => t[1] !== undefined).forEach((value) => newUrl.searchParams.append(value[0], value[1] instanceof String ? <string>value[1] : JSON.stringify(<object>value[1])));

        return `${url}${newUrl.search}`;
    }

    getJson<T>(url: string, body: any | null) {
        url = body ? this.buildUrl(url, body) : url;
        return this.get<T>(url, { observe: 'response', }).pipe(map(t => t.body));
    }

    postJson<T>(url: string, body: any | null) {
        return this.post<T>(url, body, { observe: 'response', }).pipe(map(t => t.body));
    }

    putJson<T>(url: string, body: any | null) {
        return this.put<T>(url, body, { observe: 'response', }).pipe(map(t => t.body));
    }

    deleteJson<T>(url: string, body: any | null) {
        return this.delete<T>(url, { observe: 'body', });
    }

}
