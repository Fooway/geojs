/*global describe, it, expect, geo*/

describe('DiscreteZoom and ParallelProjection', function () {
  'use strict';

  function makeMap() {
    var map, width = 800, height = 800;
    var parent;

    parent = $('#map').parent();
    $('#map').remove();
    parent.append('<div id=map/>');

    // create an osm map layer
    map = geo.map({
      'node': '#map',
      'center': [0, 0],
      'zoom': 3,
      discreteZoom: true
    });
    map.createLayer('osm');
    map.resize(0, 0, width, height);
    map.draw();
    return map;
  }

  it('Zoom to a non-integer value', function () {
    var map = makeMap();
    expect(map.discreteZoom()).toBe(true);
    map.zoom(5.75);
    expect(map.zoom()).toBe(6);
  });

  it('Turn off discrete zoom and zoom to a non-integer value', function () {
    var map = makeMap();
    map.discreteZoom(false);
    expect(map.discreteZoom()).toBe(false);
    map.zoom(5.75);
    expect(map.zoom()).toBe(5.75);
  });

  it('Turn back on discrete zoom', function () {
    var map = makeMap();
    map.discreteZoom(false);
    map.zoom(5.75);
    map.discreteZoom(true);
    expect(map.zoom()).toBe(6);
  });

  it('Turn on parallel projection', function () {
    var map = makeMap();
    var cam = map.baseLayer().renderer().contextRenderer().camera();
    var proj = cam.projectionMatrix();
    expect(proj[1] === 0 && proj[2] === 0 && proj[3] === 0 && proj[4] === 0 &&
           proj[6] === 0 && proj[7] === 0 && proj[8] === 0 && proj[9] === 0 &&
           proj[11] === 0 && proj[15] === 1).toBe(false);

    expect(map.parallelProjection()).toBe(false);
    map.parallelProjection(true).draw();

    expect(map.parallelProjection()).toBe(true);
    proj = cam.projectionMatrix();
    expect(proj[1] === 0 && proj[2] === 0 && proj[3] === 0 &&
           proj[4] === 0 && proj[6] === 0 && proj[7] === 0 &&
           proj[8] === 0 && proj[9] === 0 && proj[11] === 0 &&
           proj[15] === 1).toBe(true);
  });
});