/// <reference path="../../reference.ts" />

namespace project {

	import ScrollWatcher = alm.ScrollWatcher;
	export class Circle extends alm.View<createjs.Shape> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			super();
			this.initialize();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implInitialize():createjs.Shape {
			const view:createjs.Shape = new createjs.Shape();

			this.radius = alm.Num.random(50, 100);
			const g:createjs.Graphics = view.graphics;
			g.beginFill("#" + ("000000" + Math.floor(Math.random() * 0xffffff)).substr(-6, 6));
			g.drawCircle(0, 0, this.radius);
			g.endFill();

			return view;
		}

		protected implReady():void {
			alm.ScrollWatcher.addEventListener(alm.ScrollWatcherEvent.SCROLL, this.scrollWatcherScrollHandler);

			this.offsetX = alm.Num.random(this.radius, alm.ResizeWatcher.getContentWidth() - this.radius);
			this.offsetY = alm.Num.random(this.radius, alm.ResizeWatcher.getContentHeight() - this.radius);

			const view:createjs.Shape = this.getView();
			view.x = this.offsetX;
			view.y = this.offsetY;
		}

		protected implFinalize():void {
			alm.ScrollWatcher.removeEventListener(alm.ScrollWatcherEvent.SCROLL, this.scrollWatcherScrollHandler);
		}

		protected implShow(view:createjs.Shape, useTransition:boolean):cmd.Command {
			return new cmd.Func(():void => {
				view.alpha = 1;
			});
		}

		protected implHide(view:createjs.Shape, useTransition:boolean):cmd.Command {
			return new cmd.Func(():void => {
				view.alpha = 0.2;
			});
		}





		private scrollWatcherScrollHandler = (event:alm.ScrollWatcherEvent):void => {
			const view:createjs.Shape = this.getView();
			view.y = ScrollWatcher.calcScrolledPosition(this.offsetY);

			const scrolledPositionRatio:number = ScrollWatcher.calcScrolledPositionRatio(this.offsetY);
			if (scrolledPositionRatio >= 0 && scrolledPositionRatio <= 1) {
				this.show();
			} else {
				this.hide();
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private radius:number;
		private offsetX:number;
		private offsetY:number;
	}
}