var GameTimer	= function(){
	// display timer
	this.elapsedTime= 0
	this.disable	= false
	this.update	= function(delta, now){
		// update this.elapsedTime
		if( this.disable === false )	this.elapsedTime	+= delta;
		// display it
		this.display()
	}
	this.display	= function(){
		// parse this.elapsedTime
		var nMilliSecs	= Math.floor(this.elapsedTime*1000) % 1000;
		var nSeconds	= Math.floor(this.elapsedTime);
		// update the html
		var element	= document.querySelector('#timer');
		element.innerText= stringPadder(nSeconds, 2, '0')
					+ ':'
					+ stringPadder(nMilliSecs, 3, '0');
		
		function stringPadder(value, width, padChar){
			var maxPadded	= Array(width+1).join(padChar) + value;
			return maxPadded.substr(maxPadded.length-width);
		}
	}
}
