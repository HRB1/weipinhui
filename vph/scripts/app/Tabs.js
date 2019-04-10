define(["loazload", "createData", "ajax"], function (loazload) {
    function Tab() {
        this.TabTitle = document.getElementById("tab_title");//标题
        this.tabCon = document.getElementById("tabCon");
        this.init();
    }
    Tab.prototype = {
        constructor: Tab,
        init: function () {
            var _this = this;
            ajax({
                url: "api/TabControl.json",
                dataType: "json",
                success: function (data) {
                    _this.render(data.TabControl);
                }
            })
        },
        //渲染
        render: function (data) {
            var _this = this;
            //渲染title
            data.forEach(function (item, ind) {
                var con = item.TabCon;
                _this.TabTitle.innerHTML += "<li>" + item.Tabtit + "</li>";
                _this.tabCon.innerHTML += "<div></div>";
                //渲染内容
                con.forEach(function (ele, inde) {
                    _this.tabCon.children[ind].innerHTML += `<dl>
                    <dt><img class='loadImg'  src="./images/loading3.gif" data-src='./images/${ele.Tabsrc}'></dt>
                    <dd><p class="shopName">${ele.TabConName}</p><p class="shopPrice"><span>秒杀价￥<b>${ele.price}</b><i>￥${ele.oldPrice}</i></span></p></dd>
                  </dl>`;

                    //懒加载
                    loazload.init({
                        els: ".loadImg",
                        elsAttr: "data-src"
                    })

                });
                if (ind == 0) {
                    //标题
                    _this.TabTitle.children[ind].classList.add("frist");
                    _this.TabTitle.children[ind].classList.add("act");
                    //内容
                    _this.tabCon.children[ind].classList.add("disN");
                }

            });
            _this.bindEvent();
        },
        //事件
        bindEvent: function () {
            var _this = this;
            for (let i = 0; i < _this.TabTitle.children.length; i++) {
                _this.TabTitle.children[i].onmouseover = function () {
                    for (var k = 0; k < _this.TabTitle.children.length; k++) {
                        _this.TabTitle.children[k].classList.remove("act");
                        _this.tabCon.children[k].classList.remove("disN");
                    }
                    this.classList.add("act");
                    _this.tabCon.children[i].classList.add("disN");
                }
            }
        }

    }
    new Tab();
});