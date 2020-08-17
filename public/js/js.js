
function openNav() {
    document.getElementById("mySidenav").style.width = "150px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
  }


  function deleteEvent() {
    let deleteBtn = document.getElementById('delete')
    let dataid = deleteBtn.getAttribute('data-id')
    axios.delete('/event/delete/' + dataid) .then((res)=>{
      console.log(res.data)
      alert('event was deleted')
      window.location.href = "/event"
    }) .catch((err)=>{
      console.log(err)
    })
  }


  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function(e) {
            let image = document.getElementById("imagePlaceholder")
            image.style.display = "block"
            image.src = e.target.result

        }

        reader.readAsDataURL(input.files[0])
    }
}