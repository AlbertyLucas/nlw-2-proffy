const Database = require('./db.js')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // inserir dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "4199995555",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",

    }

    classValue = {
        subject: 1,
        cost: "20",
        // o proffy_id vira pelo banco de dados
    }

    classScheduleValues = [
        // class_di virá pelo banco de dados, apos cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 220,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })
    // consultar os dados inseridos

    // todos os proffys
    const selectproffy = await db.all("SELECT * FROM proffy")
    // console.log(selectproffy)

    // consultar as classes de um determinado proffesor
    // e trazer junto  os dados do professor
    const selectClassAndProffy = await db.all(`
        SELECT class.*, proffy.*
        FROM proffy
        JOIN class ON (class.proffy_id = proffy.id)
        WHERE class.proffy_id = 1;
    `)
    // console.log(selectClassAndProffy)

    const selectClassSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "220"
        AND class_schedule.time_to > "220"
    `)
    // console.log(selectClassSchedule)
})