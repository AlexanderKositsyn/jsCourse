/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
  var div = document.createElement("DIV");
  div.textContent = text;
  return div;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
  var a = document.createElement("A");
  a.setAttribute("href", hrefValue);
  return a;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
  if (where.children.length === 0) {
    where.insertBefore(what, null);
  }
  // тут какая то ошибка может быть
  where.insertBefore(what, where.firstChild);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  var siblingPArray = [];
  for (let i = 0; i < where.children.length; ++i) {
    if (where.children[i + 1]) {
      where.children[i + 1].tagName === "P"
        ? siblingPArray.push(where.children[i])
        : void 0;
    }
  }
  return siblingPArray;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
  var result = [];

  for (var i = 0; i < where.children.length; i++) {
    result.push(where.children[i].innerText);
  }

  return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
  for (let i = 0; i < where.childNodes.length; ++i) {
    if (where.childNodes[i].nodeType === 3) {
      where.removeChild(where.childNodes[i]);
      --i;
    }
  }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where, i = 0) {
  if (i === where.childNodes.length) {
    return;
  }
  //если текст то удаляем его
  if (where.childNodes[i].nodeType === 3) {
    where.removeChild(where.childNodes[i]);
    --i;
  } else {
    // тут уже where будет элемент внешнего where
    deleteTextNodesRecursive(where.childNodes[i], 0);
  }
  deleteTextNodesRecursive(where, ++i);
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
  // нужно пройтись по всем узлам внутри root
  // и при каждом узле обновить вызвращаемый объект
  var statObj = {};
  //  если элемнтов нет, то вернем пустой объект
  if (root.children.length === 0) {
    return {};
  }
  // найдем все элементы внутри root
  var rootElements = root.querySelectorAll("*");
  ///////////////////////////////////////////////////////////////////////
  // 1)сначала посчитаем все теги
  // создадим пустой объект для tags
  var tagsObj = {};
  for (let i = 0; i < rootElements.length; ++i) {
    // если св ва для тега еще нет, то создать его
    // или если уже есть то добавить единицу к количеству тегов в root
    tagsObj.hasOwnProperty(rootElements[i].tagName)
      ? (tagsObj[rootElements[i].tagName] += 1)
      : (tagsObj[rootElements[i].tagName] = 1);
  }
  //добавим получившийся объект с тегами в итоговый объект
  statObj["tags"] = tagsObj;

  ///////////////////////////////////////////////////////////////////////
  // 2) посчитаем все классы
  // создадим пустой объект для classes
  var classesObj = {};
  for (let i = 0; i < rootElements.length; ++i) {
    //проверим есть ли классы в элементе
    // если нет то перейдем к следующему элементу
    if (!rootElements[i].classList.length) {
      continue;
    }
    // если есть то пройдем циклом по ним
    for (let k = 0; k < rootElements[i].classList.length; ++k) {
      // если св ва для тега еще нет, то создать его
      // или если уже есть то добавить единицу к количеству классов в root
      classesObj.hasOwnProperty(rootElements[i].classList[k])
        ? (classesObj[rootElements[i].classList[k]] += 1)
        : (classesObj[rootElements[i].classList[k]] = 1);
    }
  }
  //добавим получившийся объект с классами в итоговый объект
  statObj["classes"] = classesObj;

  ///////////////////////////////////////////////////////////////////////
  // 3) посчитаем все текстовые узлы
  // создадим число для texts
  var textNodes = 0;
  // сначала найдем все text nodes в root
  for (let i = 0; i < root.childNodes.length; ++i) {
    root.childNodes[i].nodeType === 3 ? ++textNodes : void 0;
  }
  // найдем все nodetext в элементах внутри элементов root
  // по всем элемента и по всем узлам в элементе
  for (let i = 0; i < rootElements.length; ++i) {
    for (let k = 0; k < rootElements[i].childNodes.length; ++k) {
      rootElements[i].childNodes[k].nodeType === 3 ? ++textNodes : void 0;
    }
  }
  //добавим получившийся объект с классами в итоговый объект
  statObj["texts"] = textNodes;
  // возвращаем получившийся объект
  return statObj;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
  // для отслеживания изменений в элементе where используем специльный объект MutationObserver
  // создадим его
  var observer = new MutationObserver(function(mutations) {
    // тут будет массив всех мутаций
    // тут и нужно при мутации вызвать функцию fn и передать ей что изменилось
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        fn({ type: "insert", nodes: [...mutation.addedNodes] });
      }
      if (mutation.removedNodes.length > 0) {
        fn({ type: "remove", nodes: [...mutation.removedNodes] });
      }
    });
  });
  // создалим конфигурацию для объекта observer
  // subtree чтобы объект observer следил и за своими всеми потомками
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };
  // передаем элемент и настройки в наблюдатель
  observer.observe(where, config);
}

export {
  createDivWithText,
  createAWithHref,
  prepend,
  findAllPSiblings,
  findError,
  deleteTextNodes,
  deleteTextNodesRecursive,
  collectDOMStat,
  observeChildNodes
};
