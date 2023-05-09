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
        hidePointsAtIndex = _l === void 0 ? [] : _l;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
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
        stroke: this.props.chartConfig.color(0.2),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFxQzFFLE1BQU0sQ0FBQyxJQUFNLGtDQUFrQyxHQUFHLElBQUksQ0FBQztBQUV2RDtJQUdVLGlDQUFtRTtJQUg3RTtRQUFBLHFFQXlmQztRQXJmQyxnQkFBVSxHQUFHLFVBQUMsSUFBYztZQUMxQixJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNoRCxPQUFPLENBQ0wsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsYUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksa0NBQVEsSUFBSSxXQUFFLENBQUMsVUFBQyxJQUFJLENBQUMsQ0FDckUsQ0FBQzthQUNIO2lCQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxDQUFDLGFBQUksSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxDQUFDLFVBQUMsSUFBSSxDQUFDLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsT0FBTyxDQUNMLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxrQ0FBUSxJQUFJLFdB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QUssQ0FBQyxXQUFXLEVBSHhCLGdDQUE2QixFQUE3Qix3QkFBd0IsbUJBQUcsRUFBRSxLQUFBLEVBQzdCLEtBQUssV0FBQSxFQUNMLGtCQUFrQixFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FDTSxDQUFDO1FBQzNCLGtCQUNFLElBQUksRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQ2xCLHdCQUF3QixFQUMzQjtJQUNKLENBQUM7SUEwWkgsb0JBQUM7QUFBRCxDQUFDLEFBemZELENBR1UsU0FBUyxHQXNmbEI7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRGVmcywgTGluZSwgTGluZWFyR3JhZGllbnQsIFN0b3AsIFRleHQgfSBmcm9tIFwicmVhY3QtbmF0aXZlLXN2Z1wiO1xyXG5cclxuaW1wb3J0IHsgQ2hhcnRDb25maWcsIERhdGFzZXQsIFBhcnRpYWxCeSB9IGZyb20gXCIuL0hlbHBlclR5cGVzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZnJvbVplcm8/OiBib29sZWFuO1xyXG4gIGZyb21OdW1iZXI/OiBudW1iZXI7XHJcbiAgY2hhcnRDb25maWc/OiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xyXG4gIHlBeGlzTGFiZWw/OiBzdHJpbmc7XHJcbiAgeUF4aXNTdWZmaXg/OiBzdHJpbmc7XHJcbiAgeUxhYmVsc09mZnNldD86IG51bWJlcjtcclxuICB5QXhpc0ludGVydmFsPzogbnVtYmVyO1xyXG4gIHhBeGlzTGFiZWw/OiBzdHJpbmc7XHJcbiAgeExhYmVsc09mZnNldD86IG51bWJlcjtcclxuICBoaWRlUG9pbnRzQXRJbmRleD86IG51bWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRDb25maWcgZXh0ZW5kcyBDaGFydENvbmZpZyB7XHJcbiAgY291bnQ/OiBudW1iZXI7XHJcbiAgZGF0YT86IERhdGFzZXRbXTtcclxuICB3aWR0aD86IG51bWJlcjtcclxuICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgcGFkZGluZ1RvcD86IG51bWJlcjtcclxuICBwYWRkaW5nUmlnaHQ/OiBudW1iZXI7XHJcbiAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XHJcbiAgZm9ybWF0WUxhYmVsPzogKHlMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgbGFiZWxzPzogc3RyaW5nW107XHJcbiAgaG9yaXpvbnRhbE9mZnNldD86IG51bWJlcjtcclxuICBzdGFja2VkQmFyPzogYm9vbGVhbjtcclxuICB2ZXJ0aWNhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XHJcbiAgZm9ybWF0WExhYmVsPzogKHhMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlPzogbnVtYmVyO1xyXG4gIGZvcm1hdFRvcEJhclZhbHVlPzogKHRvcEJhclZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQWJzdHJhY3RDaGFydFN0YXRlID0ge307XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRSA9IDAuNzU7XHJcblxyXG5jbGFzcyBBYnN0cmFjdENoYXJ0PFxyXG4gIElQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyxcclxuICBJU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0U3RhdGVcclxuPiBleHRlbmRzIENvbXBvbmVudDxBYnN0cmFjdENoYXJ0UHJvcHMgJiBJUHJvcHMsIEFic3RyYWN0Q2hhcnRTdGF0ZSAmIElTdGF0ZT4ge1xyXG4gIGNhbGNTY2FsZXIgPSAoZGF0YTogbnVtYmVyW10pID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLmZyb21aZXJvICYmIHRoaXMucHJvcHMuZnJvbU51bWJlcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIE1hdGgubWF4KC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZnJvbVplcm8pIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEsIDApIC0gTWF0aC5taW4oLi4uZGF0YSwgMCkgfHwgMTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5mcm9tTnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgTWF0aC5tYXgoLi4uZGF0YSwgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSAtXHJcbiAgICAgICAgICBNYXRoLm1pbiguLi5kYXRhLCB0aGlzLnByb3BzLmZyb21OdW1iZXIpIHx8IDFcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heCguLi5kYXRhKSAtIE1hdGgubWluKC4uLmRhdGEpIHx8IDE7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2FsY0Jhc2VIZWlnaHQgPSAoZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEpO1xyXG4gICAgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xyXG4gICAgICByZXR1cm4gKGhlaWdodCAqIG1heCkgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2FsY0hlaWdodCA9ICh2YWw6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhKTtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xyXG5cclxuICAgIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcclxuICAgICAgcmV0dXJuIGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xyXG4gICAgfSBlbHNlIGlmIChtaW4gPj0gMCAmJiBtYXggPj0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcclxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWluKSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICA/IGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpXHJcbiAgICAgICAgOiBoZWlnaHQgKiAoKHZhbCAtIG1heCkgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCkge1xyXG4gICAgY29uc3QgeyBwcm9wc0ZvckJhY2tncm91bmRMaW5lcyA9IHt9IH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3Ryb2tlOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuMiksXHJcbiAgICAgIHN0cm9rZURhc2hhcnJheTogXCI1LCAxMFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgLi4ucHJvcHNGb3JCYWNrZ3JvdW5kTGluZXNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0ZvckxhYmVscygpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcHJvcHNGb3JMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0ZvclZlcnRpY2FsTGFiZWxzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9wc0ZvclZlcnRpY2FsTGFiZWxzID0ge30sXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBsYWJlbENvbG9yID0gY29sb3JcclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxyXG4gICAgICAuLi5wcm9wc0ZvclZlcnRpY2FsTGFiZWxzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9wc0Zvckhvcml6b250YWxMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXHJcbiAgICAgIC4uLnByb3BzRm9ySG9yaXpvbnRhbExhYmVsc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMaW5lcyA9IGNvbmZpZyA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvdW50LFxyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICAgIH0gPSBjb25maWc7XHJcbiAgICBjb25zdCBiYXNlUG9zaXRpb24gPSBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoY291bnQgKyAxKV0ubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHkgPSAoYmFzZVBvc2l0aW9uIC8gY291bnQpICogaSArIHBhZGRpbmdUb3A7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPExpbmVcclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XHJcbiAgICAgICAgICB5MT17eX1cclxuICAgICAgICAgIHgyPXt3aWR0aH1cclxuICAgICAgICAgIHkyPXt5fVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVySG9yaXpvbnRhbExpbmUgPSBjb25maWcgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICAgIH0gPSBjb25maWc7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGluZVxyXG4gICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxyXG4gICAgICAgIHkxPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgIHgyPXt3aWR0aH1cclxuICAgICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGFiZWxzID0gKFxyXG4gICAgY29uZmlnOiBPbWl0PEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPiAmIHsgZGF0YTogbnVtYmVyW10gfVxyXG4gICkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb3VudCxcclxuICAgICAgZGF0YSxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgICAgZGVjaW1hbFBsYWNlcyA9IDIsXHJcbiAgICAgIGZvcm1hdFlMYWJlbCA9ICh5TGFiZWw6IHN0cmluZykgPT4geUxhYmVsLFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgICB9ID0gY29uZmlnO1xyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgeUF4aXNMYWJlbCA9IFwiXCIsXHJcbiAgICAgIHlBeGlzU3VmZml4ID0gXCJcIixcclxuICAgICAgeUxhYmVsc09mZnNldCA9IDEyXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiBuZXcgQXJyYXkoY291bnQgPT09IDEgPyAxIDogY291bnQgKyAxKS5maWxsKDEpLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICBsZXQgeUxhYmVsID0gU3RyaW5nKGkgKiBjb3VudCk7XHJcblxyXG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICB5TGFiZWwgPSBgJHt5QXhpc0xhYmVsfSR7Zm9ybWF0WUxhYmVsKFxyXG4gICAgICAgICAgZGF0YVswXS50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXHJcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgICA/ICh0aGlzLmNhbGNTY2FsZXIoZGF0YSkgLyBjb3VudCkgKiBpICsgTWF0aC5taW4oLi4uZGF0YSwgMClcclxuICAgICAgICAgIDogKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhKTtcclxuICAgICAgICB5TGFiZWwgPSBgJHt5QXhpc0xhYmVsfSR7Zm9ybWF0WUxhYmVsKFxyXG4gICAgICAgICAgbGFiZWwudG9GaXhlZChkZWNpbWFsUGxhY2VzKVxyXG4gICAgICAgICl9JHt5QXhpc1N1ZmZpeH1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBiYXNlUG9zaXRpb24gPSBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U7XHJcbiAgICAgIGNvbnN0IHggPSBwYWRkaW5nUmlnaHQgLSB5TGFiZWxzT2Zmc2V0O1xyXG4gICAgICBjb25zdCB5ID1cclxuICAgICAgICBjb3VudCA9PT0gMSAmJiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgICA/IHBhZGRpbmdUb3AgKyA0XHJcbiAgICAgICAgICA6IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSAtXHJcbiAgICAgICAgICAgIChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICtcclxuICAgICAgICAgICAgcGFkZGluZ1RvcDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgcm90YXRpb249e2hvcml6b250YWxMYWJlbFJvdGF0aW9ufVxyXG4gICAgICAgICAgb3JpZ2luPXtgJHt4fSwgJHt5fWB9XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4PXt4fVxyXG4gICAgICAgICAgdGV4dEFuY2hvcj1cImVuZFwiXHJcbiAgICAgICAgICB5PXt5fVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9ySG9yaXpvbnRhbExhYmVscygpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt5TGFiZWx9XHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVmVydGljYWxMYWJlbHMgPSAoe1xyXG4gICAgbGFiZWxzID0gW10sXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBob3Jpem9udGFsT2Zmc2V0ID0gMCxcclxuICAgIHN0YWNrZWRCYXIgPSBmYWxzZSxcclxuICAgIHZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9IDAsXHJcbiAgICBmb3JtYXRYTGFiZWwgPSB4TGFiZWwgPT4geExhYmVsLFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgfCBcImxhYmVsc1wiXHJcbiAgICB8IFwid2lkdGhcIlxyXG4gICAgfCBcImhlaWdodFwiXHJcbiAgICB8IFwicGFkZGluZ1JpZ2h0XCJcclxuICAgIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgIHwgXCJob3Jpem9udGFsT2Zmc2V0XCJcclxuICAgIHwgXCJzdGFja2VkQmFyXCJcclxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsUm90YXRpb25cIlxyXG4gICAgfCBcImZvcm1hdFhMYWJlbFwiXHJcbiAgICB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICA+KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHhBeGlzTGFiZWwgPSBcIlwiLFxyXG4gICAgICB4TGFiZWxzT2Zmc2V0ID0gMCxcclxuICAgICAgaGlkZVBvaW50c0F0SW5kZXggPSBbXVxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgZm9udFNpemUgPSAxMjtcclxuXHJcbiAgICBsZXQgZmFjID0gMTtcclxuICAgIGlmIChzdGFja2VkQmFyKSB7XHJcbiAgICAgIGZhYyA9IDAuNzE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhYmVscy5tYXAoKGxhYmVsLCBpKSA9PiB7XHJcbiAgICAgIGlmIChoaWRlUG9pbnRzQXRJbmRleC5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB4ID1cclxuICAgICAgICAoKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyBsYWJlbHMubGVuZ3RoKSAqIGkgK1xyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgIGhvcml6b250YWxPZmZzZXQpICpcclxuICAgICAgICBmYWM7XHJcblxyXG4gICAgICBjb25zdCB5ID1cclxuICAgICAgICBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgK1xyXG4gICAgICAgIHBhZGRpbmdUb3AgK1xyXG4gICAgICAgIGZvbnRTaXplICogMiArXHJcbiAgICAgICAgeExhYmVsc09mZnNldDtcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRleHRcclxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxyXG4gICAgICAgICAgcm90YXRpb249e3ZlcnRpY2FsTGFiZWxSb3RhdGlvbn1cclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3h9XHJcbiAgICAgICAgICB5PXt5fVxyXG4gICAgICAgICAgdGV4dEFuY2hvcj17dmVydGljYWxMYWJlbFJvdGF0aW9uID09PSAwID8gXCJtaWRkbGVcIiA6IFwic3RhcnRcIn1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvclZlcnRpY2FsTGFiZWxzKCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2Ake2Zvcm1hdFhMYWJlbChsYWJlbCl9JHt4QXhpc0xhYmVsfWB9XHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVmVydGljYWxMaW5lcyA9ICh7XHJcbiAgICBkYXRhLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gIH06IE9taXQ8XHJcbiAgICBQaWNrPFxyXG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICB8IFwiZGF0YVwiXHJcbiAgICAgIHwgXCJ3aWR0aFwiXHJcbiAgICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgICB8IFwicGFkZGluZ1JpZ2h0XCJcclxuICAgICAgfCBcInBhZGRpbmdUb3BcIlxyXG4gICAgICB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICAgID4sXHJcbiAgICBcImRhdGFcIlxyXG4gID4gJiB7IGRhdGE6IG51bWJlcltdIH0pID0+IHtcclxuICAgIGNvbnN0IHsgeUF4aXNJbnRlcnZhbCA9IDEgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpXS5tYXAoXHJcbiAgICAgIChfLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxMaW5lXHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgeDE9e01hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgeDI9e01hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExpbmUgPSAoe1xyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCIgfCBcInZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVwiXHJcbiAgPikgPT4gKFxyXG4gICAgPExpbmVcclxuICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICB4MT17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxyXG4gICAgICB5MT17MH1cclxuICAgICAgeDI9e01hdGguZmxvb3IocGFkZGluZ1JpZ2h0KX1cclxuICAgICAgeTI9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIHJlbmRlckRlZnMgPSAoXHJcbiAgICBjb25maWc6IFBpY2s8XHJcbiAgICAgIFBhcnRpYWxCeTxcclxuICAgICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tXCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9cIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHlcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldFwiXHJcbiAgICAgID4sXHJcbiAgICAgIHwgXCJ3aWR0aFwiXHJcbiAgICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbVwiXHJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb1wiXHJcbiAgICAgIHwgXCJ1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XCJcclxuICAgICAgfCBcImRhdGFcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21cIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldFwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb1wiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHlcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXRcIlxyXG4gICAgPixcclxuICAgIHVuaXF1ZUtleTogc3RyaW5nXHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudEZyb20sXHJcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudFRvLFxyXG4gICAgICB1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0LFxyXG4gICAgICBkYXRhXHJcbiAgICB9ID0gY29uZmlnO1xyXG5cclxuICAgIGNvbnN0IGZyb21PcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIilcclxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcbiAgICBjb25zdCB0b09wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIilcclxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XHJcbiAgICAgIDogMS4wO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFwiKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRcclxuICAgICAgOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDEuMCk7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcclxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVxyXG4gICAgICA6IDAuMTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRGcm9tID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21cIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRGcm9tXHJcbiAgICAgIDogZmlsbFNoYWRvd0dyYWRpZW50O1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcclxuICAgICAgOiBmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5O1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXQgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldFwiXHJcbiAgICApXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXRcclxuICAgICAgOiAwO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudFRvID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiZmlsbFNoYWRvd0dyYWRpZW50VG9cIilcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9cclxuICAgICAgOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDEuMCk7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICApXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eVxyXG4gICAgICA6IDAuMTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcclxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldFwiXHJcbiAgICApXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XHJcbiAgICAgIDogMTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RGVmcz5cclxuICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgIGlkPXtgYmFja2dyb3VuZEdyYWRpZW50XyR7dW5pcXVlS2V5fWB9XHJcbiAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgIHkxPXtoZWlnaHR9XHJcbiAgICAgICAgICB4Mj17d2lkdGh9XHJcbiAgICAgICAgICB5Mj17MH1cclxuICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgb2Zmc2V0PVwiMFwiXHJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50RnJvbX1cclxuICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2Zyb21PcGFjaXR5fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgIG9mZnNldD1cIjFcIlxyXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudFRvfVxyXG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17dG9PcGFjaXR5fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgIHt1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0ID8gKFxyXG4gICAgICAgICAgZGF0YS5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgICAgIGlkPXtgZmlsbFNoYWRvd0dyYWRpZW50RnJvbV8ke3VuaXF1ZUtleX1fJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIGtleT17YCR7aW5kZXh9YH1cclxuICAgICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgICB4Mj17MH1cclxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvciA/IGRhdGFzZXQuY29sb3IoMS4wKSA6IGZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0fVxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eSlcclxuICAgICAgICAgICAgICAgICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgfHwgMH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICAgKSlcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgIGlkPXtgZmlsbFNoYWRvd0dyYWRpZW50RnJvbV8ke3VuaXF1ZUtleX1gfVxyXG4gICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgeTE9ezB9XHJcbiAgICAgICAgICAgIHgyPXswfVxyXG4gICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgIG9mZnNldD17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldH1cclxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2ZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgIG9mZnNldD17ZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXR9XHJcbiAgICAgICAgICAgICAgc3RvcENvbG9yPXtmaWxsU2hhZG93R3JhZGllbnRUbyB8fCBmaWxsU2hhZG93R3JhZGllbnRGcm9tfVxyXG4gICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgfHwgMH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9EZWZzPlxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdENoYXJ0O1xyXG4iXX0=
