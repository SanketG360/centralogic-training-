 function filterPassedStudents(students: any[]) {
    return  students.filter(student => student.grade >= 50);
}

 function getStudentNames(students: any[]) {
    return  students.map(student => student.name);
}

 function sortStudentsByGrade(students: any[]) {
    return  students.slice().sort((a, b) => a.grade - b.grade);
}

 function getAverageAge(students: any[]) {
    const total = students.reduce((acc, student) => acc + student.age, 0);
    return total / students.length;
}

export { filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge };