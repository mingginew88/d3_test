//데이터 셋 하기

d3.csv("d3Data01.csv", function(error, data){
    var dataSet  = [ ];
    var dataSet2 = [ ];
    var dataSet3 = [ ];

    for (var i = 0; i < data.length; i++) {
        dataSet.push(data[i]["상품1"]);
        dataSet2.push(data[i]["상품2"]);
        dataSet3.push(data[i]["상품3"]);
        console.log("데이터 셋 : ",dataSet[i]);
    }

    //그래프 그리기
    d3.select("#myGraph")
        .selectAll("rect")
        .data(dataSet)
        .enter()
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


    d3.select("#myGraph2")
        .selectAll("rect")
        .data(dataSet2)
        .enter()
        .append("rect")
        .attr("class", "bar2")
        .attr("width", function(d, i){
            return d;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function(d, i){
            return i * 25;
        })


    d3.select("#myGraph3")
        .selectAll("rect")
        .data(dataSet3)
        .enter()
        .append("rect")
        .attr("class", "bar3")
        .attr("width", function(d, i){
            return d;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function(d, i){
            return i * 25;
        })

})



