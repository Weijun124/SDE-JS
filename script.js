import{clearArea,inputInfor} from "./helpFunction.js";

document.getElementById("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const locationArea=document.getElementById("location").value;
      const categories = document.getElementById("categories").value;
      const price=document.getElementById("price").value;
      const hot=document.getElementById("hot");
      const reservation=document.getElementById("reservation");
      const wheel=document.getElementById("wheelchair");
      const checkbox=[hot,reservation,wheel];
      const checkboxValue=checkbox.filter((x)=>Boolean(x.checked)).map(x=>x.value);
      clearArea()
      inputInfor(locationArea,categories,price,checkboxValue);
})

let date = new Date();
let today = new Intl.DateTimeFormat("en-US").format(date);

document.getElementById("footer").innerText=today;













