/*
 * @Author: xuhao 
 * @Date: 2019-12-30 15:01:14
 * @Last Modified time: 2022-01-19 17:42:35
 */

/*
* Desc: Performance Optimize For Live Class
* Function List: 
*    1.Arithmetic Progression Diluting Algorithm for Free Draw Path
*    2.Douglas Peucker Diluting Algorithm for Free Draw Path
*/

/*
 * 表现说明：目前来看，一般抽稀程度，等差数列抽稀算法所表现的抽稀后的轨迹更加清晰圆润，后期会继续优化。
 * 但极限抽取情况下，道格拉斯抽稀算法更胜一筹，总体轨迹不损。
*/

// 多维数组扁平化
const reduceDimension = (arr) => {
  return Array.prototype.concat.apply([], arr);
}

/*** 等差数列抽稀算法 Arithmetic-Progression-Diluting-Algorithm（creat by: xuhao）***/
// 数组等差分割函数【按（公差，即抽稀程度）进行）】
const splitArray = (tolerance, arr) => {
  let list = [],
    index;
  for (index = 0; index < arr.length;) {
    list.push(arr.slice(index, (index += tolerance)));
  }
  return list;
};

// 抽稀
const diluting = (arr) => {
  let vacuateArr = [];
  for (let i = 0; i < arr.length; i++) {
    let itemLen = arr[i].length;
    vacuateArr.push(arr[i][0]);
    // if(i!=0){
    //   vacuateArr.push(arr[i][Math.ceil((0+itemLen)/2)]);
    // }
    vacuateArr.push(arr[i][itemLen - 1]);
  }
  return vacuateArr;
};

/**
 *@param arr 原始轨迹Array
 *@param tolerance 抽稀程度系数，即 2/tolerance
 *@return rarefyingArr 抽稀后的轨迹
 */
// 等差数列抽稀 入口函数（后续会继续优化，取点算法）
const apDiluting = (arr, tolerance = 3) => {
  let arithmeticArr = splitArray(tolerance, arr);
  let rarefyingArr = diluting(arithmeticArr);
  return rarefyingArr;
}

/*** 道格拉斯-抽稀算法 Douglas-Peuker-Algorithm ***/
// 计算两点之间的距离
const calculationDistance = (point1, point2) => {
  /**
   * longitude，经度，即x轴上的值
   * latitude，纬度，即y轴上的值
   * 矢量计算中都是以弧度作为计量单位【计算机数学中均为矢量计算】
   * 弧度 = 角度 * Math.PI / 180
   */
  let lat1 = point1[point1.length - 1];
  let lat2 = point2[point2.length - 1];
  let lng1 = point1[1];
  let lng2 = point2[1];
  let radLat1 = (lat1 * Math.PI) / 180.0;
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.pow(Math.sin(b / 2), 2)
      )
    );
  return s * 6370996.81;
};

/*
*  计算点pX到点pA和pB所确定的直线的距离
*  点到直线的最短距离实际上就是点到线的垂直距离
*/
const distToSegment = (start, end, center) => {
  // 三角形的三个边长
  let a = Math.abs(calculationDistance(start, end));
  let b = Math.abs(calculationDistance(start, center));
  let c = Math.abs(calculationDistance(end, center));
  // 利用海伦公式计算三角形面积
  // 周长的一半
  let p = (a + b + c) / 2.0;
  //普通公式计算三角形面积反推点到线的垂直距离
  let s = Math.sqrt(Math.abs(p * (p - a) * (p - b) * (p - c)));
  return (s * 2.0) / a;
};

// 递归方式压缩轨迹
const compressLine = (coordinate, result, start, end, dMax) => {
  if (start < end) {
    let maxDist = 0;
    let currentIndex = 0;
    let startPoint = coordinate[start];
    let endPoint = coordinate[end];
    for (let i = start + 1; i < end; i++) {
      let currentDist = distToSegment(startPoint, endPoint, coordinate[i]);
      if (currentDist > maxDist) {
        maxDist = currentDist;
        currentIndex = i;
      }
    }
    if (maxDist >= dMax) {
      //将当前点加入到过滤数组中
      result.push(coordinate[currentIndex]);
      //将原来的线段以当前点为中心拆成两段，分别进行递归处理
      compressLine(coordinate, result, start, currentIndex, dMax);
      compressLine(coordinate, result, currentIndex, end, dMax);
    }
  }
  return result;
};

// 道格拉斯-抽稀 入口函数
/**
 *@param coordinate 原始轨迹Array
 *@param dMax 允许最大距离误差
 *@return douglasResult 抽稀后的轨迹
 */
const douglasPeucker = (coordinate, dMax = 10) => {
  if (!coordinate || !(coordinate.length > 2)) {
    return null;
  } else {
    coordinate.forEach((item, index) => {
      item['id'] = index;
    });
  }
  let result = compressLine(coordinate, [], 0, coordinate.length - 1, dMax);
  result.push(coordinate[0]);
  result.push(coordinate[coordinate.length - 1]);
  let resultLatLng = result.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) return 1;
    return 0;
  });
  resultLatLng.forEach(item => {
    item.id = undefined;
  });
  return resultLatLng;
};

export  default{
  apDiluting,
  douglasPeucker,
  reduceDimension
}