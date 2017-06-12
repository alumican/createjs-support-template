/// <reference path="../../reference.ts" />

module project {

	export class Foreground extends alm.View<createjs.Container> {

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
			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
		}

		protected implShow(view:createjs.Container, useTransition:boolean):JPP.Command {
			return alm.CommandUtil.fadeIn(view, useTransition ? 1 : 0, JPP.Easing.easeOutQuart, false);
		}

		protected implHide(view:createjs.Container, useTransition:boolean):JPP.Command {
			return alm.CommandUtil.fadeOut(view, useTransition ? 1 : 0, JPP.Easing.easeOutQuart, false);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}