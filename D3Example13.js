var svgWidth = 320;
var svgHeight = 240;
var dataSet = [ ];
var dataArraySet = [ ];

var color10 = d3.scale.category10();  // d3에서 제공해주는 표준 10색 지정
var color20 = d3.scale.category20();  // d3에서 제공해주는 표준 20색 지정
var color20b = d3.scale.category20b();  // d3에서 제공해주는 표준 20b색 지정

var customColor;

// 기본색상 10
d3.csv("dataCsvFile.csv", function(error, data){

    for(var i in data[0]){
        dataSet.push(data[0][i]);
    }

    var pie = d3.layout.pie();     //원형 그래프 레이아웃

    // 원 그래프의 안쪽 반지름, 바깥쪽 반지름 설정
    var arc = d3.svg.arc().innerRadius(0).outerRadius(100);

    //원형 그래프 그리기
    var pieElements = d3.select("#pieGraphColor10")
        .selectAll("path")              // path 요소 지정
        .data(pie(dataSet))

    pieElements.enter()                 // 데이터 수 만큼 반복
        .append("path")
        .attr("class", "pie")
        .attr("d", arc)                 // 부채꼴 지정
        .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
        .style("fill", function(d, i){
            return color10(i);            //d3에서 제공해주는 표준10색 사용
        })
})

// 기본색상 20
d3.csv("dataCsvFile.csv", function(error, data){
    dataSet = [ ];

    for(var i in data[0]){
        dataSet.push(data[0][i]);
    }

    var pie = d3.layout.pie();     //원형 그래프 레이아웃

    // 원 그래프의 안쪽 반지름, 바깥쪽 반지름 설정
    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    //원형 그래프 그리기
    var pieElements = d3.select("#pieGraphColor20")
        .selectAll("path")              // path 요소 지정
        .data(pie(dataSet))

    pieElements.enter()                 // 데이터 수 만큼 반복
        .append("path")
        .attr("class", "pie")
        .attr("d", arc)                 // 부채꼴 지정
        .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
        .style("fill", function(d, i){
            return color20(i);            //d3에서 제공해주는 표준10색 사용
        })
})

// 기본색상 20b
d3.csv("dataCsvFile.csv", function(error, data){
    dataSet = [ ];

    for(var i in data[0]){
        dataSet.push(data[0][i]);
    }

    var pie = d3.layout.pie();     //원형 그래프 레이아웃

    // 원 그래프의 안쪽 반지름, 바깥쪽 반지름 설정
    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    //원형 그래프 그리기
    var pieElements = d3.select("#pieGraphColor20b")
        .selectAll("path")              // path 요소 지정
        .data(pie(dataSet))

    pieElements.enter()                 // 데이터 수 만큼 반복
        .append("path")
        .attr("class", "pie")
        .attr("d", arc)                 // 부채꼴 지정
        .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
        .style("fill", function(d, i){
            return color20b(i);            //d3에서 제공해주는 표준10색 사용
        })
})

//색상 커스터마이징


// 애니메이션효과
d3.csv("dataCsvFile.csv", function(error, data){
    dataSet = [ ];

    for(var i in data[0]){
        dataSet.push(data[0][i]);
    }

    // 데이터 정렬
    dataSet.sort(function(a, b) {
        return b - a;
    })

    var pie = d3.layout.pie();     //원형 그래프 레이아웃

    // 원 그래프의 안쪽 반지름, 바깥쪽 반지름 설정
    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    //원형 그래프 그리기
    var pieElements = d3.select("#pieGraphAni")
        .selectAll("path")              // path 요소 지정
        .data(pie(dataSet))

    pieElements.enter()                 // 데이터 수 만큼 반복
        .append("path")
        .attr("class", "pie")
        .attr("d", arc)                 // 부채꼴 지정
        .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")
        .style("fill", function(d, i){
            return color20b(i);            //d3에서 제공해주는 표준10색 사용
        })
        .transition()
        .duration(1000)
        .delay(function(d, i){
           return i * 1000;                     // 그릴 원 그래프의 시간을 어긋나게 표시
        })
        //.ease("linear")                         // 직선적인 움직임으로 변경
        //.ease("quad")
        //.ease("back")
        //.ease("sin-out")
        //.ease("out-in")
        .ease("cubic")
        .attrTween("d", function(d, i) {        // 보간 처리
            var interpolate = d3.interpolate(
                // 각 부분의 시작 각도
                { startAngle : d.startAngle, endAngle : d.startAngle },
                { startAngle : d.startAngle, endAngle : d.endAngle }
            );
            return function(t) {
                return arc(interpolate(t));     // 시간에 따라 처리
            }
        })

    // 합계의 수와 문자 표시
    var textElements = d3.select("#pieGraphAni")
        .append("text")
        .attr("class", "total")
        // 가운데에 표시
        .attr("transform", "translate("+svgWidth/2+", "+(svgHeight/2+5)+")")
        .text("합계 : " + d3.sum(dataSet))        // 합계 표시
})


// Text 기능 추가
d3.csv("dataCsvFile.csv", function(error, data){
    dataSet = [ ];

    for(var i in data[0]){
        dataSet.push(data[0][i]);
    }

    // 데이터 정렬
    dataSet.sort(function(a, b) {
        return b - a;
    })

    var pie = d3.layout.pie();     //원형 그래프 레이아웃

    // 원 그래프의 안쪽 반지름, 바깥쪽 반지름 설정
    var arc = d3.svg.arc().innerRadius(30).outerRadius(100);

    //원형 그래프 그리기
    var pieElements = d3.select("#pieGraphText")
        .selectAll("g")              // g 요소 지정
        .data(pie(dataSet))
        .enter()
        .append("g")
        .attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")

    pieElements                // 데이터 수 만큼 반복
        .append("path")
        .attr("class", "pie")
        .style("fill", function(d, i){
            return color10(i);            //d3에서 제공해주는 표준10색 사용
        })
        .transition()
        .duration(1000)
        .delay(function(d, i){
            return i * 1000;                     // 그릴 원 그래프의 시간을 어긋나게 표시
        })
        //.ease("linear")                         // 직선적인 움직임으로 변경
        //.ease("quad")
        //.ease("back")
        //.ease("sin-out")
        //.ease("out-in")
        .ease("cubic")
        .attrTween("d", function(d, i) {        // 보간 처리
            var interpolate = d3.interpolate(
                // 각 부분의 시작 각도
                { startAngle : d.startAngle, endAngle : d.startAngle },
                { startAngle : d.startAngle, endAngle : d.endAngle }
            );
            return function(t) {
                return arc(interpolate(t));     // 시간에 따라 처리
            }
        })

    // 합계의 수와 문자 표시
    var textElements = d3.select("#pieGraphText")
        .append("text")
        .attr("class", "total")
        // 가운데에 표시
        .attr("transform", "translate("+svgWidth/2+", "+(svgHeight/2+5)+")")
        .text("합계 : " + d3.sum(dataSet))        // 합계 표시

    pieElements
        .append("text")
        .attr("class", "pieText")
        .attr("transform", function(d, i){
            // 부채꼴 중심으로 텍스트 입력
            return "translate("+arc.centroid(d)+")";
        })
        .text(function(d, i) {
            return d.value;         // 값 표시
        })
})








