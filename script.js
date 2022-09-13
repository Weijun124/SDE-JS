import{clearArea,inputInfor} from "./helpFunction.js";

document.getElementById("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const locationArea=document.getElementById("location").value;
      const categories = document.getElementById("categories").value;
      clearArea()
      inputInfor(locationArea,categories);
})















