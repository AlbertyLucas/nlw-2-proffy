module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados da table de proff
    const insertedProffy = await db.run(`
        INSERT INTO proffy (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela class

    const insertedClass = await db.run(`
            INSERT INTO class (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID
    // Inserir dados na tabela class_schedule
    const insertAllclassScheduleValues = classScheduleValues.map((classScheduleValues) => {
        // observar se deixa ou não co classSchedulevalue, com ou sem S
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValues.weekday}",
               " ${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
        `)
    })

    await Promise.all(insertAllclassScheduleValues)
}

// DEPOIS ALBERTY VERIFICAR EM TODOS OS AQUIVOS AS AS PALAVRA
// VALUE, PROFFY, CLASS, SCHEDULE, SUBJECT, COST, COM CTRL+F, POIS PODE DAR ALGO ERRADO
// ENTÃO CORRIJA TODAS AS PALAVRAS CHAVE.