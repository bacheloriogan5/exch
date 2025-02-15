function show_hiddenhistory(id)
{
    $('#History .menu1 a').removeClass();
    $('#History #' + id).addClass('active');
    
    $('#History .hidden').hide();
    $('#History #hidden_' + id).show();

}
function show_hiddenorder(id) {

    $('#zay .menu1 a').removeClass();
    $('#zay #' + id).addClass('active');

    $('#zay .hidden').hide();
    $('#zay #hidden_' + id).show();

}

function new_show_hiddenorder(id) {

    /*$('#zay .menu1 a').removeClass();
    $('#zay #' + id).addClass('active');

    $('#zay .hidden').hide();
    $('#zay #hidden_' + id).show();*/

    $('#'+id).show();

    $('#zay').hide();
    $('#chatpanel').hide();

}

function show_hidden(id) {

    $('.menu1 a').removeClass();
    $('#' + id).addClass('active');

    $('.hidden').hide();
    $('#hidden_' + id).show();
}


function hideall()
{

    i = 0;

    for (i = 1; i != 500; i++) {
        $('#exch_' + i).hide();
    }

}
function hideall1() {

    i = 0;

    for (i = 2; i != 22; i++) {
        $('#pay_' + i).hide();
    }
}
function hideall2() {

    i = 0;

    for (i = 2; i != 16; i++) {
        $('#sell_' + i).hide();
    }
}

function show_pay(div, div1, el)
{
   
    $('#' + div1).show();
	
    $('.lft a').removeClass();
	
    $(el).addClass('active');
}

function select_file(el)
{
    $('#'+el).click();
    $('#'+el).change(function(){
        $('#fake_'+el).val($('#'+el).val());
    });
}

function show_popup()
{
    $('#disabled_page').fadeIn(500);
    $('#popup').show();
}

function hide_popup()
{
     $('#disabled_page').fadeOut(500);
     $('#popup').fadeOut(500);
}
