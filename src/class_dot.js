function DotGraph() {
	
	this.values = new Array();
	this.color = new Array( 0, 0, 0 );
	
	this.setValueForADimension = function( dim, value ) {
		this.values[ dim ] = value;
	};
	
	this.getValueOfADimension = function( dim ) {
		this.values[ dim ];
	};
	
	this.setColor = function( color ) {
		this.color = color;
	};
	
	this.getNumberOfDimension = function() {
		return this.values.length;
	};
	
	this.getSquareDistance = function( dot ) {
		var sum = 0;
		var dim1 = this.getNumberOfDimension();
		var dim2 = dot.getNumberOfDimension();
		var dim = ( dim1 < dim2 ) ? dim1 : dim2;
		
		for ( var i = 0; i < dim; i++ ) {
			sum += Math.pow( ( dot.values[ i ] - this.values[ i ] ), 2 );
		}
		return sum;
	};
};