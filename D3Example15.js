/** 기본 세팅 */

var svgWidth = 320;         // 요소 넓이
var svgHeight = 240;        // 요소 높이
var dataSet = [10,20,30,40];          // 데이터 셋
var margin = svgWidth/(dataSet.length - 1);     // 간격

console.log("ㅅㅓ나영 바보탱이");


var line = d3.svg.line()
    .x(function(d, i){
        return i * margin;      // x좌표 표시
    })
    .y(function(d, i){
        return svgHeight - d;   // y좌표 표시
    })


var lineElements = d3.select("#lineGraph")
    .append("path")                 // 데이터 수 만큼 path 요소 추가
    .attr("class", "line")          // class 설정
    .attr("d", line(dataSet))       // 연속성 지정





