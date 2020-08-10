const subjects = [
    "Artes",
    " Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    " Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    " Sexta-feira",
    " Sábado",
]

function getSubjects(subjectsNumber) {
    const arrayPosition = +subjectsNumber - 1
    return subjects[arrayPosition]
}
function converHoursToMinutes(time) {
    const [hour, minute] = time.split(':')
    return Number((hour * 60) + minute)
}

module.exports = {
    subjects,
    weekdays,
    getSubjects,
    converHoursToMinutes
}