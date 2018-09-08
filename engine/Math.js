(function() {
  "use strict";

  window.VMath = {
    vectorAdd: (a, b) => a.map((memo, i) => memo + b[i]),
    vectorSub: (a, b) => a.map((memo, i) => memo - b[i]),
    vectorDistance: (a, b) => Math.hypot(...a.map((memo, i) => memo - b[i]))
  };

  window.GLMath = {
    degToRad: function(deg) {
      return deg * Math.PI / 180;
    },

    radToDeg: function(rad) {
        return rad * 180 / Math.PI;
    },

    projectionMatrix: function(viewAngle, near, far, aspectRatio) {
      let fieldOfViewInRadians = GLMath.degToRad(viewAngle);

      let f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
      let rangeInv = 1 / (near - far);

      return new Float32Array([
        f / aspectRatio, 0,                          0,   0,
        0,               f,                          0,   0,
        0,               0,    (near + far) * rangeInv,  -1,
        0,               0,  near * far * rangeInv * 2,   0
      ]);
    },


    orthographicMatrix: function(left, right, bottom, top, near, far) {
      const lr = 1 / (left - right);
      const bt = 1 / (bottom - top);
      const nf = 1 / (near - far);

      const row4col1 = (left + right) * lr;
      const row4col2 = (top + bottom) * bt;
      const row4col3 = (far + near) * nf;

      return [
        -2 * lr,        0,        0, 0,
        0,  -2 * bt,        0, 0,
        0,        0,   2 * nf, 0,
        row4col1, row4col2, row4col3, 1
      ];
    },

    matrix4: function() {
      return new Float32Array(16);
    },

    matrix3: function() {
      return new Float32Array(9);
    },

    matrix3Identity: function() {
      return new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]);
    },

    matrix4Identity: function() {
      return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]);
    },

    matrix4ConvertToInversedMatrix3: function(mat) {
      const a00 = mat[0], a01 = mat[1], a02 = mat[2],
          a10 = mat[4], a11 = mat[5], a12 = mat[6],
          a20 = mat[8], a21 = mat[9], a22 = mat[10];

      const b01 =  a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 =  a21 * a10 - a11 * a20;

      let d = a00 * b01 + a01 * b11 + a02 * b21, id;
      let out = GLMath.matrix3();

      if (!d)
        return null;

      id = 1 / d;

      out[0] = b01 * id;
      out[1] = (-a22 * a01 + a02 * a21) * id;
      out[2] = (a12 * a01 - a02 * a11) * id;
      out[3] = b11 * id;
      out[4] = (a22 * a00 - a02 * a20) * id;
      out[5] = (-a12 * a00 + a02 * a10) * id;
      out[6] = b21 * id;
      out[7] = (-a21 * a00 + a01 * a20) * id;
      out[8] = (a11 * a00 - a01 * a10) * id;

      return out;
    },

    matrix4ConvertToMatrix3: function(mat) {
      return new Float32Array([
        mat[0], mat[1], mat[2],
        mat[4], mat[5], mat[6],
        mat[8], mat[9], mat[10]
      ]);
    },

    matrix4MultiplyWithScalar: function(mat, factor) {
      return mat.map(i => i * factor);
    },

    matrix4Rotate: function(mat, angle, axis) {
      var out = GLMath.matrix4();
      var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

      if (!len)
        return null;
      if (len !== 1) {
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
      }

      s = Math.sin(angle);
      c = Math.cos(angle);
      t = 1 - c;

      a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
      a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
      a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

      b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
      b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
      b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

      out[12] = mat[12];
      out[13] = mat[13];
      out[14] = mat[14];
      out[15] = mat[15];

      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;

      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;

      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;

      return out;
    },

    matrix4Translate: function(mat, byVec) {
      const d = byVec[0];
      const e = byVec[1];
      const b = byVec[2];

      return new Float32Array([
        ...mat.slice(0, 12),
        mat[0] * d + mat[4] * e + mat[8] * b + mat[12],
        mat[1] * d + mat[5] * e + mat[9] * b + mat[13],
        mat[2] * d + mat[6] * e + mat[10] * b + mat[14],
        mat[3] * d + mat[7] * e + mat[11] * b + mat[15]
      ]);
    },

    matrix4Transpose: function(mat) {
      return new Float32Array([
        mat[0], mat[4], mat[8], mat[12],
        mat[1], mat[5], mat[9], mat[13],
        mat[2], mat[6], mat[10], mat[14],
        mat[3], mat[7], mat[11], mat[15]
      ]);
    },

    matrix4Determinant: function(mat) {
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

      return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
        a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
        a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
        a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
        a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
        a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
    },

    matrix4Inverse: function(mat) {
      const a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
        invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

      return new Float32Array([
        (a11 * b11 - a12 * b10 + a13 * b09) * invDet,
        (-a01 * b11 + a02 * b10 - a03 * b09) * invDet,
        (a31 * b05 - a32 * b04 + a33 * b03) * invDet,
        (-a21 * b05 + a22 * b04 - a23 * b03) * invDet,
        (-a10 * b11 + a12 * b08 - a13 * b07) * invDet,
        (a00 * b11 - a02 * b08 + a03 * b07) * invDet,
        (-a30 * b05 + a32 * b02 - a33 * b01) * invDet,
        (a20 * b05 - a22 * b02 + a23 * b01) * invDet,
        (a10 * b10 - a11 * b08 + a13 * b06) * invDet,
        (-a00 * b10 + a01 * b08 - a03 * b06) * invDet,
        (a30 * b04 - a31 * b02 + a33 * b00) * invDet,
        (-a20 * b04 + a21 * b02 - a23 * b00) * invDet,
        (-a10 * b09 + a11 * b07 - a12 * b06) * invDet,
        (a00 * b09 - a01 * b07 + a02 * b06) * invDet,
        (-a30 * b03 + a31 * b01 - a32 * b00) * invDet,
        (a20 * b03 - a21 * b01 + a22 * b00) * invDet
      ]);
    },

    matrix4MultiplyWithMatrix: function(mat, mat2) {
      const a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
        b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3],
        b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7],
        b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11],
        b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];

      return new Float32Array([
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
      ]);
    },

    matrix4ScaleWithVector: function(mat, vec) {
      const x = vec[0], y = vec[1], z = vec[2];

      return new Float32Array([
        mat[0] * x, mat[1] * x, mat[2] * x, mat[3] * x,
        mat[4] * y, mat[5] * y, mat[6] * y, mat[7] * y,
        mat[8] * z, mat[9] * z, mat[10] * z, mat[11] * z,
        mat[12], mat[13], mat[14], mat[15]
      ]);
    },

    matrix4LookAtPoint: function(eye, center, up) {
      let out = GLMath.matrix4();

      let x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

      if (eyex === centerx && eyey === centery && eyez === centerz) {
        return GLMath.matrix4Identity(out);
      }

      z0 = eyex - center[0];
      z1 = eyey - center[1];
      z2 = eyez - center[2];

      len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;

      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }

      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;

      len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }

      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;

      return out;
    }
  };
})();
