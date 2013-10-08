function PanelGraph( x_axis, y_axis, canvas ) {
	
	this.dots = new Array();
	this.canvas = canvas;
	this.x_axis = x_axis;
	this.y_axis = y_axis;
	
	this.setGraphAxes = function( x_axis, y_axis ) {
		this.x_axis = x_axis;
		this.y_axis = y_axis;
	};
	
	this.getXAxis = function() {
		return this.x_axis;
	};
	
	this.getYAxis = function() {
		return this.y_axis;
	};
	
	this.addDot = function( dot ) {
		this.dots.push( dot );
	};
	
	this.addDots = function( dots ) {
		for( dot in dots ) {
			this.addDot( dot );
		}
	};
	
	this.getColorFromDotPosition = function( position ) {
		
		if ( this.dots.length == 0 )
			return new Array( 0, 0, 0 );
			
		var min = -1;
		var closest_dot = null;
		
		for( var i = 0, size = this.dots.length; i < size; i++ ) {
			
			var dot = this.dots[ i ];
			
			var dist = dot.getSquareDistance( position );
			if ( min == -1 || dist < min ) {
				min = dist;
				closest_dot = dot;
			}
		}
		
		return closest_dot.color;
	};
	
	this.clearDots = function() {
		this.dots = new Array();
	};
	
	this.createRandomPopulation = function( nbr ) {
		
		this.clearDots();
		
		for( var i = 0; i < nbr; i++ ) {
			
			var dot = new DotGraph();
			dot.setValueForADimension( 0, Math.random()*50 );
			dot.setValueForADimension( 1, Math.random()*50 );
			var r =  Math.round( Math.random() * 255 );
			var g =  Math.round( Math.random() * 255 );
			var b =  Math.round( Math.random() * 255 );
			
			dot.color = new Array( r, g, b );
			
			this.dots.push( dot );
		}
	};
	
	this.setCanvas = function( canvas ) {
		this.canvas = canvas;
	};
	
	this.drawGraph = function() {
		
		var date = new Date();
		var start = date.getMilliseconds();
		
		var xsize = this.canvas.width;
		var ysize = this.canvas.height;
		var context = this.canvas.getContext( "2d" );
		var img = context.createImageData( 1, 1 );
				
		for ( var x = 0; x < xsize; x++ ) {
			for ( var y = 0; y < ysize; y++ ) {
				
				var x_graph = ( x * this.x_axis ) / xsize;
				var y_graph = ( y * this.y_axis ) / ysize;
				
				var pos = new DotGraph();
				pos.setValueForADimension( 0, x_graph );
				pos.setValueForADimension( 1, y_graph );
				
				var color = this.getColorFromDotPosition( pos );
				
				img.data[ 0 ] = color[ 0 ];
				img.data[ 1 ] = color[ 1 ];
				img.data[ 2 ] = color[ 2 ];
				img.data[ 3 ] = 255;
				
				context.putImageData( img, x, ysize - y );
			}
		}
		
		for ( dot in this.dots ) {
			this.drawDotCross( dot );
		}
		
		return date.getMilliseconds() - start;
	};
	
	this.drawDotCross = function( dot ) {
		// TODO
	};
};