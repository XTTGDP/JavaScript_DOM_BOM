window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.children[1];
    // 获得focus的宽度
    var w = focus.offsetWidth;
    // 2.利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        // 移动的距离
        var translatex = -index * w;
        // 过度效果
        ul.style.transition = 'all .3s';
        // 移动图片
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等着我们过渡完成之后，再去判断，监听过渡完成事件 transitionend 
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果 这样让我们的Ul快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            // 去掉过渡效果 这样让我们的Ul快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆圈变化
        // 把ol里面的li带有current类名的选出来去掉类名 remove 
        ol.querySelector('li.current').classList.remove('current');
        // 让当前索引号的小li 加上 current add 
        ol.children[index].classList.add('current');
    });

    // 4.手指滑动轮播图
    var startX = 0;
    var moveX = 0;//后面我们会使用这个移动距离所以一定要定义一个全局变量
    var flag = false;
    // 触摸元素 touchstart:获取手指初始坐标
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove:计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子:盒子原来的位置+手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候，不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;//如果用户手指移动过，我们再去判断否则不做判断效果
        e.preventDefault();//阻止屏幕默认滚动行为
    });
    // 手指离开 根据移动距离去判断是否回弹函数播放上一张下一张
    ul.addEventListener('touchend', function (e) {
        // (1)如果移动距离大于50像素我们就播放上一张或者下一张
        if (flag) {
            if (Math.abs(moveX) > 50) {
                // 如果是右滑就是播放上一张 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就是 播放下一张 moveX是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // (2)如果移动距离小于50像素我们就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }

        // 手指离开时重启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            // 移动的距离
            var translatex = -index * w;
            // 过度效果
            ul.style.transition = 'all .3s';
            // 移动图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });

    // 返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = this.document.querySelector('nav')
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })
})