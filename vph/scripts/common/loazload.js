define(function () {
    function Loazload(opts) {
        this.opts = opts;
        //获取存放时间的元素
        this.els = [...document.querySelectorAll(this.opts.els)];
    }
    Loazload.prototype.load = function () {
        var _this = this;
        this.els.forEach(function (item) {
            //或每一个元素里面的data-src属性存放有结束时间
            var elsAttr = item.getAttribute(_this.opts.elsAttr);
            //获取window的高度
            var winTop = window.outerHeight;
            (function (items) {
                //获取每一个元素的距离视口顶部的距离
                var elsTop = items.getBoundingClientRect().top;
                if (winTop > elsTop) {
                    setTimeout(function () {
                        items.src = elsAttr;
                    }, 1500)
                }
            })(item)
        })
    }
    var init = function (opts) {
        return new Loazload(opts).load();
    }
    return {
        init: init
    }

});

