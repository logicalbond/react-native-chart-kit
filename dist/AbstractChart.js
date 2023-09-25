var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
export var DEFAULT_X_LABELS_HEIGHT_PERCENTAGE = 0.75;
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero && _this.props.fromNumber) {
        return (
          Math.max.apply(
            Math,
            __spreadArray(
              __spreadArray([], data, false),
              [_this.props.fromNumber],
              false
            )
          ) -
            Math.min.apply(
              Math,
              __spreadArray(__spreadArray([], data, false), [0], false)
            ) || 1
        );
      } else if (_this.props.fromZero) {
        return (
          Math.max.apply(
            Math,
            __spreadArray(__spreadArray([], data, false), [0], false)
          ) -
            Math.min.apply(
              Math,
              __spreadArray(__spreadArray([], data, false), [0], false)
            ) || 1
        );
      } else if (_this.props.fromNumber) {
        return (
          Math.max.apply(
            Math,
            __spreadArray(
              __spreadArray([], data, false),
              [_this.props.fromNumber],
              false
            )
          ) -
            Math.min.apply(
              Math,
              __spreadArray(
                __spreadArray([], data, false),
                [_this.props.fromNumber],
                false
              )
            ) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      var basePosition = height * verticalLabelsHeightPercentage;
      return __spreadArray([], new Array(count + 1), true).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height * verticalLabelsHeightPercentage + paddingTop}
          x2={width}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c,
        _d = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _d === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _d;
      var _e = _this.props,
        _f = _e.yAxisLabel,
        yAxisLabel = _f === void 0 ? "" : _f,
        _g = _e.yAxisSuffix,
        yAxisSuffix = _g === void 0 ? "" : _g,
        _h = _e.yLabelsOffset,
        yLabelsOffset = _h === void 0 ? 12 : _h;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel = ""
            .concat(yAxisLabel)
            .concat(formatYLabel(data[0].toFixed(decimalPlaces)))
            .concat(yAxisSuffix);
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(
                Math,
                __spreadArray(__spreadArray([], data, false), [0], false)
              )
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel = ""
            .concat(yAxisLabel)
            .concat(formatYLabel(label.toFixed(decimalPlaces)))
            .concat(yAxisSuffix);
        }
        var basePosition = height * verticalLabelsHeightPercentage;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : height * verticalLabelsHeightPercentage -
              (basePosition / count) * i +
              paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={"".concat(x, ", ").concat(y)}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForHorizontalLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f,
        _g = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g;
      var _h = _this.props,
        _j = _h.xAxisLabel,
        xAxisLabel = _j === void 0 ? "" : _j,
        _k = _h.xLabelsOffset,
        xLabelsOffset = _k === void 0 ? 0 : _k,
        _l = _h.hidePointsAtIndex,
        hidePointsAtIndex = _l === void 0 ? [] : _l,
        _m = _h.yAxisLabelInterval,
        yAxisLabelInterval = _m === void 0 ? 1 : _m;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        if (i % yAxisLabelInterval) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y =
          height * verticalLabelsHeightPercentage +
          paddingTop +
          fontSize * 2 +
          xLabelsOffset;
        return (
          <Text
            origin={"".concat(x, ", ").concat(y)}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForVerticalLabels()}
          >
            {"".concat(formatXLabel(label)).concat(xAxisLabel)}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      var _c = _this.props.yAxisInterval,
        yAxisInterval = _c === void 0 ? 1 : _c;
      return __spreadArray(
        [],
        new Array(Math.ceil(data.length / yAxisInterval)),
        true
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height * verticalLabelsHeightPercentage + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config, uniqueKey) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      var fillShadowGradientFrom = config.hasOwnProperty(
        "fillShadowGradientFrom"
      )
        ? config.fillShadowGradientFrom
        : fillShadowGradient;
      var fillShadowGradientFromOpacity = config.hasOwnProperty(
        "fillShadowGradientFromOpacity"
      )
        ? config.fillShadowGradientFromOpacity
        : fillShadowGradientOpacity;
      var fillShadowGradientFromOffset = config.hasOwnProperty(
        "fillShadowGradientFromOffset"
      )
        ? config.fillShadowGradientFromOffset
        : 0;
      var fillShadowGradientTo = config.hasOwnProperty("fillShadowGradientTo")
        ? config.fillShadowGradientTo
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientToOpacity = config.hasOwnProperty(
        "fillShadowGradientToOpacity"
      )
        ? config.fillShadowGradientToOpacity
        : 0.1;
      var fillShadowGradientToOffset = config.hasOwnProperty(
        "fillShadowGradientToOffset"
      )
        ? config.fillShadowGradientToOffset
        : 1;
      return (
        <Defs>
          <LinearGradient
            id={"backgroundGradient_".concat(uniqueKey)}
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradientFrom_"
                    .concat(uniqueKey, "_")
                    .concat(index)}
                  key={"".concat(index)}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset={fillShadowGradientFromOffset}
                    stopColor={
                      dataset.color
                        ? dataset.color(1.0)
                        : fillShadowGradientFrom
                    }
                    stopOpacity={fillShadowGradientFromOpacity}
                  />
                  <Stop
                    offset={fillShadowGradientToOffset}
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientFromOpacity)
                        : fillShadowGradientFrom
                    }
                    stopOpacity={fillShadowGradientToOpacity || 0}
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id={"fillShadowGradientFrom_".concat(uniqueKey)}
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset={fillShadowGradientFromOffset}
                stopColor={fillShadowGradientFrom}
                stopOpacity={fillShadowGradientFromOpacity}
              />
              <Stop
                offset={fillShadowGradientToOffset}
                stopColor={fillShadowGradientTo || fillShadowGradientFrom}
                stopOpacity={fillShadowGradientToOpacity || 0}
              />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.1),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  AbstractChart.prototype.getPropsForVerticalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForVerticalLabels,
      propsForVerticalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForVerticalLabels);
  };
  AbstractChart.prototype.getPropsForHorizontalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForHorizontalLabels,
      propsForHorizontalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForHorizontalLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFzQzFFLE1BQU0sQ0FBQyxJQUFNLGtDQUFrQyxHQUFHLElBQUksQ0FBQztBQUV2RDtJQUdVLGlDQUFtRTtJQUg3RTtRQUFBLHFFQThmQztRQTFmQyxnQkFBVSxHQUFHLFVBQUMsSUFBYztZQUMxQixJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNoRCxPQUFPLENBQ0wsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsYUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksa0NBQVEsSUFBSSxXQUFFLENBQUMsVUFBQyxJQUFJLENBQUMsQ0FDckUsQ0FBQzthQUNIO2lCQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxDQUFDLGFBQUksSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxDQUFDLFVBQUMsSUFBSSxDQUFDLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsT0FBTyxDQUNMLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxrQ0FBUSxJQUFJLFdB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QUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUNsQixzQkFBc0IsRUFDekI7SUFDSixDQUFDO0lBRUQsbURBQTJCLEdBQTNCO1FBQ1EsSUFBQSxLQUlGLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUh4QixnQ0FBNkIsRUFBN0Isd0JBQXdCLG1CQUFHLEVBQUUsS0FBQSxFQUM3QixLQUFLLFdBQUEsRUFDTCxrQkFBa0IsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQ00sQ0FBQztRQUMzQixrQkFDRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUNsQix3QkFBd0IsRUFDM0I7SUFDSixDQUFDO0lBK1pILG9CQUFDO0FBQUQsQ0FBQyxBQTlmRCxDQUdVLFNBQVMsR0EyZmxCO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IERlZnMsIExpbmUsIExpbmVhckdyYWRpZW50LCBTdG9wLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCB7IENoYXJ0Q29uZmlnLCBEYXRhc2V0LCBQYXJ0aWFsQnkgfSBmcm9tIFwiLi9IZWxwZXJUeXBlc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIGZyb21aZXJvPzogYm9vbGVhbjtcclxuICBmcm9tTnVtYmVyPzogbnVtYmVyO1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIHlBeGlzU3VmZml4Pzogc3RyaW5nO1xyXG4gIHlMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgeUF4aXNJbnRlcnZhbD86IG51bWJlcjtcclxuICB5QXhpc0xhYmVsSW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcclxuICB4TGFiZWxzT2Zmc2V0PzogbnVtYmVyO1xyXG4gIGhpZGVQb2ludHNBdEluZGV4PzogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydENvbmZpZyBleHRlbmRzIENoYXJ0Q29uZmlnIHtcclxuICBjb3VudD86IG51bWJlcjtcclxuICBkYXRhPzogRGF0YXNldFtdO1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICBwYWRkaW5nVG9wPzogbnVtYmVyO1xyXG4gIHBhZGRpbmdSaWdodD86IG51bWJlcjtcclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICBsYWJlbHM/OiBzdHJpbmdbXTtcclxuICBob3Jpem9udGFsT2Zmc2V0PzogbnVtYmVyO1xyXG4gIHN0YWNrZWRCYXI/OiBib29sZWFuO1xyXG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICBmb3JtYXRYTGFiZWw/OiAoeExhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxuICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U/OiBudW1iZXI7XHJcbiAgZm9ybWF0VG9wQmFyVmFsdWU/OiAodG9wQmFyVmFsdWU6IG51bWJlcikgPT4gc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBBYnN0cmFjdENoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFID0gMC43NTtcclxuXHJcbmNsYXNzIEFic3RyYWN0Q2hhcnQ8XHJcbiAgSVByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzLFxyXG4gIElTdGF0ZSBleHRlbmRzIEFic3RyYWN0Q2hhcnRTdGF0ZVxyXG4+IGV4dGVuZHMgQ29tcG9uZW50PEFic3RyYWN0Q2hhcnRQcm9wcyAmIElQcm9wcywgQWJzdHJhY3RDaGFydFN0YXRlICYgSVN0YXRlPiB7XHJcbiAgY2FsY1NjYWxlciA9IChkYXRhOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZnJvbVplcm8gJiYgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgTWF0aC5tYXgoLi4uZGF0YSwgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSAtIE1hdGgubWluKC4uLmRhdGEsIDApIHx8IDFcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mcm9tWmVybykge1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSwgMCkgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBNYXRoLm1heCguLi5kYXRhLCB0aGlzLnByb3BzLmZyb21OdW1iZXIpIC1cclxuICAgICAgICAgIE1hdGgubWluKC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgfHwgMVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEpIC0gTWF0aC5taW4oLi4uZGF0YSkgfHwgMTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjQmFzZUhlaWdodCA9IChkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XHJcbiAgICBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcclxuICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPiAwKSB7XHJcbiAgICAgIHJldHVybiAoaGVpZ2h0ICogbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjYWxjSGVpZ2h0ID0gKHZhbDogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEpO1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XHJcblxyXG4gICAgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xyXG4gICAgICByZXR1cm4gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxyXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtaW4pIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcclxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKSB7XHJcbiAgICBjb25zdCB7IHByb3BzRm9yQmFja2dyb3VuZExpbmVzID0ge30gfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdHJva2U6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC4xKSxcclxuICAgICAgc3Ryb2tlRGFzaGFycmF5OiBcIjUsIDEwXCIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICAuLi5wcm9wc0ZvckJhY2tncm91bmRMaW5lc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yTGFiZWxzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9wc0ZvckxhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxyXG4gICAgICAuLi5wcm9wc0ZvckxhYmVsc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9yVmVydGljYWxMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXHJcbiAgICAgIC4uLnByb3BzRm9yVmVydGljYWxMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9ySG9yaXpvbnRhbExhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySG9yaXpvbnRhbExpbmVzID0gY29uZmlnID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY291bnQsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShjb3VudCArIDEpXS5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgY29uc3QgeSA9IChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICsgcGFkZGluZ1RvcDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8TGluZVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeDE9e3BhZGRpbmdSaWdodH1cclxuICAgICAgICAgIHkxPXt5fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGluZSA9IGNvbmZpZyA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMaW5lXHJcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XHJcbiAgICAgICAgeTE9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXHJcbiAgICBjb25maWc6IE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+ICYgeyBkYXRhOiBudW1iZXJbXSB9XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvdW50LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBkZWNpbWFsUGxhY2VzID0gMixcclxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB5TGFiZWwsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB5QXhpc0xhYmVsID0gXCJcIixcclxuICAgICAgeUF4aXNTdWZmaXggPSBcIlwiLFxyXG4gICAgICB5TGFiZWxzT2Zmc2V0ID0gMTJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheShjb3VudCA9PT0gMSA/IDEgOiBjb3VudCArIDEpLmZpbGwoMSkubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgIGxldCB5TGFiZWwgPSBTdHJpbmcoaSAqIGNvdW50KTtcclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBkYXRhWzBdLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcclxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhLCAwKVxyXG4gICAgICAgICAgOiAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBsYWJlbC50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXHJcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcclxuICAgICAgY29uc3QgeCA9IHBhZGRpbmdSaWdodCAtIHlMYWJlbHNPZmZzZXQ7XHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGNvdW50ID09PSAxICYmIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gcGFkZGluZ1RvcCArIDRcclxuICAgICAgICAgIDogaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlIC1cclxuICAgICAgICAgICAgKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgK1xyXG4gICAgICAgICAgICBwYWRkaW5nVG9wO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICByb3RhdGlvbj17aG9yaXpvbnRhbExhYmVsUm90YXRpb259XHJcbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3h9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcclxuICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzKCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3lMYWJlbH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExhYmVscyA9ICh7XHJcbiAgICBsYWJlbHMgPSBbXSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGhvcml6b250YWxPZmZzZXQgPSAwLFxyXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxyXG4gICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWwsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICB8IFwibGFiZWxzXCJcclxuICAgIHwgXCJ3aWR0aFwiXHJcbiAgICB8IFwiaGVpZ2h0XCJcclxuICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdUb3BcIlxyXG4gICAgfCBcImhvcml6b250YWxPZmZzZXRcIlxyXG4gICAgfCBcInN0YWNrZWRCYXJcIlxyXG4gICAgfCBcInZlcnRpY2FsTGFiZWxSb3RhdGlvblwiXHJcbiAgICB8IFwiZm9ybWF0WExhYmVsXCJcclxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gID4pID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgeEF4aXNMYWJlbCA9IFwiXCIsXHJcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxyXG4gICAgICBoaWRlUG9pbnRzQXRJbmRleCA9IFtdLFxyXG4gICAgICB5QXhpc0xhYmVsSW50ZXJ2YWwgPSAxXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBmb250U2l6ZSA9IDEyO1xyXG5cclxuICAgIGxldCBmYWMgPSAxO1xyXG4gICAgaWYgKHN0YWNrZWRCYXIpIHtcclxuICAgICAgZmFjID0gMC43MTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWxzLm1hcCgobGFiZWwsIGkpID0+IHtcclxuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpICUgeUF4aXNMYWJlbEludGVydmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHggPVxyXG4gICAgICAgICgoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGxhYmVscy5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldCkgKlxyXG4gICAgICAgIGZhYztcclxuXHJcbiAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgIGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArXHJcbiAgICAgICAgcGFkZGluZ1RvcCArXHJcbiAgICAgICAgZm9udFNpemUgKiAyICtcclxuICAgICAgICB4TGFiZWxzT2Zmc2V0O1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgb3JpZ2luPXtgJHt4fSwgJHt5fWB9XHJcbiAgICAgICAgICByb3RhdGlvbj17dmVydGljYWxMYWJlbFJvdGF0aW9ufVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17eH1cclxuICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPXt2ZXJ0aWNhbExhYmVsUm90YXRpb24gPT09IDAgPyBcIm1pZGRsZVwiIDogXCJzdGFydFwifVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7YCR7Zm9ybWF0WExhYmVsKGxhYmVsKX0ke3hBeGlzTGFiZWx9YH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExpbmVzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogT21pdDxcclxuICAgIFBpY2s8XHJcbiAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgIHwgXCJkYXRhXCJcclxuICAgICAgfCBcIndpZHRoXCJcclxuICAgICAgfCBcImhlaWdodFwiXHJcbiAgICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxyXG4gICAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gICAgPixcclxuICAgIFwiZGF0YVwiXHJcbiAgPiAmIHsgZGF0YTogbnVtYmVyW10gfSkgPT4ge1xyXG4gICAgY29uc3QgeyB5QXhpc0ludGVydmFsID0gMSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheShNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSldLm1hcChcclxuICAgICAgKF8sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPExpbmVcclxuICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICB4MT17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICB4Mj17TWF0aC5mbG9vcihcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGluZSA9ICh7XHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICA+KSA9PiAoXHJcbiAgICA8TGluZVxyXG4gICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XHJcbiAgICAgIHkxPXswfVxyXG4gICAgICB4Mj17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxyXG4gICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgIC8+XHJcbiAgKTtcclxuXHJcbiAgcmVuZGVyRGVmcyA9IChcclxuICAgIGNvbmZpZzogUGljazxcclxuICAgICAgUGFydGlhbEJ5PFxyXG4gICAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21cIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXRcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb1wiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcclxuICAgICAgPixcclxuICAgICAgfCBcIndpZHRoXCJcclxuICAgICAgfCBcImhlaWdodFwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tXCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvXCJcclxuICAgICAgfCBcInVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXRcIlxyXG4gICAgICB8IFwiZGF0YVwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvXCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldFwiXHJcbiAgICA+LFxyXG4gICAgdW5pcXVlS2V5OiBzdHJpbmdcclxuICApID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50VG8sXHJcbiAgICAgIHVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IDEuMDtcclxuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiZmlsbFNoYWRvd0dyYWRpZW50XCIpXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFxyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudEZyb20gPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXHJcbiAgICApXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgOiBmaWxsU2hhZG93R3JhZGllbnQ7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHk7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcclxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldFxyXG4gICAgICA6IDA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50VG8gPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJmaWxsU2hhZG93R3JhZGllbnRUb1wiKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRUb1xyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXRcclxuICAgICAgOiAxO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEZWZzPlxyXG4gICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgaWQ9e2BiYWNrZ3JvdW5kR3JhZGllbnRfJHt1bmlxdWVLZXl9YH1cclxuICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgeTE9e2hlaWdodH1cclxuICAgICAgICAgIHgyPXt3aWR0aH1cclxuICAgICAgICAgIHkyPXswfVxyXG4gICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICBvZmZzZXQ9XCIwXCJcclxuICAgICAgICAgICAgc3RvcENvbG9yPXtiYWNrZ3JvdW5kR3JhZGllbnRGcm9tfVxyXG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17ZnJvbU9wYWNpdHl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgb2Zmc2V0PVwiMVwiXHJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50VG99XHJcbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXt0b09wYWNpdHl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAge3VzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQgPyAoXHJcbiAgICAgICAgICBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgICAgaWQ9e2BmaWxsU2hhZG93R3JhZGllbnRGcm9tXyR7dW5pcXVlS2V5fV8ke2luZGV4fWB9XHJcbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICAgIHkyPXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9e2ZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXR9XHJcbiAgICAgICAgICAgICAgICBzdG9wQ29sb3I9e1xyXG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yID8gZGF0YXNldC5jb2xvcigxLjApIDogZmlsbFNoYWRvd0dyYWRpZW50RnJvbVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2ZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgICAgIG9mZnNldD17ZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXR9XHJcbiAgICAgICAgICAgICAgICBzdG9wQ29sb3I9e1xyXG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgPyBkYXRhc2V0LmNvbG9yKGZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5KVxyXG4gICAgICAgICAgICAgICAgICAgIDogZmlsbFNoYWRvd0dyYWRpZW50RnJvbVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eSB8fCAwfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgICApKVxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgaWQ9e2BmaWxsU2hhZG93R3JhZGllbnRGcm9tXyR7dW5pcXVlS2V5fWB9XHJcbiAgICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgeDI9ezB9XHJcbiAgICAgICAgICAgIHkyPXtoZWlnaHR9XHJcbiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxyXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbX1cclxuICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldH1cclxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudFRvIHx8IGZpbGxTaGFkb3dHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eSB8fCAwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICApfVxyXG4gICAgICA8L0RlZnM+XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0Q2hhcnQ7XHJcbiJdfQ==
