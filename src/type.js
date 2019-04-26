// Copyright (c) 2019 Alexandru Catrina <alex@codeissues.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/**
 * A map of general use type checks.
 *
 * Callbacks must accept the value to validate and evaluate to boolean.
 *
 * Upper limit unsigned integer
 *  MAX_UINT_8  => 256
 *  MAX_UINT_16 => 65536
 *  MAX_UINT_32 => 4294967296
 *  MAX_UINT_64 => 18446744073709552000
 *
 * Upper limit signed integer
 *  MAX_INT_8  => 127
 *  MAX_INT_16 => 32767
 *  MAX_INT_32 => 2147483647
 *  MAX_INT_64 => 9223372036854775807
 *
 * Lower limit signed integer
 *  MIN_INT_8  => -128
 *  MIN_INT_16 => -32768
 *  MIN_INT_32 => -2147483648
 *  MIN_INT_64 => -9223372036854775808
 */
const types = {

  string: v => v !== undefined && v !== null && v.toString() === v,

  uint: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 18446744073709552000,
  uint8: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 256,
  uint16: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 65536,
  uint32: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 4294967296,
  uint64: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= 0 && v < 18446744073709552000,

  int: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= -9223372036854775808 && v <= 9223372036854775807,
  int8: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= -128 && v <= 127,
  int16: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= -32768 && v <= 32767,
  int32: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= -2147483648 && v <= 2147483647,
  int64: v => Number(v) === v && (v % 1 === 0) && (0 + v === v) && v >= -9223372036854775808 && v <= 9223372036854775807,

  func: v => !!(v && v.constructor && v.call && v.apply),

  list: v => v instanceof Array,
  set: v => v instanceof Set,
  map: v => v instanceof Map,

  object: v => v === Object(v),

  boolean: v => v === true || v === false

}

/**
 * Perform a typecheck for a given argument. Returns a valid callback to
 * check for a data type, otherwise it throws an error.
 */
const typed = (check) => {
  if (types[check] !== undefined) {
    return types[check]
  }
  throw new Error(`Unsupported typecheck ${check}`)
}

module.exports = { types, typed }
