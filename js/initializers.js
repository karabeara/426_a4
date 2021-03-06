/*
 * In this file you can specify all sort of initializers
 *  We provide an example of simple initializer that generates points withing a cube.
 */


function VoidInitializer ( opts ) {
    this._opts = opts;
    return this;
};

VoidInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

};
////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function SphereInitializer ( opts ) {
    this._opts = opts;
    return this;
};

SphereInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        // for now we just generate a random point in the unit cube; needs to be fixed
        // generate 3 random numbers: [-1,1]
        var rand1 = 1.0 - 2.0 * ( Math.random() );
        var rand2 = 1.0 - 2.0 * ( Math.random() );
        var rand3 = 1.0 - 2.0 * ( Math.random() );
        var squareSum = ( 2.0 / 3.0 ) * (rand1 * rand1 + rand2 * rand2 + rand3 * rand3);

        var pos = new THREE.Vector3( 2 * rand1 * Math.sqrt(1 - squareSum),
                                     2 * rand2 * Math.sqrt(1 - squareSum),
                                     2 * rand3 * Math.sqrt(1 - squareSum));

        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

SphereInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        // just to get started, make the velocity the same as the initial position
        var pos = getElement( idx, positions );
        var vel = pos.clone().multiplyScalar(5.0);



        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

SphereInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

SphereInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size * 0.1;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

SphereInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var lifetime = this._opts.lifetime;

        // ----------- STUDENT CODE END ------------
        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
SphereInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );
    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );
    this.initializeColors( particleAttributes.color, toSpawn );
    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );
    this.initializeSizes( particleAttributes.size, toSpawn );
};



////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function FountainInitializer ( opts ) {
    this._opts = opts;
    return this;
};

FountainInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        var pos = new THREE.Vector3( 1.0 - 2.0 * Math.random(),
                                     1.0 - 2.0 * Math.random(),
                                     1.0 - 2.0 * Math.random() );

        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

FountainInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = new THREE.Vector3( 1.5 * ( 1.0 - 2.0 * Math.random() ),
                                     30,
                                     1.5 * ( 1.0 - 2.0 * Math.random() ) );
        // var vel = base_vel;
        // vel.add( randomVel.clone() );

        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

FountainInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var r = Math.random();
        var g = Math.random();
        var b = Math.random();

        var col = new THREE.Vector4 ( r, g, b, 1.0 );
        // var col= base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

FountainInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size * 0.1;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

FountainInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
FountainInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );
    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );
    this.initializeColors( particleAttributes.color, toSpawn );
    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );
    this.initializeSizes( particleAttributes.size, toSpawn );
};

////////////////////////////////////////////////////////////////////////////////
// Animation Initializer
////////////////////////////////////////////////////////////////////////////////

function AnimationInitializer ( opts ) {
    this._opts = opts;
    return this;
};

// this function gets the morphed position of an animated mesh.
// we recommend that you do not look too closely in here ;-)
AnimationInitializer.prototype.getMorphedMesh = function () {

     if ( ParticleEngine._meshes[0] !== undefined  && ParticleEngine._animations[0] !== undefined){

        var mesh       = ParticleEngine._meshes[0];

        var vertices   = [];
        var n_vertices = mesh.geometry.vertices.length;

        var faces      = ParticleEngine._meshes[0].geometry.faces;

        var morphInfluences = ParticleEngine._meshes[0].morphTargetInfluences;
        var morphs          = ParticleEngine._meshes[0].geometry.morphTargets;

        if ( morphs === undefined ) {
            return undefined;
        }
        for ( var i = 0 ; i < morphs.length ; ++i ) {

            if ( morphInfluences[i] !== 0.0 ) {
                for ( var j = 0 ; j < n_vertices ; ++j ) {
                    vertices[j] = new THREE.Vector3( 0.0, 0.0, 0.0 );
                    vertices[j].add ( morphs[i].vertices[j] );
                }
            }
        }
        return { vertices : vertices, faces : faces, scale: mesh.scale, position: mesh.position };

    } else {

        return undefined;
    }
}


AnimationInitializer.prototype.initializePositions = function ( positions, toSpawn, mesh ) {

    var base_pos = this._opts.position;

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        // ----------- STUDENT CODE BEGIN ------------
        // Adapted from https://hbfs.wordpress.com/2010/10/05/random-points-in-a-triangle-generating-random-sequences-ii/
        var p = base_pos;
        var faceVertsId = [];

        var face_index = Math.floor( mesh.faces.length * Math.random() );

        faceVertsId[0] = mesh.faces[face_index].a;
        faceVertsId[1] = mesh.faces[face_index].b;
        faceVertsId[2] = mesh.faces[face_index].c;

        // console.log("a", faceVertsId[0]);
        // console.log("b", faceVertsId[1]);
        // console.log("c", faceVertsId[2]);

        var faceVerts = faceVertsId.map(id => mesh.vertices[id]);

        var basisVecA = (new THREE.Vector3()).subVectors(faceVerts[1], faceVerts[0]);
        var basisVecB = (new THREE.Vector3()).subVectors(faceVerts[2], faceVerts[0]);

        var rand1 = Math.random();
        var rand2 = Math.random();
        var sum = rand1 + rand2;

        while (sum > 1) {
            rand1 = Math.random();
            rand2 = Math.random();
            sum = rand1 + rand2;
        }

        var vecFromOrigin = (basisVecA.multiplyScalar(rand1)).add((basisVecB).multiplyScalar(rand2));
        var p = vecFromOrigin.add(faceVerts[0]);
        p.multiply(mesh.scale);


        setElement( i, positions, p );
        // ----------- STUDENT CODE END ------------

    }
    positions.needUpdate = true;
}

AnimationInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {

    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel * Math.random();

        setElement( idx, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
    velocities.needUpdate = true;
}

AnimationInitializer.prototype.initializeColors = function ( colors, toSpawn) {

    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, colors, base_col );
        // ----------- STUDENT CODE END ------------
    }
    colors.needUpdate = true;
}

AnimationInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, sizes, this._opts.size * 0.1);
        // ----------- STUDENT CODE END ------------
    }
    sizes.needUpdate = true;
}

AnimationInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, this._opts.lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
AnimationInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    var mesh = this.getMorphedMesh();

    if ( mesh == undefined ){
        return;
    }

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, mesh );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

};

////////////////////////////////////////////////////////////////////////////////
// Cloth
////////////////////////////////////////////////////////////////////////////////

function ClothInitializer ( opts ) {
    this._opts = opts;
    return this;
};

ClothInitializer.prototype.initializePositions = function ( positions, toSpawn, width, height ) {
    var base_pos = this._opts.position;

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var w = idx % width;
        var h = idx / height;
        var grid_pos = new THREE.Vector3( 100.0 - w * 10, 0.0, 100.0 - h * 10 );
        var pos = grid_pos.add( base_pos );
        setElement( idx, positions, pos );
    }
    positions.needUpdate = true;
}

ClothInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, velocities, base_vel  );
    }
    velocities.needUpdate = true;
}

ClothInitializer.prototype.initializeColors = function ( colors, toSpawn) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var col = base_col;
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

ClothInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, sizes, 1 );
    }
    sizes.needUpdate = true;
}

ClothInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, Math.INFINITY );
    }
    lifetimes.needUpdate = true;
}


ClothInitializer.prototype.initialize = function ( particleAttributes, toSpawn, width, height ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, width, height );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

    // mark normals to be updated
    particleAttributes["normal"].needsUpdate = true;

};
