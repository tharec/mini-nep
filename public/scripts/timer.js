var po = $('p.obj-timer')
var i = 4
var j = 0

function timeout(){
    setTimeout(function() {
        j = (j - 1) % 60
        if(j < 0){
            if(i > 0){
                i--
                j = 59
            } else {
                console.log('logout')
                window.location.href = "/logout"
            }
        }
        po.remove()
        po.html('<p class="obj-timer">' + i + ':' + j + '</p>').appendTo('.nav-timer')
        timeout()
    }, 1000);
}

if(po != null){
    timeout()
}