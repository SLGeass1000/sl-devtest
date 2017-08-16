export { Renderer2, ElementRef } from '@angular/core';

import { RendererStyleFlags2 } from '@angular/core';

export class ElementRefStub {
	nativeElement : any;
}

export class Renderer2Stub {
	setStyle (el : any, style : string, value : any, flags ?: RendererStyleFlags2) : void {
	}
}
