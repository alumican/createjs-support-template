/// <reference path="../reference.ts" />

module project {

	export class Screen extends alm.View<createjs.Container> {

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

			this.background = new Background();
			view.addChild(this.background.getView());

			this.foreground = new Foreground();
			view.addChild(this.foreground.getView());

			return view;
		}

		protected implReady():void {
			this.background.ready();
			this.foreground.ready();
		}

		protected implFinalize():void {
			this.foreground.finalize();
			this.background.finalize();
		}

		protected implShow(view:createjs.Container, useTransition:boolean):JPP.Command {
			return new JPP.Serial(
				new JPP.Func(():void => {
					view.visible = true;
				}),
				new JPP.Parallel(
					this.foreground.getShowCommand(useTransition),
					this.background.getShowCommand(useTransition)
				)
			);
		}

		protected implHide(view:createjs.Container, useTransition:boolean):JPP.Command {
			return new JPP.Serial(
				new JPP.Parallel(
					this.foreground.getHideCommand(useTransition),
					this.background.getHideCommand(useTransition)
				),
				new JPP.Func(():void => {
					view.visible = false;
				})
			);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private foreground:Foreground;
		private background:Background;
	}
}