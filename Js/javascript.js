var $ = document;
            function checkMail(){
                var mail = $.getElementById("mail").value;
                const regularMail = /\S+@\S+\.\S+/g;
                let rs = regularMail.test(mail);
                if(mail===""){
                    $.getElementById("mail_error").innerHTML = "Email không được để trống!";
                    $.getElementById("mail").style.borderColor = "red";
                }
                else if(!rs){
                    $.getElementById('mail_error').innerHTML = "Email không hợp lệ! VD: example@example.com";
                    $.getElementById("mail").style.borderColor = "red";
                }else {
                        $.getElementById("mail_error").innerHTML = "";
                        $.getElementById("mail").style.borderColor = "";
                    }
                
            }
            function checkPass(){
                var pass = $.getElementById("pass").value;
                const regularPass = /^\w{4,8}$/;
                let rs = regularPass.test(pass);
                if(pass===""){
                    $.getElementById("pass_error").innerHTML = "Password không được để trống!";
                    $.getElementById("pass").style.borderColor = "red";
                }
                else if(!rs){
                    $.getElementById('pass_error').innerHTML = "Password không hợp lệ! Từ 4-8 kí tự";
                    $.getElementById("pass").style.borderColor = "red";
                }else {
                        $.getElementById("pass_error").innerHTML = "";
                        $.getElementById("pass").style.borderColor = "";
                    }
                
            }            