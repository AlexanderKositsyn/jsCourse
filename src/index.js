/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
  for (var i = 0; i < array.length; ++i) {
    fn(array[i], i, array);
  }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
  var newArray = [];
  for (var i = 0; i < array.length; ++i) {
    newArray[i] = fn(array[i], i, array);
  }
  return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
  var result,
    i = 0;
  // если  указан, то установим его в результат
  if (initial) {
    result = initial;
  } else {
    // если нет , то присваиваем начальное значение как первый элмент массива
    result = array[0];
    ++i;
  }
  // для всех элементов вызываем переданную функцию
  for (i; i < array.length; ++i) {
    result = fn(result, array[i], i, array);
  }

  return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
  prop = prop.toString();
  delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
  prop = prop.toString();
  return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
  return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
  return Object.keys(obj).map(item => item.toUpperCase());
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
  var newArray = [];
  // проверки для to
  to === undefined || to > array.length ? (to = array.length) : void 0;
  to < 0 ? (to = array.length + to) : void 0;
  // проверки для from
  from === undefined || from < 0 ? (from = 0) : void 0;

  for (var i = 0; from < to; ++from, ++i) {
    newArray[i] = array[from];
  }

  return newArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, property, value) {
      target[property] = value * value;
      return true;
    }
  });
}

export {
  forEach,
  map,
  reduce,
  deleteProperty,
  hasProperty,
  getEnumProps,
  upperProps,
  slice,
  createProxy
};
