$(document).ready(function() {
	
	 var lang = window.location.pathname.split('/');
            $.ajax({
                 url: '/index/blockIP/' + lang[1].toUpperCase(),
                type: "POST",
                dataType: "json",
                success: function(response) {
                    if (response.blockedip) {
                        if( lang[1].toUpperCase() == "RU") {

                       
                        swal({
                            html:true,
                title: "Отказано в обслуживании.", 
                html: ' Данный IP адрес находится в черном списке. Обмен средств с данного IP адреса невозможен.', 
                type: "error",
				width: 650,
                height: 450,
                icon: "warning",
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        });

                    }
                    else {

                       
                        swal({
                            html:true,
                title: "Service denied.", 
                html: 'This IP address is on the blacklist. It is not possible to exchange funds from this IP address', 
                type: "error",
				width: 650,
                height: 450,
                icon: "warning",
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                         });
        
                        // Закрыть сайт при закрытии сообщения о блокировке
                        $(window).on("beforeunload", function() {
                            return "Сообщение о блокировке";
                        });
                    }
                }
				} 
            });
        });

	
	