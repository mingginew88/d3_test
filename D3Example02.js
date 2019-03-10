// CSV 파일을 불러와 그래프 그리기
d3.csv("dataCsvFile2.csv", function(error, data){
	var dataName = [ ];					// 데이터 이름 배열 준비
	var dataSet = [ ];					// 데이터를 저장할 배열을 준비

	console.log("data", data);

	for(var i=0; i<data.length; i++){	// 데이터의 줄 수만큼 반복
		dataName.push(data[i].itemName);	// itemName 레이블 데이터 추출
		dataSet.push(data[i].item1);	// item1 레이블의 데이터만 추출
	}

	//console.log("dataLength", dataSet.length);

	//텍스트요소 데이터를 그리기
	d3.select("#myGraph")
		.selectAll("text")
		.data(dataName)
		.enter()						// 데이터  개수에 따라 text 요소 생성
		.append("text")
		.attr("x", 20)
		.attr("y", function(d,i){		// Y 좌표를 배열의 순서에 따라 계산
			return 15 + i * 25;			// 막대그래프의 Y 좌표를 시작값 15에서 25px 단위로 계산
		})
		.attr("height", "20px")			// 막대그래프의 높이를 20px로 지정
		.text(function(d, i){			// 막대그래프에 데이터 명을 텍스트로 넣어줌
			return d;					// 데이터의 값을 그대로 넓이로 함
		})

	// 데이터를 기준으로 그리기
	d3.select("#myGraph")				// SVG 요소 지정
		.selectAll("rect")				// SVG로 사각형을 표시할 요소를 지정
		.data(dataSet)					// 데이터 설정
		.enter()						// 데이터의 개수에 따라 rect 요소를 생성
		.append("rect")					// SVG 사각형 생성
		.attr("x", 50)					// 가로형 막대그래프이므로 X 좌표를 0으로 함
		.attr("y", function(d,i){		// Y 좌표를 배열의 순서에 따라 계산
			return i * 25;				// 막대그래프의 Y 좌표를 25px 단위로 계산
		})
		.attr("height", "20px")			// 막대그래프의 높이를 20px로 지정
		.attr("width", function(d, i){	// 막대그래프의 넓이를 배열의 내용에 따라 계산
			return d +"px";				// 데이터의 값을 그대로 넓이로 함
		})

	var xScale = d3.scale.linear()		// 눈금 표시 ( 선형 스케일 설정 - 일정 간격의 직선 눈금 )
		.domain([0, 300])				// 데이터 범위 ([ 시작값, 종료값 ])  - 원래 데이터 범위
		.range([0, 300])				// 표시할 범위 ([ 시작값, 종료값 ])  - 실제 출력 크기

	//나중에 그린 도형이 가장 앞에 표시
	d3.select("#myGraph")
		.append("g")					// 눈금의 선, 숫자와 그래프를 하나의 세트로 처리 해주는 SVG의 g요소
		.attr("class", "axis")			// .axis 추가
		.attr("transform", "translate(50, "+((1+dataSet.length) * 20 + 20)+ ")")		//transform 이동할 거리 지정
		.call(d3.svg.axis()				// call()로 눈금을 표시할 함수를 호출
			.scale(xScale)				// 스케일을 적용
			.orient("bottom")			// 눈금의 표시 위치를 아래쪽으로 지정
		)
});
