import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let csrfToken = this.cookieService.get('csrftoken');
    let cloneReq!: HttpRequest<any>;
    if (csrfToken) {
      cloneReq = req.clone({
        headers: req.headers.set('X-CSRFToken', csrfToken).set('WWW-Authenticate', '')
      })
    }
    return next.handle(cloneReq ?? req)
  }

}
