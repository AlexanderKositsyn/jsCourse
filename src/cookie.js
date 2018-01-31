/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector("#homework-container");
let filterNameInput = homeworkContainer.querySelector("#filter-name-input");
let addNameInput = homeworkContainer.querySelector("#add-name-input");
let addValueInput = homeworkContainer.querySelector("#add-value-input");
let addButton = homeworkContainer.querySelector("#add-button");
let listTable = homeworkContainer.querySelector("#list-table tbody");

// запишем рандомные куки
document.cookie = "test=test";
document.cookie = "firtsName=Sasha";
document.cookie = "secondName=Ivanov";
// функция ищет  все куки
function getAllCookiesToObject() {
  let allCookies = document.cookie.split("; ").reduce((prev, current) => {
    let [name, value] = current.split("=");
    prev[name] = value;
    return prev;
  }, {});
  return allCookies;
}

// ренедер всех куки объекта в элементе
/**
 * Рендерит куки в таблице, согласно фиьтру fn
 *
 * @param {object} objCookies - объект с куками
 * @param {Element} element - элемент в который нужно их вставить
 * @param {function} fn - фильтер, передает key как св во куки
 */
function renderAllCookiesInTable(objCookies, element, fn = () => true) {
  //сначала отчистим всю табицу
  element.innerHTML = "";
  // создадим фильтрованный объект по функции fn
  var filteredObject = {};
  for (let key in objCookies) {
    if (fn(key)) {
      filteredObject[key] = objCookies[key];
    }
  }
  // по фильтрованному объекту рендерим таблицу
  for (let key in filteredObject) {
    //создадим элементы
    let tableRow = document.createElement("tr");
    let tableCellName = document.createElement("th");
    let tableCellValue = document.createElement("th");
    let tableCellDelete = document.createElement("th");
    let deleteButton = document.createElement("button");
    // заполним их
    tableCellName.textContent = key;
    tableCellValue.textContent = objCookies[key];
    deleteButton.textContent = "Удалить cookie";
    //и вставим их в таблицу
    tableRow.appendChild(tableCellName);
    tableRow.appendChild(tableCellValue);
    tableRow.appendChild(tableCellDelete);
    tableCellDelete.appendChild(deleteButton);
    element.appendChild(tableRow);
  }
}

//отрендерим их при загрузке страницы
var cookies = getAllCookiesToObject();
renderAllCookiesInTable(cookies, listTable);

filterNameInput.addEventListener("keyup", function() {
  //возьмем все куки (даже если есть новые)
  cookies = getAllCookiesToObject();
  // если пустое поле то выводим все куки
  if (filterNameInput.value === "") {
    renderAllCookiesInTable(cookies, listTable);
    return;
  }
  // если что то введено то фиьтруем по этому слову
  renderAllCookiesInTable(cookies, listTable, key => {
    return key.indexOf(filterNameInput.value) >= 0;
  });
});

addButton.addEventListener("click", () => {
  //проверим есть ли кука с таким именем, если есть то обновим заначение, если нет то создать
  // так работает
  document.cookie = `${addNameInput.value.trim()}=${addValueInput.value.trim()}`;

  // обновим куки объект
  cookies = getAllCookiesToObject();
  // ререндер табицы
  renderAllCookiesInTable(cookies, listTable, key => {
    return key.indexOf(filterNameInput.value) >= 0;
  });
  // отчистим инпуты
  addNameInput.value = "";
  addValueInput.value = "";
});

listTable.addEventListener("click", e => {
  // функция удаления куки
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  // если target это кнопка то выполняем удаляем куку
  if (e.target.tagName === "BUTTON") {
    // найдем элемент в котором содержится key для cookies и удалим его из этого объекта document.cookie
    deleteCookie(
      e.target.parentElement.parentElement.firstElementChild.textContent
    );
    // обновим куки объект
    cookies = getAllCookiesToObject();
    // рендерим еще раз согласно фильтруещему слову
    renderAllCookiesInTable(cookies, listTable, key => {
      return key.indexOf(filterNameInput.value) >= 0;
    });
  }
});
