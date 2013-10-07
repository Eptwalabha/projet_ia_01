function DotGraph() {
	
	this.values = new Array();
	this.color = "AAA";
	
	this.setValueForADimension = function( dim, value ) {
		this.values[ dim ] = values;
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
	
	this.getDistance = function( dot ) {
		return (dot.x-this.x)^2;
	};
};