import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { User } from '../../data-access/models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService: CookieService = inject(CookieService);
  const authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  const router: Router = inject(Router);
  const user: User | undefined = authenticationService.getUser();

  //Check for the JWT token
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: JwtPayload = jwtDecode(token);

    //Check if token expired
    const expirationDate = decodedToken.exp! * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      //Logout
      authenticationService.logout();
      return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      //token is still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        return router.parseUrl('/auth/login');
      }
    }
  } else {
    //Logout
    authenticationService.logout();
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
