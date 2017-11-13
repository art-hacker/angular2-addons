import {Injectable, Optional} from "@angular/core";
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';

import {RESTServiceConfig} from "./RESTServiceConfig";

@Injectable()
export class RESTService extends Http
{
    private path: string = "";
    private tokenKey: string = "token";

    private authorized: boolean = false;

    constructor(backend: XHRBackend, options: RequestOptions, @Optional() config: RESTServiceConfig)
    {
        super(backend, options);
        this.path = config.path;
        this.tokenKey = config.tokenKey || this.tokenKey;
    }

    public auth(): this
    {
        this.authorized = true;
        return this;
    }

    setAuthHeaders(request: Request | RequestOptionsArgs) {
        if (this.authorized) {
            if (!request.headers) {
                request.headers = new Headers();
            }
            request.headers.append('Authorization', 'Bearer ' + localStorage.getItem(this.tokenKey));
        }
        this.authorized = false;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>
    {
        if (url instanceof Request) {
            url.url = this.path + url.url;
            this.setAuthHeaders(url);
        } else {
            url = this.path + url;
            this.setAuthHeaders(options);
        }

        return super.request(url, options).catch((error: Response) => {
            try {
                error = error.json();
            } catch (e) {}

            return Observable.throw(error);
        });
    }
}