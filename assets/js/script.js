var BLOG_LOADED=false;
$(function(){
    setTimeout(function(){
        loadBlog();
    }, 500);


    // online & offline detection
    if(window.navigator.onLine){
       $("#offline-notification").addClass('online');
    }
    else{
        $("#offline-notification").removeClass('online');
    }
    
    $(window).on('online', function(){
       $("#offline-notification").addClass('online');
       loadBlog(); //ini case saat offline, blog blm diload dan koneksi internet sudah kembali
    });
    
    $(window).on('offline', function(){
        $("#offline-notification").removeClass('online');
    });
    
});

function loadBlog(){
    if(window.BLOG_LOADED || !window.navigator.onLine){
        return; //gausa load apa2 kalau blog sudah diload atau masih offline
    }
    $.ajax({
        url : 'page/blog.html',
        dataType : 'html'
    }).done((response) => {
        $(".blog-container").html(response);
    }).fail((err) => {
        console.log('Failed blog load, ',err);
        //gagal load blog. kemungkinan karena internet.
    });
}