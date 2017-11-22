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
    $('#modalCheckout').modal('show')
  })
})


// Vue
new Vue({
  el: '#v',
  data: {
    books: [],
    carts: [],
    histories: [],
    modalProducts: {},
    inputQuantity: 0,
    days: 0,
    address: '',
    phoneNumber: ''
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
      if(this.carts.length === 0){
        this.carts.push(obj)
      }
      else{
        let noMatch = this.carts.findIndex((dataMatch) => {
          return dataMatch.id === obj.id
        })
        if(noMatch === -1){
          this.carts.push(obj)
        }
        else{
          this.carts[noMatch].qty++
        }
      }
    },
    openModal (param) {
      this.modalProducts = param
    },
    onSubmit () {
      alert('Thank You')
      $('#modalCheckout').modal('toggle')
      $('#modalCart').modal('toggle')
    },
    fromModal (dataModal) {
      let obj = {
        'id': dataModal._id,
        'title': dataModal.title,
        'qty': parseInt(this.inputQuantity),
      }
      if(this.carts.length === 0){
        this.carts.push(obj)
      }
      else{
        let noMatch = this.carts.findIndex((dataMatch) => {
          return dataMatch.id === obj.id
        })
        if(noMatch === -1){
          this.carts.push(obj)
        }
        else{
          this.carts[noMatch].qty+=parseInt(this.inputQuantity)
        }
      }
    },
    postTransactions (dataCheckout) {
      this.histories = dataCheckout
      this.carts = []
      let arrBooks = []
      this.phoneNumber = $('#contactInput').val()
      this.address = $('#addressInput').val()
      this.days = $('#daysInput').val()
      this.histories.forEach((data) => {
        arrBooks.push(data.id)
      })
      axios.post('http://localhost:3000/transactions', {
        member: $('#memberInput').val(),
        days: $('#daysInput').val(),
        booklist: arrBooks
      }).then((response) => {
        console.log('this is post response',response.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
})
