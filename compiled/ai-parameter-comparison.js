"use strict";fetch("/ai/comparison.json").then(function(resp){return resp.json()}).then(function(data){var table=d3.select("#comparison");var by_cfg=d3.group(data,function(d){return d.cfg_scale});var by_sampler=d3.group(data,function(d){return d.sampler});var cfg_scales=Array.from(by_cfg.keys()).sort(function(a,b){return a-b});var th=["sampler"].concat(cfg_scales.map(function(d){return"CFG: ".concat(d)}));table.append("thead").append("tr").selectAll("th").data(th).join("th").text(function(d){return d});var samplers=Array.from(by_sampler.keys()).sort();var tbody=table.append("tbody");tbody.selectAll("tr").data(samplers).join("tr").selectAll("td").data(function(name){var sampler=by_sampler.get(name);return[name].concat(sampler.map(function(d){return"<img src=\"/ai/test/".concat(d.file,"\">")}))}).join("td").html(function(d){return d})});