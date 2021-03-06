'use strict'

const Schema = use('Schema')

class TeachersTableSchema extends Schema {

  up () {
    this.create('teachers', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('teachers')
  }

}

module.exports = TeachersTableSchema
