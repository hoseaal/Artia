// import * as THREE from 'three';
// import { displayPaintingInfo, hidePaintingInfo } from './js/painting_info';
// import { PointerLockControls  } from 'three-stdlib';

var arriba = document.getElementById('arriba');
var abajo = document.getElementById('abajo');
var derecha = document.getElementById('derecha');
var izquierda = document.getElementById('izquierda');
var gderecha = document.getElementById('gderecha');
var gizquierda = document.getElementById('gizquierda');

//escena
var scene = new THREE.Scene();

//camara
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//renderizado
var renderer = new THREE.WebGLRenderer({ alpha: true }); //renderizador
renderer.setSize(window.innerWidth, window.innerHeight); //tamaño de renderizado
renderer.shadowMap.enabled = true; //recibir sombras
pantalla.appendChild(renderer.domElement); //va a renderizar en el html dentro de 'pantalla'

camera.position.z=0; //posicion de la camara
camera.position.y=2;

// CUBE
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: '#9E9DEB' });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// LIGHT

//Luz direccional

let sunlight= new THREE.DirectionalLight(0xdddddd, 1.0); //color e intensidad
sunlight.position.y=15;
scene.add(sunlight);

document.addEventListener('keydown', onKeyDown, false);

//luz de ambiente

let ambientLight= new THREE.AmbientLight(0xdddddd, 1.0);
ambientLight.position.set = camera.position;
scene.add(ambientLight);

//cargar texturas del piso
let floorTexture = new THREE.TextureLoader().load('/public/img/texturas/piso2.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20,20);

//plano del piso
const planeGeometry = new THREE.PlaneGeometry(50,50);
const planeMaterial = new THREE.MeshLambertMaterial({
    map: floorTexture,
    side: THREE.DoubleSide
});

const plane= new THREE.Mesh(planeGeometry,planeMaterial);

//posicion del piso
plane.rotation.x= Math.PI / 2;
plane.position.y= -Math.PI; //poniendo el plano a 180 grados


scene.add(plane);

//paredes
const wallGroup = new THREE.Group();
scene.add(wallGroup);

//Textura de las paredes
const wallTexture = new THREE.TextureLoader().load('/public/img/texturas/concrete-wall.webp');
wallTexture.wrapS = THREE.RepeatWrapping; //repetir textura en x
wallTexture.wrapT = THREE.RepeatWrapping; //repetir textura en y
wallTexture.repeat.set(1,1); //cantidad de veces que será repetido a lo largo de la geometria

//pared del frente
const frontWall= new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshLambertMaterial({map: wallTexture})
);

frontWall.position.z=-25;

//pared de la izquierda
const leftWall= new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshLambertMaterial({map: wallTexture})
);

leftWall.rotation.y=Math.PI / 2;
leftWall.position.x=-25;

//pared de la derecha
const rightWall= new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshLambertMaterial({map: wallTexture})
);

rightWall.rotation.y=Math.PI / 2;
rightWall.position.x=25;

//pared de atras
const backWall= new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshLambertMaterial({map: wallTexture})
);
backWall.position.z=25;


wallGroup.add(frontWall, leftWall, rightWall, backWall);

for (let i=0; i < wallGroup.children.length; i++){
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// const checkCollision = (camera, wallGroup) => {
//     const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
//     const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera's world position
//     camera.getWorldPosition(cameraWorldPosition); // get the camera's world position and store it in cameraWorldPosition. Note: The camera represents the player's position in our case.
//     playerBoundingBox.setFromCenterAndSize(
//       // set the playerBoundingBox to the camera's world position and size. The size is 1, 1, 1 because the camera is a single point.
//       // setFromCenterAndSize takes two parameters: center and size. The center is a Vector3 that represents the center of the bounding box. The size is a Vector3 that represents the size of the bounding box. The size is the distance from the center to the edge of the bounding box in each direction. So, if the size is 1, 1, 1, the bounding box will be 2 units wide, 2 units tall, and 2 units deep. If the size is 2, 2, 2, the bounding box will be 4 units wide, 4 units tall, and 4 units deep.
//       cameraWorldPosition, // center
//       new THREE.Vector3(1, 1, 1) // size
//     );
  
//     for (let i = 0; i < wallGroup.children.length; i++) {
//       // loop through each wall
//       const wall = wallGroup.children[i]; // get the wall
//       if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
//         // check if the playerBoundingBox intersects with the wall's bounding box. If it does, return true.
//         return true;
//       }
//     }
  
//     return false; // if the playerBoundingBox doesn't intersect with any of the walls, return false.
// };

//textura del techo
const ceilingTexture= new THREE.TextureLoader().load('/public/img/texturas/techo1.jpeg');
ceilingTexture.wrapS = THREE.RepeatWrapping; //repetir textura en x
ceilingTexture.wrapT = THREE.RepeatWrapping; //repetir textura en y
ceilingTexture.repeat.set(4,4); //cantidad de veces que será repetido a lo largo de la geometria

//techo
const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: ceilingTexture
});

const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceiling.rotation.x= Math.PI / 2;
ceiling.position.y= 10; 

scene.add(ceiling);

//funcion para crear pinturas
function createPainting(imageURL, width, height, position){
    const paintingTexture = new THREE.TextureLoader().load(imageURL);
    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingTexture,
    });
    const paintingGeometry = new THREE.PlaneGeometry(width, height);
    const painting= new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

let paintings = [];

const painting0= createPainting(
    '/public/img/artworks/asi-somos-LR.jpg',
    5,
    7,
    new THREE.Vector3(-20,5,-24.99)
)

const painting1= createPainting(
    '/public/img/artworks/Undiaencalma-EZ.png',
    5,
    7,
    new THREE.Vector3(-10,5,-24.99)
)

const painting2= createPainting(
    '/public/img/artworks/ARTBURGAC-FB.jpg',
    6,
    5,
    new THREE.Vector3(0,5,-24.99),
    
)

const painting3= createPainting(
    '/public/img/artworks/Arte,niñosjugando,pajaros-AM.jpeg',
    6,
    5,
    new THREE.Vector3(10,5,-24.99)
)

const painting4= createPainting(
    '/public/img/artworks/Centenarioparte1-MP.jpeg',
    5,
    7,
    new THREE.Vector3(20,5,-24.99)
)

const painting5= createPainting(
    '/public/img/artworks/CouleurAdditive-CCD.webp',
    6,
    6,
    new THREE.Vector3(24.99,5,-20)
)
painting5.rotation.y= -Math.PI/2;

const painting6= createPainting(
    '/public/img/artworks/elplayon-AR.webp',
    6,
    5,
    new THREE.Vector3(24.99,5,-10)
)
painting6.rotation.y= -Math.PI/2;

const painting7= createPainting(
    '/public/img/artworks/Floresdemayo-AM.jpeg',
    6,
    6,
    new THREE.Vector3(24.99,5,0)
)
painting7.rotation.y= -Math.PI/2;

const painting8= createPainting(
    '/public/img/artworks/indctionchromatique-CCD.webp',
    6,
    6,
    new THREE.Vector3(24.99,5,10)
)
painting8.rotation.y= -Math.PI/2;

const painting9= createPainting(
    '/public/img/artworks/interior-FB.webp',
    6,
    5,
    new THREE.Vector3(24.99,5,20)
)
painting9.rotation.y= -Math.PI/2;

const painting10= createPainting(
    '/public/img/artworks/KuaiNabaida-CR.jpeg',
    5,
    7,
    new THREE.Vector3(20,5,24.99)
)
painting10.rotation.y= Math.PI;

const painting11= createPainting(
    '/public/img/artworks/la-union-del-impulso-LR.jpg',
    6,
    5,
    new THREE.Vector3(10,5,24.99)
)
painting11.rotation.y= Math.PI;

const painting12= createPainting(
    '/public/img/artworks/lacueva-AR.webp',
    7,
    5,
    new THREE.Vector3(0,5,24.99)
)
painting12.rotation.y= Math.PI;

const painting13= createPainting(
    '/public/img/artworks/LamuertedeGirardotenBárbula-CR.jpg',
    5,
    7,
    new THREE.Vector3(-10,5,24.99)
)
painting13.rotation.y= Math.PI;

const painting14= createPainting(
    '/public/img/artworks/Los-hijos-de-los-barrios-CR.jpg',
    6,
    5,
    new THREE.Vector3(-20,5,24.99)
)
painting14.rotation.y= Math.PI;

const painting15= createPainting(
    '/public/img/artworks/Lostrescomisarios-EP.jpeg',
    5,
    7,
    new THREE.Vector3(-24.99,5,20)
)
painting15.rotation.y= Math.PI/2;

const painting16= createPainting(
    '/public/img/artworks/mercedes-pardo-sin-titulo.webp',
    6,
    5,
    new THREE.Vector3(-24.99,5,10)
)
painting16.rotation.y= Math.PI/2;

const painting17= createPainting(
    '/public/img/artworks/Ocaso-EP.jpg',
    5,
    7,
    new THREE.Vector3(-24.99,5,0)
)
painting17.rotation.y= Math.PI/2;

const painting18= createPainting(
    '/public/img/artworks/Paisajedrama-CR.jpg',
    5,
    7,
    new THREE.Vector3(-24.99,5,-10)
)
painting18.rotation.y= Math.PI/2;

const painting19= createPainting(
    '/public/img/artworks/PaisajeconPuente-EB.jpeg',
    6,
    6,
    new THREE.Vector3(-24.99,5,-20)
)
painting19.rotation.y= Math.PI/2;

scene.add(painting0,painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8, painting9,
    painting10, painting11, painting12, painting13, painting14, painting15, painting16, painting17, painting18, painting19);

paintings.push(painting0,painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8, painting9,
     painting10, painting11, painting12, painting13, painting14, painting15, painting16, painting17, painting18, painting19);

    
//controls
const controls = document.getElementById("controles");
const giro = document.getElementById("giro");
const contenedor = document.getElementById("contenedor")
const home = document.getElementById("home");


// //Cerrar el Menú (activan los controles de la galería)
function startExperience(){
        //Hide the menu
        hideMenu();
}

const playButton = document.getElementById("play_button"); 
playButton.addEventListener("click", startExperience);

const logo = document.getElementById("Logo");
logo.addEventListener("click", showMenu);

 //ocultar menu
 function hideMenu(){
     const menu = document.getElementById("menu");
     menu.style.display = "none";
     controls.style.display= "block"
     giro.style.display= "block"
     contenedor.style.backgroundColor= "transparent";
     home.style.display= "none";
 }

 //Mostar menu
 function showMenu(){
     const menu = document.getElementById("menu");
     menu.style.display = "block"; 
     controls.style.display= "none";
     giro.style.display= "none";
     contenedor.style.backgroundColor= "white";
     home.style.display= "block";
 }

//  controls.addEventListener('unlock', showMenu);

//movimiento con las teclas
function onKeyDown(event){ 
    let keycode = event.which;

    if(keycode === 39){
        camera.translateX(0.05);
    }
    if(keycode === 37){
        camera.translateX(-0.05);
    }
    if(keycode === 38){
        camera.translateZ(-0.05);
    }
    if(keycode === 40){
        camera.translateZ(0.05);
    }
}

//objeto para saber que botones está precionando
const keysPressed = {
    arriba: false,
    abajo: false,
    derecha: false,
    izquierda: false,
}

document.addEventListener(
    "mousedown",
    (event) => {
        if (event.click in keysPressed){
            keysPressed[event.click] = true;
        }
    },
    false
);

document.addEventListener(
    "mouseup",
    (event)=>{
        if(event.click in keysPressed){
            keysPressed[event.click] =false;
        }
    },
    false
);

const clock = new THREE.Clock();

// function updateMovement(delta){
//     const moveSpeed= 5 * delta;

//     const previousPosition = camera.position.clone(); 

//     if (checkCollision(camera, walls)) {
//     camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
// }
// }

arriba.addEventListener("mousedown", function(event){
    if (event.target.matches(":hover")){
        camera.translateZ(-2);
    }
})

abajo.addEventListener("mousedown", function(event){
    if (event.target.matches(":hover")){
        camera.translateZ(2);
    }
})

derecha.addEventListener("mousedown", function(event){
    if (event.target.matches(":hover")){
        camera.translateX(0.5);
    }
})

izquierda.addEventListener("mousedown", function(event){
    if (event.target.matches(":hover")){
        camera.translateX(-0.5);
    }
})

gderecha.addEventListener("mousedown", function(event){
    if(event.target.matches(":hover")){
        camera.rotateY(0.1);
    }
})

gizquierda.addEventListener("mousedown", function(event){
    if(event.target.matches(":hover")){
        camera.rotateY(-0.1);
    }
})



function render() {
    // const delta = clock.getDelta();
//    cube.rotation.x += 0.01
//     cube.rotation.y += 0.01
    requestAnimationFrame(render);

    const distanceThreshold = 8; // set a distance threshold (8 units)

    let paintingToShow
    paintings.forEach((painting) => {
      // loop through all paintings
      const distanceToPainting = camera.position.distanceTo(painting.position); // get distance to painting
      if (distanceToPainting < distanceThreshold) {
        // if distance is less than threshold (8 units)
        paintingToShow = painting; // set paintingToShow to this painting (painting will show!)
      }else{
        const infoo = document.getElementById("painting-info");
        infoo.style.display="none";
      }
    });

    if (paintingToShow) {
        const infoo = document.getElementById("painting-info");
        const title= document.getElementById("title");
        const nombre= document.getElementById("Nombre");
        const year= document.getElementById("year");

        if(paintingToShow.position===painting0.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Así Somos";
            nombre.innerHTML = "Autor: Luisa Ritcher";
            year.innerHTML = "- 1982";
        }

        if(paintingToShow.position===painting1.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Un dia en calma";
            nombre.innerHTML = "Autor: Elisa Zuloaga";
            year.innerHTML = "- 1975";
        }

        if(paintingToShow.position===painting2.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: ARTBURGAC";
            nombre.innerHTML = "Autor: Federico Brandt";
            year.innerHTML = "- 1950";
        }

        if(paintingToShow.position===painting3.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Niño Jugando con Pajaro";
            nombre.innerHTML = "Autor: Arturo Michelena";
            year.innerHTML = "- 1889";
        }

        if(paintingToShow.position===painting4.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Sin Titulo";
            nombre.innerHTML = "Autor: Mercedes Pardo";
            year.innerHTML = "- 2004";
        }

        if(paintingToShow.position===painting5.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Color Aditivo";
            nombre.innerHTML = "Autor: Carlos Cruz Dies";
            year.innerHTML = "- 1950";
        }

        if(paintingToShow.position===painting6.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: El Playón";
            nombre.innerHTML = "Autor: Armando Reverón";
            year.innerHTML = "- 1942";
        }
        if(paintingToShow.position===painting7.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Flores de Mayo";
            nombre.innerHTML = "Autor: Arturo Michelena";
            year.innerHTML = "- 1873";
        }
        if(paintingToShow.position===painting8.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Inducción Cromatica";
            nombre.innerHTML = "Autor: Carlos Cruz Dies";
            year.innerHTML = "- 1923";
        }
        if(paintingToShow.position===painting9.position){
            infoo.style.display= "block"
            title.innerHTML = "Interior con Julia y sus juguetes";
            nombre.innerHTML = "Autor: Federico Brandt";
            year.innerHTML = "- 1915";
        }
        if(paintingToShow.position===painting10.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Kuai Nabaida";
            nombre.innerHTML = "Autor: Cristobal Rojas";
            year.innerHTML = "- 1886";
        }
        if(paintingToShow.position===painting11.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: La Union del Impulso";
            nombre.innerHTML = "Autor: Luisa Ritcher";
            year.innerHTML = "- 1999";
        }
        if(paintingToShow.position===painting12.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: La Cueva";
            nombre.innerHTML = "Autor: Armando Reverón";
            year.innerHTML = "- 1920";
        }
        if(paintingToShow.position===painting13.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: La muerte de Girardot en Bárbula";
            nombre.innerHTML = "Autor: Cristobal Rojas";
            year.innerHTML = "- 1883";
        }
        if(paintingToShow.position===painting14.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Los hijos de los barrios";
            nombre.innerHTML = "Autor: Cesar Regifo";
            year.innerHTML = "- 1967";
        }
        if(paintingToShow.position===painting15.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Los Tres Comisarios";
            nombre.innerHTML = "Autor: Hector Poleo";
            year.innerHTML = "- 1943";
        }
        if(paintingToShow.position===painting16.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Sin Titulo";
            nombre.innerHTML = "Autor: Mercedes Pardo";
            year.innerHTML = "- 1964";
        }
        if(paintingToShow.position===painting17.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Ocaso";
            nombre.innerHTML = "Autor: Hector Poleo";
            year.innerHTML = "- 1949";
        }
        if(paintingToShow.position===painting18.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Paisaje Drama";
            nombre.innerHTML = "Autor: Cesar Rengifo";
            year.innerHTML = "- 1953";
        }
        if(paintingToShow.position===painting19.position){
            infoo.style.display= "block"
            title.innerHTML = "Titulo: Puente Sobre Rio Oise";
            nombre.innerHTML = "Autor: Emilio Boggio";
            year.innerHTML = "- 1910";
        }

}

    // updateMovement(delta);
    renderer.render(scene, camera);
}
render();