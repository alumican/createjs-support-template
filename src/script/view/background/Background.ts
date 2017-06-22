/// <reference path="../../reference.ts" />

namespace project {

	export class Background extends alm.View<createjs.Container> {

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

		protected implInitialize():createjs.Container {
			const view:createjs.Container = new createjs.Container();

			this.circles = [];
			const numCircle:number = 100;
			let circle:Circle;
			for (let i:number = 0; i < numCircle; ++i) {
				circle = new Circle();
				view.addChild(circle.getView());
				this.circles.push(circle);
			}

			return view;
		}

		protected implReady():void {
			const numCircle:number = this.circles.length;
			for (let i:number = 0; i < numCircle; ++i) {
				this.circles[i].ready();
			}
		}

		protected implFinalize():void {
			const numCircle:number = this.circles.length;
			for (let i:number = 0; i < numCircle; ++i) {
				this.circles[i].finalize();
			}
		}

		protected implShow(view:createjs.Container, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Func(():void => {
					const numCircle:number = this.circles.length;
					for (let i:number = 0; i < numCircle; ++i) {
						this.circles[i].show(useTransition);
					}
				}),
				alm.CommandUtil.fadeIn(view, useTransition ? 1 : 0, cmd.Easing.easeOutQuart, false)
			);
		}

		protected implHide(view:createjs.Container, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Func(():void => {
					const numCircle:number = this.circles.length;
					for (let i:number = 0; i < numCircle; ++i) {
						this.circles[i].hide(useTransition);
					}
				}),
				alm.CommandUtil.fadeOut(view, useTransition ? 1 : 0, cmd.Easing.easeOutQuart, false)
			);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private circles:Circle[];
	}
}