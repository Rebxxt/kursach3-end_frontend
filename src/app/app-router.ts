import {Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {OrderComponent} from "./order/order.component";
import {AdminComponent} from "./admin/admin.component";
import {UserEditorComponent} from "./user-editor/user-editor.component";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'order', component: OrderComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'user-editor', component: UserEditorComponent},
]
