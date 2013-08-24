var MapPlanets1	= function(opts){
	// parse argument
	opts			= opts	|| {}
	opts.nLives		= opts.nLives !== undefined ? opts.nLives : 1
	opts.ballAttraction	= opts.ballAttraction !== undefined ? opts.ballAttraction : 0.1
	opts.nBotBalls		= opts.nBotBalls !== undefined ? opts.nBotBalls : 2
	opts.nBotBallsBig	= opts.nBotBallsBig !== undefined ? opts.nBotBallsBig : 0
	opts.nBotEnemies	= opts.nBotEnemies !== undefined ? opts.nBotEnemies : 0
	opts.nBotBouncers	= opts.nBotBouncers !== undefined ? opts.nBotBouncers : 0

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	// handle updateFcts for sounds
	var updateFcts	= [];
	this.update	= function(delta, now){
		updateFcts.forEach(function(updateFct){
			updateFct(delta, now)
		})
	}
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	// add a skymap	
	if( GAME.profile.skymapEnabled ){
		var geometry	= new THREE.SphereGeometry(90, 32, 32)
		var material	= new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
			side	: THREE.BackSide
		})
		var starSphere	= new THREE.Mesh(geometry, material)
		scene.add(starSphere)
	}

	// init lighting
	var lighting	= new LightingDefault()
	this.lighting	= lighting
	scene.add(lighting.object3d)


	// add table
	var table	= new MapTable()
	this.table	= table;
	scene.add(table.object3d)
	updateFcts.push(function(delta, now){
		table.update(delta, now)
	})
	
	// add botGoal
	var botGoal	= new BotGoal
	table.object3d.add(botGoal.object3d)
	updateFcts.push(function(delta, now){
		botGoal.update(delta, now)
	})
	var body	= botGoal.object3d.userData.cannonBody.body
	body.position.set(24*GAME.tileW, 3 * GAME.tileW/2, 0*GAME.tileW)
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		init Player								//
	//////////////////////////////////////////////////////////////////////////////////
	;(function(){
		var textureColor= THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg')
		var textureBump	= THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg')
		var textureSpec	= THREE.ImageUtils.loadTexture('images/planets/earthspec1k.jpg')
		var player	= new Player({
			liveMirror	: false,
			material	: new THREE.MeshPhongMaterial({
				map		: textureColor,
				bumpMap		: textureBump,
				bumpScale	: 0.02,
				specularMap	: textureSpec,
				specular	: new THREE.Color('grey'),
			}),
		})
		GAME.ball	= player.mesh
		updateFcts.push(function(delta, now){
			player.update(delta, now)
		})
		var body	= GAME.ball.userData.cannonBody.body
		body.position.set(-15*GAME.tileW, 20*GAME.tileW, 0*GAME.tileW)	
	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		nBotEnemies							//
	//////////////////////////////////////////////////////////////////////////////////

	for(var i = 0; i < opts.nBotEnemies; i++){
		;(function(){
			var botEnemy	= new BotEnemy()
			updateFcts.push(function(delta, now){
				botEnemy.update(delta, now)
			})
		})()
	}


	//////////////////////////////////////////////////////////////////////////////////
	//		nBotBalls							//
	//////////////////////////////////////////////////////////////////////////////////
		
	for(var i = 0; i < opts.nBotBalls; i++){
		;(function(){
			if( i === 0 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/jupitermap.jpg')			
			}else if( i === 1 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg')
			}else if( i === 2 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/neptunemap.jpg')
			}else if( i === 3 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/venus.jpg')			
			}else	console.assert(false)
			var botBall	= new BotBall2({
				nLives		: opts.nLives,
				ballAttraction	: opts.ballAttraction,
				material	: new THREE.MeshPhongMaterial({
					map	: texture,
				}),
			})
			updateFcts.push(function(delta, now){
				botBall.update(delta, now)
			})
		})()
	}
	//////////////////////////////////////////////////////////////////////////////////
	//		nBotBallsBig							//
	//////////////////////////////////////////////////////////////////////////////////
		
	for(var i = 0; i < opts.nBotBallsBig; i++){
		;(function(){
			if( i === 0 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/jupitermap.jpg')			
			}else if( i === 1 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/mars_1k_color.jpg')
			}else if( i === 2 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/neptunemap.jpg')
			}else if( i === 3 ){
				var texture	= THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg')			
			}else	console.assert(false)
			var botBall	= new BotBall2({
				nLives: opts.nLives,
				ballAttraction	: opts.ballAttraction,
				radius		: 2.5*GAME.tileW,
				material	: new THREE.MeshPhongMaterial({
					map	: texture,
				}),
			})
			updateFcts.push(function(delta, now){
				botBall.update(delta, now)
			})
		})()
	}
}
