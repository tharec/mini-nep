'use strict'

const Schema = use('Schema')

class GroupsStudentsTableSchema extends Schema {

  up () {
    this.create('groups_students', (table) => {
      table.increments()
      table.integer('subject_id').unsigned().references('id').inTable('subjects')
      table.integer('group_id').unsigned().references('id').inTable('groups')
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.timestamps()
    })
  }

  down () {
    this.drop('groups_students')
  }

}

module.exports = GroupsStudentsTableSchema
