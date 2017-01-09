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

Route.get('/subject/:id', 'NeptunController.subjectShow').middleware('auth')
Route.get('/subject/:id/delete', 'NeptunController.doDelete').middleware('auth')

Route.post('/subject/:id/', 'NeptunController.addGroup').middleware('auth')

Route.get('/subject/:id/comment', 'NeptunController.comment').middleware('auth')
Route.get('/subject/:id/deleteComments', 'NeptunController.deleteComments').middleware('auth')
Route.post('/subject/:id/comment', 'NeptunController.doComment').middleware('auth')

Route.get('/subject/:id/dropSubject', 'NeptunController.dropSubject').middleware('auth')
Route.get('/subject/:sub_id/:gro_id/edit', 'NeptunController.editGroup').middleware('auth')
Route.post('/subject/:sub_id/:gro_id/edit', 'NeptunController.doEditGroup').middleware('auth')
Route.get('/subject/:sub_id/:gro_id/delete', 'NeptunController.deleteGroup').middleware('auth')
Route.get('/subject/:id/edit', 'NeptunController.editSubject').middleware('auth')
Route.post('/subject/:id/edit', 'NeptunController.doEditSubject').middleware('auth')

Route.group('ajax', function () {
    Route.get('/logout', 'NeptunController.doLogout')
    Route.post('/subject/:id/comment', 'NeptunController.ajaxComment').middleware('auth')
    Route.delete('/subject/:sub_id/:gro_id/delete', 'NeptunController.ajaxDeleteGr').middleware('auth')
    Route.post('/subject/:sub_id/:gro_id/edit', 'NeptunController.ajaxEditGr').middleware('auth')
  }).prefix('/ajax')