var GameTimer	= function(timeToLive){
	// display timer
	this.remaining	= timeToLive
	this.disable	= false

	yeller.addEventListener('addTime', function(value){
		this.remaining	+= value
		this.display();
	}.bind(this))

	yeller.addEventListener('setTime', function(value){
		this.remaining	= value
		this.display();
	}.bind(this))

	this.update	= function(delta, now){
		// update this.elapsedTime
		if( this.disable === false )	this.remaining	-= delta;
		// display it
		this.display()
	}
	this.reset	= function(){
		this.remaining	= timeToLive
	}
	this.display	= function(){
		// parse this.elapsedTime
		var nMilliSecs	= Math.floor(this.remaining*1000) % 1000;
		var nSeconds	= Math.floor(this.remaining);
		// update the html
		var element	= document.querySelector('#timer');
		element.innerText= stringPadder(nSeconds, 2, '0')
					+ ':'
					+ stringPadder(nMilliSecs, 2, '0');
		
		function stringPadder(value, width, padChar){
			var maxPadded	= Array(width+1).join(padChar) + value;
			return maxPadded.substr(maxPadded.length-width);
		}
	}
}
