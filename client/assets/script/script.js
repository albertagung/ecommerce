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

$(document).ready(function(){
  $('#registerButton').click(function(){
    $('#modalLogin').modal('toggle')
    $('#modalRegister').modal('show')
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
    phoneNumber: '',
    idUser: '',
    role: ''
  },
  created () {
    axios.get('http://api.kamu-suka-aku.ga/libraries').then((response) => {
    this.books.push(...response.data)
    }).catch(function(err){
      console.error(err);
    })
  },
  methods: {
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
      parseInt(param.stock)
      this.modalProducts = param
    },
    onSubmit () {
      alert('Thank You')
      $('#modalCheckout').modal('toggle')
      $('#modalCart').modal('toggle')
    },
    onSubmitProduct () {
      alert('Thank You')
      $('#modalProduct').modal('toggle')
    },
    onSubmitRegister () {
      alert('Thanks for registering!')
      $('#modalRegister').modal('toggle')
    },
    onSubmitLogin () {
      alert('Thanks for logging in')
      $('#modalLogin').modal('toggle')
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
      axios.post('http://api.kamu-suka-aku.ga/transactions', {
        member: $('#memberInput').val(),
        days: $('#daysInput').val(),
        booklist: arrBooks
      }).then((response) => {
        console.log('this is post response',response.data);
      }).catch((err) => {
        console.log(err);
      })
    },
    register () {
      axios.post('http://api.kamu-suka-aku.ga/customers', {
        name: $('#registerName').val(),
        address: $('#registerAddress').val(),
        zipcode: $('#registerZipcode').val(),
        phone: $('#registerPhoneNumber').val(),
        username: $('#registerUsername').val(),
        password: $('#registerPassword').val(),
        role: 'customer'
      }).then((response) => {
        console.log('this is register response',response);
      }).catch((err) => {
        console.error(err);
      })
    },
    login () {
      axios.post('http://api.kamu-suka-aku.ga/login', {
        username: $('#inputUsername').val(),
        password: $('#inputPassword').val()
      }).then((response) => {
        console.log('this is login response',response);
        this.idUser = response.data.id
        this.role = response.data.role
      }).catch((err) => {
        console.error(err);
      })
    }
  }
})
