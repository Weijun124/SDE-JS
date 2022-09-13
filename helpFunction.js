const apiKey =
  "2GtM4rUXq5x4gU58dniAqURjtQBXsi-7ez8M9eJ9UNe7P72UHJtrknhKNKcH8vy6UHMfLbNe_Og0uPzUrdK48Zv9vIm2KR9iY035tz1dnrsuJiQyGy-a6JYVxlkfY3Yx";

  const cardContainer = document.getElementById("rightCon");
const imgsrc =
  "https://img.freepik.com/premium-vector/update-concept-application-loading-process-symbol-web-screen-vector-illustration-flat_186332-1253.jpg?";

export function clearArea() {
  while (cardContainer.firstChild) {
    cardContainer.firstChild.remove();
  }
  document.getElementById("form").reset();
}

export function inputInfor(locationArea, categories) {
  let requireUrl = `https://api.yelp.com/v3/businesses/search?location=${locationArea}`;
  if (categories) {
    requireUrl += `&categories=${categories}`;
  }
  const encodeWeb = encodeURIComponent(requireUrl);
  console.log(encodeWeb);
  let endPoint = `https://cors-enabler-ns.herokuapp.com/bypass-cors?apiKey=${apiKey}&apiUrl=${encodeWeb}`;
  axios(endPoint)
    .then((result) => {
      console.log(result);
      createCard(result.data.businesses);
    })
    .catch((err) => console.error(err));
}

function createCard(value) {
  let listNumber = 0;
  if (value.length > 10) {
    listNumber = 10;
  } else {
    listNumber = value.length;
  }
  for (let i = 0; i < listNumber; i++) {
    const restCard = document.createElement("div");
    restCard.classList.add("restCard");
    cardContainer.appendChild(restCard);

    const imgValue = value[i].image_url;
    const img = document.createElement("img");
    img.classList.add("restImg");
    img.src = imgValue ? imgValue : imgsrc;
    restCard.append(img);

    const infor = document.createElement("div");
    infor.classList.add("inforContainer");
    restCard.append(infor);

    const title = document.createElement("h4");
    title.classList.add("restTitle");
    title.innerText = value[i].name;
    infor.append(title);

    const addresses = document.createElement("h6");
    addresses.classList.add("addresses");
    addresses.innerText = `Addresses : ${value[i].location.display_address.join(
      " "
    )}`;
    infor.append(addresses);

    const price = document.createElement("h6");
    price.classList.add("price");
    price.innerText = `price : ${value[i].price}`;
    infor.append(price);

    const rating = document.createElement("h6");
    rating.classList.add("rating");
    rating.innerText = `rating : ${value[i].rating}`;
    infor.append(rating);

    const phoneNumber = document.createElement("div");
    phoneNumber.classList.add("phoneNumber");
    phoneNumber.innerText = `phone : ${value[i].phone}`;
    infor.append(rating);

    const transactions = document.createElement("div");
    transactions.classList.add("transactions");
    transactions.innerText = `transactions : ${value[i].transactions.join(
      " , "
    )}`;
    infor.append(transactions);

    const learnMore = document.createElement("a");
    learnMore.classList.add("learnMore");
    learnMore.innerText = "Learn More";
    learnMore.href = value[i].url;
    learnMore.setAttribute("target", "_blank");
    infor.append(learnMore);
  }
}
