function CSV_VALS(range) {
  return range[0].filter(function(v){return v;}).join(',');
}

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function getData() {
  const KAMOKU = 1, GAKUNEN = 2, JIKI = 3, YOUBI = 4, JIGEN = 5, TANTO = 6, ROOM = 7, MUST = 8;

  var tt = {'前':{'月':[], '火':[], '水':[], '木':[], '金':[]},　
            '後':{'月':[], '火':[], '水':[], '木':[], '金':[]}};
  
  var data = SpreadsheetApp.getActiveSheet().getDataRange().getValues(); 
  
  ['前', '後'].forEach(function(jiki) {
    ['月', '火', '水', '木', '金'].forEach(function(youbi) {
      for (var gakunen = 1; gakunen <= 4; gakunen++) {
        tt[jiki][youbi][gakunen] = tt[jiki][youbi][gakunen] || [];
        for (var jigen = 1; jigen <= 5; jigen++) {
          tt[jiki][youbi][gakunen][jigen] = "";
        }
      }
    });
  });
  
  data.forEach(function(d) { 
    try {
      tt[d[JIKI]][d[YOUBI]][d[GAKUNEN]][d[JIGEN]] += d[KAMOKU] + d[MUST] + "," + d[TANTO] + "," + d[ROOM] + "\n";
    } catch(e) {
      Logger.log(d);
    }
  });
  
  return tt;
}
