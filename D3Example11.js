
// 범용성을 위한 기본 변수 입력
var svgWidth = 320;     // SVG 요소 넓이
var svgHeight = 240;    // SVG 요소 높이
var offsetX = 30;       // X좌표 오프셋 (어긋난 정도)
var offsetY = 20;       // Y좌표 오프셋 (어긋난 정도)
var barElements;        // 막대그래프 막대요소 저장 변수
var dataSet = [ ];      // 데이터 배열
var dataMax = 300;      // 데이터 최대값
var barWidth = 20;      // 막대 넓이
var barMargin = 5;      // 막대 간격


// 데이터 호출
d3.csv("dataCsvFile.csv", function(error, data) {

    for (var i = 0; i < data.length; i++) {
        dataSet.push(data[i]["상품1"]);
        console.log("데이터 셋 : ", dataSet[i]);
    }


    // 그래프 그리기
    barElements = d3.select("#myGraphCsv")
        .selectAll("rect")
        .data(dataSet)

    barElements.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("height", function(d, i){
            return d;
        })
        .attr("width", barWidth)
        .attr("x", function(d, i){
            return i * (barWidth + barMargin)+ offsetX;         // x좌표 계산
        })
        .attr("y", function(d, i){
            return svgHeight - d - offsetY;                     // y좌표 계산
        })

    //데이터 값 표시
    barElements.enter()
        .append("text")
        .attr("class", "barText")
        .attr("x", function(d, i){
            return i * (barWidth + barMargin) + 10 + offsetX;
        })
        .attr("y", svgHeight - 5 - offsetY)                     // y좌표 지정
        .text(function(d, i){
            return d;                                           // 데이터 값 표시
        })

    //눈금 표시
    var yScale = d3.scale.linear()                              // 스케일 표시
        .domain([0, dataMax])                                   // 원래 크기
        .range([dataMax, 0])                                    // 실제 출력 크기

    // 세로방향 눈금 표시
    d3.select("#myGraphCsv")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 300) - offsetY) + ")")
        .call(
            d3.svg.axis()
                .scale(yScale)              // yScale 스케일 적용
                .orient("left")             // 눈금의 표시 위치를 좌측으로 지정
        )

    // 세로방향의 선 표시
    d3.select("#myGraphCsv")
        .append("rect")
        .attr("class", "axis_x")
        .attr("width", svgWidth)
        .attr("height", 1)
        .attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")

    // 막대의 레이블 표시
    barElements.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function(d, i){
            return i * (barWidth + barMargin) + 10 + offsetX;           //막대그래프 표시 간격 맞춤
        })
        .attr("y", svgHeight - offsetY + 15)
        .text(function(d, i){
            return ["A", "B", "C", "D", "E", "F", "G", "H"][i];
        })

})



