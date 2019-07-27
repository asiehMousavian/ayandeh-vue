$(document).ready(function(){
    $('.form-control').blur(function(){
        if ($(this).val()) {
            $(this).parent().addClass('visited');
        }
        else{
            $(this).parent().removeClass('visited');
        }
    });
});
