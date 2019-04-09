
var nodes= [{
   "name": "node0"
 }, {
   "name": "node1"
 }, {
   "name": "node2"
 }, {
   "name": "node3"
 }, {
   "name": "node4"
 }, {
   "name": "node5"
 }, {
   "name": "node6"
 }, {
   "name": "node7"
 }, {
   "name": "node8"
 }, {
   "name": "node9"
 }
];
var links= [ {
   "source": 0,
   "target": 1,
   "type":"licensing"
 },{
    "source": 0,
    "target": 11,
    "type":"licensing"
  },{
   "source": 1,
   "target": 2,
   "type":"licensing"
 }, {
   "source": 1,
   "target": 3,
   "type":"licensing"

 }, {
   "source": 1,
   "target": 4,
   "type":"suit"
 },{
   "source": 1,
   "target": 5,
   "type":"suit"
 },{
   "source": 2,
   "target": 6,
   "type":"suit"
 }, {
   "source": 3,
   "target": 7,
   "type":"suit"
 }, {
   "source": 4,
   "target": 8,
   "type":"suit"
 },{
   "source": 5,
   "target": 9,
   "type":"resolved"
 }, {
   "source": 6,
   "target": 10,
   "type":"resolved"
 }, {
   "source": 7,
   "target": 10,
   "type":"resolved"
 }, {
   "source": 8,
   "target": 10,
   "type":"licensing"
 },{
   "source": 9,
   "target": 10,
   "type":"suit"
 },
 {
   "source": 11,
   "target": 4,
   "type":"suit"
 },{
   "source": 11,
   "target": 12,
   "type":"suit"
 },{
   "source": 11,
   "target": 13,
   "type":"suit"
 },{
   "source": 11,
   "target": 14,
   "type":"suit"
 },{
    "source": 12,
    "target": 15,
    "type":"licensing"
  },{
   "source": 13,
   "target": 16,
   "type":"suit"
 },{
   "source": 14,
   "target": 17,
   "type":"suit"
 },{
   "source": 8,
   "target": 18,
   "type":"suit"
 },
 {
   "source": 15,
   "target": 18,
   "type":"resolved"
 },
 {
   "source": 16,
   "target": 18,
   "type":"resolved"
 },
 {
   "source": 17,
   "target": 18,
   "type":"resolved"
 },
 {
   "source": 12,
   "target": 19,
   "type":"resolved"
 },
 {
   "source": 20,
   "target": 21,
   "type":"suit"
 },{
   "source": 20,
   "target": 22,
   "type":"resolved"
 },
 {
   "source": 21,
   "target": 22,
   "type":"resolved"
 },
 {
   "source": 22,
   "target": 23,
   "type":"suit"
 }
];

  var nodes = {};

  // Compute the distinct nodes from the links.
 links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source });
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });
  console.log(nodes, links)
  var width = 500,
      height = 500;

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(60)
      .charge(-300)
      .on("tick", tick)
      .start();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
      .data(["suit", "licensing", "resolved"])
    .enter().append("marker")
      .attr("id", function(d) { console.log(d);return d; })
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M0,-5L10,0L0,5");

  var path = svg.append("g").selectAll("path")
      .data(force.links())
    .enter().append("path")
      .style("stroke", "#ADADAD")
      .attr("id", function(d) {return d.source.index; })
      .attr("class", function(d) { return "link " + d.type; })
      .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

  var circle = svg.append("g").selectAll("circle")
      .data(force.nodes())
    .enter().append("circle")
      .attr("r", 6)
      .attr("id", function(d) { console.log(d.index); return d.index; })
      .call(force.drag);

  var text = svg.append("g").selectAll("text")
      .data(force.nodes())
    .enter().append("text")
      .attr("x", 8)
      .attr("y", ".31em")
      .text(function(d) { return d.name; });

  // Use elliptical arc path segments to doubly-encode directionality.
  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }
