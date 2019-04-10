define(["mock", "ajax"], function (mock) {
    //搜索框数据
    var serchName = ["冬季商品", "冬季商品2", "春羽绒服", "冬男士羽绒服", "春女士羽绒服", "儿童羽绒服", "夏季商品", "鞋包", "居家", "运动商品", "美妆", "母婴用品",];
    var serchEng = ["dongjishangpin", "dongjishangpin", "chunyurongfu", "dongnanshiyurongfu", "chunnvshiyurongfu", "ertongyurongfu", "xiajishangpin", "xiebao", "jujia", "yundong", "meizhuang", "muyingyongpin"];
    mock.mock("api/serch.json", {
        "serchData|12": [{
            "name|+1": serchName,
            "Eng|+1": serchEng
        }],
        "serchCurr|6": [{
            "name|+1": serchName,
        }]
    });

    //楼层数据
    var floorName = ["女装", "鞋包", "男装", "运动", "饰品", "美妆", "母婴", "居家", "国际", "生活", "预告",]
    var floorSrc = ["1q.png", "2q.png", "3q.png", "4q.png", "5q.png", "6q.png", "7q.png", "8q.png", "9q.png", "10q.png", "11q.png",]
    var floorConSrc = ["brand-img1.jpg", "brand-img2.jpg", "brand-img3.jpg", "brand-img4.jpg", "brand-img5.jpg", "brand-img6.jpg", "brand-img7.jpg", "brand-img8.jpg", "brand-img9.jpg", "brand-img10.jpg", "brand-img11.jpg", "brand-img12.jpg", "brand-img13.jpg", "brand-img14.jpg", "brand-img15.jpg", "brand-img16.jpg", "brand-img17.jpg", "brand-img18.jpg", "brand-img19.jpg", "brand-img20.jpg", "brand-img21.jpg", "brand-img22.jpg", "brand-img23.jpg", "brand-img24.jpg", "brand-img25.jpg", "brand-img26.jpg", "brand-img27.jpg", "brand-img28.jpg", "brand-img29.jpg", "brand-img30.jpg", "brand-img31.jpg", "brand-img32.jpg", "brand-img33.jpg", "brand-img34.jpg", "brand-img35.jpg", "brand-img36.jpg", "brand-img37.jpg", "brand-img38.jpg", "brand-img39.jpg", "brand-img40.jpg", "brand-img41.jpg", "brand-img42.jpg", "brand-img43.jpg", "brand-img44.jpg",]
    mock.mock("api/floor.json", {
        "floorData|11": [{
            "titName|+1": floorName,
            "titImg|+1": floorSrc,
            "con|4": [{
                "conImg|+1": floorConSrc,
                "price|1-10": 0.8,
                "shopName": "玖姿JUZUI女装专场",
                "time|1-3": 3
            },]
        },
        ]
    });

    //轮播图数据
    var palySrc = ["lunbo1.png", "lunbo2.jpg", "lunbo3.png", "lunbo4.png",]
    mock.mock("api/paly.json", {
        "paly|4": [{
            "src|+1": palySrc
        },
        ]
    });

    //选项卡数据
    var TabControlName = ["护肤", "彩妆", "内衣", "母婴", "鞋包", "女装", "男装",]
    var TabSrc = ["brand-img1.jpg", "brand-img2.jpg", "brand-img3.jpg", "brand-img4.jpg", "brand-img5.jpg", "brand-img6.jpg", "brand-img7.jpg", "brand-img8.jpg", "brand-img9.jpg", "brand-img10.jpg", "brand-img11.jpg", "brand-img12.jpg", "brand-img13.jpg", "brand-img14.jpg", "brand-img15.jpg", "brand-img16.jpg", "brand-img17.jpg", "brand-img18.jpg", "brand-img19.jpg", "brand-img20.jpg", "brand-img21.jpg", "brand-img22.jpg", "brand-img23.jpg", "brand-img24.jpg", "brand-img25.jpg", "brand-img26.jpg", "brand-img27.jpg", "brand-img28.jpg", "brand-img29.jpg", "brand-img30.jpg", "brand-img31.jpg", "brand-img32.jpg", "brand-img33.jpg", "brand-img34.jpg", "brand-img35.jpg", "brand-img36.jpg", "brand-img37.jpg", "brand-img38.jpg", "brand-img39.jpg", "brand-img40.jpg", "brand-img41.jpg", "brand-img42.jpg", "brand-img43.jpg", "brand-img44.jpg",]
    mock.mock("api/TabControl.json", {
        "TabControl|7": [{
            "Tabtit|+1": TabControlName,
            "TabCon|8": [{
                "TabConName": "@name",
                "Tabsrc|+1": TabSrc,
                "price|100-500": 150,
                "oldPrice|100-1000": 180,
            }]
        }]
    });

});