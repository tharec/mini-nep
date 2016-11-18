'use strict'

const Lucid = use('Lucid')

class Subject extends Lucid {
    teacher(){
        return this.belongsTo('App/Model/Teacher')
    }

    groups(){
        return this.hasMany('App/Model/Group')
    }
}

module.exports = Subject
