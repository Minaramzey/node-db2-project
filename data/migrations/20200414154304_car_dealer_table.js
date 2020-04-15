
exports.up = function(knex) {
    return knex.schema.createTable('car-dealer', tbl => {
        //critical--- VIN, make, model, mileage
        //also track --- transmission type and status of the title

        tbl.increments();

        tbl.string('VIN', 100)
        .notNullable()
        .unique()
        .index();

        tbl.integer('year', 4)
        .index();
    
        tbl.string('make', 100)
        .index()
        .notNullable();

        tbl.string('model', 100)
        .index()
        .notNullable();

        tbl.integer('mileage')
        .index()
        .notNullable();

        tbl.string('transmission_type')
        .index();

        tbl.string('title_status', 50)
        .index();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('car-dealer');
};
