/*

pudding.js by [ow;d]

*/



var pudding = {};

(function(p){
/*********************/

//Adding toolkits.
p.tools =  {
	loadImg : function(src , callback){
		var result = src;
		callback.call(this,src);
		return result;
	},

	createCanvas : function(width,height){

		if(!width || !height){
			return false;
		}

		var result  = {
			el : document.createElement("CANVAS")
		}

		result.el.width = width;
		result.el.height = height;
		result.ctx = result.el.getContext("2d");

		return result;
	}
}

var t = p.tools;

p.generators = {}
p.gn = p.generators;



p.generators.crossSplit = function(source,centerRatio){

		this.source = source;

		var ltWidth = Math.floor(this.source.width * centerRatio[0]);
		var ltHeight = Math.floor(this.source.height * centerRatio[1]);

		this.sizes = {
			a:[ltWidth,ltHeight],
			b:[this.source.width - ltWidth,ltHeight],
			c:[this.source.width - ltWidth,this.source.height-ltHeight],
			d:[ltWidth,this.source.height-ltHeight]
		}	

	}

p.generators.crossSplit.prototype.render(ctx,dx,dy,dw,dh,ctrX,ctrY) {

	}

/*********************/
})(pudding)

var p = pudding;











var Wobblekit = function($el,option){

	this.option = {
		center:[0.5,0.5]
	}

	if(!!option){
		$.extend(this.option,option);
	}

	this.$el = $el;

	var elClass = $el.attr("class");

	this.rawsize = {
		width:$el.get(0).naturalWidth,
		height:$el.get(0).naturalHeight
	}

	var canvas = document.createElement("CANVAS");
	canvas.width = this.rawsize.width;
	canvas.width = this.rawsize.height;
	this.canvas = canvas;
	
	this.axises = [[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]],[[0,0],[0,0]]];

	$(canvas).addClass(elClass);
	

	(function(center,$img,axises,rawsize){
	
		var tmpW = Math.round(center[0] * rawsize.width);
		var tmpH = Math.round(center[1] * rawsize.height);

		axises[0][1][0] = tmpW;
		axises[0][1][1] = tmpH;

		axises[1][0][0] = tmpW;

		axises[1][1][0] = rawsize.width;
		axises[1][1][1] = tmpH;

		axises[2][0][0] = tmpW;
		axises[2][0][1] = tmpH;

		axises[2][1][0] = rawsize.width;
		axises[2][1][1] = rawsize.height;

		axises[3][0][1] = tmpH;
		axises[3][1][0] = tmpW;
		axises[3][1][1] = rawsize.height;

	})(this.option.center,this.$el,this.axises,this.rawsize);

	this.$el.after($(canvas));

	var ctx = canvas.getContext('2d');
	var ax = this.axises;
	ctx.drawImage(this.$el.get(0),
		ax[0][0][0], ax[0][0][1],
		ax[2][1][0], ax[2][1][1],
		ax[0][0][0], ax[0][0][1],
		ax[2][1][0], ax[2][1][1]);

	$el.remove();
}

Wobblekit.prototype.setCenter = function(x,y){
}

Wobblekit.prototype.render = function(x,y){

	if (!x){
		return false;
	}

	x = Math.floor(x);
	y = Math.floor(y);

	var ctx = this.canvas.getContext('2d');
	var ax = this.axises;

	this.canvas.style.visibility = 'hidden'; // Force a change in DOM
	this.canvas.offsetHeight; 
	this.canvas.style.visibility = 'inherit'; 

	
	ctx.clearRect(0, 0, ax[2][1][0],ax[2][1][1]);

	ctx.drawImage(this.$el.get(0),
			ax[0][0][0], ax[0][0][1],
			ax[0][1][0], ax[0][1][1],
			ax[0][0][0], ax[0][0][1],
			ax[0][1][0]+x+0.0, ax[0][1][1]+y+0.0);

	ctx.drawImage(this.$el.get(0),
			ax[1][0][0], ax[1][0][1],
			ax[1][1][0]-ax[1][0][0], ax[1][1][1]-ax[1][0][1],
			ax[1][0][0]+x, ax[1][0][1],
			ax[1][1][0]-ax[1][0][0]-x-0.0, ax[1][1][1]-ax[1][0][1]+y+0.0);

	ctx.drawImage(this.$el.get(0),
			ax[2][0][0], ax[2][0][1],
			ax[2][1][0]-ax[2][0][0], ax[2][1][1]-ax[2][0][1],
			ax[2][0][0]+x, ax[2][0][1]+y,
			ax[2][1][0]-ax[2][0][0]-x-0.0, ax[2][1][1]-ax[2][0][1]-y-0.0);

	ctx.drawImage(this.$el.get(0),
			ax[3][0][0], ax[3][0][1],
			ax[3][1][0]-ax[3][0][0], ax[3][1][1]-ax[3][0][1],
			ax[3][0][0], ax[3][0][1]+y,
			ax[3][1][0]-ax[3][0][0]+x+0.0, ax[3][1][1]-ax[3][0][1]-y-0.0);

}