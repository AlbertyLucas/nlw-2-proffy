const subject = [
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

const weekday = [
    " Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    " Sexta-feira",
    " Sábado",
]

function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1
    return subject[arrayPosition]
}
function converHoursToMinutes(time) {
    const [hour, minute] = time.split(':')
    return Number((hour * 60) + minute)
}

module.exports = {
    subject,
    weekday,
    getSubject,
    converHoursToMinutes
}