d3.json("d3Data02.json", function(error, data){
        var dataSet = [ ];

        for(var i= 0; i < data.length; i++) {
            dataSet.push(data[i].sales[0]);
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



d3.html("d3Data03.html", function(error, docFragment){

    var tr = docFragment.querySelectorAll("table tr");
    var dataSet = [ ];

    for(var i = 1; i < tr.length; i++) {
        var data = tr[i].querySelectorAll("td")[0].firstChild.nodeValue;
        dataSet.push(data)
    }

    d3.select("#myGraph2")
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
