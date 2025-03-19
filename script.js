const BASE_URL="https://pokeapi.co/api/v2/pokemon";
const input_name=document.querySelector("#input_container");
const sumbitbtn=document.querySelector("form button");
const type=document.querySelector(".type");
let typeIcon = document.createElement("i"); // Create <i> tag
typeIcon.classList.add("fa-brands", "fa-superpowers"); // Add Font Awesome classes
const loader=document.querySelector(".pokeball");
const img=document.querySelector("#poke_pic");


const weight=document.querySelector(".weight");
let weightIcon = document.createElement("i"); // Create <i> tag
weightIcon.classList.add("fa-solid","fa-weight-hanging");


const height=document.querySelector(".height");
let heightIcon = document.createElement("i"); // Create <i> tag
heightIcon.classList.add("fa-solid","fa-ruler-vertical");



let debounceTimer;
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function printTypes(typeArray){
    let typeString="";
    for(let type of typeArray){

        typeString+=","+capitalizeFirstLetter(type["type"]["name"]);
    }
    type.innerText=` Type : ${typeString.trim().substring(1)}`;
    type.prepend(typeIcon);
}



const getImage=async ()=>{
    const input_name=document.querySelector("#input_container");
    
    const pokemon=input_name.value;
    const name=document.querySelector(".name h2");
    try{
        if(!pokemon.trim()){
            alert("Please Enter a Pokemon !!");
        }
        const URL=`${BASE_URL}/${pokemon.toLowerCase()}`;
        document.body.style.cursor = "wait";
      
        loader.style.display = "block";
        img.style.display="none";
        img.style.filter = "blur(10px)";
        let response=await fetch(URL);
        console.log(response.status);        
        let data=await response.json();
       
        
        let newSrc=data["sprites"]["other"]["official-artwork"][ "front_default"];
        
        img.src=newSrc;
        img.onload = () => img.style.filter = "blur(0px)";//smooths the image
        
        name.innerText=capitalizeFirstLetter(data.name);
        printTypes(data.types);
       
        weight.innerText=` ${data.weight / 10} kg`;
        weight.prepend(weightIcon);
        height.innerText=` ${data.height / 10} m`;
        height.prepend(heightIcon);

        img.style.display="block";
        loader.style.display = "none";
        document.body.style.cursor = "default";
    }catch(error){
        alert("Please Enter A valid Pokemon Name");
        input_name.value="";       
        name.innerText=`Not Found`;
        type.innerText=`Type : None`;
        weight.innerText=`Weight : None`;
        height.innerText=`Height : None`;
        document.body.style.cursor = "default";
        return ;   
    }
}



sumbitbtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
       
        getImage();
    }, 560);
    
})
