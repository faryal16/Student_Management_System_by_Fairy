#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"

console.log(chalk.bold.magenta("\n\t\t~~~~~~ WELCOME TO MY PROJECT~~~~~~~\t\t\n"));
console.log(chalk.bold.magenta("\t\t~~~~~ STUDENT MANAGMENT SYSTEM~~~~~~\t\t\n"))
console.log("~".repeat(60))

//define a student class
class student{
    static counter =10000;
    id: number;
    name:string;
    courses:string [];
    balance:number;

    constructor(name:string){
        this.id =student.counter++;
        this.name= name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }

    //method to enroll a student in a course
    enroll_course(course : string){
        this.courses.push(course)
    }

    //method to view balance of student
    view_balance(){
        console.log(chalk.red(`Balance for ${this.name} : $${this.balance}`));
    }

    //method to pay student fees
    pay_fees(amount: number){
      this.balance -= amount
      console.log(chalk.red(`$${amount} fees paid successfully for ${this.name}`));
    
    }

    // method to display student status
    show_status(){
        console.log(chalk.green.bold(`ID : ${this.id} `));
        console.log(chalk.green.bold(`Name : ${this.name}`));
        console.log(chalk.green.bold(`Courses : ${this.courses}`));
        console.log(chalk.green.bold(`Balance : ${this.balance}`))
    }
}

// defining a student manager a class to student manager
class student_manager{
      students : student []
       
      constructor(){
        this.students = []
      }

      //method to add a new student
      add_students(name :string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(chalk.red(`Student ${name} added succeefully.`));
        console.log(chalk.green(`Student ID : ${Student.id}`))
      }

      //method to enroll a student in course
      enroll_student(student_id:number , course: string){
       let std_found= this.find_student(student_id)
       if (std_found){
        std_found.enroll_course(course);
        console.log(chalk.red(`${std_found.name} enrolled in ${course} successufully`))
       }
      }

      //method to view a student balance
      view_student_balance(student_id:number){
        let student = this.find_student(student_id);
        if(student){
            student.view_balance();
        }else{
            console.log("Student not found.please enter a correct student ID.")
        }

      }

      //method to pay student fees
      pay_student_fees(student_id : number , amount : number){
        let student = this.find_student(student_id);
        if (student){
            student.pay_fees(amount)
        }else{
            console.log("Your Selected student is not in the list. Please write the corect Student ID.")
        }
      }
      //method to display student status
      show_student_status(student_id :number){
        let student = this.find_student(student_id);
        if (student){
            student.show_status()
        }
      }

      //method to find a student by student_id
      find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
      }
}

// main function to run te programme
async function main() {
    let Student_manager = new student_manager();

    //wghile loop to keep programme running
    while(true){
        let choice = await inquirer.prompt(
            [
                {
                    name:"choice",
                    type: "list",
                    message:chalk.greenBright( "select an option"),
                    choices:[
                        "Add Student",
                        "Enroll Student",
                        "View Student Balance",
                        "Pay Fees",
                        "Show Status",
                        "Exit"
                    ]
                }
            ]
        );
        //using switch case to handle  user choices
         switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt(
                    [
                        {
                            name: "name",
                            type: "input",
                            message:chalk.yellow("Enter Your Name: ")
                        }
                    ]
                );
                Student_manager.add_students(name_input.name);
                break;
            
            case "Enroll Student":
                let enroll_input = await inquirer.prompt(
                    [
                        {
                            name: "Student_ID",
                            type: "number",
                            message:chalk.yellow( "Enter Your ID: ")
                        },{
                            name: "course",
                            type: "input",
                            message: chalk.yellow("Enter Your Selected Course")
                        }
                    ]
                );
                Student_manager.enroll_student(enroll_input.Student_ID , enroll_input.course);
                break;
            
            case "View Student Balance":
                let balance_input = await inquirer.prompt(
                    [
                        {
                            name: "Student_ID",
                            type: "number",
                            message:chalk.yellow("Enter Your ID")
                        }
                    ]
                );
                Student_manager.view_student_balance(balance_input.Student_ID);
                break;
                
            case "Pay Fees":
                let fees_input =await inquirer.prompt(
                    [
                        {
                            name: "Student_ID",
                            type: "number",
                            message:chalk.yellow("Enter Your ID:")
                        },{
                            name:"amount",
                            type: "number",
                            message:chalk.yellow("Enter Amount To pay:")
                        }
                    ]
                );
                
                Student_manager.pay_student_fees(fees_input.Student_ID, fees_input.amount);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt(
                    [
                        {
                            name: "Student_ID",
                            type: "number",
                            message: chalk.yellow("Enter Your ID:")
                        }
                    ]
                ) ;

                Student_manager.show_student_status(status_input.Student_ID);
                break;
                
            case "Exit":
                 console.log(chalk.magenta("Exiting.... \n THANK YOU for working with us!!"));
                 process.exit();

         }
        }
    }

    // calling a main function
    main()
