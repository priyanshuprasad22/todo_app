const { deserialize } = require("mongodb");

let tasks=[];
let nextId=1;

const getAlltask = (req,res) =>{
    res.status(200).json(tasks);
}

const gettask = (req,res) =>{
    const id= parseInt(req.params.id);

    const task = tasks.find(task => task.id === id)

    if(task){
        res.status(200).json(task);
    } else {
        res.status(404).send({error:'Task not found'});
    }
}

const addtask = (req,res) =>{
    const {title,description,status,dueDate} = req.body;
    const task = {id:nextId ++,title,description,status,dueDate};

    tasks.push(task);
    res.status(201).json(task);
}

const updatetask = (req,res) =>{
    const id = parseInt(req.params.id);
    const { title, description, status, dueDate } = req.body;
    const task = tasks.find(t => t.id === id);
    if (task) {
        if(title) task.title=title;
        if(description) task.description = description;
        if(status) task.status = status;
        if(dueDate) task.dueDate =dueDate;
        res.status(200).json(task);
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
}

const deletetask = (req,res) =>{
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send({message: 'Sucess'});
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
}

module.exports ={getAlltask,gettask,addtask,updatetask,deletetask};