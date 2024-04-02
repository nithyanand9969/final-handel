import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { AdminComponent } from './admin/admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserSideNavComponent } from './user-side-nav/user-side-nav.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './home/user/user.component';
import { CorporateregisterComponent } from './corporateregister/corporateregister.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LogoutComponent } from './home/logout/logout.component';
import { TraderregisterComponent } from './traderregister/traderregister.component';
import { IntermediaryregisterComponent } from './intermediaryregister/intermediaryregister.component';
import { UserinfoComponent } from './home/userinfo/userinfo.component';
import { CorporateUsersComponent } from './corporate-users/corporate-users.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PostnewrequirmentComponent } from './postnewrequirment/postnewrequirment.component';
import { TranscationComponent } from './transcation/transcation.component';
import { SettingComponent } from './setting/setting.component';
import { TraderinfoComponent } from './home/traderinfo/traderinfo.component';
import { InterinfoComponent } from './home/interinfo/interinfo.component';
import { ManageTranscationComponent } from './manage-transcation/manage-transcation.component';
import { UserdetailsComponent } from './home/user/userdetails/userdetails.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'forgotpassword', component: ForgetpasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'postnewrequirment', component: PostnewrequirmentComponent },
  { path: 'transcation', component: TranscationComponent },
  { path: 'manage-transcation', component: ManageTranscationComponent },
  { path: 'setting', component: SettingComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserComponent },
      {path:'userdetails/:id',component:UserdetailsComponent},
      { path: 'corporateregister', component: CorporateregisterComponent },
      { path: 'traderregister', component: TraderregisterComponent },
      { path: 'intermediator', component: IntermediaryregisterComponent },
      { path: 'userinfo', component: UserinfoComponent },
      { path: 'traderinfo', component: TraderinfoComponent },
      { path: 'interinfo', component: InterinfoComponent },
      { path: 'corporateusers', component: CorporateUsersComponent },
    ],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'side-nav', component: SideNavComponent, canActivate: [AuthGuard] },
  {
    path: 'user-side-nav',
    component: UserSideNavComponent,
    canActivate: [AuthGuard],
  },

  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
