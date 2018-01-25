/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
  //выбрасывем исключения
  if (!Array.isArray(array) || !array.length) {
    throw new Error("empty array");
  }
  if (!(typeof fn === "function")) {
    throw new Error("fn is not a function");
  }
  // возвращаем либо  true либо false если все элементы true
  var booleanArray = [];
  var trueCount = 0;
  for (let i = 0; i < array.length; ++i) {
    booleanArray[i] = fn(array[i]);
    booleanArray[i] ? ++trueCount : undefined;
  }

  return trueCount === array.length;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
  //выбрасывем исключения
  if (!Array.isArray(array) || !array.length) {
    throw new Error("empty array");
  }
  if (!(typeof fn === "function")) {
    throw new Error("fn is not a function");
  }
  // возвращаем либо  true либо false если хотя бы один элементы true

  for (let i = 0; i < array.length; ++i) {
    if (fn(array[i])) {
      return true;
    }
  }
  return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
  //выбрасывем исключения
  if (!(typeof fn === "function")) {
    throw new Error("fn is not a function");
  }
  var arrayOfExceptions = [];
  // вызываем для каждого аргумента функцию
  args.forEach(function (item) {
    try {
      // попробуем вызвать функцию fn с аргументов item
      // и если fn сделает throw error то выполнится catch (thorw new Error всплывет по call stack)
      fn(item);
    } catch (e) {
      arrayOfExceptions.push(item);
    }
  });

  return arrayOfExceptions;
}
/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
  //выбрасывем исключения
  if (!(typeof number === "number")) {
    throw new Error("number is not a number");
  }
  return {
    sum(...args) {
      return number + args.reduce((a, b) => a + b);
    },
    dif(...args) {
      return number - args.reduce((a, b) => a + b);
    },
    div(...args) {
      // проверяем что в переданных аргументах нет нуля
      args.forEach(function (item) {
        if (item === 0) {
          throw new Error("division by 0");
        }
      });
      // если нет, то делим
      return args.reduce((a, b) => a / b, number);
    },
    mul(...args) {
      return args.reduce((a, b) => a * b, number);
    }
  };
}

export {
  isAllTrue,
  isSomeTrue,
  returnBadArguments,
  calculator
};