'use strict'

const Lucid = use('Lucid')

class Teacher extends Lucid {
    subjects(){
        return this.hasMany('App/Model/Subject')
    }
}

module.exports = Teacher
