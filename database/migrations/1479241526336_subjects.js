'use strict'

const Schema = use('Schema')

class SubjectsTableSchema extends Schema {

  up () {
    this.create('subjects', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.integer('teacher_id').unsigned().references('id').inTable('teachers')
      table.text('comments')
      table.timestamps()
    })
  }

  down () {
    this.drop('subjects')
  }

}

module.exports = SubjectsTableSchema
