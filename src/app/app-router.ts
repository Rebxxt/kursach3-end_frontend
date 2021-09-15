import {Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {OrderComponent} from "./order/order.component";
import {AdminComponent} from "./admin/admin.component";
import {UserEditorComponent} from "./user-editor/user-editor.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {OrderCreateComponent} from "./order-create/order-create.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'order/create', component: OrderCreateComponent, canActivate: [AuthGuard]},
  {path: 'order/history', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'user-editor', component: UserEditorComponent, canActivate: [AuthGuard]},
]
