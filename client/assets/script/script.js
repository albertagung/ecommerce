$(document).ready(function(){
  $('.navbar').hide()
  $(window).scroll(function(){
    if($(window).scrollTop() > 100){
      $('.navbar').show()
    }
    else{
      $('.navbar').hide()
    }
  })
})

$(document).ready(function(){
  $('#proceedPayment').click(function(){
    $('#modalCart').modal('toggle')
    $('#modalCheckout').modal('toggle')
  })
})


// Vue
new Vue({
  el: '#v',
  data: {
    books: [],
    carts: [],
    countQty: 0
  },
  created () {
    axios.get('http://localhost:3000/libraries').then((response) => {
    this.books.push(...response.data)
    }).catch(function(err){
      console.error(err);
    })
  },
  methods: {
    productModal (title) {
      this.books.forEach((dataBooks) => {
        if(dataBooks.title === title){
          return $('#modalProduct').modal('toggle')
        }
      })
    },
    addToCart (data) {
      console.log(this.countQty);
      this.carts.push(data)
    }
  }
})
