const container = document.querySelector(".notes");
const noteTemplate = document.querySelector(".note");

function renderNotes(notes) {
    notes.forEach(item => {
        // Клонируем шаблон
        const newNote = noteTemplate.cloneNode(true);
        newNote.setAttribute("class", "note");
        // Заполняем текст
        newNote.querySelector(".note__text").textContent = item.note.text;
        // Ставим id
        newNote.setAttribute("id", item.id);
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
