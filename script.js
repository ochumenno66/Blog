//получаем необходимые элементы DOM
const btn = document.querySelector(".btn");
const postText = document.querySelector(".postText");

function createPost() {
  const titleInput = document.querySelector(".titlePost");
  const bodyInput = document.querySelector(".textPost");

  const title = titleInput.value;
  const body = bodyInput.value;

  if (!title || !body) {
    const err = document.createElement("p");
    err.textContent = "Пожалуйста, заполните все поля";
    err.classList.add("err");
    postText.appendChild(err);
    return;
  } else {
    const err = postText.querySelector(".err");
    if (err) {
      postText.removeChild(err);
    }
  }

  const post = {
    title: title,
    body: body,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Ошибка: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const containerDiv = document.createElement("div");
      const textTitle = document.createElement("h3");
      const textBody = document.createElement("p");

      containerDiv.classList.add("containerDiv");
      textTitle.classList.add("h3");
      textBody.classList.add("p");

      textTitle.textContent = `${post.title}`;
      textBody.textContent = `${post.body}`;

      postText.appendChild(containerDiv);
      containerDiv.appendChild(textTitle);
      containerDiv.appendChild(textBody);

      titleInput.value = "";
      bodyInput.value = "";
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
}

btn.addEventListener("click", createPost);

/*
Вам нужно написать функцию для создания постов, в ней должен быть 
вызов fetch, с двумя обработчиками then, который:

-делает POST-запрос по адресу https://jsonplaceholder.typicode.com/posts ;
-с телом — JSON с двумя свойствами title и body ;
-со свойством headers с единственным 
заголовком: 'Content-Type': 'application/json; charset=UTF-8' ;
-добавляет созданный пост в DOM.
*/
