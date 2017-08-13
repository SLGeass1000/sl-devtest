import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

/* App Redux and Request */
import { AppReducer, INITIAL_STATE, IApp } from './reducers/app.store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';
import { AppActions } from './actions/app.actions';

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
	private animationState : string = 'open';
	public scrollHidden : boolean = false;

	/* Redux */
	private subscription : Array<Subscription> = [];
	@select(['modal', 'openModalOverlay']) openModalOverlay$ : Observable<boolean>;
	@select(['modal', 'open']) modalOpen$ : Observable<boolean>;
	@select(['state', 'sid']) sid$ : Observable<string>;

	constructor(private elementRef: ElementRef,
							private renderer: Renderer2,
							private router : Router,
							private ngRedux : NgRedux<IApp>,
							private appActions : AppActions,
						 	private logger : LoggerService) {
		this.ngRedux.configureStore(AppReducer, INITIAL_STATE, null, []);
		this.logger.info(`${this.constructor.name}:`, 'Start app Artificial System!');
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
