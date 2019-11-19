<template>
  <div class="hello">
    <h1>Fabric.js-Demo</h1>
    <div class="operation-bar">
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
        {{lineWidth}}
      </label>
      <label class="btn lineColor">
        线色：
        <input type="color" id="lineColor" autocomplete />
      </label>
      <button id="clearCanvas" class="btn">清除画板</button>
      <button id="selectAll" class="btn">全选</button>
      <button id="discardSelectAll" class="btn">取消全选</button>
      <button id="deleteSelect" :class="['btn',!isDraw ? 'isDis':'']" :disabled="!isDraw">删除</button>
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
    </div>

    <div class="canvasWrapper">
      <canvas id="main" width="1200" height="600"></canvas>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      lineWidth: 2,
      isDraw: true,
      rectCount: 0,
      circleCount: 0,
      ellipseCount: 0,
      straightCount: 0,
      triangleCount: 0,
      color: "",
      lineWidthCurrent: ""
    };
  },
  mounted() {
    document.getElementById("lineWidthRange").value = "2";
    var canvas = new fabric.Canvas("main");
    fabric.Object.prototype.transparentCorners = false;
    canvas.setWidth(1200);
    canvas.setHeight(600);
    // var rect = new fabric.Rect({
    //   left: 100, //距离画布左侧的距离，单位是像素
    //   top: 100, //距离画布上边的距离
    //   fill: "#24b95f", //填充的颜色
    //   width: 100, //方形的宽度
    //   height: 100 //方形的高度
    // });
    // canvas.add(rect);

    // var rect2 = new fabric.Rect({
    //   left: 310, //距离画布左侧的距离，单位是像素
    //   top: 210, //距离画布上边的距离
    //   fill: "lightblue", //填充的颜色
    //   width: 100, //方形的宽度
    //   height: 100 //方形的高度
    // });
    // canvas.add(rect2);

    // Hovering
    // let tempColor;
    // canvas.on('mouse:over', function(e) {
    //   tempColor = e.target.fill;
    //   e.target.set('fill', 'lightblue');
    //   canvas.renderAll();
    // });
    // canvas.on('mouse:out', function(e) {
    //   e.target.set('fill', tempColor);
    //   canvas.renderAll();
    // });

    // 全选
    document.getElementById("selectAll").onclick = () => {
      canvas.discardActiveObject();
      var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas
      });
      canvas.setActiveObject(sel);
      canvas.requestRenderAll();
    };
    // 取消全选
    document.getElementById("discardSelectAll").onclick = () => {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    };

    // 清除画板
    document.getElementById("clearCanvas").onclick = () => {
      canvas.clear();
    };

    // 画笔
    document.getElementById("freeDraw").onclick = () => {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      if (canvas.isDrawingMode) {
        document.getElementById("freeDraw").innerHTML = "取消画笔模式";
        this.isDraw = false;
      } else {
        document.getElementById("freeDraw").innerHTML = "画笔模式";
        this.isDraw = true;
      }
    };

    // 线宽
    document.getElementById("lineWidthRange").onchange = e => {
      canvas.freeDrawingBrush.width =
        parseInt(document.getElementById("lineWidthRange").value, 10) || 1;
      this.lineWidth = document.getElementById("lineWidthRange").value;
      console.log(e)
    };
    // 线色
    document.getElementById("lineColor").onchange = e => {
      canvas.freeDrawingBrush.color = document.getElementById(
        "lineColor"
      ).value;
      console.log(e)
    };

    // 删除选中区域
    var deleteSelectedObject = document.getElementById("deleteSelect");
    deleteSelectedObject.onclick = function() {
      // // 优化逻辑
      // if (canvas.getActiveObjects()) {
      //   console.log(canvas.getActiveObjects())
      //   canvas.getActiveObjects().forEachObject(function(o) {
      //     canvas.remove(o);
      //   });
      //   canvas.discardActiveObject().renderAll();
      // }else if(canvas.getActiveObject()){
      //   canvas.remove(canvas.getActiveObject());
      // }

      // 可以运行的逻辑
      if (canvas.getActiveObject()) {
        var flag = canvas.getActiveObject()._objects;
        if (flag) {
          canvas.getActiveObject().forEachObject(function(o) {
            canvas.remove(o);
          });
        } else {
          canvas.remove(canvas.getActiveObject());
        }
        canvas.discardActiveObject().renderAll();
      } else {
        canvas.remove(canvas.getActiveObjects());
      }
    };

    // 画板信息序列转化为JSON对象
    document.getElementById("toJSON").onclick = () => {
      let JSONOBJECT = canvas.toJSON();
      console.log(JSONOBJECT);
    };

    // 选择图形，填入画板
    document.getElementById("selectShape").onchange = e => {
      console.log(e)
      let currentColor = document.getElementById("lineColor").value;
      let currentLineWidth = document.getElementById("lineWidthRange").value;
      this.color = currentColor;
      this.lineWidthCurrent = parseInt(currentLineWidth);
      // var canWid = canvas.height,
      //   canHei = canvas.width;
      // var randomLeft = 0;
      // var randomTop = 0;
      // randomLeft = Math.floor(Math.random() * (canWid + 1));
      // randomTop = Math.floor(Math.random() * (canHei + 1));
      // console.log(randomLeft, randomTop);
      var shape = document.getElementById("selectShape").value;
      switch (shape) {
        case "rect":
          this.rectCount++;
          var rectObj = `rect${this.rectCount}`;
          // if(canWid-randomLeft<100 ){
          //   randomLeft =randomLeft - 100
          // }else if(randomLeft<100){
          //   randomLeft = randomLeft + 100
          // }
          // if(canHei-randomTop<100 ){
          //   randomTop =randomTop - 100
          // }else if(randomTop<100){
          //   randomTop = randomTop + 100
          // }
          rectObj = new fabric.Rect({
            left: this.rectCount * 100, //距离画布左侧的距离，单位是像素
            top: this.rectCount * 100, //距离画布上边的距离
            fill: "", //填充的颜色
            stroke: this.color,
            strokeWidth: this.lineWidthCurrent,
            width: 100, //方形的宽度
            height: 100 //方形的高度,
          });
          canvas.add(rectObj);
          canvas.setActiveObject(rectObj);
          break;
        case "circle":
          this.circleCount++;
          var circleObj = `rect${this.circleCount}`;
          circleObj = new fabric.Circle({
            radius: 50,
            fill: "",
            stroke: this.color,
            strokeWidth: this.lineWidthCurrent,
            originX: 0,
            originY: 0
          });
          canvas.add(circleObj);
          canvas.setActiveObject(circleObj);
          break;
        case "ellipse":
          this.ellipseCount++;
          var ellipseObj = `ellipse${this.ellipseCount}`;
          ellipseObj = new fabric.Ellipse({
            rx: 80,
            ry: 45,
            fill: "",
            stroke: this.color,
            strokeWidth: this.lineWidthCurrent,
            angle: 0,
            left: 100,
            top: 100
          });
          canvas.add(ellipseObj);
          break;
        case "straight":
          this.lineCount++;
          var lineObj = `line${this.lineCount}`;
          lineObj = new fabric.Line([10, 10, 100, 100], {
            left: this.rectCount * 100 + 200, //距离画布左侧的距离，单位是像素
            top: this.rectCount * 100 + 200, //距离画布上边的距离
            fill: "",
            stroke: this.color, //笔触颜色
            strokeWidth: this.lineWidthCurrent
          });
          canvas.add(lineObj);
          canvas.setActiveObject(lineObj);
          break;
        case "triangle":
          this.triangleCount++;
          var triangleObj = `triangle${this.triangleCount}`;
          triangleObj = new fabric.Triangle({
            width: 80,
            height: 80,
            fill: "",
            stroke: this.color,
            strokeWidth: this.lineWidthCurrent,
            left: 50,
            top: 50
          });
          canvas.add(triangleObj);
          canvas.setActiveObject(triangleObj);
          break;
        default:
          console.log("请选择图案");
          break;
      }
      document.getElementById("selectShape").value = null;
    };
  },
  methods: {}
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
  width: 100px;
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
  height: 600px;
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
