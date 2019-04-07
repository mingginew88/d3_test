// 기본 셋팅
var pokemons = null,    // 전체 포켓몬
    pokeNum,            // 포켓몬 번호
    pokemon,            // 포켓몬
    abilityValue,       // 능력 수치
    ability,            // 능력 종류
    minVal,             // 최소 수치
    maxVal,             // 최대 수치
    width = 400,        // 그래프 사이즈
    height = 400,       // 그래프 사이즈
    vizPadding = {      // 패딩 간격
        top: 60,
        right: 0,
        bottom: 0,
        left: 60
    },
    radius,             // 각도
    radiusLength,
    ruleColor = "#CCC"; // 간격 색상

d3.json("pokemonData.json", function(error, data){
    var dataSet = [ ];


    pokemons = data.result;

    $.each(pokemons, function (key, val) {
        var option = $("<option value='" + val.no +"'>"+val.name+"</option>");
        $('#characterName').append(option);
    });


    $('#characterName').on('change', function() {

        d3.select("svg").remove();

        pokeNum = Number($(event.currentTarget).val());
        pokemon = pokemons[pokeNum-1];

        //loadData([pokemon.hp, pokemon.speed, pokemon.defence, pokemon.specialAttack, pokemon.specialDefence, pokemon.attackDamage]);
        loadData(pokemon);
        buildBase();
        setScales();
        addAxes();
        draw();
    })


    var loadData = function(pokedata){

        abilityValue = [[],[]];

        if (pokedata !== undefined) {
            ability = ["hp","speed","defence","specialAttack","specialDefence","attackDamage"];

            maxVal = 100;           // 최대 능력 수치 값
            minVal = 0;             // 최소 능력 수치 값

            abilityValue[0].push(pokedata.hp);
            abilityValue[0].push(pokedata.speed);
            abilityValue[0].push(pokedata.defence);
            abilityValue[0].push(pokedata.specialAttack);
            abilityValue[0].push(pokedata.specialDefence);
            abilityValue[0].push(pokedata.attackDamage);
            abilityValue[0].push(pokedata.hp);
        }
    };

    var buildBase = function(){
        var viz = d3.select("#viz")
            .append('svg:svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'vizSvg');

        viz.append("svg:rect")
            .attr('id', 'axis-separator')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', 0)
            .attr('width', 0)
            .attr('height', 0);

        vizBody = viz.append("svg:g")
            .attr('id', 'body');
    };

    setScales = function () {
        var heightCircleConstraint,         // 그래프 고정높이
            widthCircleConstraint,          // 그래프 고정넓이
            circleConstraint,               // 원 고정 크기
            centerXPos,                     // 원중심 X값
            centerYPos;                     // 원중심 Y값

        heightCircleConstraint = height - vizPadding.top  - vizPadding.bottom;      // 그래프 고정높이
        widthCircleConstraint  = width  - vizPadding.left - vizPadding.right;       // 그래프 고정넓이
        circleConstraint = d3.min([heightCircleConstraint, widthCircleConstraint]);

        radius = d3.scale
            .linear()
            .domain([minVal, maxVal])
            .range([0, (circleConstraint / 2)]);

        radiusLength = radius(maxVal);

        centerXPos = widthCircleConstraint  / 2 + vizPadding.left;                  // 원중심 X값
        centerYPos = heightCircleConstraint / 2 + vizPadding.top;                   // 원중심 Y값

        vizBody.attr("transform", "translate(" + centerXPos + ", " + centerYPos + ")");
    };

    addAxes = function () {
        var radialTicks = radius.ticks(5),          // 간격 갯수
            circleAxes,
            lineAxes;

        vizBody.selectAll('.circle-ticks').remove();
        vizBody.selectAll('.line-ticks').remove();

        circleAxes = vizBody.selectAll('.circle-ticks')
            .data(radialTicks)
            .enter()
            .append('svg:g')
            .attr("class", "circle-ticks");

        circleAxes.append("svg:circle")
            .attr("r", function (d, i) {
                return radius(d);
            })
            .attr("class", "circle")
            .style("stroke", ruleColor)
            .style("fill", "none");

        circleAxes.append("svg:text")           // 간격 수치 값 텍스트 표현
            .attr("font-size", "10")
            .attr("text-anchor", "middle")
            .attr("dy", function (d) {
                return -1 * radius(d);
            })
            .text(String);

        lineAxes = vizBody.selectAll('.line-ticks')     // ability 라인 위치지정
            .data(ability)
            .enter()
            .append('svg:g')
            .attr("transform", function (d, i) {
                return "rotate(" + ((i / ability.length * 360) - 90) + ")translate(" + radius(maxVal) + ")";
            })
            .attr("class", "line-ticks");

        lineAxes.append('svg:line')
            .attr("x2", -1 * radius(maxVal))
            .style("stroke", ruleColor)
            .style("fill", "none");

        lineAxes.append('svg:text')
            .text(String)
            .attr("text-anchor", "middle")
            .attr("transform", function (d, i) {
                return (i / ability.length * 360) < 180 ? null : "rotate(180)";
            });
    };

    var draw = function () {
        var groups,
            lines;

        groups = vizBody.selectAll('.series')
            .data(abilityValue);
        groups.enter()
            .append("svg:g")
            .attr('class', 'series')
            .style('fill', function (d, i) {
                //if(i === 0)
                return "#aee4ff";                 // 그래프 값 색상 지정
            })
            .style('stroke', function (d, i) {
                //if(i === 0)
                return "#aee4ff";                 // 그래프 값 색상 지정
            });
        groups.exit().remove();

        lines = groups.append('svg:path')
            .attr("class", "line")
            .attr("d", d3.svg.line.radial()
                .radius(function (d) {
                    return 0;
                })
                .angle(function (d, i) {
                    if (i === 6) {
                        i = 0;
                    } //close the line
                    return (i / 6) * 2 * Math.PI;
                }))
            .style("stroke-width", 3)               // 선 굵기
            .style("fill", "none");                 // 선 채우기 색상지정

        groups.selectAll(".curr-point")
            .data(function (d) {
                return [d[0]];
            })
            .enter()
            .append("svg:circle")
            .attr("class", "curr-point")
            .attr("r", 0);

        groups.selectAll(".clicked-point")
            .data(function (d) {
                return [d[0]];
            })
            .enter()
            .append("svg:circle")
            .attr('r', 0)
            .attr("class", "clicked-point");

        lines.attr("d", d3.svg.line.radial()
            .radius(function (d) {
                return radius(d);
            })
            .angle(function (d, i) {
                if (i === 6) {
                    i = 0;
                } //close the line
                return (i / 6) * 2 * Math.PI;
            }));
    };

})

