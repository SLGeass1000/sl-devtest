import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';

/* App Redux and Request */
import { AppReducer, INITIAL_STATE, IApp } from './reducers/app.store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';

/* App Services */
import { LoggerService } from './core/logger.service';

/* App Animations */

@Component({
	moduleId : module.id,
	selector : 'sl-root',
	templateUrl : 'app.component.html',
	styleUrls : [ 'app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
	public scrollHidden : boolean = false;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['modal', 'openModalOverlay']) openModalOverlay$ : Observable<boolean>;
	@select(['modal', 'open']) modalOpen$ : Observable<boolean>;

	constructor(private elementRef: ElementRef,
							private renderer: Renderer2,
							private ngRedux : NgRedux<IApp>,
						 	private logger : LoggerService) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
		this.logger.info(`${this.constructor.name}:`, 'Start app!');
	}
	ngOnInit () {
		let sub : Subscription;
		sub = this.modalOpen$.subscribe((data) => {
			if (data) {
				this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'overflow-y', 'hidden');
				this.scrollHidden = true;
			} else {
				this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'overflow-y', 'scroll');
				this.scrollHidden = false;
			}
		});
		this.subscription.push(sub);
	}
	ngOnDestroy () {
		this.subscription.map((data) => data.unsubscribe());
	}
}
