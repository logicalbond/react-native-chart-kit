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
    var uniqueKey = Math.random().toString();
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
            __assign(__assign({}, config), this.props.chartConfig),
            uniqueKey
          )}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill={"url(#backgroundGradient_".concat(uniqueKey, ")")}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLElBQUksRUFBYSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQsT0FBTyxhQUFhLEVBQUUsRUFHcEIsa0NBQWtDLEVBQ25DLE1BQU0saUJBQWlCLENBQUM7QUF1RHpCO0lBQThCLG1DQUc3QjtJQUhEO1FBQUEscUVBeVBDO1FBclBDLHNCQUFnQixHQUFHO1lBQ1QsSUFBQSxLQUFzQixLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsY0FBM0IsRUFBakIsYUFBYSxtQkFBRyxDQUFDLEtBQUEsQ0FBNEI7WUFDckQsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUYsa0JBQVksR0FBRyxVQUFDLEdBQW1CLEVBQUUsQ0FBaUI7WUFDcEQsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDO1FBRUYsZ0JBQVUsR0FBRyxVQUFDLEVBc0JiO2dCQXJCQyxJQUFJLFVBQUEsRUFDSixLQUFLLFdBQUEsRUFDTCxNQUFNLFlBQUEsRUFDTixVQUFVLGdCQUFBLEVBQ1YsWUFBWSxrQkFBQSxFQUNaLE1BQU0sWUFBQSxFQUNOLE1BQU0sWUFBQSxFQUNOLGtCQUFrQixFQUFs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TUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFDakMsQ0FDTjtRQUFBLEVBQUUsR0FBRyxDQUNQO01BQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXpQRCxDQUE4QixhQUFhLEdBeVAxQztBQUVELGVBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7IEcsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xyXG4gIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgQWJzdHJhY3RDaGFydFByb3BzLFxyXG4gIERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcclxufSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydERhdGEge1xyXG4gIGxhYmVsczogc3RyaW5nW107XHJcbiAgbGVnZW5kOiBzdHJpbmdbXTtcclxuICBkYXRhOiBudW1iZXJbXVtdO1xyXG4gIGJhckNvbG9yczogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tlZEJhckNoYXJ0UHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIC8qKlxyXG4gICAqIEUuZy5cclxuICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICogY29uc3QgZGF0YSA9IHtcclxuICAgKiAgIGxhYmVsczogW1wiVGVzdDFcIiwgXCJUZXN0MlwiXSxcclxuICAgKiAgIGxlZ2VuZDogW1wiTDFcIiwgXCJMMlwiLCBcIkwzXCJdLFxyXG4gICAqICAgZGF0YTogW1s2MCwgNjAsIDYwXSwgWzMwLCAzMCwgNjBdXSxcclxuICAgKiAgIGJhckNvbG9yczogW1wiI2RmZTRlYVwiLCBcIiNjZWQ2ZTBcIiwgXCIjYTRiMGJlXCJdXHJcbiAgICogfTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBkYXRhOiBTdGFja2VkQmFyQ2hhcnREYXRhO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgY2hhcnRDb25maWc6IEFic3RyYWN0Q2hhcnRDb25maWc7XHJcbiAgaGlkZUxlZ2VuZDogYm9vbGVhbjtcclxuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcclxuICBiYXJQZXJjZW50YWdlPzogbnVtYmVyO1xyXG4gIGRlY2ltYWxQbGFjZXM/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBob3Jpem9udGFsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMYWJlbHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBsaW5lc1xyXG4gICAqL1xyXG4gIHNlZ21lbnRzPzogbnVtYmVyO1xyXG5cclxuICBwZXJjZW50aWxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogUGVyY2VudGFnZSBvZiB0aGUgY2hhcnQgaGVpZ2h0LCBkZWRpY2F0ZWQgdG8gdmVydGljYWwgbGFiZWxzXHJcbiAgICogKHNwYWNlIGJlbG93IGNoYXJ0KVxyXG4gICAqL1xyXG4gIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZT86IG51bWJlcjtcclxuXHJcbiAgZm9ybWF0WUxhYmVsPzogKHlMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgU3RhY2tlZEJhckNoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmNsYXNzIFN0YWNrZWRCYXJDaGFydCBleHRlbmRzIEFic3RyYWN0Q2hhcnQ8XHJcbiAgU3RhY2tlZEJhckNoYXJ0UHJvcHMsXHJcbiAgU3RhY2tlZEJhckNoYXJ0U3RhdGVcclxuPiB7XHJcbiAgZ2V0QmFyUGVyY2VudGFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgYmFyUGVyY2VudGFnZSA9IDEgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4gYmFyUGVyY2VudGFnZTtcclxuICB9O1xyXG5cclxuICBnZXRCYXJSYWRpdXMgPSAocmV0OiBzdHJpbmcgfCBhbnlbXSwgeDogc3RyaW5nIHwgYW55W10pID0+IHtcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmJhclJhZGl1cyAmJiByZXQubGVuZ3RoID09PSB4Lmxlbmd0aCAtIDFcclxuICAgICAgPyB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmJhclJhZGl1c1xyXG4gICAgICA6IDA7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQmFycyA9ICh7XHJcbiAgICBkYXRhLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgYm9yZGVyLFxyXG4gICAgY29sb3JzLFxyXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxyXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXHJcbiAgfTogUGljazxcclxuICAgIE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+LFxyXG4gICAgfCBcIndpZHRoXCJcclxuICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXHJcbiAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICB8IFwic3RhY2tlZEJhclwiXHJcbiAgICB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcclxuICA+ICYge1xyXG4gICAgYm9yZGVyOiBudW1iZXI7XHJcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xyXG4gICAgZGF0YTogbnVtYmVyW11bXTtcclxuICB9KSA9PlxyXG4gICAgZGF0YS5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgY29uc3QgYmFyV2lkdGggPSAzMiAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpO1xyXG4gICAgICBjb25zdCByZXQgPSBbXTtcclxuICAgICAgbGV0IGggPSAwO1xyXG4gICAgICBsZXQgc3QgPSBwYWRkaW5nVG9wO1xyXG5cclxuICAgICAgbGV0IGZhYyA9IDE7XHJcbiAgICAgIGlmIChzdGFja2VkQmFyKSB7XHJcbiAgICAgICAgZmFjID0gMC43O1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHN1bSA9IHRoaXMucHJvcHMucGVyY2VudGlsZSA/IHgucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkgOiBib3JkZXI7XHJcbiAgICAgIGNvbnN0IGJhcnNBcmVhSGVpZ2h0ID0gaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlO1xyXG4gICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IHgubGVuZ3RoOyB6KyspIHtcclxuICAgICAgICBoID0gYmFyc0FyZWFIZWlnaHQgKiAoeFt6XSAvIHN1bSk7XHJcbiAgICAgICAgY29uc3QgeSA9IGJhcnNBcmVhSGVpZ2h0IC0gaCArIHN0O1xyXG4gICAgICAgIGNvbnN0IHhDID1cclxuICAgICAgICAgIChwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgICAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8gZGF0YS5sZW5ndGggK1xyXG4gICAgICAgICAgICBiYXJXaWR0aCAvIDIpICpcclxuICAgICAgICAgIGZhYztcclxuXHJcbiAgICAgICAgcmV0LnB1c2goXHJcbiAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgIHg9e3hDfVxyXG4gICAgICAgICAgICB5PXt5fVxyXG4gICAgICAgICAgICByeD17dGhpcy5nZXRCYXJSYWRpdXMocmV0LCB4KX1cclxuICAgICAgICAgICAgcnk9e3RoaXMuZ2V0QmFyUmFkaXVzKHJldCwgeCl9XHJcbiAgICAgICAgICAgIHdpZHRoPXtiYXJXaWR0aH1cclxuICAgICAgICAgICAgaGVpZ2h0PXtofVxyXG4gICAgICAgICAgICBmaWxsPXtjb2xvcnNbel19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5oaWRlTGVnZW5kKSB7XHJcbiAgICAgICAgICByZXQucHVzaChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgeD17eEMgKyA3ICsgYmFyV2lkdGggLyAyfVxyXG4gICAgICAgICAgICAgIHRleHRBbmNob3I9XCJlbmRcIlxyXG4gICAgICAgICAgICAgIHk9e2ggPiAxNSA/IHkgKyAxNSA6IHkgKyA3fVxyXG4gICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7eFt6XX1cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0IC09IGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9KTtcclxuXHJcbiAgcmVuZGVyTGVnZW5kID0gKHtcclxuICAgIGxlZ2VuZCxcclxuICAgIGNvbG9ycyxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0XHJcbiAgfTogUGljazxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcIndpZHRoXCIgfCBcImhlaWdodFwiPiAmIHtcclxuICAgIGxlZ2VuZDogc3RyaW5nW107XHJcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xyXG4gIH0pID0+XHJcbiAgICBsZWdlbmQubWFwKCh4LCBpKSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cclxuICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgIHdpZHRoPVwiMTZweFwiXHJcbiAgICAgICAgICAgIGhlaWdodD1cIjE2cHhcIlxyXG4gICAgICAgICAgICBmaWxsPXtjb2xvcnNbaV19XHJcbiAgICAgICAgICAgIHJ4PXs4fVxyXG4gICAgICAgICAgICByeT17OH1cclxuICAgICAgICAgICAgeD17d2lkdGggKiAwLjcxfVxyXG4gICAgICAgICAgICB5PXtoZWlnaHQgKiAwLjcgLSBpICogNTB9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgeD17d2lkdGggKiAwLjc4fVxyXG4gICAgICAgICAgICB5PXtoZWlnaHQgKiAwLjc2IC0gaSAqIDUwfVxyXG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7eH1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0c+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgcGFkZGluZ1RvcCA9IDE1O1xyXG4gICAgY29uc3QgcGFkZGluZ1JpZ2h0ID0gNTU7XHJcbiAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBzdHlsZSA9IHt9LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHdpdGhWZXJ0aWNhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHNlZ21lbnRzID0gNCxcclxuICAgICAgZGVjaW1hbFBsYWNlcyxcclxuICAgICAgcGVyY2VudGlsZSA9IGZhbHNlLFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFLFxyXG4gICAgICBmb3JtYXRZTGFiZWwgPSAoeUxhYmVsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICByZXR1cm4geUxhYmVsO1xyXG4gICAgICB9LFxyXG4gICAgICBoaWRlTGVnZW5kID0gZmFsc2VcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHVuaXF1ZUtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAgfSA9IHN0eWxlO1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBib3JkZXIgPSAwO1xyXG5cclxuICAgIGxldCBtYXggPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgYWN0dWFsID0gZGF0YS5kYXRhW2ldLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcclxuICAgICAgaWYgKGFjdHVhbCA+IG1heCkge1xyXG4gICAgICAgIG1heCA9IGFjdHVhbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwZXJjZW50aWxlKSB7XHJcbiAgICAgIGJvcmRlciA9IDEwMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJvcmRlciA9IG1heDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93TGVnZW5kID0gIWhpZGVMZWdlbmQgJiYgZGF0YS5sZWdlbmQgJiYgZGF0YS5sZWdlbmQubGVuZ3RoICE9IDA7XHJcbiAgICBjb25zdCBzdGFja2VkQmFyID0gc2hvd0xlZ2VuZDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VmlldyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgIDxTdmcgaGVpZ2h0PXtoZWlnaHR9IHdpZHRoPXt3aWR0aH0+XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJEZWZzKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5pcXVlS2V5XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge3RoaXMucHJvcHMuY2hhcnRDb25maWcudXNlQmFja2dyb3VuZENhbnZhcyAmJiAoXHJcbiAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cclxuICAgICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgZmlsbD17YHVybCgjYmFja2dyb3VuZEdyYWRpZW50XyR7dW5pcXVlS2V5fSlgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoe1xyXG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXHJcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3dpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50cyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogWzAsIGJvcmRlcl0sXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyxcclxuICAgICAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtYXRZTGFiZWxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHNcclxuICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyVmVydGljYWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsczogZGF0YS5sYWJlbHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZ1JpZ2h0ICsgMzIsXHJcbiAgICAgICAgICAgICAgICAgIHN0YWNrZWRCYXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxPZmZzZXQ6IGJhcldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckJhcnMoe1xyXG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXHJcbiAgICAgICAgICAgICAgYm9yZGVyLFxyXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9ycyxcclxuICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZ1JpZ2h0ICsgMzAsXHJcbiAgICAgICAgICAgICAgc3RhY2tlZEJhcixcclxuICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICB7c2hvd0xlZ2VuZCAmJlxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZCh7XHJcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgIGxlZ2VuZDogZGF0YS5sZWdlbmQsXHJcbiAgICAgICAgICAgICAgY29sb3JzOiB0aGlzLnByb3BzLmRhdGEuYmFyQ29sb3JzXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvU3ZnPlxyXG4gICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RhY2tlZEJhckNoYXJ0O1xyXG4iXX0=
