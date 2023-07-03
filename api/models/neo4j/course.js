// extracts just the data from the query results

const _ = require("lodash");

const Course = (module.exports = function (_node) {
  // Example _node = Node {
  //   identity: Integer { low: 10, high: 0 },
  //   labels: [ 'Course' ],
  //   properties: {
  //     identifier: 'PL4LFuHwItvKbdK-ogNsOx2X58hHGeQm8c',
  //     teacher: 'Gavin Lon',
  //     title: 'Blazor Shopping Cart Application'
  //   }
  // }
  _.extend(this, _node.properties);

  this.identifier = this.identifier;
  this.teacher = this.teacher;
  this.title = this.title;

  // if (this.duration) {
  //   this.duration = this.duration.toNumber();
  // } else if (this.runtime) {
  //   this.duration = this.runtime.low;
  // }

  // if (myRating || myRating === 0) {
  //   this["my_rating"] = myRating;
  // }
});
