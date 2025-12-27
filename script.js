const calendarDays = document.getElementById('calendar-days');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksList = document.getElementById('tasks-list');

let selectedDate = null;
let tasks = {};

// Générer les jours du mois actuel
function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            dayDiv.classList.add('selected');
            selectedDate = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
            showTasks(selectedDate);
        });
        calendarDays.appendChild(dayDiv);
    }
}

// Afficher les tâches du jour sélectionné
function showTasks(date) {
    tasksList.innerHTML = '';
    if (tasks[date]) {
        tasks[date].forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `<span>${task.matiere}: ${task.name} (${task.duration} min)</span>
                                 <button class="delete-btn">❌</button>`;
            taskDiv.querySelector('.delete-btn').addEventListener('click', () => {
                tasks[date].splice(index, 1);
                showTasks(date);
            });
            tasksList.appendChild(taskDiv);
        });
    }
}

// Ajouter une tâche
addTaskBtn.addEventListener('click', () => {
    const date = document.getElementById('task-date').value;
    const matiere = document.getElementById('task-matiere').value.trim();
    const name = document.getElementById('task-name').value.trim();
    const duration = document.getElementById('task-duration').value.trim();

    if (!date || !matiere || !name || !duration) {
        alert('Veuillez remplir tous les champs !');
        return;
    }

    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({matiere, name, duration});

    if (selectedDate === date) showTasks(date);

    document.getElementById('task-matiere').value = '';
    document.getElementById('task-name').value = '';
    document.getElementById('task-duration').value = '';
});

// Initialisation
generateCalendar();
