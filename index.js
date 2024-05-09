#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.magenta("\n\t\t~~~~~~ Welcome To My Project ~~~~~~~~\t\t"));
console.log(chalk.bold.magenta("\n\t\t    ~~~~~~ MY CALCULATOR ~~~~~~~\t\t"));
const answer = await inquirer.prompt([
    { message: chalk.blue("Enter first number"),
        type: "number",
        name: "firstNumber" },
    { message: chalk.green("Enter second number"),
        type: "number",
        name: "secondNumber" },
    {
        message: chalk.blue("select one of the operators to perform operation"),
        type: "list",
        name: "operator",
        choices: (["Addition", "subtruction", "multiplication", "division", "modulus", "exponentitation"]),
    },
]);
//conditional statement
if (answer.operator === "Addition") {
    console.log(answer.firstNumber + answer.secondNumber);
}
else if (answer.operator === "subtruction") {
    console.log(answer.firstNumber - answer.secondNumber);
}
else if (answer.operator === "multiplication") {
    console.log(answer.firstNumber * answer.secondNumber);
}
else if (answer.operator === "division") {
    console.log(answer.firstNumber / answer.secondNumber);
}
else if (answer.operator === "modulus") {
    console.log(answer.firstNumber % answer.secondNumber);
}
else if (answer.operator === "exponentitation") {
    console.log(answer.firstNumber ** answer.secondNumber);
}
else {
    console.log(`please select a valid operator`);
}
