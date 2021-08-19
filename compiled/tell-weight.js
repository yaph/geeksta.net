"use strict";var labelMap={"yes":"Would tell","no":"Would not tell","open":"Not sure","female":"Female","male":"Male"};function drawPie(selector,data){var measure=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"Count";var series=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"Response";var pie=new dimple.chart(getSVG(selector,1),data);pie.addMeasureAxis("p",measure);var s=pie.addSeries(series,dimple.plot.pie);s.getTooltipText=function(e){var percent=d3.format("%")(e.piePct);return["".concat(labelMap[e.aggField[0]],": ").concat(e.pValue," (").concat(percent,")")]};pie.setBounds("8%","8%","84%","84%");data.forEach(function(d){return pie.assignClass(d[series],d[series])});pie.draw()}d3.csv("/data/tell-weight.csv",function(data){var females=data.filter(function(d){return d.Gender=="female"});var males=data.filter(function(d){return d.Gender=="male"});var byGender=d3.nest().key(function(d){return d.Gender}).rollup(function(v){return d3.sum(v,function(d){return d.Count})}).entries(data);drawPie("#pie-female",females);drawPie("#pie-male",males);drawPie("#pie-ratio",byGender,"values","key");d3.select(".count-females").text(byGender.filter(function(d){return d.key=="female"}).pop().values);d3.select(".count-males").text(byGender.filter(function(d){return d.key=="male"}).pop().values);d3.select(".count-total").text(d3.sum(data,function(d){return d.Count}))});