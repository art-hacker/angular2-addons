import {Injectable, Optional} from "@angular/core";
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs";
import {RESTServiceConfig} from "./RESTServiceConfig";

@Injectable()
export class RESTService extends Http
{
    private path: string = "";
    private tokenKey: string = "token";

    private authorized: boolean = false;
    private isFormData: boolean = false;

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

    public withFile(): this
    {
        this.isFormData = true;
        return this;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>
    {
        if(this.authorized) {
            this.authorized = false;
            options.headers.append('Authorization', 'Bearer ' + localStorage.getItem(this.tokenKey));
        }

        if(this.isFormData) {
            this.isFormData = false;
            options.headers.append('Content-Type', 'multipart/form-data');
        }

        if (url instanceof Request) {
            url.url = this.path + url.url;
        } else {
            url = this.path + url;
        }

        return super.request(url, options).catch((error: Response) => {
            try {
                error = error.json();
            } catch (e) {}

            return Observable.throw(error);
        });
    }
}