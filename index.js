const express = require('express');
const app = express();

app.use(express.json());

let tasks = []

// {
//     id: number,
//     title: string,
//     description: string,
//     completed: boolean
// }

// GET /tasks: Retorna todas as tarefas.
// POST /tasks: Cria uma nova tarefa.
// PUT /tasks/:id: Atualiza uma tarefa existente.
// DELETE /tasks/:id: Exclui uma tarefa.


app.listen('3001', () => {
    console.log('http://localhost:3001')
})

app.get('/tasks', (req, res) =>{
    res.send(tasks)
});

app.post('/tasks', (req, res) =>{
    const {title, description, completed} = req.body;
    
    const newTask = {
        id: tasks.length,
        title,
        description,
        completed
    }
    tasks.push(newTask)
    res.send(tasks)
}) 

app.put('/tasks/:id', (req, res) =>{
    const {title, description, completed} = req.body;
    const id = parseInt(req.params.id);
    let find = 0;
    
    let upTask = {
        id: id,
        title,
        description,
        completed
    }
    
    for (let task of tasks) {
        if(task.id == id){
            find = 1;
            tasks[id] = upTask
        };
    }

    if(find===0) return res.send("Task não encontrada")

    res.send(tasks[id])
}) 

app.delete('/tasks/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    let find = 0;
    
    for (let i in tasks) {
        if(tasks[i].id == id){
            find = 1
            res.send(tasks[i])
            tasks.splice(id, 1)
        };
    }

    if(find===0) return res.send("Task não encontrada")

    res.send(tasks[id])
}) 