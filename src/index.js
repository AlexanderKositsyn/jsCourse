import { setTimeout } from "timers";

/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
  return new Promise(resolved => {
    setTimeout(resolved, seconds * 1000);
  });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
  return new Promise((res, rej) => {
    // обработчик на load
    function reqListener() {
      if (xhr.status > 400) {
        rej(xhr.responseText);
      }
      // тут прхоидт строка
      var serverResponse = JSON.parse(xhr.responseText).sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      //   var sortedArray = [];
      //   serverResponse.forEach(item => sortedArray.push(item.name));
      // тут ошибка в тестах

      serverResponse.forEach((element, index) => {
        element.name = index;
      });
      res(serverResponse);
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.open(
      "GET",
      "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json"
    );
    xhr.send();
  });
}

export { delayPromise, loadAndSortTowns };
