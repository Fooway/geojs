//////////////////////////////////////////////////////////////////////////////
/**
 * @module ogs.vgl
 */

/*jslint devel: true, forin: true, newcap: true, plusplus: true*/
/*jslint white: true, continue:true, indent: 2*/

/*global vglModule, ogs, vec4, inherit, $*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Helper function to create stack for matrices
 */
//////////////////////////////////////////////////////////////////////////////
function modelViewMatrixStack() {
  'use strict';

  var mvMatrixStack = [];

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Push new matrix to the stack
   *
   * @param mat
   */
  ////////////////////////////////////////////////////////////////////////////
  this.pushMatrix = function(mat) {
    var copy = mat4.create();
    mat4.set(mat, copy);
    mvMatrixStack.push(copy);
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Pop matrix from the stack
   *
   * @returns {*}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.popMatrix = function() {
    if (mvMatrixStack.length === 0) {
      throw "Invalid popMatrix!";
    }
    var mat = mvMatrixStack.pop();
    return mat;
  };
}
