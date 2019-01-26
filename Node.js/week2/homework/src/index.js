'use strict';

// TODO: Write the homework code in this file





function add(toDo) {
    fs.readFile('list.json', function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);
        let nbr = json.items.length + 1
        json.items.push({ "number": nbr, "toDo": toDo });
        console.log(json.items)
        fs.writeFile("list.json", JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log('The toDo has been saved!');
        });

    })
}

function list() {

    fs.readFile('list.json', function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);
        if (json.items.length === 0) {
            console.log("List is empty");
        } else {
            console.log(json);
        }
    })

}

function reset() {
    let emtyJson = '{"items":[]}';

    fs.writeFile("list.json", emtyJson, (err) => {
        if (err) throw err;
        console.log('Reset file has been performed');
    });


}


function remove(removeNumber) {
    fs.readFile('list.json', function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);

        json.items = (json.items.filter((item) => item['number'] != removeNumber));
        fs.writeFile("list.json", JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log('The toDo has been saved!');
        });

    })

}

function update(number, text) {
    fs.readFile('list.json', function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);

        for (let item in json.items) {
            if (json.items[item].number == number) {
                json.items[item].toDo = text;
            }
        }
        fs.writeFile("list.json", JSON.stringify(json), (err) => {
            if (err) throw err;
            console.log('The toDo has been updated!');
        });

    })

}



const program = require('commander');
const fs = require('fs');


program
    .version('0.0.1')
    .description('toDo list ');


program
    .command('add <todo>')
    .alias('a')
    .description('Add a toDo item')
    .action((toDo) => {
        add(toDo);
    });

program
    .command('list')
    .alias('l')
    .description('List toDos')
    .action(() => {
        list();
    });

program
    .command('reset')
    .alias('r')
    .description('Reset toDos list')
    .action(() => {
        reset();
    });

program
    .command('remove <number>')
    .alias('rm')
    .description('Remove element <number> from toDos list')
    .action((number) => {
        remove(number);
    });

program
    .command('update  <number> <toDo>')
    .alias('u')
    .description('Update element <number> from toDos list')
    .action((number, toDo) => {
        update(number, toDo);
    });


program.parse(process.argv);