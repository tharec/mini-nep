'use strict'

const Schema = use('Schema')

class GroupsTableSchema extends Schema {

  up () {
    this.create('groups', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('subject_id').unsigned().references('id').inTable('subjects')
      table.text('comments')
      table.timestamps()
    })
  }

  down () {
    this.drop('groups')
  }

}

module.exports = GroupsTableSchema
