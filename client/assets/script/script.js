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
    countQty: []
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
      let obj = {
        'id': data._id,
        'title': data.title,
        'qty': 1
      }
      this.carts.forEach((dataCarts) => {
        if(data._id === dataCarts.id){
          obj.qty++
        }
      })
      this.carts.push(obj)
      console.log(this.carts);
    }
  }
})
