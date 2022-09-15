import{clearArea,inputInfor,onError,onSuccess} from "./helpFunction.js";

const btn = document.querySelector('#show');

document.getElementById("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const locationArea=document.getElementById("location").value;
      const categories = document.getElementById("categories").value;
      const price=document.getElementById("price").value;
      const hot=document.getElementById("hot");  //hot.checked=false
      const reservation=document.getElementById("reservation");
      const wheel=document.getElementById("wheelchair");
      const checkbox=[hot,reservation,wheel];
      const checkboxValue=checkbox.filter((x)=>Boolean(x.checked)).map(x=>x.value);
      clearArea()
      inputInfor(locationArea,categories,price,checkboxValue);
})

btn.addEventListener('click', ()=> {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});














