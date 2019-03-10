//csv 형식의 데이터 구성
d3.csv("dataCsvFile.csv")
    .row(function(d) {
        return {
            item1 : d["상품1"] / 3,
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


//json 형식의 데이터 구성
d3.json("dataJsonFile.json", function(error, data){
        var dataSet = [ ];

        for(var i= 0; i < data.length; i++) {
            dataSet.push(data[i].sales[0]);
            //console.log("데이터 셋 : ", dataSet[i]);
        }

        d3.select("#myGraphJson")
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


//html 형식의 데이터 구성
d3.html("dataHtmlFile.html", function(error, docFragment){

    var tr = docFragment.querySelectorAll("table tr");
    var dataSet = [ ];

    for(var i = 1; i < tr.length; i++) {
        var data = tr[i].querySelectorAll("td")[0].firstChild.nodeValue;
        dataSet.push(data)
    }

    d3.select("#myGraphHtml")
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


//xml 형식의 데이터 구성
d3.xml("dataXmlFile.xml", function (error, xmlRoot) {
    var xmlData = xmlRoot.querySelectorAll("data")                      //data 요소 추출
    var salesRoot = xmlData[0];                                         //상품1 데이터 추출
    var salesData = salesRoot.querySelectorAll("sales");       // sales 요소 추출
    var dataSet = [ ];

    for(i = 0; i < salesData.length; i++){
        var data = salesData[i].firstChild.nodeValue;
        dataSet.push(data);
    }

    d3.select("#myGraphXml")
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


//txt 형식의 데이터 셋
d3.text("dataTextFile.txt", function(error, plainText){
    var data = plainText.split("\x0a");                 // \x0a  는 줄바꿈 코드
    var dataSet = [ ];
    var sales = data[0].split("/");            // 구분자 / 으로 데이터 구분
    for(var i = 1; i < sales.length; i++) {
        dataSet.push(sales[i]);
    }

    d3.select("#myGraphTxt")
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


d3.text("dataTextFile2.txt", function(error, plainText){
    var dataSet = d3.dsv("_", "text/plain").parse(plainText);       // 특정 문자로 구분한 파일일 경우 dsv() 메서드를 이용할 수 있다.
                                                                          // 구분문자와 MimeType 지정 이후 parse() 메서드로 해석 처리를 수행

    d3.select("#myGraphTxt2")
        .selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", function(d, i){
            return d["상품1"];
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function(d, i){
            return i * 25;
        })
})




