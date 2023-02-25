const button = document.querySelector("button");
button.addEventListener("click", function () {
  const value = document.querySelector("input").value;

  if (value < 1 || value > 10) {
    console.log("число вне диапазона от 1 до 10");
  } else {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`);
    };

    xhr.onerror = function () {
      console.log("Ошибка запроса");
    };

    xhr.open("get", ` https://picsum.photos/v2/list?limit=${value}`, true);
    xhr.send();
  }
});