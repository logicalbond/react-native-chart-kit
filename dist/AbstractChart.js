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
    _this.renderDefs = function(config) {
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
            id="backgroundGradient"
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
                  id={"fillShadowGradientFrom_".concat(index)}
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
              id="fillShadowGradientFrom"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFxQzFFLE1BQU0sQ0FBQyxJQUFNLGtDQUFrQyxHQUFHLElBQUksQ0FBQztBQUV2RDtJQUdVLGlDQUFtRTtJQUg3RTtRQUFBLHFFQXNmQztRQWxmQyxnQkFBVSxHQUFHLFVBQUMsSUFBYztZQUMxQixJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNoRCxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxrQ0FBUSxJQUFJLFdBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLGFBQUksSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxDQUFDLFVBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0U7aUJBQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksa0NBQVEsSUFBSSxXQUFFLENBQUMsYUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksa0NBQVEsSUFBSSxXQUFFLENBQUMsVUFBQyxJQUFJLENBQUMsQ0FBQzthQUN6RDtpQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNoQyxPQUFPLENBQ0wsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGtDQUFRLElBQUksV0FBRSxLQUFJLENB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RUFDTCxrQkFBa0IsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQ00sQ0FBQztRQUMzQixrQkFDRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUNsQix3QkFBd0IsRUFDM0I7SUFDSixDQUFDO0lBeVpILG9CQUFDO0FBQUQsQ0FBQyxBQXRmRCxDQUdVLFNBQVMsR0FtZmxCO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IERlZnMsIExpbmUsIExpbmVhckdyYWRpZW50LCBTdG9wLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCB7IENoYXJ0Q29uZmlnLCBEYXRhc2V0LCBQYXJ0aWFsQnkgfSBmcm9tIFwiLi9IZWxwZXJUeXBlc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIGZyb21aZXJvPzogYm9vbGVhbjtcclxuICBmcm9tTnVtYmVyPzogbnVtYmVyO1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIHlBeGlzU3VmZml4Pzogc3RyaW5nO1xyXG4gIHlMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgeUF4aXNJbnRlcnZhbD86IG51bWJlcjtcclxuICB4QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIHhMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgaGlkZVBvaW50c0F0SW5kZXg/OiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENoYXJ0Q29uZmlnIGV4dGVuZHMgQ2hhcnRDb25maWcge1xyXG4gIGNvdW50PzogbnVtYmVyO1xyXG4gIGRhdGE/OiBEYXRhc2V0W107XHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gIHBhZGRpbmdUb3A/OiBudW1iZXI7XHJcbiAgcGFkZGluZ1JpZ2h0PzogbnVtYmVyO1xyXG4gIGhvcml6b250YWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIGZvcm1hdFlMYWJlbD86ICh5TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGxhYmVscz86IHN0cmluZ1tdO1xyXG4gIGhvcml6b250YWxPZmZzZXQ/OiBudW1iZXI7XHJcbiAgc3RhY2tlZEJhcj86IGJvb2xlYW47XHJcbiAgdmVydGljYWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIGZvcm1hdFhMYWJlbD86ICh4TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZT86IG51bWJlcjtcclxuICBmb3JtYXRUb3BCYXJWYWx1ZT86ICh0b3BCYXJWYWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEFic3RyYWN0Q2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0UgPSAwLjc1O1xyXG5cclxuY2xhc3MgQWJzdHJhY3RDaGFydDxcclxuICBJUHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMsXHJcbiAgSVN0YXRlIGV4dGVuZHMgQWJzdHJhY3RDaGFydFN0YXRlXHJcbj4gZXh0ZW5kcyBDb21wb25lbnQ8QWJzdHJhY3RDaGFydFByb3BzICYgSVByb3BzLCBBYnN0cmFjdENoYXJ0U3RhdGUgJiBJU3RhdGU+IHtcclxuICBjYWxjU2NhbGVyID0gKGRhdGE6IG51bWJlcltdKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5mcm9tWmVybyAmJiB0aGlzLnByb3BzLmZyb21OdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgLSBNYXRoLm1pbiguLi5kYXRhLCAwKSB8fCAxO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmZyb21aZXJvKSB7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heCguLi5kYXRhLCAwKSAtIE1hdGgubWluKC4uLmRhdGEsIDApIHx8IDE7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZnJvbU51bWJlcikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIE1hdGgubWF4KC4uLmRhdGEsIHRoaXMucHJvcHMuZnJvbU51bWJlcikgLVxyXG4gICAgICAgICAgTWF0aC5taW4oLi4uZGF0YSwgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSB8fCAxXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSkgLSBNYXRoLm1pbiguLi5kYXRhKSB8fCAxO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNhbGNCYXNlSGVpZ2h0ID0gKGRhdGE6IG51bWJlcltdLCBoZWlnaHQ6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uZGF0YSk7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhKTtcclxuICAgIGlmIChtaW4gPj0gMCAmJiBtYXggPj0gMCkge1xyXG4gICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA8PSAwKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcclxuICAgICAgcmV0dXJuIChoZWlnaHQgKiBtYXgpIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNhbGNIZWlnaHQgPSAodmFsOiBudW1iZXIsIGRhdGE6IG51bWJlcltdLCBoZWlnaHQ6IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSk7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcclxuXHJcbiAgICBpZiAobWluIDwgMCAmJiBtYXggPiAwKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcclxuICAgIH0gZWxzZSBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICA/IGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpXHJcbiAgICAgICAgOiBoZWlnaHQgKiAoKHZhbCAtIG1pbikgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xyXG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA8PSAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxyXG4gICAgICAgIDogaGVpZ2h0ICogKCh2YWwgLSBtYXgpIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBnZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpIHtcclxuICAgIGNvbnN0IHsgcHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMgPSB7fSB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0cm9rZTogdGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcigwLjIpLFxyXG4gICAgICBzdHJva2VEYXNoYXJyYXk6IFwiNSwgMTBcIixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIC4uLnByb3BzRm9yQmFja2dyb3VuZExpbmVzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvcHNGb3JMYWJlbHMoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHByb3BzRm9yTGFiZWxzID0ge30sXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBsYWJlbENvbG9yID0gY29sb3JcclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXHJcbiAgICAgIC4uLnByb3BzRm9yTGFiZWxzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvcHNGb3JWZXJ0aWNhbExhYmVscygpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcHJvcHNGb3JWZXJ0aWNhbExhYmVscyA9IHt9LFxyXG4gICAgICBjb2xvcixcclxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXHJcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JWZXJ0aWNhbExhYmVsc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldFByb3BzRm9ySG9yaXpvbnRhbExhYmVscygpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzID0ge30sXHJcbiAgICAgIGNvbG9yLFxyXG4gICAgICBsYWJlbENvbG9yID0gY29sb3JcclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxyXG4gICAgICAuLi5wcm9wc0Zvckhvcml6b250YWxMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGluZXMgPSBjb25maWcgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb3VudCxcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgICB9ID0gY29uZmlnO1xyXG4gICAgY29uc3QgYmFzZVBvc2l0aW9uID0gaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlO1xyXG5cclxuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KGNvdW50ICsgMSldLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICBjb25zdCB5ID0gKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgKyBwYWRkaW5nVG9wO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxMaW5lXHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxyXG4gICAgICAgICAgeTE9e3l9XHJcbiAgICAgICAgICB4Mj17d2lkdGh9XHJcbiAgICAgICAgICB5Mj17eX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMaW5lID0gY29uZmlnID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgICB9ID0gY29uZmlnO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPExpbmVcclxuICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgeDE9e3BhZGRpbmdSaWdodH1cclxuICAgICAgICB5MT17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cclxuICAgICAgICB4Mj17d2lkdGh9XHJcbiAgICAgICAgeTI9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVySG9yaXpvbnRhbExhYmVscyA9IChcclxuICAgIGNvbmZpZzogT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4gJiB7IGRhdGE6IG51bWJlcltdIH1cclxuICApID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY291bnQsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbiA9IDAsXHJcbiAgICAgIGRlY2ltYWxQbGFjZXMgPSAyLFxyXG4gICAgICBmb3JtYXRZTGFiZWwgPSAoeUxhYmVsOiBzdHJpbmcpID0+IHlMYWJlbCxcclxuICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG4gICAgfSA9IGNvbmZpZztcclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHlBeGlzTGFiZWwgPSBcIlwiLFxyXG4gICAgICB5QXhpc1N1ZmZpeCA9IFwiXCIsXHJcbiAgICAgIHlMYWJlbHNPZmZzZXQgPSAxMlxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gbmV3IEFycmF5KGNvdW50ID09PSAxID8gMSA6IGNvdW50ICsgMSkuZmlsbCgxKS5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgbGV0IHlMYWJlbCA9IFN0cmluZyhpICogY291bnQpO1xyXG5cclxuICAgICAgaWYgKGNvdW50ID09PSAxKSB7XHJcbiAgICAgICAgeUxhYmVsID0gYCR7eUF4aXNMYWJlbH0ke2Zvcm1hdFlMYWJlbChcclxuICAgICAgICAgIGRhdGFbMF0udG9GaXhlZChkZWNpbWFsUGxhY2VzKVxyXG4gICAgICAgICl9JHt5QXhpc1N1ZmZpeH1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgICAgPyAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEsIDApXHJcbiAgICAgICAgICA6ICh0aGlzLmNhbGNTY2FsZXIoZGF0YSkgLyBjb3VudCkgKiBpICsgTWF0aC5taW4oLi4uZGF0YSk7XHJcbiAgICAgICAgeUxhYmVsID0gYCR7eUF4aXNMYWJlbH0ke2Zvcm1hdFlMYWJlbChcclxuICAgICAgICAgIGxhYmVsLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcclxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmFzZVBvc2l0aW9uID0gaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlO1xyXG4gICAgICBjb25zdCB4ID0gcGFkZGluZ1JpZ2h0IC0geUxhYmVsc09mZnNldDtcclxuICAgICAgY29uc3QgeSA9XHJcbiAgICAgICAgY291bnQgPT09IDEgJiYgdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgICAgPyBwYWRkaW5nVG9wICsgNFxyXG4gICAgICAgICAgOiBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgLVxyXG4gICAgICAgICAgICAoYmFzZVBvc2l0aW9uIC8gY291bnQpICogaSArXHJcbiAgICAgICAgICAgIHBhZGRpbmdUb3A7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRleHRcclxuICAgICAgICAgIHJvdGF0aW9uPXtob3Jpem9udGFsTGFiZWxSb3RhdGlvbn1cclxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17eH1cclxuICAgICAgICAgIHRleHRBbmNob3I9XCJlbmRcIlxyXG4gICAgICAgICAgeT17eX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7eUxhYmVsfVxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGFiZWxzID0gKHtcclxuICAgIGxhYmVscyA9IFtdLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgaG9yaXpvbnRhbE9mZnNldCA9IDAsXHJcbiAgICBzdGFja2VkQmFyID0gZmFsc2UsXHJcbiAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgZm9ybWF0WExhYmVsID0geExhYmVsID0+IHhMYWJlbCxcclxuICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIHwgXCJsYWJlbHNcIlxyXG4gICAgfCBcIndpZHRoXCJcclxuICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXHJcbiAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICB8IFwiaG9yaXpvbnRhbE9mZnNldFwiXHJcbiAgICB8IFwic3RhY2tlZEJhclwiXHJcbiAgICB8IFwidmVydGljYWxMYWJlbFJvdGF0aW9uXCJcclxuICAgIHwgXCJmb3JtYXRYTGFiZWxcIlxyXG4gICAgfCBcInZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVwiXHJcbiAgPikgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB4QXhpc0xhYmVsID0gXCJcIixcclxuICAgICAgeExhYmVsc09mZnNldCA9IDAsXHJcbiAgICAgIGhpZGVQb2ludHNBdEluZGV4ID0gW11cclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IGZvbnRTaXplID0gMTI7XHJcblxyXG4gICAgbGV0IGZhYyA9IDE7XHJcbiAgICBpZiAoc3RhY2tlZEJhcikge1xyXG4gICAgICBmYWMgPSAwLjcxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbHMubWFwKChsYWJlbCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaGlkZVBvaW50c0F0SW5kZXguaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgeCA9XHJcbiAgICAgICAgKCgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gbGFiZWxzLmxlbmd0aCkgKiBpICtcclxuICAgICAgICAgIHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0KSAqXHJcbiAgICAgICAgZmFjO1xyXG5cclxuICAgICAgY29uc3QgeSA9XHJcbiAgICAgICAgaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICtcclxuICAgICAgICBwYWRkaW5nVG9wICtcclxuICAgICAgICBmb250U2l6ZSAqIDIgK1xyXG4gICAgICAgIHhMYWJlbHNPZmZzZXQ7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cclxuICAgICAgICAgIHJvdGF0aW9uPXt2ZXJ0aWNhbExhYmVsUm90YXRpb259XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4PXt4fVxyXG4gICAgICAgICAgeT17eX1cclxuICAgICAgICAgIHRleHRBbmNob3I9e3ZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9PT0gMCA/IFwibWlkZGxlXCIgOiBcInN0YXJ0XCJ9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JWZXJ0aWNhbExhYmVscygpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtgJHtmb3JtYXRYTGFiZWwobGFiZWwpfSR7eEF4aXNMYWJlbH1gfVxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGluZXMgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxuICB9OiBPbWl0PFxyXG4gICAgUGljazxcclxuICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgICAgfCBcImRhdGFcIlxyXG4gICAgICB8IFwid2lkdGhcIlxyXG4gICAgICB8IFwiaGVpZ2h0XCJcclxuICAgICAgfCBcInBhZGRpbmdSaWdodFwiXHJcbiAgICAgIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgICAgfCBcInZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVwiXHJcbiAgICA+LFxyXG4gICAgXCJkYXRhXCJcclxuICA+ICYgeyBkYXRhOiBudW1iZXJbXSB9KSA9PiB7XHJcbiAgICBjb25zdCB7IHlBeGlzSW50ZXJ2YWwgPSAxIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKV0ubWFwKFxyXG4gICAgICAoXywgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8TGluZVxyXG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgIHgxPXtNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpICogaSArXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHRcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeTE9ezB9XHJcbiAgICAgICAgICAgIHgyPXtNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpICogaSArXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHRcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgeTI9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVmVydGljYWxMaW5lID0gKHtcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gID4pID0+IChcclxuICAgIDxMaW5lXHJcbiAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgeDE9e01hdGguZmxvb3IocGFkZGluZ1JpZ2h0KX1cclxuICAgICAgeTE9ezB9XHJcbiAgICAgIHgyPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XHJcbiAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxyXG4gICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxyXG4gICAgLz5cclxuICApO1xyXG5cclxuICByZW5kZXJEZWZzID0gKFxyXG4gICAgY29uZmlnOiBQaWNrPFxyXG4gICAgICBQYXJ0aWFsQnk8XHJcbiAgICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRcIlxyXG4gICAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldFwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvXCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXRcIlxyXG4gICAgICA+LFxyXG4gICAgICB8IFwid2lkdGhcIlxyXG4gICAgICB8IFwiaGVpZ2h0XCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21cIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9cIlxyXG4gICAgICB8IFwidXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXHJcbiAgICAgIHwgXCJkYXRhXCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tXCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudEZyb21PZmZzZXRcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9cIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcclxuICAgID5cclxuICApID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcclxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50VG8sXHJcbiAgICAgIHVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQsXHJcbiAgICAgIGRhdGFcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IDEuMDtcclxuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxyXG4gICAgICA/IGNvbmZpZy5iYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiZmlsbFNoYWRvd0dyYWRpZW50XCIpXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudFxyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudEZyb20gPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXHJcbiAgICApXHJcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgOiBmaWxsU2hhZG93R3JhZGllbnQ7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHlcIlxyXG4gICAgKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eVxyXG4gICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHk7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcclxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9mZnNldFxyXG4gICAgICA6IDA7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50VG8gPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJmaWxsU2hhZG93R3JhZGllbnRUb1wiKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRUb1xyXG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcclxuXHJcbiAgICBjb25zdCBmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXHJcbiAgICAgIFwiZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PcGFjaXR5XHJcbiAgICAgIDogMC4xO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0ID0gY29uZmlnLmhhc093blByb3BlcnR5KFxyXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50VG9PZmZzZXRcclxuICAgICAgOiAxO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxEZWZzPlxyXG4gICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgaWQ9XCJiYWNrZ3JvdW5kR3JhZGllbnRcIlxyXG4gICAgICAgICAgeDE9ezB9XHJcbiAgICAgICAgICB5MT17aGVpZ2h0fVxyXG4gICAgICAgICAgeDI9e3dpZHRofVxyXG4gICAgICAgICAgeTI9ezB9XHJcbiAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgIG9mZnNldD1cIjBcIlxyXG4gICAgICAgICAgICBzdG9wQ29sb3I9e2JhY2tncm91bmRHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmcm9tT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICBvZmZzZXQ9XCIxXCJcclxuICAgICAgICAgICAgc3RvcENvbG9yPXtiYWNrZ3JvdW5kR3JhZGllbnRUb31cclxuICAgICAgICAgICAgc3RvcE9wYWNpdHk9e3RvT3BhY2l0eX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICB7dXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCA/IChcclxuICAgICAgICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgICAgICBpZD17YGZpbGxTaGFkb3dHcmFkaWVudEZyb21fJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIGtleT17YCR7aW5kZXh9YH1cclxuICAgICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgICB4Mj17MH1cclxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvciA/IGRhdGFzZXQuY29sb3IoMS4wKSA6IGZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT2Zmc2V0fVxyXG4gICAgICAgICAgICAgICAgc3RvcENvbG9yPXtcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldC5jb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRGcm9tT3BhY2l0eSlcclxuICAgICAgICAgICAgICAgICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudEZyb21cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRUb09wYWNpdHkgfHwgMH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICAgKSlcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgIGlkPVwiZmlsbFNoYWRvd0dyYWRpZW50RnJvbVwiXHJcbiAgICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgeDI9ezB9XHJcbiAgICAgICAgICAgIHkyPXtoZWlnaHR9XHJcbiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRGcm9tT2Zmc2V0fVxyXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbX1cclxuICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50RnJvbU9wYWNpdHl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgb2Zmc2V0PXtmaWxsU2hhZG93R3JhZGllbnRUb09mZnNldH1cclxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudFRvIHx8IGZpbGxTaGFkb3dHcmFkaWVudEZyb219XHJcbiAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9e2ZpbGxTaGFkb3dHcmFkaWVudFRvT3BhY2l0eSB8fCAwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICApfVxyXG4gICAgICA8L0RlZnM+XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0Q2hhcnQ7XHJcbiJdfQ==
