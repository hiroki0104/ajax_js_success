document.addEventListener('turbolinks:load', function() {
  const form_book = document.querySelector('.form')
  form_book.addEventListener('ajax:success', e => {
    e.preventDefault()
    const new_book = e.detail[0]
    let books = document.getElementById('books')
    const new_render = `<p id="book_${new_book.id}">
                        <span class="book">${new_book.title}</span>
                        <span class="book">${new_book.body}</span>
                        <span class="book">
                        <a class="book_delete" data-remote="true" rel="nofollow" data-method="delete" href="/books/${new_book.id}">削除</a>
                        </span>
                        </p>`
    books.insertAdjacentHTML('afterBegin', new_render)
    inputTextClear('book_title')
    inputTextClear('book_body')
    bookDelete()
  })

  bookDelete()

  function bookDelete() {
    let book_delete = document.querySelectorAll('.book_delete')
    book_delete.forEach(delete_link => {
      delete_link.addEventListener('ajax:success', e => {
        e.preventDefault()
        const book_id = e.detail[0]
        let book_html = document.getElementById(`book_${book_id}`)
        book_html.innerHTML = '削除されました'
      })
    })
  }
})

function inputTextClear(el) {
  let elemnt = document.getElementById(el)
  elemnt.value = ''
}
