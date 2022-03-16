$('li').on('click',function(){
  $('.home').attr('href','http://localhost:8080/')
  $('.Contact-Us').attr('href','http://localhost:8080/contact-us')
  $('.About').attr('href','http://localhost:8080/about-us')
  $('.services').attr('href','http://localhost:8080/service')
})

$('.registerB').on("click",()=>{
    $('a').attr('href','http://localhost:8080/users/register')
})
$('.signIn').on("click",()=>{
  $('a').attr('href','http://localhost:8080/users/login')
})
