import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToTutorGuard} from "./can-navigate-to-tutor.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'offers', component:OfferListComponent},
  {path: 'offers/:id', component:OfferDetailsComponent},
  //Forms
  {path: 'tutor', component:OfferFormComponent, canActivate:[CanNavigateToTutorGuard]},
  {path: 'tutor/:id', component:OfferFormComponent, canActivate:[CanNavigateToTutorGuard]},
  //login
  {path: 'login', component:LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToTutorGuard]
})

export class AppRoutingModule{

}
