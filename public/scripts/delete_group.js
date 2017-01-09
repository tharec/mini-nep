function ajaxDelete(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

function my_confirm(str) {
  let _resolve, _reject

  const $modal = $('#modalDelete')
  $modal.modal('show')

  $modal.find('.modal-ok').on('click', function (e) {
    _resolve(true)
  })
  $modal.find('.modal-cancel').on('click', function (e) {
    _resolve(false)
  })

  return new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
}




$('.btn-delete-gr').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault()
        
        my_confirm('Biztosan törlöd a csoportot?')
            .then(response => {
            if (response) {
                const url = '/ajax' + $(this).attr('href');
                ajaxDelete(url)
                .then(data => {
                    $('#group-divs').load($(this).attr('href').split('/',3).join('/') + ' #group-divs', function () {})
                    //location.assign($(this).attr('href').split('/',3).join('/'))
                })
                .catch(xhr => {
                    $('.help-block').text(xhr.responseText)
                })
            }
        })
    })
})