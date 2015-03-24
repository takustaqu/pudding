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



/*

crossSplit

example.

	var x = new p.gn.crossSplit($("#type_a").get(0),[0.5,0.5]);
	var ctx = $("#playground").get(0).getContext('2d');
	x.render(ctx,0,0,100,100,0,0);

*/

p.generators.CrossSplit = function(source,centerRatio){

		this.source = source;
		this.ratio = centerRatio;

		var ltWidth = Math.floor(this.source.width * centerRatio[0]);
		var ltHeight = Math.floor(this.source.height * centerRatio[1]);

		this.sizes = {
			a:[ltWidth,ltHeight],
			b:[this.source.width - ltWidth,ltHeight],
			c:[this.source.width - ltWidth,this.source.height-ltHeight],
			d:[ltWidth,this.source.height-ltHeight]
		}	

	}

	p.generators.CrossSplit.prototype.render = function(ctx,dx,dy,dw,dh,ctrX,ctrY) {

			ctrX = Math.floor(ctrX);
			ctrY = Math.floor(ctrY);

			dltWidth = Math.floor(dw * this.ratio[0]) + ctrX;
			dltHeight = Math.floor(dh * this.ratio[1]) + ctrY;

			var ax = {
					a:[dltWidth,dltHeight],
					b:[dw - dltWidth,dltHeight],
					c:[dw - dltWidth,dh-dltHeight],
					d:[dltWidth,dh-dltHeight]
				}

			//Draw part a
			ctx.drawImage( this.source , 0 , 0 , this.sizes.a[0] , this.sizes.a[1] , dx , dy , ax.a[0] , ax.a[1] );

			//Draw part b
			ctx.drawImage( this.source , this.sizes.a[0] , 0 , this.sizes.b[0] , this.sizes.b[1] , dx + ax.a[0] , dy , ax.b[0] , ax.b[1] );

			//Draw part c
			ctx.drawImage( this.source , this.sizes.a[0], this.sizes.a[1] , this.sizes.c[0] , this.sizes.c[1] , dx + ax.a[0] , dy + ax.a[1] , ax.c[0] , ax.c[1] );

			//Draw part d
			ctx.drawImage( this.source , 0, this.sizes.a[1] , this.sizes.d[0] , this.sizes.d[1] , dx , dy + ax.a[1] , ax.d[0] , ax.d[1] );
			
		} //prototype.render

//Image element wrapper;
p.toImgElement = {};
p.tie = p.toImgElement;


p.tie.CrossSplit = function($element,centerRatio){

	this.elW = $element.width;
	this.elH = $element.height;

	this.canvas = t.createCanvas(this.elW,this.elH);

	this.gnXS = new p.gn.CrossSplit($element,centerRatio);

	$($element).after(this.canvas.el).hide();

	this.gnXS.render(this.canvas.ctx,0,0,this.elW,this.elH,0,0);

};

p.tie.CrossSplit.prototype.set = function(translateX,translateY){
	this.canvas.ctx.clearRect(0, 0, this.elW,this.elH);
	this.gnXS.render(this.canvas.ctx,0,0,this.elW,this.elH,translateX,translateY);	
};


/*********************/
})(pudding)

var p = pudding;

