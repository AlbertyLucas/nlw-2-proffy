const Database = require('./database/db')

const { subjects, weekdays, getSubject, converHoursToMinutes } = require('./util/format')

function pageLanding(req, res) {
    return res.render("index.html")
}
async function pageStudy(req, res) {
    const filter = req.query

    if (!filter.subjects || !filter.weekdays || !filter.time) {
        return res.render("study.html", { filter, subjects, weekdays })

    }

    const timeToMinute = converHoursToMinutes(filter.time)

    const query = `
    SELECT class.*, proffy.*
    FROM proffy
    JOIN class ON (class.proffy_id = proffy.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = class.id
            AND class_schedule.weekdays = ${filter.weekdays}
            AND class_schedule.time_from <= ${timeToMinute}
            AND class_schedule.time_to > ${timeToMinute}
        )

        AND class.subject = '${filter.subjects}'
    `
    try {
        const db = await Database
        const proffy = await db.all(query)

        proffy.map((proffy) => {
            proffy.subjects = getSubject(proffy.subjects)
        })

        return res.render('study.html', { proffy, subjects, filter, weekdays })

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

    const classValue = {
        subject: req.body.subjects,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekdays.map((weekdays, index) => {
        return {
            weekdays,
            time_from: converHoursToMinutes(req.body.time_from[index]),
            time_to: converHoursToMinutes(req.body.time_from[index])
        }
    })

    try {

        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

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