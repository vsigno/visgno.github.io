window.onload=function (){
var m = document.querySelector("a-marker");
console.log("ciao");

m.addEventListener("marker4Found", (e)=>{
   console.log("found")
});

m.addEventListener("markerLost", (e)=>{
   console.log("lost")
});
}