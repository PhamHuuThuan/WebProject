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
               document.getElementsByClassName('myCart')[0].style.display = "grid"; 
               menu = true;
            }
            else{
                document.getElementsByClassName('myCart')[0].style.display = "none"; 
               menu = false;
            }   
        }
        var cartDisplay = false;
        function clickCart(){
            if(cartDisplay==false){
               document.getElementsByClassName('myCart')[0].style.display = "grid"; 
               cartDisplay = true;
            }
            else{
                document.getElementsByClassName('myCart')[0].style.display = "none"; 
                cartDisplay = false;
            }   
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
            const carts = document.querySelectorAll('.myCart');
            const cart = carts[0];
            console.log(cart);
            const addToCartButtons = document.querySelectorAll('.btnaddcart');
            console.log(addToCartButtons);
            addToCartButtons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    const clickedButton = event.target;
                    const product = clickedButton.closest('.products');
                    const productImage = product.querySelector('.product-img img').src;
                    const productName = product.querySelector('.name-price h3').textContent;
                    const productPrice = product.querySelector('.name-price h4').textContent;
                    console.log(button);

                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');

                    const cartItemImage = document.createElement('img');
                    cartItemImage.src = productImage;
                    cartItem.appendChild(cartItemImage);

                    const cartItemName = document.createElement('span');
                    cartItemName.textContent = productName;
                    cartItem.appendChild(cartItemName);

                    const cartItemPrice = document.createElement('span');
                    cartItemPrice.textContent = productPrice;
                    cartItem.appendChild(cartItemPrice);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function() {
                    // code to remove item from cart
                    cartItem.remove();
                    });
                    cartItem.appendChild(deleteButton);

                    cart.appendChild(cartItem);
                });
            });
        });
        