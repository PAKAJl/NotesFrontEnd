const container = document.querySelector(".notes");
const noteTemplate = document.querySelector(".note");

function renderNotes(notes) {
    notes.forEach(item => {
        // Клонируем шаблон
        const newNote = noteTemplate.cloneNode(true);
        newNote.setAttribute("class", "note");
        // Заполняем текст
        newNote.querySelector(".note__text").textContent = item.info.text;
        // Ставим id
        newNote.setAttribute("id", item.id);
        newNote.querySelector(".note__delete").addEventListener("click", () => {
            deleteNote(item.id);
        })
        // Добавляем в контейнер
        container.appendChild(newNote);
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