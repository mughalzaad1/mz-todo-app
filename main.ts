#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];

async function createTodo() {
    while (true) {
        let ans = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Select an operation",
            choices: ["add", "update", "view", "delete", "exit"]
        });

        if (ans.select === "add") {
            await addTodo();
        } else if (ans.select === "update") {
            await updateTodo();
        } else if (ans.select === "view") {
            viewTodo();
        } else if (ans.select === "delete") {
            await deleteTodo();
        } else if (ans.select === "exit") {
            console.log("Exiting the application.");
            break;
        }
    }
}

async function addTodo() {
    let todo = await inquirer.prompt({
        type: "input",
        name: "todo",
        message: "Add items to the list"
    });
    todos.push(todo.todo);
    console.log("Item added:", todo.todo);
}

async function updateTodo() {
    let todoToUpdate = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "Select an item to update",
        choices: todos
    });
    let updatedTodo = await inquirer.prompt({
        type: "input",
        name: "todo",
        message: "Enter the updated item",
        default: todoToUpdate.todo
    });
    todos[todos.indexOf(todoToUpdate.todo)] = updatedTodo.todo;
    console.log("Item updated:", updatedTodo.todo);
}

function viewTodo() {
    console.log("Todo List:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
}

async function deleteTodo() {
    let todoToDelete = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "Select an item to delete",
        choices: todos
    });
    todos = todos.filter(item => item !== todoToDelete.todo);
    console.log("Item deleted:", todoToDelete.todo);
}

createTodo();