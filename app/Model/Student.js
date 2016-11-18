'use strict'

const Lucid = use('Lucid')

class Student extends Lucid {
    group_students(){
        return this.hasMany('App/Model/GroupStudent')
    }
}

module.exports = Student
