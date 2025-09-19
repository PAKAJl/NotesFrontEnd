const container = document.querySelector(".notes");
const noteTemplate = document.querySelector(".note");


const form = document.querySelector(".form")
form.addEventListener('submit', async function (e){
    e.preventDefault();
    const input = document.querySelector('#noteText')
    
    let newNote = {
        text : input.value.trim(),
        isCompleted : 0
    }
    console.log(JSON.stringify(newNote))
    try {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote) // отправляем JSON
        })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const result = await response.json();
        console.log('Заметка создана:', result);
        input.value = '';
        getNotes()
    } catch (error) {
        console.error('Ошибка при отправке:', error);
    }
    
})

function renderNotes(notes) {
    container.innerHTML = ""
    notes.forEach(item => {
        // Клонируем шаблон
        const newNote = noteTemplate.cloneNode(true);
        
        newNote.setAttribute("class", "note");
        // Ставим id
        newNote.setAttribute("id", item.id);
        
        // Добавляем в контейнер
        container.appendChild(newNote);

        newNote.querySelector(".note__delete").addEventListener("click", () => deleteNote(item.id))
        newNote.querySelector(".edit__button").addEventListener("click", () => updateNote(item.id))

        const label = newNote.querySelector(".note__text")
        const labelEdit = newNote.querySelector(".note__edit")
        const checkbox = newNote.querySelector(".note__check")
        checkbox.addEventListener("click", function(){
            if (this.checked){
                newNote.classList.add("completed-note");
            } else{
                newNote.classList.remove("completed-note");
            }
            updateNote(item.id)
        })
        label.textContent = item.info.text;
        newNote.querySelector("#textEdit").value = item.info.text;
        checkbox.checked = item.info.isCompleted
        if (checkbox.checked){
                newNote.classList.add("completed-note");
            } else{
                newNote.classList.remove("completed-note");
            }
        label.addEventListener("click", () => {
            label.classList.add("hidden")
            labelEdit.classList.remove("hidden");
        })
    });
}

function getNotes() {
    return fetch("http://localhost:3000/api/notes")
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            renderNotes(data);
        })
        .catch(err => console.error(err));
}

getNotes();

function deleteNote(noteId){
    fetch("http://localhost:3000/api/notes/"+noteId, {
            method : 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json(); // или response.text(), если сервер не возвращает JSON
        })
        .then(data => {
            console.log('Удалено успешно:', data);
            document.getElementById(`${noteId}`).classList.add("hidden")
        })
        .catch(error => {
            console.error('Ошибка при удалении:', error);
        })
}

async function updateNote(id){
    const note = document.getElementById(`${id}`)
    console.log(id)
    const newText = note.querySelector(`#textEdit`).value
    let oldText = note.querySelector(".note__text").textContent
    const checkBox = note.querySelector(".note__check")

    try {
    const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: newText,
        isCompleted:  checkBox.checked// Сделать реализацию чекбокса
      })
    })
    

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const result = await response.json();
    console.log('Заметка обновлена:', result);

    note.querySelector(".note__text").textContent = newText
    console.log(oldText)
    console.log(newText)
    note.querySelector(".note__text").classList.remove("hidden")
    note.querySelector(".note__edit").classList.add("hidden")
  } catch (err) {
    console.error('Ошибка при обновлении:', err);
  }
}