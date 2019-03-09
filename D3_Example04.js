
//객체 리터럴 형식으로 속성을 한번에 지정
/*
d3.select("#myBar2")
    .attr({
        x : "10px",
        y : "50px",
        width : "200px",
        height : "30px"
    })
    .transition()
    .duration(3000)
    .attr("width", "50px")
*/

d3.select("#myBarrrr")
    .attr("x", "10px")
    .attr("y", "50px")
    .attr("width", "200px")
    .attr("height", "30px")
    .transition()
    .duration(3000)
    .attr("width", "50px")
    .attr("fill", "red")
    .style("stroke", "black")
