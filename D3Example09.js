//버튼 클릭시 데이터 변화
d3.selectAll("button").on("click", function(){
    // data-src 속성 읽어오기 (csv 파일 이름)
    var csvFile = this.getAttribute("data-src");

    // csv파일 불러와 그래프 표시
    d3.csv(csvFile, function(error, data){
        var dataSet = [ ];
        for(var i = 0; i < data.length; i++) {
            dataSet.push(data[i]["상품1"]);           // 상품1 레이블 데이터 추출
            console.log("데이터 셋 : ", dataSet[i]);
        }

        // 그래프 그리기
        barElements = d3.select("#myGraphCsv")
            .selectAll("rect")
            .data(dataSet)

        // 데이터 추가 되는 경우
        barElements.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("width", function(d, i){
                return d;
            })
            .attr("height", 20)
            .attr("x", 0)
            .attr("y", function(d, i){
                return i * 25;
            })

        // 데이터 갱신 되는 경우
        barElements.attr("width", function(d, i){
            return d;
        })

        // 데이터 삭제 되는 경우
        barElements.exit()      // 삭제 대상 요소 추출
            .remove()           // 요소 삭제


    })

})


/*
d3.csv("dataCsvFile.csv")
    .row(function(d) {
        return {
            item1 : d["상품1"],
        }
    })
    .get (function(error, data){
        var dataSet = [ ];

        for(var i= 0; i < data.length; i++) {
            dataSet.push(data[i].item1);
            //console.log("데이터 셋 : ", dataSet[i]);
        }

        d3.select("#myGraphCsv")
            .selectAll("rect")
            .data(dataSet)
            .enter()
            .append("rect")
            .call(function(elements){                   // 사용자 정의 함수를 호출하여 사용 가능
                elements.each(function(d, i) {          // 요소 수 만큼 반복
                    console.log(i + " = " + d);         // 데이터와 요소 순서 표시
                })
            })
    })

*/

