google.load('visualization', '1', {'packages':['corechart']});
var vis = {
  data: null,
  label2id: {},
  id2col: {},
  row2age: {},
  rowcount: 0,
  chart: null,
  init: function(labels) {
    // load deathdist
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheet/ccc?key=0Ajfu-hBSP-VLdEZrVDg5MVVwQkozOW5RX09jMkQ2WWc'
    );
    query.setQuery('SELECT *');
    query.send(function(response) {
      if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      }
      vis.data = response.getDataTable();
      vis.rowcount = vis.data.getNumberOfRows();
      numcols = vis.data.getNumberOfColumns();
      for (i = 0; i < numcols; i++) {
        vis.label2id[vis.data.getColumnLabel(i)] = i;
        vis.id2col[i] = vis.data.getColumnId(i);
      }
      vis.draw(labels);
    });
  },
  draw: function(labels) {
    var options = {
      hAxis: {
        gridlines: {color: '#ccc', count: 10},
        title: 'Age of Death'
      },
      vAxis: {
        gridlines: {color: '#ccc', count: 2},
        title: 'Death Count'
      },
      legend: 'bottom',
      chartArea: {'width': '90%', 'height': '80%', top:'10'}
    };
    var rows = []
    var first = ['Age']
    for (l in labels) {
      first.push(mdata.col2label[labels[l]]);
    }
    rows.push(first);
    for (rowid = 0; rowid < vis.rowcount; rowid++) {
      var age = vis.data.getValue(rowid, 0);
      row = [age]
      vis.row2age[rowid] = age;
      for (l in labels) {
        var colid = vis.label2id[labels[l]];
        row.push(vis.data.getValue(rowid, colid));
      }
      rows.push(row);
    }
    vis.chart = new google.visualization.ChartWrapper({
      chartType: 'LineChart',
      dataTable: rows,
      options: options,
      containerId: 'vis'
    });
    vis.chart.draw();
    google.visualization.events.addListener(vis.chart, 'select', function() {
      vis.musicians(labels);
    });
  },
  musicians: function(labels) {
    var selection = vis.chart.getChart().getSelection()[0];
    if ('undefined' === typeof selection) return;
    // load musiciandist
    var query = new google.visualization.Query('https://docs.google.com/spreadsheet/ccc?key=0Ajfu-hBSP-VLdHVXWWpSWmZKeGpTakxDaXZhOEpNQkE');
    // translate selection indexes to data table columns, need to subtract 1
    // from selection.column because age column is contained with index 0
    var age = vis.row2age[selection.row];
    var label = labels[selection.column-1];
    query.setQuery('SELECT ' + vis.id2col[vis.label2id[label]] + ' WHERE A = ' + age);
    query.send(function(response) {
      if (response.isError()) { return; }
      var musicians = response.getDataTable().getValue(0, 0);
        $('#musiciansbody').html(response.getDataTable().getValue(0, 0));
        $('#musiciansheader').html('Died at ' + age + ': ' + mdata.col2label[label]);
        $('#musicians').show();
    });
  }
};

$(function(){
  $('#musicians .close').click(function(){$('#musicians').hide();});
  var selected = ['__all__'];
  var tbody = $('#agestats tbody');
  vis.init(selected);
  $('.filter').each(function(){
    var fid = this.id;
    var target = $(this);
    if (mdata.hasOwnProperty(fid)) {
      var lis = [];
      for (i in mdata[fid]) {
        var checked = '';
        if (-1 !== selected.indexOf(fid)) {
          checked = ' checked="checked"';
        }
        var idx = mdata[fid][i][0];
        var data = mdata[fid][i][1];
        lis.push('<li><input' + checked + ' type="checkbox" value="' + idx + '"> ' + data['name'] + '</li>');

        var r = function(n) { return Math.round(100 * n) / 100; };
        var s = data['stats'];
        tbody.append('<tr class="hidden" id="row' + idx + '"><td>' + data['name'] +
            '</td><td>' + data['deathtoll'] +
            '</td><td>' + s['min'] +
            '</td><td>' + s['max'] +
            '</td><td>' + r(s['mean']) +
            '</td><td>' + s['median'] +
            '</td><td>' + r(s['std']) +
            '</td><td>' + r(s['var']) +
            '</td><td>' + r(s['skew']) +
            '</td></tr>');
      }
      target.append('<ul class="list-unstyled">' + lis.join('') + '</ul>');
    }
  });
  $.each(selected, function(i){
    $('#row' + selected[i]).removeClass('hidden');
  });
  $('#filters').click(function(e){
    if ('INPUT' === e.target.nodeName) {
      var index = e.target.value;
      if (e.target.checked) {
        selected.push(index);
        $('#row' + index).removeClass('hidden');
        if (selected.length > 5) {
          var idx = selected.shift();
          var toclear = $('#filters input[value="' + idx + '"]');
          toclear.each(function(){this.checked = '';});
          $('#row' + idx).addClass('hidden');
        }
      } else {
        var idx = selected.indexOf(index);
        selected.splice(idx, 1);
        $('#row' + index).addClass('hidden');
      }
      vis.draw(selected);
    }
  });
});