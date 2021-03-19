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
      <canvas id="canvas" width="1200" height="800"></canvas>
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

    // 绘制一个矩形
    // ctx.fillStyle = 'green';
    // ctx.fillRect(10, 10, 150, 100);

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
    ctx.moveTo(875, 25);
    ctx.quadraticCurveTo(825, 25, 825, 62.5);
    ctx.quadraticCurveTo(825, 100, 850, 100);
    ctx.quadraticCurveTo(850, 120, 830, 125);
    ctx.quadraticCurveTo(860, 120, 865, 100);
    ctx.quadraticCurveTo(925, 100, 925, 62.5);
    ctx.quadraticCurveTo(925, 25, 875, 25);
    ctx.stroke();

     //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 440);
    ctx.bezierCurveTo(75, 437, 70, 425, 50, 425);
    ctx.bezierCurveTo(20, 425, 20, 462.5, 20, 462.5);
    ctx.bezierCurveTo(20, 480, 40, 502, 75, 520);
    ctx.bezierCurveTo(110, 502, 130, 480, 130, 462.5);
    ctx.bezierCurveTo(130, 462.5, 130, 425, 100, 425);
    ctx.bezierCurveTo(85, 425, 75, 437, 75, 440);
    ctx.fill();

    // 绘制文本
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 350, 480);

    // 绘制文本边框

    ctx.font = "48px serif";
  ctx.strokeText("Hello everyone", 700, 480);

  },
  methods: {},
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
  height: 800px;
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
