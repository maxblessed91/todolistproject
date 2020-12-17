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

  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask']; // 8. ищем форму через  св-во формс, по её имени
  const inputTitle = form.elements['title']; // 9. по имени мы можем получить доступ к элементу
  const inputBody = form.elements['body'];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler); // 11. Стандартная форма для обработки события

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
})(tasks);
