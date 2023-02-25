const button = document.querySelector("button");

button.addEventListener("click", () => {
  const val1 = document.querySelector("#number1").value;
  const val2 = document.querySelector("#number2").value;

  if (val1 < 100 || val1 > 300 || val2 < 100 || val2 > 300) {
    console.log("число вне диапазона от 100 до 300");
    return ;
  }
  fetch(`https://picsum.photos/${val1}/${val2}`).then((response) => {
   
    document.querySelector("img").src = response.url;
  });
});