define(["swiper","ajax","createData"], function(Swiper) {
    var Swwrapper=document.querySelector("#Swwrapper");
    ajax({
        url:"api/paly.json",
        dataType:"json",
        success:function(data){
            data.paly.forEach(function(item){
              Swwrapper.innerHTML+=`<div class="swiper-slide"><img src="./images/${item.src}"></div>`;
            });
            swiper();
        }
    })
   //轮播图
    function swiper(){
        var myswiper=new Swiper("#Swconation",{
            autoplay:{
              delay:1000,
              disableOnInteraction:false,
            },
            loop:true,
            pagination:{
                el:"#Swpag",
                clickable:true,
            },
            navigation:{
                prevEl:"#prev",
                nextEl:"#next"
            },
            // slidesPerView:3,
            // slidesPerGroup:2
        })
    }
  
})



    

