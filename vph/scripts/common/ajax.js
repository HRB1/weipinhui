define(function() {
    var xhr = {
        //标准浏览器
        XHRHTTPObj: function () {
            return new XMLHttpRequest();
        },
        //ie浏览器
        XHRHTTPIe: function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },
        //浏览器报错
        XHRHTTPError: function () {
            alert("您的浏览器跟不上脚步了");
            return null;
        },
        //创建ajax对象
        createXHR: function () {
            var xhr = null;
            if (window.XMLHttpRequest) {
                this.createXHRObj = this.XHRHTTPObj;//标准浏览器
            } else {
                this.createXHRObj = this.XHRHTTPIe;//IE浏览器
            }
            try {
                xhr = this.createXHRObj();//抛出异常
            } catch (e) {
                //接受异常
                this.createXHRObj = this.XHRHTTPError;
                xhr = this.createXHRObj;
            }
            return xhr;
        },
        ajax: function (opt) {
            var defaults = {
                type: "get",
                async: true,
                dataType:"json"
            }
            //合并对象
            opts = Object.assign({}, defaults, opt);
            var xhr = this.createXHR();//ajax对象
            var method = (opts.type || "GET").toUpperCase();//get方式
            var isPost = method == "POST";//判断是不是post
            var data = this.param(opts.data);//转换data数据格式
            var url = this.buildUrl(opts.url, data, isPost);//传参方式get地址后面拼接；
            xhr.open(method, opts.url, opts.async);//打开
            //是post设置请求头
            if (isPost) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            //监听事件
            var stateChange = this.stateChange;
            stateChange(xhr, opts.dataType, opts.success, typeof (opts.error) == "undefined" ? false : opts.error);
            xhr.send(isPost? data : null); 
        },
        param: function (data) {
            if (!data) {
                return null;
            }
            //不是对象返回自己
            if (typeof data !=="object") {
                return data;
            }
            var newData = [];
            for (var key in data) {
                newData.push(key + "=" + data[key]);
            }
            return newData.join("&");
        },
        //get传参方式
        buildUrl: function (url, data, isPost) {
            if (data && !isPost) {
               
                if (url.indexOf("?") === -1) {
                    url += "?" + data;
                } else {
                    url += "&" + data;
                }
            }
            return url;
        },
        //监听状态事件
        stateChange: function (xhr, dataType, success, error) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var reslut = null;
                        if (dataType == "json") {
                            reslut = eval("(" + xhr.responseText + ")");
                        } else if (dataType == "xml") {
                            reslut = xhr.responseXML;
                        } else {
                            reslut = xhr.responseText;
                        }
                        success(reslut);//成功执行
                    } else {
                        if (error) {
                            error.call(xhr, statusText, status);
                        }
                    }
                } else {
                    if (error) {
                        error.call(xhr, statusText, status);
                    }
                }
            }
        }
    }
    window.ajax = function (opts) {
        xhr.ajax.call(xhr,opts)
    }
});


