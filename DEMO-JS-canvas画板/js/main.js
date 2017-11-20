var yyy = document.getElementById('drawCanvas');
var context = yyy.getContext('2d');

//  设置画布尺寸(自适应)
autoSetCanvasSize(yyy);

//  监听用户鼠标动作
listenToUser(yyy);

// 默认状态橡皮擦不启动
var eraserEnabled = false;
// 橡皮擦启动函数
eraser.onclick = function() {
    eraserEnabled = true;
    actions.className = 'actions x'
}
//  画笔启动状态
brush.onclick = function() {
    eraserEnabled = false;
    actions.className = 'actions';
}

/**********************************************/


//  自动调节大小 发生改变则会自动调整大小
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function() {
        setCanvasSize();
    }
    //  设置画布大小的函数
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

// 画点
function drawPoint(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

//  点与点之间连线（使得划线连贯）
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x1, y1); //起点
    context.lineWidth = 5;
    context.lineTo(x2, y2); //终点
    context.stroke();
    context.closePath();
}

//  
function listenToUser(canvas) {
    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //  特性检测（检测是否支持touch）
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备(获取坐标的方式不同)
        canvas.ontouchstart = function(aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y-5, 10, 10);
            }else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function(aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y-5, 10, 10);
            }else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function() {
            using = false;
        }
    }else {
        // 非触屏设备
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y-5, 10, 10);
            }else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            if (!using) {
                return;
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y-5, 10, 10);
            }else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function(aaa){
            using = false;
        }
    }
}