// Display painting info in the DOM
export const displayPaintingInfo = (info) => {

    const title= document.getElementById("title");
    const nombre= document.getElementById("Nombre");
    const year= document.getElementById("year");

    paintings.forEach((data) => {
        //add a userData property to the painting that will hold the painting info
          switch(paintings[data]){
             case 'painting2':{
                 title.innerHTML = "aa";
                 break;
             }
          }
      // push the painting to the paintings array
  });
  };
  
  // Hide painting info in the DOM
  export const hidePaintingInfo = () => {
    const infoElement = document.getElementById('painting-info'); // Get the reference
    infoElement.classList.remove('show'); // Remove the 'show' class
  };

  