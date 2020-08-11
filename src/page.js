const Database = require('./database/db')

const { subjects, weekdays, getSubjects, converHoursToMinutes } = require('./util/format')

function pageLanding(req, res) {
    return res.render("index.html")
}
async function pageStudy(req, res) {
    const filters = req.query

    if (!filters.subjects || !filters.weekdays || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })

    }

    const timeToMinute = converHoursToMinutes(filters.time)

    const query = `
    SELECT classes.*, proffy.*
    FROM proffy
    JOIN class ON (classes.proffy_id = proffy.id)
        WHERE EXISTS (
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = class.id
            AND classes_schedule.weekdays = ${filters.weekdays}
            AND classes_schedule.time_from <= ${timeToMinute}
            AND classes_schedule.time_to > ${timeToMinute}
        )

        AND classes.subjects = '${filters.subjects}'
    `
    try {
        const db = await Database
        const proffy = await db.all(query)

        proffy.map((proffy) => {
            proffy.subjects = getSubjects(proffy.subjects)
        })

        return res.render('study.html', { proffy, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClass(req, res) {
    return res.render("give-class.html", { subjects, weekdays })
}

async function saveClass(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classesValue = {
        subjects: req.body.subjects,
        cost: req.body.cost
    }

    const classesScheduleValues = req.body.weekdays.map((weekdays, index) => {
        return {
            weekdays,
            time_from: converHoursToMinutes(req.body.time_from[index]),
            time_to: converHoursToMinutes(req.body.time_from[index])
        }
    })

    try {

        const db = await Database
        await createProffy(db, { proffyValue, classesValue, classesScheduleValues })

        let queryString = "?subjects=" + req.body.subjects
        queryString += "&weekdays=" + req.body.weekdays[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)

    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClass,
    saveClass
}