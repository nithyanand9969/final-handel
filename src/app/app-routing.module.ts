import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Import your AuthGuard here

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

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
 
 
  {path:'forgotpassword',component:ForgetpasswordComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'postnewrequirment',component:PostnewrequirmentComponent},
  {path:'transcation',component:TranscationComponent},
  {path:'setting',component:SettingComponent},
 

  // ... other routes without authentication

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    {path:'user',component:UserComponent},
    {path:'corporateregister',component:CorporateregisterComponent},
    {path:'traderregister',component:TraderregisterComponent},
    {path:'intermediator',component:IntermediaryregisterComponent},
    {path:'userinfo',component:UserinfoComponent},
    {path:'traderinfo',component:TraderinfoComponent},
    {path:'interinfo',component:InterinfoComponent},
    {path:'corporateusers',component:CorporateUsersComponent},
    
    
    // ... other child routes that require authentication
  ]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, // Protect this route with AuthGuard
  { path: 'side-nav', component: SideNavComponent, canActivate: [AuthGuard] },
  {path:'user-side-nav',component:UserSideNavComponent,canActivate: [AuthGuard]},


  {path:'logout',component:LogoutComponent} // Protect this route with AuthGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
