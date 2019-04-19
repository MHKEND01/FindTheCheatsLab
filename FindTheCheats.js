var data = d3.json("classData.json");

data.then(function(data)
{
  var HomeworkData = data.map(function(d)
    {
      var HwArray = []
      d.homework.forEach(function(d){
          HwArray.push(d.grade);

      })
      return HwArray;}
    )

    var correlations = HomeworkData.map(function(x){

      var correlationForPenguin = HomeworkData.map(function(y){

          var Mx = d3.mean(x);
          var My = d3.mean(y);
          var Sx = d3.deviation(x);
          var Sy = d3.deviation(y);
          var n = 19;

          var summationsArray = x.map(function(d,i){
            return (x[i] - Mx) * (y[i] - My)
          });
          var summations = d3.sum(summationsArray);

          var correlation = ((1/(n-1))*((summations)/(Sx*Sy)));
          return correlation;


      })
      return correlationForPenguin;


    })

    var newCorrelations = [];
    correlations.forEach(function(d1,i){
          d1.forEach(function(d,i){
            newCorrelations.push(d);
          })

    });

    var margin = {top: 50, right: 200, bottom: 50, left: 50},
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

  var pengArray = ["Bookworm Penguin","Crafty Penguin","Cyclist Penguin","Drunken Penguin","Easter Penguin",
  "EBook Penguin","Farmer Penguin","Gentleman Penguin","Judo Penguin","Moana Penguin",
  "Painter Penguin","Grill Penguin","Pharaoh Penguin","Pilot Penguin","Pinga Corr",
  "Pixie Penguin","Sailor Penguin","Santa Penguin", "Tauch Penguin", "Tux Penguin",
  "Valentine Penguin","Valentine Penguin Ocal","Wizard Penguin"];




  var xScale = d3.scaleLinear()
  .range([ 0, width ])
  .domain([0,22])



  svg.append("g")
  .attr("transform", "translate("+((width/46)+20)+"," + (height + 30)+ ")")
  .call(d3.axisBottom(xScale).ticks(23))

  var yScale = d3.scaleLinear()
    .range([ height, 0 ])
    .domain([0,22])
  svg.append("g")
  .attr("transform", "translate(0," + (height/46)+ ")")
    .call(d3.axisRight(yScale).ticks(23));

    var myColor = d3.scaleLinear()
  .range(["blue","#a6a6a6","red"])
  .domain([-1,0,1])

  svg.selectAll()
      .data(newCorrelations)
      .enter()
      .append("rect")
      .attr("x", function(d,i) { return xScale(i%23) +20})
      .attr("y", function(d,i) { return yScale(Math.floor(i/23)) })
      .attr("width", width/23 )
      .attr("height", height/23 )
      .style("fill", function(d) { if(d>=0.989999999999999){return "black";}else{return myColor(d)}} )

      data.forEach(function(d,i){
        d3.select("body")
        .append("p")
        .attr("id",i);
        // .innerHTML = i+": <img src="+d.picture+" alt='no'/>"

      });

      var i;
      for (i=0; i < 23; i++){
        document.getElementById(i).innerHTML = i+": "+pengArray[i]+"<img src=penguins/"+data[i].picture+" alt='no' width = '50' height = '50'/>"
      }

      var legend = svg.append("g")
      .attr("width", 100)
      .attr("height", 80)
      .attr("transform", "translate(630,0)");

      var colors = ["blue", "#a6a6a6","red"];
      var keys = ["r = -1", "r = 0", "r = 1"];

       legend.selectAll("rect")
              .data(colors)
              .enter()
              .append("rect")
              .attr("width", 25)
              .attr("height",25)
              .attr("x", 0)
              .attr("y", function(d,i){return 25*i;})
              .attr("fill", function(d){return d;});

        legend.selectAll('text')
              .data(keys)
              .enter()
              .append("text")
              .text(function(d){return d;})
              .attr("x",30)
              .attr("y", function(d,i){return (25*(i+1)) -8;});


    }
)
