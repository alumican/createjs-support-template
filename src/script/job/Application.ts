/// <reference path="../reference.ts" />

namespace project {

	export class Application {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public run():void {
			console.log("[Application] run");

			// Setup CreateJS
			this.$canvas = jQuery("#stage");
			this.stage = new createjs.Stage(this.$canvas.get(0));

			// Setup Ticker
			createjs.Ticker.framerate = Config.FPS;
			createjs.Ticker.addEventListener("tick", this.tickerHandler);

			// Setup stats
			if (Config.DEBUG_MODE) {
				this.stats = new Stats();
				jQuery("body").append(this.stats.domElement);
			}

			// Setup view
			this.screen = new Screen();
			this.stage.addChild(this.screen.getView());

			// Setup watcher
			alm.ResizeWatcher.addEventListener(alm.ResizeWatcherEvent.RESIZE, this.resizeWatcherResizeHandler);
			alm.ScrollWatcher.addEventListener(alm.ScrollWatcherEvent.SCROLL, this.scrollWatcherResizeHandler);
			alm.KeyWatcher.addEventListener(alm.KeyWatcherEvent.KEY_DOWN, this.keyWatcherResizeHandler);

			this.load();
		}

		private load():void {
			alm.ResizeWatcher.apply();
			alm.ScrollWatcher.apply();

			this.screen.ready();

			this.screen.show();
			this.$canvas.css({ display: "block" });

			alm.ResizeWatcher.start();
			alm.ScrollWatcher.start();
			alm.KeyWatcher.start();

			this.resizeWatcherResizeHandler(null);
			this.tickerHandler(null);
		}

		private update():void {
			if (Config.DEBUG_MODE) this.stats.begin();
			this.stage.update();
			if (Config.DEBUG_MODE) this.stats.end();
		}

		private resize():void {
			const stageWidth:number = alm.ResizeWatcher.getStageWidth();
			const stageHeight:number = alm.ResizeWatcher.getStageHeight();

			this.$canvas.attr({ width: stageWidth, height: stageHeight });
			this.$canvas.css({ width: stageWidth, height: stageHeight });
		}





		private tickerHandler = (event:createjs.Event):void => {
			this.update();
		};

		private resizeWatcherResizeHandler = (event:alm.ResizeWatcherEvent):void => {
			this.resize();
		};

		private scrollWatcherResizeHandler = (event:alm.ScrollWatcherEvent):void => {
		};

		private keyWatcherResizeHandler = (event:alm.KeyWatcherEvent):void => {
			console.log("[Application] key down : '" + event.key + "'");
		};




		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private stats:Stats;
		private $canvas:JQuery;
		private stage:createjs.Stage;
		private screen:Screen;
	}
}