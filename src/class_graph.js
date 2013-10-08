function PanelGraph( x_axis, y_axis, z_axis, canvas ) {
	
	this.dots = new Array();
	this.canvas = canvas;
	this.axes = new Array( x_axis, y_axis, z_axis );
	this.dim_x = 0;
	this.dim_y = 1;
	this.dim_z = 2;
	this.cursor = 0;
	
	this.setGraphXYZAxes = function( x_axis, y_axis, z_axis ) {
		this.axes[ 0 ] = x_axis;
		this.axes[ 1 ] = y_axis;
		this.axes[ 2 ] = z_axis;
	};
	
	this.getAxis = function( dimension ) {
		return this.axes[ dimension ];
	};
	
	this.setDimensionAsAxis = function( axis_number, dimension ) {
		
		switch ( axis_number ) {
		case 0:
			this.dim_x = dimension;
			break;
		case 1:
			this.dim_y = dimension;
			break;
		case 2:
			this.dim_z = dimension;
			break;
		}
	};
	
	this.setDimensionAsXAxis = function( dimension ) {
		this.dim_x = dimension;
	};
	
	this.setDimensionAsYAxis = function( dimension ) {
		this.dim_y = dimension;
	};
	
	this.setDimensionAsZAxis = function( dimension ) {
		this.dim_z = dimension;
	};
	
	this.setZCursorValue = function( percent ) {
		this.cursor = percent / 100;
	};
	
	this.addAxis = function( value ) {
		this.axes.push( value );
	};
	
	this.setDimensionScale = function( dimension, scale ) {
		this.axes[ dimension ] = scale;
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
		
		var x_axis = this.axes[ this.dim_x ];
		var y_axis = this.axes[ this.dim_y ];
		var z_axis = this.axes[ this.dim_z ];
		
		for( var i = 0; i < nbr; i++ ) {
			
			var dot = new DotGraph();

			dot.setValueForADimension( 0, Math.round( ( Math.random() * x_axis ) * 100 ) / 100 );
			dot.setValueForADimension( 1, Math.round( ( Math.random() * y_axis ) * 100 ) / 100 );
			dot.setValueForADimension( 2, Math.round( ( Math.random() * z_axis ) * 100 ) / 100 );
			
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
	
	this.getFactor = function( x, y, factor, dim ) {
		
		var multi = 1;
		
		if ( dim == 0 )
			multi = x; 
		if ( dim == 1 )
			multi = y;
		return multi * factor[ dim ];
	};
	
	this.drawGraph = function() {
		
		var start = new Date();
		
		var xsize = this.canvas.width;
		var ysize = this.canvas.height;
		var context = this.canvas.getContext( "2d" );
		var img = context.createImageData( 1, 1 );
				
		var x_axis = this.axes[ this.dim_x ];
		var y_axis = this.axes[ this.dim_y ];
		var z_axis = this.axes[ this.dim_z ];
		
		var factor = new Array( x_axis / xsize, y_axis / ysize, z_axis * this.cursor );
		
		var graph = new Array();
		
		for ( var x = 0; x < xsize; x++ ) {
			for ( var y = 0; y < ysize; y++ ) {
				
//				graph[ 0 ] = this.getFactor( x, y, factor, this.axes[ 0 ] );
//				graph[ 1 ] = this.getFactor( x, y, factor, this.axes[ 1 ] );
//				graph[ 2 ] = this.getFactor( x, y, factor, this.axes[ 2 ] );
				
				var x_graph = ( x * x_axis ) / xsize;
				var y_graph = ( y * y_axis ) / ysize;
				var z_graph = z_axis * this.cursor;
				
				var pos = new DotGraph();
				
//				pos.setValueForADimension( 0, graph[ 0 ] );
//				pos.setValueForADimension( 1, graph[ 1 ] );
//				pos.setValueForADimension( 2, graph[ 2 ] );
				
				pos.setValueForADimension( 0, x_graph );
				pos.setValueForADimension( 1, y_graph );
				pos.setValueForADimension( 2, z_graph );
				
				var color = this.getColorFromDotPosition( pos );
				
				img.data[ 0 ] = color[ 0 ];
				img.data[ 1 ] = color[ 1 ];
				img.data[ 2 ] = color[ 2 ];
				img.data[ 3 ] = 255;
				
				context.putImageData( img, x, ysize - y );
			}
		}
		
		for ( var i = 0, size = this.dots.length; i < size; i++ ) {
			this.drawDotCross( this.dots[ i ], context );
		}
		
		var end = new Date();
		return ( end.getTime() - start.getTime() );
	};
	
	this.drawDotCross = function( dot, context ) {
		
		var posx = ( dot.getValueOfADimension( 0 ) * this.canvas.width ) / this.axes[ this.dim_x ];
		var posy = this.canvas.height - ( dot.getValueOfADimension( 1 ) * this.canvas.height ) / this.axes[ this.dim_y ];
		// var txt = "(" + posx + "," + posy + ")";
		
		context.strokeStyle = "#000000";
		context.beginPath();
		context.moveTo( posx - 5, posy );
		context.lineTo( posx + 5, posy );
		context.moveTo( posx, posy - 5 );
		context.lineTo( posx, posy + 5 );
		context.stroke();
		// context.strokeText( txt, posx + 7, posy - 5 );
	};
};