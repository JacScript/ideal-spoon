$('li').on('click',function(){
  $('.home').attr('href','http://localhost:8080/')
  $('.Contact-Us').attr('href','http://localhost:8080/Contact-us')
  $('.About').attr('href','http://localhost:8080/About-us')
  $('.services').attr('href','http://localhost:8080/Services')
})

$('.registerB').on("click",()=>{
    $('a').attr('href','http://localhost:8080/Register')
})
$('.signIn').on("click",()=>{
  $('a').attr('href','http://localhost:8080/Login')
})
