
/*
//스타일 부분 지정
d3.select(".bar")
    .style("fill", "red")
    .style("stroke", "black")
*/

/*
//클래스 명 변경
d3.select(".bar")
    .attr("class", "bar_note")
*/

/*
//스타일 일괄 지정
d3.select(".bar")                                   // 클래스 이름 bar를 지정
    .attr("style", "fill:cyan;stroke:gray")         // 스타일 일괄지정
*/

/*
//전체 요소 한꺼번에 스타일 지정
d3.selectAll(".bar")
    .attr("style", "fill:purple;stroke:gray")
*/

/**/
//여러 요소 중 특성 순서의 요소 스타일 지정
d3.selectAll(".bar")
    .style("fill", function(d, i){
        while(i) {
            var chgRed, chgBlue;
            chgRed = 255 - i * 20;
            chgBlue =  0 + i * 20;
            var chgColor = "rgb("+chgRed+","+chgBlue+","+"0)";
            i++;
            return chgColor;
        }
       /* if( i%2 == 0)
            return "rgb(255,0,0)";
       */

       //궁금한점... 여기서 i의 최대값을 구하고자 한다면 어떤걸 이용해야할까?
    })


