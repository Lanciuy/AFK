interface Student {
    name: string;
    age: number;
    score: number;
}

const students: Student[] = [
    {
        name: "Andi",
        age: 20,
        score: 85,  

    },
    {
        name: "Budi",
        age: 19,
        score: 85
    },
    {name: "Citra",
        age: 21,
        score: 90
    }
];
function getgrade(score: number): string {
    if (score >= 80) { return "A";}
     else if (score >= 70) { return "B";}
        else { return "C";}

    }

    students.map((student) => {
        const grade = getgrade(student.score);
        if (student.age >= 20) {
            console.log(student.name + "-" +grade);
        }
    });

    let i: number = 0;
    while (i < students.length) {
    console.log("student:", students[i].name);
    i++;
    }