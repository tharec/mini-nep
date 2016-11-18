'use strict'

const Lucid = use('Lucid')

class GroupStudent extends Lucid {
    groups(){
        return this.hasMany('App/Model/Group')
    }

    students(){
        return this.hasMany('App/Model/Student')
    }

    subjects(){
        return this.hasMany('App/Model/Subject')
    }
}

module.exports = GroupStudent
