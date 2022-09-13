import{clearArea,inputInfor} from "./helpFunction.js";

  const imgsrc="https://img.freepik.com/premium-vector/update-concept-application-loading-process-symbol-web-screen-vector-illustration-flat_186332-1253.jpg?";

  let apiKey =
  "2GtM4rUXq5x4gU58dniAqURjtQBXsi-7ez8M9eJ9UNe7P72UHJtrknhKNKcH8vy6UHMfLbNe_Og0uPzUrdK48Zv9vIm2KR9iY035tz1dnrsuJiQyGy-a6JYVxlkfY3Yx";


document.getElementById("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const locationArea=document.getElementById("location").value;
      const categories = document.getElementById("categories").value;
      clearArea()
      inputInfor(locationArea,categories);
})















