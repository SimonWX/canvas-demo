<template>
  <div class="hello">
    <h4>Basic-Demo</h4>
    <!-- <div class="operation-bar">
      <button id="freeDraw" class="btn">画笔模式</button>
      <label class="btn">
        线宽：
        <input
          type="range"
          id="lineWidthRange"
          autocomplete="false"
          min="1"
          max="10"
          step="1"
          placeholder="请选择画笔宽度"
        />
        {{ lineWidth }}
      </label>
      <label class="btn lineColor">
        线色：
        <input type="color" id="lineColor" autocomplete />
      </label>
      <button id="clearCanvas" class="btn">清除画板</button>
      <button id="selectAll" class="btn">全选</button>
      <button id="discardSelectAll" class="btn">取消全选</button>
      <button
        id="deleteSelect"
        :class="['btn', !isDraw ? 'isDis' : '']"
        :disabled="!isDraw"
      >
        删除
      </button>
      <button id="toJSON" class="btn">画板信息序列转化为JSON</button>
      <label class="btn">
        图形：
        <select id="selectShape" value>
          <option value="select">选择图案</option>
          <option value="rect">矩形</option>
          <option value="circle">圆</option>
          <option value="ellipse">椭圆</option>
          <option value="straight">直线</option>
          <option value="triangle">三角形</option>
        </select>
      </label>
      <label class="btn">
        抽稀程度：
        <input
          type="range"
          id="thinningLevel"
          autocomplete="false"
          min="3"
          max="8"
          step="1"
          placeholder="请选择抽稀程度"
        />
        {{ thinningLevel }}
      </label>
    </div> -->

    <div class="canvasWrapper">
      <canvas id="canvas" width="1200" height="900"></canvas>
    </div>
  </div>
</template>

<script>
// import { fabric } from "fabric";
// import core from "./js/core.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {};
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#24b95f";
    // 绘制矩形
    ctx.fillRect(25, 25, 100, 100);
    // 清除矩形中间的部分矩形范围
    ctx.clearRect(45, 45, 60, 60);
    // 绘制矩形边框
    ctx.strokeRect(50, 50, 50, 50);

    // 绘制笑脸
    ctx.beginPath();
    ctx.arc(375, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(410, 75);
    ctx.arc(375, 75, 35, 0, Math.PI, false); // 口(顺时针)
    ctx.moveTo(365, 65);
    ctx.arc(360, 65, 5, 0, Math.PI * 2, true); // 左眼
    ctx.moveTo(395, 65);
    ctx.arc(390, 65, 5, 0, Math.PI * 2, true); // 右眼
    ctx.stroke();

    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(625, 25);
    ctx.lineTo(705, 25);
    ctx.lineTo(625, 105);
    ctx.fill();

    // 描边三角形
    ctx.beginPath();
    ctx.moveTo(725, 125);
    ctx.lineTo(725, 45);
    ctx.lineTo(645, 125);
    ctx.closePath();
    ctx.stroke();

    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(975, 25);
    ctx.quadraticCurveTo(925, 25, 925, 62.5);
    ctx.quadraticCurveTo(925, 100, 950, 100);
    ctx.quadraticCurveTo(950, 120, 930, 125);
    ctx.quadraticCurveTo(960, 120, 965, 100);
    ctx.quadraticCurveTo(1025, 100, 1025, 62.5);
    ctx.quadraticCurveTo(1025, 25, 975, 25);
    ctx.stroke();

    //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 340);
    ctx.bezierCurveTo(75, 337, 70, 325, 50, 325);
    ctx.bezierCurveTo(20, 325, 20, 362.5, 20, 362.5);
    ctx.bezierCurveTo(20, 380, 40, 402, 75, 420);
    ctx.bezierCurveTo(110, 402, 130, 380, 130, 362.5);
    ctx.bezierCurveTo(130, 362.5, 130, 325, 100, 325);
    ctx.bezierCurveTo(85, 325, 75, 337, 75, 340);
    ctx.fill();

    // 绘制文本
    ctx.font = "30px serif";
    ctx.fillText("Hello world", 320, 380);

    // 绘制文本边框
    ctx.font = "30px serif";
    ctx.strokeText("Hello everyone", 600, 380);

    // 绘制图片
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 900, 300);
      ctx.beginPath();
      ctx.moveTo(930, 396);
      ctx.lineTo(970, 366);
      ctx.lineTo(1003, 376);
      ctx.lineTo(1070, 315);
      ctx.stroke();
    };
    img.src = "https://mdn.mozillademos.org/files/5395/backdrop.png";

    // 循环全景图
    this.loopPanorama();

    // this.animation();
  },
  methods: {
    loopPanorama() {
      var img = new Image();
      // User Variables - customize these to change the image being scrolled, its
      // direction, and the speed.

      img.src =
        "https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg";
      var CanvasXSize = 1200;
      var CanvasYSize = 200;
      var speed = 30; // lower is faster
      var scale = 1.05;
      var y = 590; // vertical offset

      // Main program

      var dx = 0.75;
      var imgW;
      var imgH;
      var x = 0;
      var clearX;
      var clearY;
      var ctx;

      img.onload = function () {
        imgW = img.width * scale;
        imgH = img.height * scale;

        if (imgW > CanvasXSize) {
          // image larger than canvas
          x = CanvasXSize - imgW;
        }
        if (imgW > CanvasXSize) {
          // image width larger than canvas
          clearX = imgW;
        } else {
          clearX = CanvasXSize;
        }
        if (imgH > CanvasYSize) {
          // image height larger than canvas
          clearY = imgH;
        } else {
          clearY = CanvasYSize;
        }

        // get canvas context
        ctx = document.getElementById("canvas").getContext("2d");

        // set refresh rate
        return setInterval(draw, speed);
      };

      function draw() {
        ctx.clearRect(0, y, clearX, clearY); // clear the canvas

        // if image is <= Canvas Size
        if (imgW <= CanvasXSize) {
          // reset, start from beginning
          if (x > CanvasXSize) {
            x = -imgW + x;
          }
          // draw additional image1
          if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
          }
          // draw additional image2
          if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
          }
        }

        // image is > Canvas Size
        else {
          // reset, start from beginning
          if (x > CanvasXSize) {
            x = CanvasXSize - imgW;
          }
          // draw aditional image
          if (x > CanvasXSize - imgW) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
          }
        }
        // draw image
        ctx.drawImage(img, x, y, imgW, imgH);
        // amount to move
        x += dx;
      }
    },

    animation() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var raf;
      var running = false;

      var ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 25,
        color: "tan",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        },
      };

      function clear() {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      function draw() {
        clear();
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
          ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
          ball.vx = -ball.vx;
        }

        raf = window.requestAnimationFrame(draw);
      }

      canvas.addEventListener("mousemove", function (e) {
        if (!running) {
          clear();
          ball.x = e.offsetX;
          ball.y = e.offsetY;
          ball.draw();
        }
      });

      canvas.addEventListener("click", function (e) {
        if (!running) {
          raf = window.requestAnimationFrame(draw);
          running = true;
        }
      });

      canvas.addEventListener("mouseout", function (e) {
        window.cancelAnimationFrame(raf);
        running = false;
      });

      ball.draw();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.operation-bar {
  margin: 0 0 20px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  margin-right: 10px;
  height: 30px;
  border: 1px solid #cccccc;
  background: transparent;
  outline: none;
  cursor: pointer;
}

.btn:first-child {
  width: 100px;
}
label {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  box-sizing: border-box;
  vertical-align: middle;
  border: 1px solid #cccccc;
  padding: 0 10px;
}
label input[type="range"] {
  vertical-align: middle;
  margin-bottom: 8px;
  width: 80px;
  -webkit-appearance: none;
  background: transparent;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  /* width: 100%; */
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: lightgrey; /*滑动条轨道背景颜色*/
  border-radius: 3.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  border-radius: 50px;
  background: lightgray; /*和进度条的填充部分一个颜色*/
  cursor: pointer;
  margin-top: -3.5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
/*自定义滑动条获得焦点时的背景颜色*/
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: lightgray;
}

/*兼容Firefox浏览器*/
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: lightgrey;
  border-radius: 3.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: lightgray;
  cursor: pointer;
}

.canvasWrapper {
  width: 1200px;
  height: 900px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  margin: 0 auto;
}

.isDis {
  background: lightgray;
  cursor: not-allowed;
}

.lineColor {
  vertical-align: middle;
}
#lineColor {
  border: 0;
  outline: none;
  height: 20px;
  /* margin-top: 2px; */
  /* vertical-align: middle; */
}
::-webkit-color-swatch-wrapper {
  background-color: #ffffff;
}
::-webkit-color-swatch {
  position: relative;
}
</style>
