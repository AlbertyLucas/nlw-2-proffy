module.exports = async function (db, { proffyValue, classesValue, classesScheduleValues }) {
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

    const proffy_id = insertedProffy.lastID;

    // inserir dados na tabela class

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classesValue.subjects}",
                "${classesValue.cost}",
                "${proffy_id}"
            );
    `);

    const class_id = insertedClass.lastID
    // Inserir dados na tabela class_schedule
    const insertAllclassScheduleValues = classesScheduleValues.map((classesScheduleValues) => {

        return db.run(`
            INSERT INTO classes_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classesScheduleValues.weekdays}",
               " ${classesScheduleValues.time_from}",
                "${classesScheduleValues.time_to}"
            );
        `)
    })

    await Promise.all(insertAllclassScheduleValues)
}

// não declarar return, existe algum motivo?