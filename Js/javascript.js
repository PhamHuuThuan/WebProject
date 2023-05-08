$(document).ready(function() {
    $('#btnSignup').click(function() {
        if($('#checkbox').is(':checked') && checkUserName() && checkMail() && checkPass()&& checkPhoneNB()){
            user = new User(document.getElementById("username").value, document.getElementById("mail").value, document.getElementById("pass").value, document.getElementById("phoneNB").value);
            alert('Đăng ký thành công!');
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'login.html'
        }else if(!$('#checkbox').is(':checked')){
            alert('Bạn chưa đồng ý với các điều khoản của chúng tôi!');
        }else{
            alert('Bạn cần nhập đầy đủ thông tin!');
        }    
        });
    $('#btnLogin').click(function () { 
        var user = JSON.parse(localStorage.getItem('user'));
        if(document.getElementById("mail").value===user.email && document.getElementById("pass").value===user.pass){
            window.location.href = 'index.html';
        }else{
            alert('Thông tin tài khoản hoặc mật khẩu chưa chính xác!');
        }
    });
    const updateTotal = () => {
        let total = 0;
        $('.cart-box').each(function() {
          const price = parseFloat($(this).find('.cart-price').text().replace('$', ''));
          const quantity = parseInt($(this).find('.cart-quantity').val());
          total += price * quantity;
        });
        $('.total').text(`$${total.toFixed(2)}`);
      };
    //remove product from cart
    $(document).on('click', '.cart-remove', function() {
        const productName = $(this).parent().find('.cart-product-title').text();
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));

        $(this).parent().remove();

        updateTotal();
      });

    //add product to cart
    $('.btnaddcart').on('click', function() {
        const product = $(this).closest('.products');
        const productImage = product.find('.product-img img').attr('src');
        const productName = product.find('.name-price h3').text();
        const productPrice = product.find('.name-price h4').text();
        
        const cartItem = {
            image: productImage,
            name: productName,
            price: productPrice
          };
      
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        const cartBox = $('<div></div>');
        cartBox.addClass('cart-box');
        cartBox.html(`
          <img src="${productImage}" alt="" class="img-cart">
          <div class="detail-box">
            <div class="cart-product-title">${productName}</div>
            <div class="cart-price">${productPrice}</div>
            <input type="number" value="1" class="cart-quantity">
          </div>
          <img src="img/trash.png" class="cart-remove">
        `);
        $('.cart-content').append(cartBox);

        updateTotal();
      });

      //load du lieu tu local
      const loadCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
          const cartBox = $('<div></div>');
          cartBox.addClass('cart-box');
          cartBox.html(`
            <img src="${item.image}" alt="" class="img-cart">
            <div class="detail-box">
              <div class="cart-product-title">${item.name}</div>
              <div class="cart-price">${item.price}</div>
              <input type="number" value="1" class="cart-quantity">
            </div>
            <img src="img/trash.png" class="cart-remove">
          `);
          $('.cart-content').append(cartBox);
        });
        updateTotal();
      };
    
      loadCart();

      //update total when change quantity
      $(document).on('input', '.cart-quantity', function() {
        updateTotal();
      });

      //rang buoc quantity la 1 neu khong nhap du lieu
      $(document).on('blur', '.cart-quantity', function() {
        if ($(this).val() === '' || $(this).val()<= 0) {
          $(this).val(1);
          updateTotal();
        }
      });

}); 
function User(userName, email, pass, phonNB){
    this.userName = userName;
    this.email = email;
    this.pass = pass;
    this.phonNB = phonNB;
}
var user;
        function checkMail(){
            var $ = document;
            var mail = $.getElementById("mail").value;
            const regularMail = /\S+@\S+\.\S+/g;
            let rs = regularMail.test(mail);
            if(mail===""){
                $.getElementById("mail_error").innerHTML = "(*) Email không được để trống!";
                $.getElementById("mail").style.borderColor = "red";
                return false;
            }
            else if(!rs){
                $.getElementById('mail_error').innerHTML = "(*) Email không hợp lệ! VD: example@example.com";
                $.getElementById("mail").style.borderColor = "red";
                return false;
            }else {
                    $.getElementById("mail_error").innerHTML = "";
                    $.getElementById("mail").style.borderColor = "";
                    return true;
                }
            
        }
        function checkPass(){
            var $ = document;
            var pass = $.getElementById("pass").value;
            const regularPass = /^\w{4,8}$/;
            let rs = regularPass.test(pass);
            if(pass===""){
                $.getElementById("pass_error").innerHTML = "(*) Password không được để trống!";
                $.getElementById("pass").style.borderColor = "red";
                return false;
            }
            else if(!rs){
                $.getElementById('pass_error').innerHTML = "(*) Password không hợp lệ! Từ 4-8 kí tự";
                $.getElementById("pass").style.borderColor = "red";
                return false;
            }else {
                    $.getElementById("pass_error").innerHTML = "";
                    $.getElementById("pass").style.borderColor = "";
                    return true;
                }
            
        }
        function checkUserName(){
            var $ = document;
            var userName = $.getElementById("username").value;
            const regexName = /[a-zA-Z0-9 '_]/g;
            let rs = regexName.test(userName);
            if(userName===""){
                $.getElementById("name_error").innerHTML="(*) Không được để trống User Name!";
                $.getElementById("username").style.borderColor = "red";
                return false;
            }else if(!rs){
                $.getElementById("name_error").innerHTML="(*) User Name không hợp lệ! Chỉ được nhập chữ, số và '_ ";
                $.getElementById("username").style.borderColor = "red";
                return false;
            }else {
                $.getElementById("name_error").innerHTML = "";
                $.getElementById("username").style.borderColor = "";
                return true;
            }
        
        }        
        function checkPhoneNB(){
            var $ = document;
            var phone = $.getElementById("phoneNB").value;
            const regexPhone = /[0-9]{10,11}/;
            let rs = regexPhone.test(phone);
            if(phone===""){
                $.getElementById("phone_error").innerHTML="(*) Không được để trống SĐT!";
                $.getElementById("phoneNB").style.borderColor = "red";
                return false;
            }else if(!rs){
                $.getElementById("phone_error").innerHTML="(*) SĐT không hợp lệ! Chỉ được nhập số 0-9 và tối đa 10-11 kí tự";
                $.getElementById("phoneNB").style.borderColor = "red";
                return false;
            }else {
                $.getElementById("phone_error").innerHTML = "";
                $.getElementById("phoneNB").style.borderColor = "";
                return true;
            }
        
        } 
        var menu = false;
        function clickMenu(){
            if(menu==false){
               document.getElementsByClassName('menuitem')[0].style.display = "grid"; 
               menu = true;
            }
            else{
                document.getElementsByClassName('menuitem')[0].style.display = "none"; 
               menu = false;
            }   
        }
        function clickCart(){
            const cart = document.querySelector('.myCart');
            cart.classList.toggle('show');
        }
        document.addEventListener('DOMContentLoaded', function() {
            var startX, startY, endX, endY;
            var minDistance = 100; // Khoảng cách tối thiểu để xem như là một lượt vuốt
        
            document.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
        
            document.addEventListener('touchmove', function(e) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
            });
        
            document.addEventListener('touchend', function() {
                if (startX && endX) {
                    var distanceX = endX - startX;
                    var distanceY = endY - startY;
        
                    if (Math.abs(distanceX) > Math.abs(distanceY)) {
                        if (distanceX > minDistance) {
                            document.getElementsByClassName('leftside')[0].style.left = '0';
                        } else if (distanceX < -minDistance) {
                            document.getElementsByClassName('leftside')[0].style.left = '-75%';
                        }
                    }
                }
        
                startX = startY = endX = endY = null;
            });
});