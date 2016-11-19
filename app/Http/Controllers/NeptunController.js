'use strict'

const Database = use('Database')
const Student = use('App/Model/Student')
const Teacher = use('App/Model/Teacher')
const Subject = use('App/Model/Subject')
const Group = use('App/Model/Group')
const GroupsStudent = use('App/Model/GroupsStudent')
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
        const group_students = yield GroupsStudent.all()

        for(let subject of subjects) {
            const tea = yield Database.select('id','name','email').from('teachers').where('id', subject.teacher_id);
            subject.teachersOf = tea;
            // console.log(tea)
        }

        for(let g of group_students) {
            const g_students = yield Database.select('*').from('students').where('id', g.student_id);
            const g_groups = yield Database.select('*').from('groups').where('id', g.group_id);
            const g_subjects = yield Database.select('*').from('subjects').where('id', g.subject_id);
            const g_teachers = yield Database.select('*').from('teachers').where('id', g_subjects[0].teacher_id);

            g.subjectsOf = g_subjects[0];
            g.teachersOf = g_teachers[0];
            g.studentsOf = g_students[0];
            g.groupsOf = g_groups[0];
        }

        const teas = yield Database.select('email').from('teachers')
        let emails = []
        // console.log(teas)
        for(let i of teas){
            emails.push(i['email'])
        }

        // console.log(subjects.toJSON()[1].teachersOf[0]['id'])

        yield response.sendView('main', {
            students: students.toJSON(),
            subjects: subjects.toJSON(),
            group_students: group_students.toJSON(),
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
            name: 'required|min:5|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+',
            group_name: 'required|min:1|max:32|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+'
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
        
        const subjectNew = new Subject()
        subjectNew.teacher_id = teacher[0]['id']
        subjectNew.name = subjectData.name
        subjectNew.comments = subjectData.comments
        yield subjectNew.save()

        const groupNew = new Group()
        groupNew.name = subjectData.group_name
        groupNew.subject_id = subjectNew.id
        yield groupNew.save()
        
        response.redirect('/')
    }

    * addGroup (request, response) {
        const req_id = request.param('id')
        const groupData = request.except('_csrf');

        const rules = {
            group_name: 'required|min:1|max:32|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+'
        };

        const validation = yield Validator.validateAll(groupData, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }
        
        const groupNew = new Group()
        groupNew.name = groupData.group_name
        groupNew.subject_id = req_id
        yield groupNew.save()

        response.redirect('/subject/' + req_id)
    }

    * comment (request, response){
        const id = request.param('id')
        const subject = yield Subject.find(id)

        const teas = yield Database.select('email').from('teachers')
        let emails = []
        // console.log(teas)
        for(let i of teas){
            emails.push(i['email'])
        }
        
        yield response.sendView('comment',{
            subject: subject,
            emails: emails
        });
    }

    * doComment (request, response){
        const data = request.except('_csrf')
        const id = request.param('id')
        const subject = yield Subject.find(id)

        subject.comments = subject.comments + '\n' + request.currentUser.username + ': ' + data.comments
        yield subject.save()
        
        response.redirect('/subject/' + id)
    }

    * deleteComments (request, response){
        const id = request.param('id')
        const subject = yield Subject.find(id)

        subject.comments = ''
        yield subject.save()
        
        response.redirect('/subject/' + id)
    }

    * applyLecture (request, response) {
        const subjects = yield Subject.all()
        const teachers = yield Teacher.all()

        const teas = yield Database.select('email').from('teachers')
        let emails = []
        for(let i of teas){
            emails.push(i['email'])
        }

        for(let subject of subjects) {
            const tea = yield Database.select('id','name','email').from('teachers').where('id', subject.teacher_id);
            const gro = yield Database.select('id','name','subject_id').from('groups').where('subject_id', subject.id);
            //console.log(gro[0])
            subject.teachersOf = tea;
            subject.groupsOf = gro;
        }

        yield response.sendView('applyLecture',{
            emails: emails,
            teachers: teachers.toJSON(),
            subjects: subjects.toJSON()
        });
    }

    * doApplyLecture (request, response){
        const data = request.except('_csrf')
        const group = yield Group.find(data.group_id)
        const subject = yield Subject.find(group.subject_id)
        const stud = yield Student.findBy('email', request.currentUser.email)

        const group_student = new GroupsStudent()
        group_student.student_id = stud.toJSON().id
        group_student.group_id = group.toJSON().id
        group_student.subject_id = subject.toJSON().id
        const gs = yield Database
            .select('student_id','subject_id','group_id')
            .from('groups_students')
            .where({
                student_id: stud.toJSON().id,
                subject_id: subject.toJSON().id,
                group_id: group.toJSON().id
            })
        if(gs.length < 1){
            yield group_student.save()
        }


        response.redirect('/')
    }

    * subjectShow (request, response){
        const id = request.param('id');
        const subject = yield Subject.find(id);
        const group_students = yield GroupsStudent.all()
        yield subject.related('teacher').load();
        const groups = yield Database.select('id','name','subject_id').from('groups').where('subject_id',id)

        for(let g of group_students) {
            const g_students = yield Database.select('*').from('students').where('id', g.student_id);
            const g_subjects = yield Database.select('*').from('subjects').where('id', g.subject_id);
            const g_groups = yield Database.select('*').from('groups').where('id', g.group_id);
            const g_teachers = yield Database.select('*').from('teachers').where('id', g_subjects[0].teacher_id);

            g.subjectsOf = g_subjects[0];
            g.teachersOf = g_teachers[0];
            g.studentsOf = g_students[0];
            g.groupsOf = g_groups[0];
        }

        
        const teas = yield Database.select('email').from('teachers')
        
        let emails = []
        for(let i of teas){
            emails.push(i['email'])
        }

        yield response.sendView('subjectProfile',{
            group_students: group_students.toJSON(),
            emails: emails,
            subject: subject.toJSON(),
            groups: groups
        });
    }

    * doDelete (request, response) {
        const id = request.param('id');
        const subject = yield Subject.find(id);
        const group = yield Group.findBy('subject_id',subject.id);

        const tea = yield Database.select('*').from('teachers').where('id', subject.teacher_id)

        if (request.currentUser.email !== tea[0].email) {
            response.unauthorized('Access denied.')
            return
        }

        yield Database.table('groups_students').where('subject_id', subject.id).delete();
        yield group.delete()
        yield subject.delete()

        response.redirect('/')
    }

    * dropSubject (request, response) {
        const id = request.param('id');
        const group_student = yield GroupsStudent.findBy('subject_id', id);
        const student = yield Student.findBy('email', request.currentUser.email);

        yield Database.table('groups_students').whereRaw('subject_id = ? and student_id = ?', [id,student.id]).delete()

        response.redirect('/')
    }

    * deleteGroup (request, response) {
        const sub_id = request.param('sub_id');
        const gro_id = request.param('gro_id');

        yield Database.table('groups_students').whereRaw('subject_id = ? and group_id = ?',[sub_id, gro_id]).delete()
        yield Database.table('groups').where('id',gro_id).delete()

        response.redirect('/subject/' + sub_id)
    }

    * editGroup (request, response) {
        const sub_id = request.param('sub_id');
        const gro_id = request.param('gro_id');
        const group = yield Group.find(gro_id)
        
        const teas = yield Database.select('email').from('teachers')
        let emails = []
        for(let i of teas){
            emails.push(i['email'])
        }

        yield response.sendView('editGroup',{
            emails: emails,
            group: group
        });
    }

    * doEditGroup (request, response) {
        const sub_id = request.param('sub_id');
        const gro_id = request.param('gro_id');
        const data = request.except('_csrf')

        const rules = {
            group_name: 'required|min:1|max:32|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+'
        };

        const validation = yield Validator.validateAll(data, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const group = yield Group.find(gro_id)

        group.name = data.group_name
        group.comments = data.comments
        yield group.save()
        
        yield response.redirect('/subject/' + sub_id)
    }

    * editSubject (request, response) {
        const sub_id = request.param('id');
        const subject = yield Subject.find(sub_id)
        
        const teas = yield Database.select('email').from('teachers')
        let emails = []
        for(let i of teas){
            emails.push(i['email'])
        }

        yield response.sendView('editSubject',{
            emails: emails,
            subject: subject
        });
    }

    * doEditSubject (request, response) {
        const sub_id = request.param('id');
        const data = request.except('_csrf')

        const rules = {
            subject_name: 'required|min:5|regex:[a-zA-Z0-9 áÁéÉőŐúÚűŰóÓüÜöÖíÍ]+'
        };

        const validation = yield Validator.validateAll(data, rules)

        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({errors: validation.messages()})
            .flash()
        response.redirect('back')
        return
        }

        const subject = yield Subject.find(sub_id)

        subject.name = data.subject_name
        subject.comments = data.comments
        yield subject.save()
        
        yield response.redirect('/subject/' + sub_id)
    }
}

module.exports = NeptunController
