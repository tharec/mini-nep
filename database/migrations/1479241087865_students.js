'use strict'

const Schema = use('Schema')

class StudentsTableSchema extends Schema {

  up () {
    this.create('students', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }

}

module.exports = StudentsTableSchema
