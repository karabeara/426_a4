/*
 * In this file you can specify all sort of updaters
 *  We provide an example of simple updater that updates pixel positions based on initial velocity and gravity
 */

////////////////////////////////////////////////////////////////////////////////
// Collisions
////////////////////////////////////////////////////////////////////////////////

var Collisions = Collisions || {};


Collisions.BouncePlane = function ( particleAttributes, alive, delta_t, plane, damping ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var lifetimes  = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos  = getElement( i, positions );
        var vel  = getElement( i, velocities );
        var life = getElement( i, lifetimes );

        var currPlane = pos.x;
        if ( plane.y === 1 ) { currPlane = pos.y; }
        if ( plane.z === 1 ) { currPlane = pos.z; }

        if ( currPlane <= 0.1 ) {
          vel.x = vel.x * 5;
          vel.y = vel.y * -0.8;
          vel.z = vel.z * 5;
        }

        if ( currPlane <= 0.0 ) {
          life = -1.0;
        }

        setElement( i, velocities, vel );
        setElement( i, lifetimes, life );
        // ----------- STUDENT CODE END ------------
    }
};

Collisions.SinkPlane = function ( particleAttributes, alive, delta_t, plane ) {
    var positions   = particleAttributes.position;
    var lifetimes   = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos  = getElement( i, positions );
        var life = getElement( i, lifetimes );

        var currPlane = pos.x;
        if ( plane.y === 1 ) { currPlane = pos.y; }
        if ( plane.z === 1 ) { currPlane = pos.z; }

        if ( currPlane <= 0.0 ) {
          life = -1.0;
        }

        setElement( i, positions, pos );
        setElement( i, lifetimes, life );
        // ----------- STUDENT CODE END ------------
    }
};


function _isPointInsideSphere (sphere, pos) {

    var squaredDist = pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
    if (squaredDist < sphere.w * sphere.w) {
        return true;
    }
    else
        return false;
}

function _getCorrectPosForPointInSphere(sphere, pos) {

    var correctPosition =  pos.clone();
    correctPosition.sub(sphere);
    correctPosition.normalize();
    correctPosition.multiplyScalar(sphere.w);
    correctPosition.add(sphere);
    // console.log(correctPosition);
    return correctPosition
}
Collisions.BounceSphere = function ( particleAttributes, alive, delta_t, sphere, damping ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );
        var radius = sphere.w;
        // console.log(pos);
        // console.log(sphere)
       // assert(false)
        if (_isPointInsideSphere(sphere, pos)) {
            pos = _getCorrectPosForPointInSphere(sphere, pos);
            vel = 0;
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
}

////////////////////////////////////////////////////////////////////////////////
// Null updater - does nothing
////////////////////////////////////////////////////////////////////////////////

function VoidUpdater ( opts ) {
    this._opts = opts;
    return this;
};

VoidUpdater.prototype.update = function ( particleAttributes, initialized, delta_t ) {
    //do nothing
};

////////////////////////////////////////////////////////////////////////////////
// Euler updater
////////////////////////////////////////////////////////////////////////////////

function EulerUpdater ( opts ) {
    this._opts = opts;
    return this;
};


EulerUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};

EulerUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var p = getElement( i, positions );
        var v = getElement( i, velocities );

        // now update velocity based on forces...
        v.add( gravity.clone().multiplyScalar( delta_t ) );

        if ( attractors[0] !== undefined ) {
          for ( var j = 0 ; j < attractors.length ; ++j ) {

            var xToAttractor = attractors[j].center.x - Math.abs( p.x );
            var yToAttractor = attractors[j].center.y - Math.abs( p.y );
            var zToAttractor = attractors[j].center.z - Math.abs( p.z );

            var dirVector = new THREE.Vector3( xToAttractor,
                                               yToAttractor,
                                               zToAttractor);

            var distToAttractor = Math.sqrt( Math.pow( xToAttractor, 2 ) +
                                             Math.pow( yToAttractor, 2 ) +
                                             Math.pow( zToAttractor, 2 ) );

            var distInverseSquare = 1000.0 / Math.pow( distToAttractor, 2 );
            v.add( dirVector.clone().multiplyScalar( distInverseSquare ).multiplyScalar( delta_t ) );
          }
        }

        setElement( i, velocities, v );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var c = getElement( i, colors );

        setElement( i, colors, c );
        // ----------- STUDENT CODE END ------------
    }
};

EulerUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var s = getElement( i, sizes );

        setElement( i, sizes, s );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killPartilce( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

EulerUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.spheres ) {
        for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
            Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
        }
    }
};

EulerUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {

    this.updateLifetimes( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    this.updatePositions( particleAttributes, alive, delta_t );

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;

}


function ClothUpdater ( opts ) {
    this._opts = opts;
    this._s = 10.0;
    this._k_s = 0.55;
    return this;
}

ClothUpdater.prototype.calcHooke = function ( p, q ) {
    // ----------- STUDENT CODE BEGIN ------------
    var k_s = this._k_s;
    var rest_len = this._s;

    var dist = Math.abs( p.distanceTo(q) );
    var D = new THREE.Vector3( );
    D.subVectors( q, p );
    D.divideScalar( dist );
    // console.log("p", p);
    // console.log("q", q);
    // console.log("dist", dist);
    // console.log("D", D);

    var hookeForce = new THREE.Vector3();
    hookeForce = D.multiplyScalar( k_s * ( dist - rest_len ) );

    return hookeForce;
    // ----------- STUDENT CODE END ------------
}

ClothUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};

ClothUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t, width, height ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;

    for ( var j = 0 ; j < height ; ++j ) {
        for ( var i = 0 ; i < width ; ++i ) {
            var idx    = j * width + i;
            var idx_q1 = j * width + ( i + 1 );
            var idx_q2 = j * width + ( i - 1 );
            var idx_q3 = ( j + 1 ) * width + i;
            var idx_q4 = ( j - 1 ) * width + i;

            // ----------- STUDENT CODE BEGIN ------------
            var p  = getElement( idx, positions );
            var q1 = getElement( idx_q1, positions );
            var q2 = getElement( idx_q2, positions );
            var q3 = getElement( idx_q3, positions );
            var q4 = getElement( idx_q4, positions );
            var v  = getElement( idx, velocities );

            // calculate forces on this node from neighboring springs
            // (using this.calcHooke()... )
            v.add( gravity.clone().multiplyScalar( delta_t ) );

            // Calculate position of neighbors
            // var p  = getGridElement( i, j, width, velocities );
            // var q1 = getGridElement( i - 1, j, width, velocities );
            // var q2 = getGridElement( i + 1, j, width, velocities );
            // var q3 = getGridElement( i, j - 1, width, velocities );
            // var q4 = getGridElement( i, j + 1, width, velocities );

            v.add( this.calcHooke( p, q1 ).clone() );
            v.add( this.calcHooke( p, q2 ).clone() );
            v.add( this.calcHooke( p, q3 ).clone() );
            v.add( this.calcHooke( p, q4 ).clone() );

            setElement( idx, velocities, v );
            // ----------- STUDENT CODE END ------------
        }
    }

};


ClothUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.bounceSpheres ) {
        for (var i = 0 ; i < this._opts.collidables.bounceSpheres.length ; ++i ) {
            var sphere = this._opts.collidables.bounceSpheres[i].sphere;
            var damping = this._opts.collidables.bounceSpheres[i].damping;
            Collisions.BounceSphere( particleAttributes, alive, delta_t, sphere, damping );
        }
    }
};


ClothUpdater.prototype.update = function ( particleAttributes, alive, delta_t, width, height ) {

    this.updateVelocities( particleAttributes, alive, delta_t, width, height );
    this.updatePositions( particleAttributes, alive, delta_t, width, height );

    this.collisions( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;
}
