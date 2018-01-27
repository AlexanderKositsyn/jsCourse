/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector("#homework-container");

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
  var newDiv = document.createElement("DIV");

  newDiv.setAttribute("class", "draggable-div");
  // рандомный цвет
  newDiv.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
  // рандомная ширина
  newDiv.style.width = `${Math.floor(Math.random() * 100) + 1}px`;
  // рандомная высота
  newDiv.style.height = `${Math.floor(Math.random() * 100) + 1}px`;
  // рандомная позиция
  newDiv.style.position = "absolute";
  newDiv.style.top = `${Math.floor(Math.random() * 100) + 1}px`;
  newDiv.style.left = `${Math.floor(Math.random() * 100) + 1}px`;

  return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(inner) {
  let drug = e => {
    // 1)сначала изменяю положение при помощи position
    inner.style.top = parseInt(inner.style.top) + e.movementY + "px";
    inner.style.left = parseInt(inner.style.left) + e.movementX + "px";
    // 2) а уже потом только запрашиваю новые координаты inner (порядок важен, иначе работать не будет)
    innerPosition = inner.getBoundingClientRect();
    // код ниже задает границы , чтобы inner не мог вылезти за пределы wrapper
    if (wrapPosition.bottom - innerPosition.height <= innerPosition.top) {
      inner.style.top = wrapPosition.height - innerPosition.height + "px";
    } else if (parseInt(inner.style.top) <= 0) {
      inner.style.top = 0 + "px";
    }
    if (wrapPosition.right - innerPosition.width <= innerPosition.left) {
      inner.style.left = wrapPosition.width - innerPosition.width + "px";
    } else if (parseInt(inner.style.left) <= 0) {
      inner.style.left = 0 + "px";
    }
  };

  let stop = () => {
    document.removeEventListener("mousemove", drug);
    document.removeEventListener("mouseup", stop);
  };

  inner.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", drug);
    document.addEventListener("mouseup", stop);
  });
}

let addDivButton = homeworkContainer.querySelector("#addDiv");

addDivButton.addEventListener("click", function() {
  // создать новый div
  let div = createDiv();

  // добавить на страницу
  homeworkContainer.appendChild(div);
  // назначить обработчики событий мыши для реализации d&d
  addListeners(div);
  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
