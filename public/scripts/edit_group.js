$('.btn-edit-gr').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        const ajax_group_url = '/ajax' + $(this).attr('href');
        const group_url = $(this).attr('href').split('/',3).join('/');

        let $modal = $('.modalEdit')
        const hasModal = $modal.length

        if (hasModal) {
        $modal.modal('show')
        return
        } else {
        $modal = $(`
            <div class="modal fade confirm-modal modalEdit" tabindex="-1" role="dialog" id="loginModal">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header">Csoport szerkesztése</div>
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

        $formContainer.load(group_url + ' form', function() {
            $modal.modal('show')
            const $loginForm = $modal.find('form')
            $loginForm.on('submit', function (e) {
            e.preventDefault()
            $errorContainer.hide()
            const data = $(this).serializeArray()
            Promise.resolve(
                $.ajax({
                url: ajax_group_url,
                method: 'POST',
                data,
                dataType: 'json',
                headers: { 'csrf-token': $('[name="_csrf"]').val() }
                })
            ).then(json => {
                if (json.success) {
                    //$('#group-divs').load(group_url + ' #group-divs', function () {
                        $modal.modal('hide')
                        location.assign(group_url)
                    //})
                } else {
                $errorContainer.text('Hibás adatok!').show()
                }
            })
            })
        })
        }
    })
})