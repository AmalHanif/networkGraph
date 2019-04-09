var width = 600,
  height =800,
  radius = 10;

var min_zoom = 0;
var max_zoom = 0;

var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])

var fill = d3.scale.category20();

var force = d3.layout.force()
  .charge(-400)
  .linkDistance(150)
  .size([width, height]);

// force.drag().on("dragstart", dragstarted)

var svg = d3.select("body").append("svg")
  .style( 'background-image', 'url(' + "bg.png" + ')')
  .attr("width", width)
  .attr("height", height);

var chart = svg.append('g');

var json = {
  "data":[{"name":"Application","y":1},{"name":"services","y":2},{"name":"processes","y":3},{"name":"Host","y":4},{"name":"Datacenters","y":5}],
  "nodes": [{
    "name": "0"
  },{
    "name": "1"
  }, {
    "name": "2"
  }, {
    "name": "3"
  }, {
    "name": "4"
  }, {
    "name": "5"
  }, {
    "name": "6"
  }, {
    "name": "7"
  }, {
    "name": "8"
  }, {
    "name": "9"
  }, {
    "name": "10"
  }, {
    "name": "11"
  }, {
    "name": "12"
  }, {
    "name": "13"
  }, {
    "name": "14"
  }, {
    "name": "15"
  }, {
    "name": "16"
  }, {
    "name": "17"
  }, {
    "name": "18"
  }
],
  "links": [{
    "source": 0,
    "target": 1
  }, {
    "source": 0,
    "target": 11
  } ,{
    "source": 1,
    "target": 2
  }, {
    "source": 1,
    "target": 3
  }, {
    "source": 1,
    "target": 4
  }, {
    "source": 1,
    "target": 5
  }, {
    "source": 2,
    "target": 6
  }, {
    "source": 3,
    "target": 7
  }, {
    "source": 4,
    "target": 8
  },{
    "source": 5,
    "target": 9
  },{
    "source": 6,
    "target": 10
  }, {
    "source": 7,
    "target": 10
  }, {
    "source": 8,
    "target": 10
  }, {
    "source": 9,
    "target": 10
  }, {
    "source": 11,
    "target": 4
  }, {
    "source": 11,
    "target": 12
  }, {
    "source": 11,
    "target": 13
  }, {
    "source": 11,
    "target": 14
  }, {
    "source": 12,
    "target": 15
  }, {
    "source": 13,
    "target": 16
  }, {
    "source": 14,
    "target": 17
  }, {
    "source": 8,
    "target": 18
  }, {
    "source": 15,
    "target": 18
  }, {
    "source": 16,
    "target": 18
  }, {
    "source": 17,
    "target": 18
  }]
}
console.log(json.nodes);
console.log(json.links);

var data = svg.selectAll("text")
  .data(json.data)
  .enter()
  .append("text")
 .attr("y", function(d,i) {
    return d.y*130;
  })
  .text(function(d) { return d.name; });

var link = chart.selectAll("line")
  .data(json.links)
  .enter()
  .append("line")
   .attr("data_source", function(d) { return d.source; })
   .attr("data_target", function(d) {return d.target; })
  .attr("stroke", function(d) {
    return "#ADADAD"
  });

var node = chart.selectAll("circle")
  .data(json.nodes)
  .enter()
.append("circle")
  .attr("r", radius)
  .attr("id", function(d) { return d.name; })
  .style("stroke", function(d) {
    return fill("#ADADAD");
  })
  .style("stroke", function(d) {
    return d3.rgb(fill("#ADADAD")).darker();
  })

  .on("click", function(d){
     d3.selectAll("path").style("fill",function(){
       this.style.stroke = "#ADADAD";
       if(this.id==d.index){
          this.style.stroke = "blue";
       }
     })
    d3.selectAll("line").style("fill",function(){
      this.style.stroke = "#ADADAD";
    })
    d3.selectAll("line").style("fill",function(){

     //"d.index "is the node which is clicked
     //"this.__data__" is the line attr contain source and target
    if(this.__data__.source.name==d.index||this.__data__.target.name==d.index){
      var sor=this.__data__.source.name
      var tar=this.__data__.target.name
      if(sor==d.index){
        this.style.stroke = "blue";
        d3.selectAll("line").style("fill",function(){
          if(this.__data__.source.name==tar){
            this.style.stroke = "blue";
            var ntar=this.__data__.target.name
            d3.selectAll("line").style("fill",function(){
              if(this.__data__.source.name==ntar){
                this.style.stroke = "blue";
                var n1tar=this.__data__.target.name
                d3.selectAll("line").style("fill",function(){
                  if(this.__data__.source.name==n1tar){
                    this.style.stroke = "blue";
                  }
                })
               }
            })
          }
        })
      }
      else if(tar=d.index){
        this.style.stroke = "blue";
        d3.selectAll("line").style("fill",function(){
          if(this.__data__.target.name==sor){
            this.style.stroke = "blue";
            var nsor=this.__data__.source.name
            d3.selectAll("line").style("fill",function(){
              if(this.__data__.target.name==nsor){
                this.style.stroke = "blue";
                var n1sor=this.__data__.source.name
                d3.selectAll("line").style("fill",function(){
                  if(this.__data__.target.name==n1sor){
                    this.style.stroke = "blue";
                  }
                })
              }
            })
          }
        })
      }
      this.style.stroke = "red";
    }
  });

  d3.selectAll("circle").style("stroke",function(){
    this.style.fill = "#ADADAD";
     this.style.stroke = "blue";
   if(this.id==d.index){
     console.log("color");
     this.style.fill = "#f3184e",
     this.style.stroke = "blue";
   }
  });
})


      .call(force.drag);

  var texts = chart.selectAll("text")
  .data(json.nodes)
  .enter()
  .append("text")
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .style('font-size', d => 10 + 'px')
  .attr('fill-opacity', 1)
  .attr('fill', 'black')
   .text(function(d) { return d.name; });

node
// function dragstarted() {
//   d3.event.sourceEvent.stopPropagation();
// }
//
// zoom.on("zoom", function(d) {
//
//   var evt = d3.event;
//   /*
// 	var dcx = (window.innerWidth/2-d.x*zoom.scale());
// 	var dcy = (window.innerHeight/2-d.y*zoom.scale());
//   */
//   console.log(evt)
//   var dcx = evt.translate[0]
//   var dcy = evt.translate[1]
//   //
//   // zoom.translate([dcx, dcy]);
//
//   chart.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//   texts.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
// });

force
  .nodes(json.nodes)
  .links(json.links)
  .on("tick", tick)
  .start();

  // svg.call(zoom)

function tick(e) {
//console.log(e)
  var k = 2* e.alpha;

  // Push sources up and targets down to form a weak tree.
  link
    .each(function(d,i) {
      d.source.y -= k * 2, d.target.y += k * 4;
    /*
    if(i%2==1){
       d.source.x -=  0.4/k
    }else{
        d.source.x +=  0.4/k
    }
    */

    })
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
   texts
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return  d.y;
    })

}
