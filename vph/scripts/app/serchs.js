define(["createData", "ajax"], function () {
    //搜索框事件
    function Serch() {
        this.serchText = this.$id("serchText");//搜索框
        this.randomCon = this.$id("randomCon");//搜索内容
        this.randomBot = this.$id("randomBot");//历史记录
        this.serch_left_con = this.$id("serch_left_con");//历史记录容器
        this.serch_list = this.$id("serch_list");
        this.count = -1;
        this.stroAge = window.localStorage;
        this.storAgeArray = JSON.parse(this.stroAge.getItem("searchCon")) || [];
        this.init();
    }
    Serch.prototype = {
        constructor: Serch,
        init: function () {
            this.serchHandel();//搜索
            this.searchStorAge();//本地存储
            this.searchStorAgeCon();
            this.deleBind();//删除事件
        },
        $id: function (id) {
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        //搜索框事件
        serchHandel: function () {
            var _this = this;
            var serch_left_con = document.getElementById("serch_left_con");//搜索内容
            var serchRight = document.querySelector("#serchRight");//历史记录

            this.serchText.onfocus = function () {
                //显示历史纪录
                if (this.value == "") {
                    _this.randomBot.style.display = "block";
                } else {
                    _this.randomBot.style.display = "none";
                }
            }
            //右边精品推荐
            serchRight.innerHTML = "<span>精品推荐</span>";
            ajax({
                url: "api/serch.json",
                dataType: "json",
                success: function (data) {
                    data.serchCurr.forEach(function (item, ind) {
                        serchRight.innerHTML += "<li>" + item.name + "</li>";
                    });
                    //点击精品推荐设置存储
                    var recommendParent = document.querySelector("#serchRight");
                    var recommendChild = recommendParent.getElementsByTagName("li");
                    for (var i = 0; i < recommendChild.length; i++) {
                        recommendChild[i].index = i;
                        recommendChild[i].onclick = function () {
                            var text = this.innerHTML;
                            _this.serchText.value = text;
                            _this.randomBot.style.display = "none";
                        }
                    }
                }
            });

            //模糊搜索
            this.serchText.oninput = function (e) {
                var val = this.value.trim();//获取当前的value值

                var html = "";

                if (val != "") {
                    // serch_left_con.innerHTML="";
                    _this.randomBot.style.display = "none";
                    _this.randomCon.style.display = "block";
                    ajax({
                        url: "api/serch.json",
                        dataType: "json",
                        success: function (data) {
                            data.serchData.forEach(function (item, ind) {
                                if (item.name.indexOf(val) !== -1 || item.Eng.indexOf(val) !== -1) {
                                    html += "<li>" + item.name + "</li>";
                                    //调用键盘事件
                                    _this.keyCodes();
                                }
                                serch_left_con.innerHTML = html;
                            });
                            //给所有的搜索列表绑定事件
                            var hisConList = _this.serch_left_con.children;
                            for (var i = 0; i < hisConList.length; i++) {
                                hisConList[i].index = i;
                                hisConList[i].onclick = function () {
                                    _this.serchText.value = this.innerText;
                                    _this.randomCon.style.display = "none";
                                }
                            }
                        }
                    })
                } else {
                    serch_left_con.innerHTML = "";
                    _this.randomBot.style.display = "block";
                    _this.randomCon.style.display = "none";
                }

            }


        },
        //键盘事件
        keyCodes: function () {
            var _this = this;
            this.serchText.onkeyup = function (e) {
                var ev = e || window.event;
                var key = ev.keyCode;
                if ([13, 38, 40].indexOf(key) !== -1) {
                    var childs = _this.serch_left_con.children;
                    if (key == 38) {
                        _this.count--;
                        if (_this.count < 0) {
                            _this.count = childs.length - 1;
                        }
                    } else if (key == 40) {
                        _this.count++;
                        if (_this.count > childs.length - 1) {
                            _this.count = 0;
                        }
                    }
                    //排他加高亮
                    for (var i = 0; i < childs.length; i++) {
                        childs[i].classList.remove("current");
                    }
                    childs[_this.count].classList.add("current");
                    if (key == 13) {
                        _this.serchText.value = childs[_this.count].innerText;
                        _this.randomCon.style.display = "none";
                        _this.count = -1;
                    }
                    _this.serchText.value = childs[_this.count].innerText;
                    return;
                }
            }


        },
        //本地存储
        searchStorAge: function () {
            var _this = this;
            var serchbtn = this.$id("serchbtn");//搜索按钮
            //设置本地存储
            serchbtn.onclick = function () {
                _this.serch_list.innerHTML = "";
                var values = _this.serchText.value.trim();
                if (values != "") {
                    _this.storAgeArray.push(values);
                    _this.searchStorAgeCon();
                }
                _this.serchText.value = "";
            }
        },
        //渲染历史记录
        searchStorAgeCon: function () {
            var _this = this;
            this.stroAge.setItem("searchCon", JSON.stringify(this.storAgeArray));
            _this.serch_list.innerHTML = this.storAgeArray.map(function (item) {
                return "<li>" + item + "</li><span>&times;</span>";
            }).join("");
            this.deleBind();
        },
        //删除事件
        deleBind: function () {
            var _this = this;
            var hisCon = _this.serch_list.getElementsByTagName("li");
            var smallRemove = _this.serch_list.getElementsByTagName("span");

            //给所有的历史记录绑定事件,点击进行赋值文本框
            for (var i = 0; i < hisCon.length; i++) {
                hisCon[i].index = i;
                hisCon[i].onclick = function () {
                    _this.serchText.value = this.innerHTML;
                    _this.randomBot.style.display = "none";
                }
            }
            //删除指定的历史纪录
            for (var i = 0; i < smallRemove.length; i++) {
                smallRemove[i].index = i;
                smallRemove[i].onclick = function () {
                    _this.storAgeArray.splice(this.index, 1);
                    _this.searchStorAgeCon();
                }
            }
            //给删除全部历史纪录
            var deleSerch = this.$id("deleSerch");//删除历史纪录
            deleSerch.onclick = function () {
                _this.storAgeArray = [];
                _this.searchStorAgeCon();
                _this.serch_list.innerHTML = "";
                _this.randomBot.style.display = "none";
            }
        }
    }
    new Serch();
});