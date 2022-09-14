const apiKey =
  "2GtM4rUXq5x4gU58dniAqURjtQBXsi-7ez8M9eJ9UNe7P72UHJtrknhKNKcH8vy6UHMfLbNe_Og0uPzUrdK48Zv9vIm2KR9iY035tz1dnrsuJiQyGy-a6JYVxlkfY3Yx";

const defImg =
  "https://img.freepik.com/premium-vector/update-concept-application-loading-process-symbol-web-screen-vector-illustration-flat_186332-1253.jpg?";

const cardContainer = document.getElementById("rightCon");

export function clearArea() {
  while (cardContainer.firstChild) {
    cardContainer.firstChild.remove();
  }
  document.getElementById("form").reset();
}

export function inputInfor(locationArea, categories,price,checkboxValue) {
  let requireUrl = `https://api.yelp.com/v3/businesses/search?location=${locationArea}`;
  if (categories) {
    requireUrl += `&categories=${categories}`;
  }
  if(price){
    requireUrl += `&price=${price}`
  }
  if(checkboxValue.length>0){
    let attrsValue="&attributes=";
    for(let i=0;i<checkboxValue.length;i++){
      if(i===0){
      attrsValue += `${checkboxValue[i]}`
      }
      else{
        attrsValue += `,${checkboxValue[i]}`
      }
    }
    requireUrl += attrsValue;
  }
 
  const encodeWeb = encodeURIComponent(requireUrl);
  const endPoint = `https://cors-enabler-ns.herokuapp.com/bypass-cors?apiKey=${apiKey}&apiUrl=${encodeWeb}`;
  axios(endPoint)
    .then((result) => {
      createCard(result.data.businesses);
      console.log(result.data.businesses)
    })
    .catch((err) => console.log(err.response));
}

function createCard(value) {
  let listNumber = 0;
  if (value.length > 10) {
    listNumber = 10;
  } else {
    listNumber = value.length;
  }
  for (let i = 0; i < listNumber; i++) {
    const restCard =elementFactory({
      eltType: "div",
      classNames: ["restCard"],
      parentElt: cardContainer,
    })

    const img = elementFactory({
      eltType: "img",
      classNames: ["card-img-top","restImg"],
      parentElt: restCard,
      attrs: [
        { name: "alt", value: "can not find picture" },
        { name: "src", value: defImg },
      ],
    });
    const imgValue = value[i].image_url;
    img.src = imgValue
    
    const infor = elementFactory({
      eltType: "div",
      classNames: ["inforContainer","card-body"],
      parentElt: restCard,
    });
    
    const title = elementFactory({
      eltType: "h4",
      classNames: ["card-title","restTitle"],
      parentElt: infor,
      text: value[i].name,
    });

    const addresses = elementFactory({
      eltType: "h6",
      classNames: ["card-text","addresses"],
      parentElt: infor,
      text: `ADDRESS : ${value[i].location.display_address.join(" ")}`
    });
    
    const price = elementFactory({
      eltType: "h6",
      classNames: ["price"],
      parentElt: infor,
      text: value[i].price?`PRICE : ${value[i].price}`:"",
    });

    const rating = elementFactory({
      eltType: "h6",
      classNames: ["rating"],
      parentElt: infor,
      text: `RATING : ${value[i].rating} (Based on ${value[i].review_count} review) `,
    });

    const transactions = elementFactory({
      eltType: "p",
      classNames: ["transactions"],
      parentElt: infor,
      text: value[i].transactions.length===0?"DINING ONLY ":`TRANSACTION : ${value[i].transactions.join(
        " , ")}`,
    });

    const phoneNumber = elementFactory({
      eltType: "a",
      classNames: ["phoneNumber"],
      parentElt: infor,
      text: `PHONE : ${value[i].phone}`,
      attrs:[{name:"onclick", value:`window.open("tel:${value[i].phone}")`}]
    });

    const learnMore = elementFactory({
      eltType: "a",
      classNames: ["learnMore"],
      parentElt: infor,
      text: "Learn More",
      attrs: [{name:"target", value:"_blank"}
            ,{name:"href", value: value[i].url}]
    });
  }
}

function elementFactory({
  eltType,
  classNames,
  parentElt,
  text,
  attrs,
}){
  if (!eltType) {
    return undefined;
  }
  const newElt = document.createElement(eltType);
  if (classNames) {
    newElt.classList.add(...classNames);
  }
  if (text) {
    newElt.innerText = text;
  }
  if (parentElt) {
    parentElt.append(newElt);
  }
  if (attrs) {
    for (const attr of attrs) {
      const { name: arrtName, value: attrValue } = attr;
      newElt.setAttribute(arrtName, attrValue);
    }
  }
  return newElt;
}