var dataSet = [300, 130, 5, 60, 240];
/*
d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 25)
    .attr("width", dataSet[0])
    .attr("height", "20px")

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 50)
    .attr("width", dataSet[1])
    .attr("height", "20px")

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 75)
    .attr("width", dataSet[2])
    .attr("height", "20px")

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 100)
    .attr("width", dataSet[3])
    .attr("height", "20px")

d3.select("#myGraph")
    .append("rect")
    .attr("x", 0)
    .attr("y", 125)
    .attr("width", dataSet[4])
    .attr("height", "20px")
*/
//이러한 데이터셋에 따라 자동으로 요소를 추가하고 처리해주는 기능
//selectAll(), data(), enter() 메서드 등이 있다.
// ==> 공통된 속성을 한꺼번에 지정함과 동시에 데이터 수에 따라 여러개의 rect 요소를 유연하게 생성


d3.select("#myGraph")
    .selectAll("rect")
    .data(dataSet)
    .enter()                            //데이터 수에 따라 rect 요소 생성
    .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
        return i*25;
    })
    .attr("height", "20px")
    .attr("width", "0px")
    .transition()
    .delay(function(d, i) {
       return i * 500;                 //0.5초마다 그리도록 대기시간을 설정
    })
    .duration(2500)                     //duration 2.5초에 걸쳐 애니메이션화 함
    .attr("width", function(d, i) {
        return d + "px";
    })
    
    /*
    // 클릭한 요소에 색 채우기
    .on('click', function(){
        d3.select(this)
            .style("fill", "cyan")          
    })
    */

//svg의 rect 요소 스타일시트 속성
//fill (도형 채울색) , stroke (도형의 선색), sroke-width (도형의 선넓이)  

//버튼 클릭 이벤트
d3.select('#updateButton')
    .on('click', function(){
        
        for (let index = 0; index < dataSet.length; index++) {
            dataSet[index] = Math.floor(Math.random() * 320);
        }
        //dataSet = [20, 230, 150, 10, 20];   //새로운 데이터로 변경

        d3.select("#myGraph")                   //SVG 요소 지정       
            .selectAll("rect")                  //SVG로 사각형을 표시할 요소를 지정
            .data(dataSet)
            .transition()                       //변환표시
            .attr("width", function(d, i){      //넓이를 배열의 내용에 따라 계산
                return d + "px";
            })
    })





