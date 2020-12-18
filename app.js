const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  // Самовызывающаяся функция, сделано это для того чтобы закрыть переменные которые мы будем создавать внутри от глобальной области и для того чтобы, если у нас будут одинаковые имена, чтобы не было переопределения и ошибок
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    // переводим массив в объект объектов, в фигурных скобках коллбек
    acc[task._id] = task; // на каждой иттерации мы будем создавать под ключом id, поле в объекте, в которую будем записывать задачу
    return acc;
  }, {});
  // создали объект для того чтобы было легче проводить всякие манипуляции с ним

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default'; // 40. Сохраняем последнюю выбранную тему и записываем её в localstorage

  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask']; // 8. ищем форму через  св-во формс, по её имени
  const inputTitle = form.elements['title']; // 9. по имени мы можем получить доступ к элементу
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect'); // 30.Поиск темы по id


  // Events
  setTheme(lastSelectedTheme); // 42. реализуем запись в localstorage необходимое значение
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler); // 11. Стандартная форма для обработки события
  listContainer.addEventListener('click', onDeleteHandler); // Обработка событий для удаления
  themeSelect.addEventListener('change', onThemeSelectHandler); // 33. обработчик для получения значения селекта


  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Передайте список задач!");
      return;
    }

    const fragment = document.createDocumentFragment(); // он создаст фрагмент, который мы сможем наполнять
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    }); // для перебора объекта, он принимает объект и возвращает его значение в виде массива, а затем мы его перебираем с помощью форИч и получим каждую задачу в виде объекта
    listContainer.appendChild(fragment);
  } // функция для вывода всех задач на экран

  function listItemTemplate(
    { _id, title, body } = {} // 6. делаем деструктуризацию, выводим пустой объект
  ) {
    // гененрируем разметку
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
      li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span); // добавить в li
    li.appendChild(deleteBtn);
    li.appendChild(article);
    // console.log(li);
    return li;
  }
  // 7. функцию listItemTemplate мы будем вызывать на каждой итерации внутри функции renderAllTasks, внутри Object.values и она вернет dom объект одного элемента задачи

  function onFormSubmitHandler(e)  {
    e.preventDefault(); // 11. чтобы страница не перезагружалась по умолчанию
    const titleValue = inputTitle.value; // 12. вытаскиваем значения, которое хранится в value
    const bodyValue = inputBody.value;
    console.log(titleValue, bodyValue);

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста, введите title и Body');
      return;
    } // 13. Проверка что значения переданы

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task); // 16. создать дом-объект li
    listContainer.insertAdjacentElement('afterbegin', listItem); // 17. добавить новую задачу в самое начало списка задач в дом
    form.reset(); // 18. Очистка формы после введения значений

    // console.log(objOfTasks);
  } // 10. функция обработчик события

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };
    // console.log(newTask);
    objOfTasks[newTask._id] = newTask; // 15. обращаемся к списку задач, присваивая новое свойство для новой задачи

    return {...newTask}; // 16. вернуть поверхностную копию задачи
  } // 14. функция создает новый объект задачи и добавлять его в список тасков

  function deleteTask(id) {
    const {title} = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}?`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  } // 25. функция, которая принимает айди задачи, которую нужно удалить и спрашивает точно ли хотите удалить

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  } // 27. Полное удаление задачи со страницы

  function onDeleteHandler({target}) {
    // console.log(e.target); // 21. элемент на котором произойдет событие
    if (target.classList.contains('delete-btn')) { // 22.если содержит класс, то выполняй
      const parent = target.closest('[data-task-id]'); // 23. Ищем родителя, у которого есть этот атрибут
      const id = parent.dataset.taskId; // 24. забираем айди для будущего удаления
      const confirmed = deleteTask(id); // 26. вызываем функцию для удаления
      deleteTaskFromHtml(confirmed, parent);
    }
  } // 20. функция обработчик удаления

  function onThemeSelectHandler (e) {
    const selectedTheme = themeSelect.value; // 34. Здесь будет хранится значение выбранной темы
    const isConfirmed = confirm(`Вы действительно хотите изменить тему: ${selectedTheme}`);
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme; // Если пользователь отменил выбор темы, то тема останется прежняя
      return;
    }
    setTheme(selectedTheme); // 36. если да, то тема изменится
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme); // 40. Записываем значение св-ва в localstorage
  } // 31. функция обработчик события изменения селекта

  function setTheme(name) {
    const selectedThemeObj = themes[name]; // 37. задаем тему, обращаемся к переменной themes, передавая нужный name
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value); // 39. устанавливаем эти значения в ключ(переменную) и значение
    }); // 38. Перебор переменных с помощью entries, затем через foreach мы перебираем и на каждой иттерации foreach мы будем получать ключ и значение
  } // 32. функция, которая будет устанавливать тему с помощью запроса с сервера
})(tasks);
