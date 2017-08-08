import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
		CommonModule
	],
  declarations: [
	],
  exports: [
		// Modules
		CommonModule,
		FormsModule,
		ReactiveFormsModule
		//Directives
	]
})
export class SharedModule {
}
