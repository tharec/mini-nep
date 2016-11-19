'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'NeptunController.index')

Route.get('/login', 'NeptunController.login')
Route.post('/login', 'NeptunController.doLogin')
Route.get('/register', 'NeptunController.register')
Route.post('/register', 'NeptunController.doRegister')
Route.get('/logout', 'NeptunController.doLogout')

Route.get('/applyLecture', 'NeptunController.applyLecture').middleware('auth')
Route.post('/applyLecture', 'NeptunController.doApplyLecture').middleware('auth')

Route.get('/addLecture', 'NeptunController.lecture').middleware('auth')
Route.post('/addLecture', 'NeptunController.addLecture').middleware('auth')

Route.get('/subject/:id', 'NeptunController.subjectShow')

