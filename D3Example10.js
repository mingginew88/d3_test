// 기본 셋팅

var svgHeight = 240;                // SVG 요소의 높이
var barElements;                    // 막대그래프의 막대 요소 저장할 변수
var dataSet = [ ];                  // 데이터 저장할 공간

var offsetX = 30;                   // X좌표 오프셋 (어긋난 정도)
var offsetY = 10;                   // y좌표 오프셋 (어긋낫 정도)



d3.csv("dataCsvFile.csv", function(error, data){

    for(var i = 0; i < data.length; i++){
        dataSet.push(data[i]["상품1"]);
        console.log("데이터 셋 : " , dataSet[i]);
    }

    barElements = d3.select("#myGraphCsv")
        .selectAll("rect")
        .data(dataSet)

    barElements.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("height", function(d, i){
            return d;                   // 데이터 높이 지정
        })
        .attr("width", 20)              // bar 넓이 지정
        .attr("x", function(d, i){
            return i * 25 + offsetX + 5;         // X좌표 간격
        })
        .attr("y", function(d, i){
            return svgHeight - d -offsetY;       // Y좌표 계산
        })

    barElements.enter()
        .append("text")
        .attr("class", "barText2")
        .attr("x", function(d, i){
            return i * 25 + 10 + offsetX + 5;             // 텍스트가 나올 x좌표 지정
        })
        .attr("y", function(d, i){
            return (svgHeight - d - offsetY - 5);         // 텍스트가 나올 높이 지정
        })
        .text(function(d, i){                   // 데이터 표시
            return d;
        })

    // 눈금 설정 - 스케일 설정
    var yScale = d3.scale.linear()
        .domain([0,300])
        .range([300,0])

    // 세로방향 선 눈금 표시
    d3.select("#myGraphCsv")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+offsetX+","+((svgHeight-300)-offsetY)+")")
        .call(
            d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(10)                                                          // 눈금 간격
                .tickValues([10.5, 20, 30.5, 50.25, 75.275, 100, 200])           // 보여줄 눈금 값 지정
                .tickFormat(d3.format(".2f"))                                       //  소수점 2번쨰 자리까지
        )

    //가로방향 선 표시
    d3.select("#myGraphCsv")
        .append("rect")
        .attr("class", "axis_x")
        .attr("width", 320)
        .attr("height", 1)
        .attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY)+")")

    // 가로방향 데이터 입력
    barElements.enter()
        .append("text")
        .attr("class", "barName")
        .attr("x", function(d, i){
            return i * 25 + 15 + offsetX;
        })
        .attr("y", svgHeight - offsetY + 15)
        .text(function(d, i){
            return ["A", "B", "C", "D", "E", "F", "G", "H"][i];     // 레이블 이름 변환
        })
})
