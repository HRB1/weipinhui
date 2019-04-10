define(["loazload", "createData", "swipers", "serchs", "Tabs", "ajax"], function (loazload) {

    function Handel() {
        this.nav = this.$("nav");//导航
        this.reTop = this.$("reTop");//返回顶部
        this.conCenter = this.$("conCenter");//楼层的容器
        this.leftNav_con = this.$("leftNav_con");//左导航
        this.leftNav = this.$("leftNav");//左导航的父级
        this.timer = null;
        this.init();
    }
    Handel.prototype = {
        constructor: Handel,
        init: function () {
            this.createFloor();//渲染楼层
        },
        //获取id
        $: function (id) {
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        // 渲染楼层数据
        createFloor: function () {
            var _this = this;
            ajax({
                url: "api/floor.json",
                success: function (data) {
                    createCon(data);
                    _this.Ceiling();//吸顶
                }
            })
            //渲染
            function createCon(datas) {
                //遍历数据
                datas.floorData.forEach(function (item, ind) {
                    var con = item.con;
                    //渲染左导航
                    _this.leftNav_con.innerHTML += "<li><span class='iconfont icon-Instagram'></span>" + item.titName + "</li>";
                    if (ind == 0) {
                        _this.leftNav_con.children[ind].classList.add("clickCss");
                    }
                    //内容
                    var html = "";
                    con.forEach(function (ele, index) {
                        html += "<div class='center_con_ct'><dl><dt><img class='loazImg' data-src='./images/" + ele.conImg + "' src='./images/loading3.gif'></dt><dd><span class='price'><b>" + ele.price + "</b>折起</span><span class='shopName'>" + ele.shopName + "</span><span class='timekeeper'><b class='iconfont icon-shizhong1'></b>剩余<i>" + ele.time + "</i>天</span></dd></dl></div>"
                    });
                    _this.conCenter.innerHTML += "<div class='con_center_con'><h2 class='tu'><img src='./images/" + item.titImg + "'></h2>" + html + "<div style='clear:both'></div><p class='center_con_bt'>获取更多<span>" + item.titName + "</span>品牌</p></div>";
                })
                //懒加载
                loazload.init({
                    els: ".loazImg",
                    elsAttr: "data-src"
                })
            }
        },
        //     //吸顶、楼层
        Ceiling: function () {
            var _this = this;
            var offSet = this.nav.offsetTop;
            var con_center_con = [...document.getElementsByClassName("con_center_con")];//每个盒子元素
            var titleHeight = document.getElementsByClassName("tu");
            document.onscroll = function () {
                //懒加载
                loazload.init({
                    els: ".loazImg",
                    elsAttr: "data-src"
                })
            
                var scrT = document.documentElement.scrollTop;
                //吸顶效果
                if (scrT > offSet) {
                    _this.nav.classList.add("fixed");
                } else {
                    _this.nav.classList.remove("fixed");
                }
                //楼层
                con_center_con.forEach(function (ele, ind) {
                    var sTop = ele.offsetTop;//每个元素距离顶部的距离
                    var h = getComputedStyle(ele).height;
                    if (scrT >= (parseInt(sTop) - (parseInt(h) / 2))) {
                        _this.leftNav.classList.add("leftPos");
                        for (var i = 0; i < _this.leftNav_con.children.length; i++) {
                            _this.leftNav_con.children[i].className = "";
                        }
                        _this.leftNav_con.children[ind].classList.add("clickCss");
                    }
                    //左边导航的定位
                    if (scrT < 1700) {
                        _this.leftNav.classList.remove("leftPos");
                    }
                    //点击跳转到当前页面
                    _this.leftNav_con.children[ind].onclick = function () {
                        document.documentElement.scrollTop = sTop - 50;
                        this.classList.add("clickCss");
                    }

                })
                loazload.init({
                    els:".loadImg",
                    elsAttr:"data-src"
                })
            }
            //返回顶部
            this.reTop.style.marginTop = "80px";
            this.reTop.onclick = function () {
                document.documentElement.scrollTop = 0;
            }

        },
        // 
    }
    new Handel()
});