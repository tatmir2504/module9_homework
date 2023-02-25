const resultNode = document.querySelector('.result-container');
getStoragePicture(resultNode);

const btnNode = document.getElementById('myBtn');

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } 
    else {
      const result = JSON.parse(xhr.response);
     
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  let cards = '';

  let strAuthors = '';
  let strPict = '';

  apiData.forEach(item => {
    strAuthors += (item.author + '|');
    strPict += (item.download_url + '|');

    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  resultNode.innerHTML = cards;
  setStoragePicture(strAuthors, strPict);
}

btnNode.addEventListener('click', function() {
  const val1 = document.getElementsByName("myInput1")[0].value;
  const val2 = document.getElementsByName("myInput2")[0].value;
  if (!checkInputVal(val1) && !checkInputVal(val2)) {
    resultNode.innerHTML = `<p class="message">Номер страницы и лимит вне диапазона от 1 до 10!</p>`;
    return;
  }

    if (!checkInputVal(val1)) {
        resultNode.innerHTML = `<p class="message">Номер страницы вне диапазона от 1 до 10!</p>`;
        return;
      }
      else if (!checkInputVal(val2)) {
        resultNode.innerHTML = `<p class="message">Лимит вне диапазона от 1 до 10!</p>`;
        return;
      }
        else {
          useRequest('https://picsum.photos/v2/list?page='+val1+'&limit='+val2, displayResult);
       }
  
})

function checkInputVal(value) {
  let res = parseFloat(value);
  if (!isNaN(res)) {
    if (value>10 || value<1 || Math.ceil(value)!=value) {
        return false;
      }
    else {
       return true;
    }
  }
  else {
    return false;
  }
}


function setStoragePicture(strAuthors, strPict) {
  localStorage.clear(); 
  localStorage.setItem("lastPictAuthors", strAuthors);
  localStorage.setItem("lastPict", strPict);
}

function getStoragePicture(resultNode) {
  if (localStorage.getItem('lastPictAuthors') == null) {
    return;
  }

  let authArr = localStorage.getItem("lastPictAuthors").split("|");
  let pictArr = localStorage.getItem("lastPict").split("|");

  let cards = '';

  for(let i = 0; i < authArr.length; i++) {
    if (authArr[i]!="") {
      const cardBlock = `
      <div class="card">
        <img
          src="${pictArr[i]}"
          class="card-image"
        />
        <p>${authArr[i]}</p>
      </div>
    `;
    cards = cards + cardBlock;
    }
  }
  resultNode.innerHTML = cards;
}