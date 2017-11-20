var yyy = document.getElementById('drawCanvas');
var context = yyy.getContext('2d');

//  设置画布尺寸(自适应)
autoSetCanvasSize(yyy);

//  监听用户鼠标动作
listenToMouse(yyy);

// 默认状态橡皮擦不启动
var eraserEnabled = false;
// 橡皮擦启动函数
eraser.onclick = function() {
    eraserEnabled = ture;
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
function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}


