'use strict'

const Lucid = use('Lucid')

class Group extends Lucid {
    subject(){
        return this.belongsTo('App/Model/Subject')
    }

    group_student(){
        return this.belongsTo('App/Model/GroupStudent')
    }
}

module.exports = Group
