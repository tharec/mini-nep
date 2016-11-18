'use strict'

const Database = use('Database')
const Student = use('App/Model/Student')
const Teacher = use('App/Model/Teacher')
const Subject = use('App/Model/Subject')
const Group = use('App/Model/Group')
const GroupStudent = use('App/Model/GroupStudent')
const User = use('App/Model/User')

const Validator = use('Validator')
const Hash = use('Hash')

class NeptunController {
    * index (request, response) { 
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            yield response.redirect('/login')
        }

        const students = yield Student.all()
        const subjects = yield Subject.all()
        const teachers = yield Teacher.all()

        for(let subject of subjects) {
            const tea = yield Database.select('id','name').from('teachers').where('id', subject.teacher_id);
            subject.teachersOf = tea;
            console.log(tea)
        }

        const teas = yield Database.select('email').from('teachers')
        let emails = []
        // console.log(teas)
        for(let i of teas){
            emails.push(i['email'])
        }

        console.log(subjects.toJSON()[1].teachersOf[0]['id'])

        yield response.sendView('main', {
            students: students.toJSON(),
            subjects: subjects.toJSON(),
            emails: emails
        })
    }

    // USER CONTROLLER

    * register(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }

        yield response.sendView('register')
    }

    * doRegister (request, response) {
        const registerData = request.except('_csrf');

        const rules = {
            username: 'min:5|regex:[a-zA-Z áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password'
        };

        const rule_box = { teacher_check: 'required'};

        const validation = yield Validator.validateAll(registerData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }
        const teacher_validation = yield Validator.validateAll(registerData, rule_box)

        if(teacher_validation.fails()){
            console.log('You have no power here!')
            const stud = new Student()

            stud.name = registerData.username
            stud.email = registerData.email
            stud.password = yield Hash.make(registerData.password)
            yield stud.save()
        } else {
            const teac = new Teacher()

            teac.name = registerData.username
            teac.email = registerData.email
            teac.password = yield Hash.make(registerData.password)
            yield teac.save()
        }

        const user = new User()

        user.username = registerData.username
        user.email = registerData.email
        user.password = yield Hash.make(registerData.password)
        yield user.save()
        
        yield request.auth.login(user)

        response.redirect('/')
    }

    * login (request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }

        yield response.sendView('login')
    }

    * doLogin (request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const login = yield request.auth.attempt(email, password) 

            if (login) {
                response.redirect('/')
                return
            }
        } 
        catch (err) {
            yield request
            .withAll()
            .andWith({errors: [
            {
                message: 'Helytelen adatok'
            }
            ]})
            .flash()

        response.redirect('/login')
        }
    }

    * doLogout (request, response) {
        yield request.auth.logout()
        response.redirect('/')
    }

    // OTHER PARTS

    * lecture (request, response) {
        const teas = yield Database.select('email').from('teachers')
        let emails = []
        // console.log(teas)
        for(let i of teas){
            emails.push(i['email'])
        }

        yield response.sendView('addLecture',{
            emails: emails
        });
    }
    
    * addLecture (request, response) {
        const subjectData = request.except('_csrf');

        const rules = {
        name: 'required|min:5|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+'
        };

        const validation = yield Validator.validateAll(subjectData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const teacher = yield Database.select('id').from('teachers').where('email',request.currentUser.email)
        
        subjectData.teacher_id = teacher[0]['id']
        const subject = yield Subject.create(subjectData)
        // console.log(teacher[0]['id'])
        // response.send(teacher)
        response.redirect('/')
    }
}

module.exports = NeptunController
