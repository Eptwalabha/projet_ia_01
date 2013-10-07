function PanelGraph() {
	
	this.dots = new Array();
	
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
			return "000";
			
		var min = -1;
		var closest_dot = null;
		
		for( dot in this.dots ) {
			
			var dist = dot.getDistance( position );
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
			var r =  Math.random() * 16;
			var g =  Math.random() * 16;
			var b =  Math.random() * 16;
			
			dot.color = "" + r.toString(16) + "" + g.toString(16) + "" + b.toString(16);
			
			this.dots.push( dot );
		}
	};
};