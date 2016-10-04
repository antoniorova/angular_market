import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AdminModule } from './admin/admin.module';
import { MarketModule } from './market/market.module';
import { BagModule } from './bag/bag.module';

import { ProductService } from './service/product.service';
import { BagService } from './service/bag.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		routing,
		AdminModule,
		MarketModule,
		BagModule
	],
	declarations: [
		AppComponent
	],
	providers: [appRoutingProviders, ProductService, BagService],
	bootstrap: [AppComponent]
})

export class AppModule {}