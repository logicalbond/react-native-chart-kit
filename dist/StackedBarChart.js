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
import React from "react";
import { View } from "react-native";
import { G, Rect, Svg, Text } from "react-native-svg";
import AbstractChart, {
  DEFAULT_X_LABELS_HEIGHT_PERCENTAGE
} from "./AbstractChart";
var StackedBarChart = /** @class */ (function(_super) {
  __extends(StackedBarChart, _super);
  function StackedBarChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getBarPercentage = function() {
      var _a = _this.props.chartConfig.barPercentage,
        barPercentage = _a === void 0 ? 1 : _a;
      return barPercentage;
    };
    _this.getBarRadius = function(ret, x) {
      return _this.props.chartConfig.barRadius && ret.length === x.length - 1
        ? _this.props.chartConfig.barRadius
        : 0;
    };
    _this.renderBars = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        border = _a.border,
        colors = _a.colors,
        _b = _a.stackedBar,
        stackedBar = _b === void 0 ? false : _b,
        verticalLabelsHeightPercentage = _a.verticalLabelsHeightPercentage;
      return data.map(function(x, i) {
        var barWidth = 32 * _this.getBarPercentage();
        var ret = [];
        var h = 0;
        var st = paddingTop;
        var fac = 1;
        if (stackedBar) {
          fac = 0.7;
        }
        var sum = _this.props.percentile
          ? x.reduce(function(a, b) {
              return a + b;
            }, 0)
          : border;
        var barsAreaHeight = height * verticalLabelsHeightPercentage;
        for (var z = 0; z < x.length; z++) {
          h = barsAreaHeight * (x[z] / sum);
          var y = barsAreaHeight - h + st;
          var xC =
            (paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2) *
            fac;
          ret.push(
            <Rect
              key={Math.random()}
              x={xC}
              y={y}
              rx={_this.getBarRadius(ret, x)}
              ry={_this.getBarRadius(ret, x)}
              width={barWidth}
              height={h}
              fill={colors[z]}
            />
          );
          if (!_this.props.hideLegend) {
            ret.push(
              <Text
                key={Math.random()}
                x={xC + 7 + barWidth / 2}
                textAnchor="end"
                y={h > 15 ? y + 15 : y + 7}
                {..._this.getPropsForLabels()}
              >
                {x[z]}
              </Text>
            );
          }
          st -= h;
        }
        return ret;
      });
    };
    _this.renderLegend = function(_a) {
      var legend = _a.legend,
        colors = _a.colors,
        width = _a.width,
        height = _a.height;
      return legend.map(function(x, i) {
        return (
          <G key={Math.random()}>
            <Rect
              width="16px"
              height="16px"
              fill={colors[i]}
              rx={8}
              ry={8}
              x={width * 0.71}
              y={height * 0.7 - i * 50}
            />
            <Text
              x={width * 0.78}
              y={height * 0.76 - i * 50}
              {..._this.getPropsForLabels()}
            >
              {x}
            </Text>
          </G>
        );
      });
    };
    return _this;
  }
  StackedBarChart.prototype.render = function() {
    var paddingTop = 15;
    var paddingRight = 55;
    var barWidth = 32 * this.getBarPercentage();
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      data = _a.data,
      _c = _a.withHorizontalLabels,
      withHorizontalLabels = _c === void 0 ? true : _c,
      _d = _a.withVerticalLabels,
      withVerticalLabels = _d === void 0 ? true : _d,
      _e = _a.segments,
      segments = _e === void 0 ? 4 : _e,
      decimalPlaces = _a.decimalPlaces,
      _f = _a.percentile,
      percentile = _f === void 0 ? false : _f,
      _g = _a.verticalLabelsHeightPercentage,
      verticalLabelsHeightPercentage =
        _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g,
      _h = _a.formatYLabel,
      formatYLabel =
        _h === void 0
          ? function(yLabel) {
              return yLabel;
            }
          : _h,
      _j = _a.hideLegend,
      hideLegend = _j === void 0 ? false : _j;
    var _k = style.borderRadius,
      borderRadius = _k === void 0 ? 0 : _k;
    var config = {
      width: width,
      height: height
    };
    var border = 0;
    var max = 0;
    for (var i = 0; i < data.data.length; i++) {
      var actual = data.data[i].reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
      if (actual > max) {
        max = actual;
      }
    }
    if (percentile) {
      border = 100;
    } else {
      border = max;
    }
    var showLegend = !hideLegend && data.legend && data.legend.length != 0;
    var stackedBar = showLegend;
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            __assign(__assign({}, config), this.props.chartConfig)
          )}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
            />
          )}
          <G>
            {this.renderHorizontalLines(
              __assign(__assign({}, config), {
                count: segments,
                paddingTop: paddingTop,
                verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
              })
            )}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: segments,
                    data: [0, border],
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    decimalPlaces: decimalPlaces,
                    verticalLabelsHeightPercentage: verticalLabelsHeightPercentage,
                    formatYLabel: formatYLabel
                  })
                )
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: data.labels,
                    paddingRight: paddingRight + 32,
                    stackedBar: stackedBar,
                    paddingTop: paddingTop,
                    horizontalOffset: barWidth,
                    verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
                  })
                )
              : null}
          </G>
          <G>
            {this.renderBars(
              __assign(__assign({}, config), {
                data: data.data,
                border: border,
                colors: this.props.data.barColors,
                paddingTop: paddingTop,
                paddingRight: paddingRight + 30,
                stackedBar: stackedBar,
                verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
              })
            )}
          </G>
          {showLegend &&
            this.renderLegend(
              __assign(__assign({}, config), {
                legend: data.legend,
                colors: this.props.data.barColors
              })
            )}
        </Svg>
      </View>
    );
  };
  return StackedBarChart;
})(AbstractChart);
export default StackedBarChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLElBQUksRUFBYSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQsT0FBTyxhQUFhLEVBQUUsRUFHcEIsa0NBQWtDLEVBQ25DLE1BQU0saUJBQWlCLENBQUM7QUF1RHpCO0lBQThCLG1DQUc3QjtJQUhEO1FBQUEscUVBb1BDO1FBaFBDLHNCQUFnQixHQUFHO1lBQ1QsSUFBQSxLQUFzQixLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsY0FBM0IsRUFBakIsYUFBYSxtQkFBRyxDQUFDLEtBQUEsQ0FBNEI7WUFDckQsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUYsa0JBQVksR0FBRyxVQUFDLEdBQW1CLEVBQUUsQ0FBaUI7WUFDcEQsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDO1FBRUYsZ0JBQVUsR0FBRyxVQUFDLEVBc0JiO2dCQXJCQyxJQUFJLFVBQUEsRUFDSixLQUFLLFdBQUEsRUFDTCxNQUFNLFlBQUEsRUFDTixVQUFVLGdCQUFBLEVBQ1YsWUFBWSxrQkFBQSxFQUNaLE1BQU0sWUFBQSxFQUNOLE1BQU0sWUFBQSxFQUNOLGtCQUFrQixFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FBQSxFQUNsQiw4QkFBOEIsb0NBQUE7WUFjOUIsT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1osSUFBTSxRQUFRLEdBQUcsRUFBRSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM5QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQztnQkFFcEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksVUFBVSxFQUFFO29CQUNkLEdBQUcsR0FBRyxHQUFHLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDMUUsSUFBTSxjQUFjLEdBQUcsTUFBTSxHQUFHLDhCQUE4QixDQUFDO2dCQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDakMsQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDbEMsSUFBTSxDQUFDLEdBQUcsY0FBYyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2xDLElBQU0sRUFBRSxHQUNOLENBQUMsWUFBWTt3QkFDWCxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNO3dCQUMxQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO3dCQUNmLEdBQUcsQ0FBQztvQkFFTixHQUFHLENBQUMsSUFBSSxDQUNOLENBQUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNuQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDTCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUM5QixLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ1YsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLENBQ0gsQ0FBQztvQkFFRixJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7d0JBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQ04sQ0FBQyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQ25CLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUN6QixVQUFVLENBQUMsS0FBSyxDQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzNCLElBQUksS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FFN0I7Y0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDUDtZQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztxQkFDSDtvQkFFRCxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNUO2dCQUVELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1FBcERGLENBb0RFLENBQUM7UUFFTCxrQkFBWSxHQUFHLFVBQUMsRUFRZjtnQkFQQyxNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixLQUFLLFdBQUEsRUFDTCxNQUFNLFlBQUE7WUFLTixPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZCxPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQ3BCO1VBQUEsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDWixNQUFNLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDTixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDTixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQ2hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUUzQjtVQUFBLENBQUMsSUFBSSxDQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FDaEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQzFCLElBQUksS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FFN0I7WUFBQSxDQUFDLENBQUMsQ0FDSjtVQUFBLEVBQUUsSUFBSSxDQUNSO1FBQUEsRUFBRSxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBckJGLENBcUJFLENBQUM7O0lBMEhQLENBQUM7SUF4SEMsZ0NBQU0sR0FBTjtRQUNFLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBTSxRQUFRLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhDLElBQUEsS0FlRixJQUFJLENBQUMsS0FBSyxFQWRaLEtBQUssV0FBQSxFQUNMLE1BQU0sWUFBQSxFQUNOLGFBQVUsRUFBVixLQUFLLG1CQUFHLEVBQUUsS0FBQSxFQUNWLElBQUksVUFBQSxFQUNKLDRCQUEyQixFQUEzQixvQkFBb0IsbUJBQUcsSUFBSSxLQUFBLEVBQzNCLDBCQUF5QixFQUF6QixrQkFBa0IsbUJBQUcsSUFBSSxLQUFBLEVBQ3pCLGdCQUFZLEVBQVosUUFBUSxtQkFBRyxDQUFDLEtBQUEsRUFDWixhQUFhLG1CQUFBLEVBQ2Isa0JBQWtCLEVBQWxCLFVBQVUsbUJBQUcsS0FBSyxLQUFBLEVBQ2xCLHNDQUFtRSxFQUFuRSw4QkFBOEIsbUJBQUcsa0NBQWtDLEtBQUEsRUFDbkUsb0JBRUMsRUFGRCxZQUFZLG1CQUFHLFVBQUMsTUFBYztZQUM1QixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEtBQUEsRUFDRCxrQkFBa0IsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQ04sQ0FBQztRQUVQLElBQUEsS0FBcUIsS0FBSyxhQUFWLEVBQWhCLFlBQVksbUJBQUcsQ0FBQyxLQUFBLENBQVc7UUFDbkMsSUFBTSxNQUFNLEdBQUc7WUFDYixLQUFLLE9BQUE7WUFDTCxNQUFNLFFBQUE7U0FDUCxDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWYsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSyxPQUFBLEVBQUUsR0FBRyxFQUFFLEVBQVAsQ0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLE1BQU0sQ0FBQzthQUNkO1NBQ0Y7UUFFRCxJQUFJLFVBQVUsRUFBRTtZQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDZDthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBTSxVQUFVLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBRTlCLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDakI7UUFBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDaEM7VUFBQSxDQUFDLElBQUksQ0FBQyxVQUFVLHVCQUNYLE1BQU0sR0FDTixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDekIsQ0FDRjtVQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsbUJBQW1CLElBQUksQ0FDN0MsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDWixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDZixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDakIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ2pCLElBQUksQ0FBQywwQkFBMEIsRUFDL0IsQ0FDSCxDQUNEO1VBQUEsQ0FBQyxDQUFDLENBQ0E7WUFBQSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsdUJBQ3RCLE1BQU0sS0FDVCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsWUFBQSxFQUNWLDhCQUE4QixnQ0FBQSxJQUM5QixDQUNKO1VBQUEsRUFBRSxDQUFDLENBQ0g7VUFBQSxDQUFDLENBQUMsQ0FDQTtZQUFBLENBQUMsb0JBQW9CO2dCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQix1QkFDdEIsTUFBTSxLQUNULEtBQUssRUFBRSxRQUFRLEVBQ2YsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUNqQixVQUFVLFlBQUEsRUFDVixZQUFZLGNBQUEsRUFDWixhQUFhLGVBQUEsRUFDYiw4QkFBOEIsZ0NBQUEsRUFDOUIsWUFBWSxjQUFBLElBQ1o7Z0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FDVjtVQUFBLEVBQUUsQ0FBQyxDQUNIO1VBQUEsQ0FBQyxDQUFDLENBQ0E7WUFBQSxDQUFDLGtCQUFrQjtnQkFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsdUJBQ3BCLE1BQU0sS0FDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFDbkIsWUFBWSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQy9CLFVBQVUsWUFBQSxFQUNWLFVBQVUsWUFBQSxFQUNWLGdCQUFnQixFQUFFLFFBQVEsRUFDMUIsOEJBQThCLGdDQUFBLElBQzlCO2dCQUNKLENBQUMsQ0FBQyxJQUFJLENBQ1Y7VUFBQSxFQUFFLENBQUMsQ0FDSDtVQUFBLENBQUMsQ0FBQyxDQUNBO1lBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSx1QkFDWCxNQUFNLEtBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsTUFBTSxRQUFBLEVBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFDakMsVUFBVSxZQUFBLEVBQ1YsWUFBWSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQy9CLFVBQVUsWUFBQSxFQUNWLDhCQUE4QixnQ0FBQSxJQUM5QixDQUNKO1VBQUEsRUFBRSxDQUFDLENBQ0g7VUFBQSxDQUFDLFVBQVU7Z0JBQ1QsSUFBSSxDQUFDLFlBQVksdUJBQ1osTUFBTSxLQUNULE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUNqQyxDQUNOO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBcFBELENBQThCLGFBQWEsR0FvUDFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHsgRywgUmVjdCwgU3ZnLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHMsXHJcbiAgREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxyXG59IGZyb20gXCIuL0Fic3RyYWN0Q2hhcnRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tlZEJhckNoYXJ0RGF0YSB7XHJcbiAgbGFiZWxzOiBzdHJpbmdbXTtcclxuICBsZWdlbmQ6IHN0cmluZ1tdO1xyXG4gIGRhdGE6IG51bWJlcltdW107XHJcbiAgYmFyQ29sb3JzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGFja2VkQmFyQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgLyoqXHJcbiAgICogRS5nLlxyXG4gICAqIGBgYGphdmFzY3JpcHRcclxuICAgKiBjb25zdCBkYXRhID0ge1xyXG4gICAqICAgbGFiZWxzOiBbXCJUZXN0MVwiLCBcIlRlc3QyXCJdLFxyXG4gICAqICAgbGVnZW5kOiBbXCJMMVwiLCBcIkwyXCIsIFwiTDNcIl0sXHJcbiAgICogICBkYXRhOiBbWzYwLCA2MCwgNjBdLCBbMzAsIDMwLCA2MF1dLFxyXG4gICAqICAgYmFyQ29sb3JzOiBbXCIjZGZlNGVhXCIsIFwiI2NlZDZlMFwiLCBcIiNhNGIwYmVcIl1cclxuICAgKiB9O1xyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIGRhdGE6IFN0YWNrZWRCYXJDaGFydERhdGE7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjaGFydENvbmZpZzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICBoaWRlTGVnZW5kOiBib29sZWFuO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGJhclBlcmNlbnRhZ2U/OiBudW1iZXI7XHJcbiAgZGVjaW1hbFBsYWNlcz86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBTaG93IHZlcnRpY2FsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFZlcnRpY2FsTGFiZWxzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoSG9yaXpvbnRhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBob3Jpem9udGFsIGxpbmVzXHJcbiAgICovXHJcbiAgc2VnbWVudHM/OiBudW1iZXI7XHJcblxyXG4gIHBlcmNlbnRpbGU/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBQZXJjZW50YWdlIG9mIHRoZSBjaGFydCBoZWlnaHQsIGRlZGljYXRlZCB0byB2ZXJ0aWNhbCBsYWJlbHNcclxuICAgKiAoc3BhY2UgYmVsb3cgY2hhcnQpXHJcbiAgICovXHJcbiAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlPzogbnVtYmVyO1xyXG5cclxuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcclxufVxyXG5cclxudHlwZSBTdGFja2VkQmFyQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgU3RhY2tlZEJhckNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxcclxuICBTdGFja2VkQmFyQ2hhcnRQcm9wcyxcclxuICBTdGFja2VkQmFyQ2hhcnRTdGF0ZVxyXG4+IHtcclxuICBnZXRCYXJQZXJjZW50YWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBiYXJQZXJjZW50YWdlID0gMSB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiBiYXJQZXJjZW50YWdlO1xyXG4gIH07XHJcblxyXG4gIGdldEJhclJhZGl1cyA9IChyZXQ6IHN0cmluZyB8IGFueVtdLCB4OiBzdHJpbmcgfCBhbnlbXSkgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzICYmIHJldC5sZW5ndGggPT09IHgubGVuZ3RoIC0gMVxyXG4gICAgICA/IHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzXHJcbiAgICAgIDogMDtcclxuICB9O1xyXG5cclxuICByZW5kZXJCYXJzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBib3JkZXIsXHJcbiAgICBjb2xvcnMsXHJcbiAgICBzdGFja2VkQmFyID0gZmFsc2UsXHJcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcclxuICB9OiBQaWNrPFxyXG4gICAgT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4sXHJcbiAgICB8IFwid2lkdGhcIlxyXG4gICAgfCBcImhlaWdodFwiXHJcbiAgICB8IFwicGFkZGluZ1JpZ2h0XCJcclxuICAgIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgIHwgXCJzdGFja2VkQmFyXCJcclxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxyXG4gID4gJiB7XHJcbiAgICBib3JkZXI6IG51bWJlcjtcclxuICAgIGNvbG9yczogc3RyaW5nW107XHJcbiAgICBkYXRhOiBudW1iZXJbXVtdO1xyXG4gIH0pID0+XHJcbiAgICBkYXRhLm1hcCgoeCwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XHJcbiAgICAgIGNvbnN0IHJldCA9IFtdO1xyXG4gICAgICBsZXQgaCA9IDA7XHJcbiAgICAgIGxldCBzdCA9IHBhZGRpbmdUb3A7XHJcblxyXG4gICAgICBsZXQgZmFjID0gMTtcclxuICAgICAgaWYgKHN0YWNrZWRCYXIpIHtcclxuICAgICAgICBmYWMgPSAwLjc7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3VtID0gdGhpcy5wcm9wcy5wZXJjZW50aWxlID8geC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKSA6IGJvcmRlcjtcclxuICAgICAgY29uc3QgYmFyc0FyZWFIZWlnaHQgPSBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U7XHJcbiAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgeC5sZW5ndGg7IHorKykge1xyXG4gICAgICAgIGggPSBiYXJzQXJlYUhlaWdodCAqICh4W3pdIC8gc3VtKTtcclxuICAgICAgICBjb25zdCB5ID0gYmFyc0FyZWFIZWlnaHQgLSBoICsgc3Q7XHJcbiAgICAgICAgY29uc3QgeEMgPVxyXG4gICAgICAgICAgKHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAgIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aCArXHJcbiAgICAgICAgICAgIGJhcldpZHRoIC8gMikgKlxyXG4gICAgICAgICAgZmFjO1xyXG5cclxuICAgICAgICByZXQucHVzaChcclxuICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgeD17eEN9XHJcbiAgICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICAgIHJ4PXt0aGlzLmdldEJhclJhZGl1cyhyZXQsIHgpfVxyXG4gICAgICAgICAgICByeT17dGhpcy5nZXRCYXJSYWRpdXMocmV0LCB4KX1cclxuICAgICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxyXG4gICAgICAgICAgICBoZWlnaHQ9e2h9XHJcbiAgICAgICAgICAgIGZpbGw9e2NvbG9yc1t6XX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhpZGVMZWdlbmQpIHtcclxuICAgICAgICAgIHJldC5wdXNoKFxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgICB4PXt4QyArIDcgKyBiYXJXaWR0aCAvIDJ9XHJcbiAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cImVuZFwiXHJcbiAgICAgICAgICAgICAgeT17aCA+IDE1ID8geSArIDE1IDogeSArIDd9XHJcbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt4W3pdfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3QgLT0gaDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICByZW5kZXJMZWdlbmQgPSAoe1xyXG4gICAgbGVnZW5kLFxyXG4gICAgY29sb3JzLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHRcclxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+ICYge1xyXG4gICAgbGVnZW5kOiBzdHJpbmdbXTtcclxuICAgIGNvbG9yczogc3RyaW5nW107XHJcbiAgfSkgPT5cclxuICAgIGxlZ2VuZC5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgd2lkdGg9XCIxNnB4XCJcclxuICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgIGZpbGw9e2NvbG9yc1tpXX1cclxuICAgICAgICAgICAgcng9ezh9XHJcbiAgICAgICAgICAgIHJ5PXs4fVxyXG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzF9XHJcbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNyAtIGkgKiA1MH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzh9XHJcbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNzYgLSBpICogNTB9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt4fVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvRz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gMTU7XHJcbiAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSA1NTtcclxuICAgIGNvbnN0IGJhcldpZHRoID0gMzIgKiB0aGlzLmdldEJhclBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHdpdGhIb3Jpem9udGFsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgc2VnbWVudHMgPSA0LFxyXG4gICAgICBkZWNpbWFsUGxhY2VzLFxyXG4gICAgICBwZXJjZW50aWxlID0gZmFsc2UsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0UsXHJcbiAgICAgIGZvcm1hdFlMYWJlbCA9ICh5TGFiZWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiB5TGFiZWw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhpZGVMZWdlbmQgPSBmYWxzZVxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgeyBib3JkZXJSYWRpdXMgPSAwIH0gPSBzdHlsZTtcclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYm9yZGVyID0gMDtcclxuXHJcbiAgICBsZXQgbWF4ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGRhdGEuZGF0YVtpXS5yZWR1Y2UoKHB2LCBjdikgPT4gcHYgKyBjdiwgMCk7XHJcbiAgICAgIGlmIChhY3R1YWwgPiBtYXgpIHtcclxuICAgICAgICBtYXggPSBhY3R1YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocGVyY2VudGlsZSkge1xyXG4gICAgICBib3JkZXIgPSAxMDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBib3JkZXIgPSBtYXg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvd0xlZ2VuZCA9ICFoaWRlTGVnZW5kICYmIGRhdGEubGVnZW5kICYmIGRhdGEubGVnZW5kLmxlbmd0aCAhPSAwO1xyXG4gICAgY29uc3Qgc3RhY2tlZEJhciA9IHNob3dMZWdlbmQ7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICA8U3ZnIGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAge3RoaXMucmVuZGVyRGVmcyh7XHJcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGFydENvbmZpZy51c2VCYWNrZ3JvdW5kQ2FudmFzICYmIChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgIHJ4PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICBmaWxsPVwidXJsKCNiYWNrZ3JvdW5kR3JhZGllbnQpXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVySG9yaXpvbnRhbExpbmVzKHtcclxuICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgY291bnQ6IHNlZ21lbnRzLFxyXG4gICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJIb3Jpem9udGFsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IFswLCBib3JkZXJdLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMsXHJcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSxcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0WUxhYmVsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7d2l0aFZlcnRpY2FsTGFiZWxzXHJcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbHM6IGRhdGEubGFiZWxzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDMyLFxyXG4gICAgICAgICAgICAgICAgICBzdGFja2VkQmFyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0OiBiYXJXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJCYXJzKHtcclxuICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgICBjb2xvcnM6IHRoaXMucHJvcHMuZGF0YS5iYXJDb2xvcnMsXHJcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDMwLFxyXG4gICAgICAgICAgICAgIHN0YWNrZWRCYXIsXHJcbiAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAge3Nob3dMZWdlbmQgJiZcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmQoe1xyXG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICBsZWdlbmQ6IGRhdGEubGVnZW5kLFxyXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9yc1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrZWRCYXJDaGFydDtcclxuIl19
