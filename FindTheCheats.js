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

    correlations = correlations.map(function(d)
  {
        d.forEach(function(d2){
          return d2;
        })
  })

  console.log(correlations);
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

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

  var xScale = d3.scaleBand()
  .range([ 0, width ])
  .domain(pengArray)
  .padding(0.01);

  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(pengArray)
    .padding(0.01);
  svg.append("g")
    .call(d3.axisLeft(y));

    var myColor = d3.scaleLinear()
  .range(["blue", "red"])
  .domain([1,100])



    }
)
