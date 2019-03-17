// 기본 셋팅
var svgWidth = 320;
var svgHeight = 240;
var dataSet = [ ];
var colorSet = d3.scale.category10();

// 초기 데이터 표현
drawPieGraph("product2017.csv");

d3.select("#product").on("change", function(){
    console.log("hello", this.value);
    // svg 안의 모든 요소 삭제
    d3.select("#pieGraphData").selectAll("*").remove();
    // 지정된 연도의 데이터를 불러와 원 그래프 표시

    drawPieGraph("product"+this.value+".csv", this.value);
});

function drawPieGraph(fileName) {
    dataSet = [ ];
    // 데이터 셋
    d3.csv(fileName, function(error, data) {
        for(var i in data[0]) {             // 최초 데이터 처리
            dataSet.push(data[0][i]);       // 가로 데이터 한줄 입력
            console.log("dd", dataSet);
        }

        dataSet.sort(function(a, b) {
            return b - a;
        })

        // SVG 요소의 넓이와 높이 구함
        //var svgEle = document.getElementById("#pieGraphData");
        //var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
        //var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");

        // 단위 처리
        //svgWidth = parseFloat(svgWidth);
        //svgHeight = parseFloat(svgHeight);

        // 원그래프 좌표값 계산 메서드
        var pie = d3.layout.pie();

        // 원 안쪽반지름, 바깥쪽반지름 설정
        var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

        // 원그래프 그리기
        var pieElements = d3.select("#pieGraphData")
            .selectAll("g")         // g 요소 지정
            .data(pie(dataSet))     // 요소에 데이터 연결
            .enter()
            .append("g")            // 무게중심 계산을 위한 그룹화
            // 원 그래프 중심으로 함
            .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")

        // 데이터 추가
        pieElements
            .append("path")
            .attr("class", "pie")
            .style("fill", function(d, i) {
                return colorSet(i);
            })
            .transition()
            .duration(200)
            .delay(function(d, i) {     // 원 그래프 시간을 어긋나게 표시
                return i * 200;
            })
            .ease("linear")             // 직선적인 움직으로 변경
            .attrTween("d", function(d, i) {
                var interpolate = d3.interpolate(
                    // 각 부분의 시작 각도
                    { startAngle : d.startAngle, endAngle : d.startAngle },
                    // 각 부분의 종료 각도
                    { startAngle : d.startAngle, endAngle : d.endAngle }
                );
                return function(t) {
                    return arc(interpolate(t));     // 시간에 따라 처리
                }
            })

        var textElements = d3.select("#pieGraphData")
            .append("text")
            .attr("class", "total")
            .attr("transform", "translate("+svgWidth/2+", "+(svgHeight/2+5)+")")
            .text("수치")

        pieElements
            .append("text")
            .attr("class", "pieText")
            .attr("transform", function(d, i) {
                return "translate(" + arc.centroid(d)+")";
            })
            .text(function(d, i) {
                return d.value;
            })
    })
}