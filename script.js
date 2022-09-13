let apiKey =
  "2GtM4rUXq5x4gU58dniAqURjtQBXsi-7ez8M9eJ9UNe7P72UHJtrknhKNKcH8vy6UHMfLbNe_Og0uPzUrdK48Zv9vIm2KR9iY035tz1dnrsuJiQyGy-a6JYVxlkfY3Yx";

  const cardContainer = document.getElementById("cardContainer");
  const imgsrc="https://img.freepik.com/premium-vector/update-concept-application-loading-process-symbol-web-screen-vector-illustration-flat_186332-1253.jpg?";

//use restrant id for find the review
//https://api.yelp.com/v3/businesses/{id}/reviews

//to put detail information about addresses on&name  specifi res.
//https://api.yelp.com/v3/businesses/matches



document.getElementById("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const locationArea=document.getElementById("location").value;
      const categories = document.getElementById("categories").value;
      console.log(locationArea)
      inputInfor(locationArea,categories);
})


function inputInfor(locationArea,categories){
    let requireUrl=`https://api.yelp.com/v3/businesses/search?location=${locationArea}`;
    if(categories){
        requireUrl+=`&categories=${categories}`;
        console.log(requireUrl);
    }
    const encodeWeb=encodeURIComponent(requireUrl)
    console.log(encodeWeb);
    let endPoint = `https://cors-enabler-ns.herokuapp.com/bypass-cors?apiKey=${apiKey}&apiUrl=${encodeWeb}`;
axios(endPoint)
    .then((result) => {
        console.log(result.data.businesses)
      createCard(result.data.businesses)

    }).catch((err)=>console.error(err));
}


function createCard(value){
    let listNumber=0;

    if(value.length>10){
        listNumber=10;
    }else{
        listNumber=value.length;
    }
    for(let i=0; i<listNumber; i++){
        const restCard=document.createElement("div");
        restCard.classList.add("restCard");
        cardContainer.appendChild(restCard);

        const imgValue=value[i].image_url;
        const img=document.createElement("img");
        img.classList.add("restImg")
        img.src = imgValue?imgValue:imgsrc;
        restCard.append(img);

        const infor=document.createElement("div")
        infor.classList.add("inforContainer");
        restCard.append(infor);

        const title=document.createElement("h4");
        title.classList.add("restTitle")
        title.innerText = value[i].name;
        infor.append(title);

        const addresses=document.createElement("h6");
        addresses.classList.add("addresses")
        addresses.innerText =`Addresses : ${value[i].location.display_address.join(" ")}`; ;
        infor.append(addresses);
    }
}















//   e.preventDefault();
//   while (movieContainer.firstChild) {
//       movieContainer.firstChild.remove();
//     }
//   const searchValue=document.getElementById("searchBar").value;
//   searchShows(searchValue)
//   document.getElementById("form").reset();