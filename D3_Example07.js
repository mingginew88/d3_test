d3.csv("d3Data01.csv")
    .row(function(d) {
        return {
            item1 : d["상품1"] / 3,
        }
    })
    .get (function(error, data){
        var dataSet = [ ];

        for(var i= 0; i < data.length; i++) {
            dataSet.push(data[i].item1);
            console.log("데이터 셋 : ", dataSet[i]);
        }

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

    })
