$('#btnComment').on('click', function (e) {
    e.preventDefault()
    const ajax_comment_url = '/ajax' + $(this).attr('href');
    const comment_url = $(this).attr('href');

    let $modal = $('.modalComment')
    const hasModal = $modal.length

    if (hasModal) {
    $modal.modal('show')
    return
    } else {
    $modal = $(`
        <div class="modal fade confirm-modal modalComment" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
            <div class="modal-header">Komment hozzáfűzése</div>
            <div class="modal-body">
                <div class="alert alert-danger"></div>
                <div class="form-area"></div>
            </div>
            </div>
        </div>
        </div>
    `)

    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()

    $formContainer.load(comment_url + ' form', function() {
        $modal.modal('show')
        const $loginForm = $modal.find('form')
        $loginForm.on('submit', function (e) {
        e.preventDefault()
        $errorContainer.hide()
        const data = $(this).serializeArray()
        Promise.resolve(
            $.ajax({
            url: ajax_comment_url,
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
            })
        ).then(json => {
            if (json.success) {
                $('#comment_section').load(comment_url.slice(0,-7) + ' #comment_section', function () {
                    $modal.modal('hide')
                })
            } else {
            $errorContainer.text('Hibás adatok!').show()
            }
        })
        })
    })
    }
})