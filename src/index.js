function handleSubmit(e) {
  e.preventDefault();
  inputString = e.target[0].value
  identicon = new Identicon(inputString);
  updateGravatar(identicon)
  loadComments(inputString)
}

function loadComments(seed) {
  fetch(`http://localhost:3001/comments?seed=${seed}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      comments = resp.map(comment => comment.content)
      updateComments(comments)
    })
}

function newComment(e) {
  e.preventDefault();
  comment = e.target[0].value
  seed = document.getElementById("identicon-form")[0].value

  fetch(`http://localhost:3001/comments?content=${comment}&seed=${seed}`, {
    method: 'POST'
  }).then(resp => resp.json()).then(resp => {
    console.log(resp)

    addComment(resp.content)
    e.target[0].value = ""
  })

}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("identicon-form")
  form.addEventListener("submit", handleSubmit)
  const commentForm = document.getElementById("comment-form")
  commentForm.addEventListener("submit", newComment)
})