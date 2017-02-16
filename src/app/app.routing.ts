import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { HomeComponent } from './home/home.component';
import { CreateBubblbookingComponent } from './create-bubblbooking/create-bubblbooking.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const appRoutes: Routes = [

 { 	path: '',
	redirectTo: '/home',
	pathMatch: 'full'

},
{
	path: 'home',
	component: HomeComponent
},
{
	path: 'createbubblbooking',
	component: CreateBubblbookingComponent
},
{
	path: 'category',
	component: CategoryComponent
},
{
	path: 'activities',
	component: ActivitiesComponent
},
{
	path:'activities/:_id',
	component: ActivityDetailsComponent

},
{
	path:'login',
 	component: LoginComponent
 }

];

export const appRoutingProviders: any[] = [

];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);