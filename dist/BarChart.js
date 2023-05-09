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
import {
  Defs,
  G,
  LinearGradient,
  Rect,
  Stop,
  Svg,
  Text
} from "react-native-svg";
import AbstractChart from "./AbstractChart";
var barWidth = 32;
var BarChart = /** @class */ (function(_super) {
  __extends(BarChart, _super);
  function BarChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getBarPercentage = function() {
      var _a = _this.props.chartConfig.barPercentage,
        barPercentage = _a === void 0 ? 1 : _a;
      return barPercentage;
    };
    _this.renderBars = function(_a, uniqueKey) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        barRadius = _a.barRadius,
        withCustomBarColorFromData = _a.withCustomBarColorFromData;
      if (uniqueKey === void 0) {
        uniqueKey = null;
      }
      var baseHeight = _this.calcBaseHeight(data, height);
      return data.map(function(x, i) {
        var barHeight = _this.calcHeight(x, data, height);
        var barWidth = 32 * _this.getBarPercentage();
        return (
          <Rect
            key={Math.random()}
            x={paddingRight + (i * (width - paddingRight)) / data.length}
            y={
              ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
              paddingTop
            }
            rx={barRadius}
            width={barWidth}
            height={(Math.abs(barHeight) / 4) * 3}
            fill={
              withCustomBarColorFromData
                ? "url(#customColor_0_".concat(i, ")")
                : "url(#fillShadowGradientFrom_".concat(uniqueKey, ")")
            }
          />
        );
      });
    };
    _this.renderBarTops = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      var baseHeight = _this.calcBaseHeight(data, height);
      return data.map(function(x, i) {
        var barHeight = _this.calcHeight(x, data, height);
        var barWidth = 32 * _this.getBarPercentage();
        return (
          <Rect
            key={Math.random()}
            x={paddingRight + (i * (width - paddingRight)) / data.length}
            y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
            width={barWidth}
            height={2}
            fill={_this.props.chartConfig.color(0.6)}
          />
        );
      });
    };
    _this.renderColors = function(_a) {
      var data = _a.data,
        flatColor = _a.flatColor;
      return data.map(function(dataset, index) {
        var _a, _b;
        return (
          <Defs key={(_a = dataset.key) !== null && _a !== void 0 ? _a : index}>
            {(_b = dataset.colors) === null || _b === void 0
              ? void 0
              : _b.map(function(color, colorIndex) {
                  var highOpacityColor = color(1.0);
                  var lowOpacityColor = color(0.1);
                  return (
                    <LinearGradient
                      id={"customColor_".concat(index, "_").concat(colorIndex)}
                      key={"".concat(index, "_").concat(colorIndex)}
                      x1={0}
                      y1={0}
                      x2={0}
                      y2={1}
                    >
                      <Stop
                        offset="0"
                        stopColor={highOpacityColor}
                        stopOpacity="1"
                      />
                      {flatColor ? (
                        <Stop
                          offset="1"
                          stopColor={highOpacityColor}
                          stopOpacity="1"
                        />
                      ) : (
                        <Stop
                          offset="1"
                          stopColor={lowOpacityColor}
                          stopOpacity="0"
                        />
                      )}
                    </LinearGradient>
                  );
                })}
          </Defs>
        );
      });
    };
    _this.renderValuesOnTopOfBars = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      var baseHeight = _this.calcBaseHeight(data, height);
      var renderLabel = function(value) {
        if (_this.props.chartConfig.formatTopBarValue) {
          return _this.props.chartConfig.formatTopBarValue(value);
        } else {
          return value;
        }
      };
      return data.map(function(x, i) {
        var barHeight = _this.calcHeight(x, data, height);
        var barWidth = 32 * _this.getBarPercentage();
        return (
          <Text
            key={Math.random()}
            x={
              paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2
            }
            y={((baseHeight - barHeight) / 4) * 3 + paddingTop - 5}
            fill={_this.props.chartConfig.color(0.6)}
            fontSize="12"
            textAnchor="middle"
          >
            {renderLabel(data[i])}
          </Text>
        );
      });
    };
    return _this;
  }
  BarChart.prototype.render = function() {
    var _a;
    var _b = this.props,
      width = _b.width,
      height = _b.height,
      data = _b.data,
      _c = _b.style,
      style = _c === void 0 ? {} : _c,
      _d = _b.withHorizontalLabels,
      withHorizontalLabels = _d === void 0 ? true : _d,
      _e = _b.withVerticalLabels,
      withVerticalLabels = _e === void 0 ? true : _e,
      _f = _b.verticalLabelRotation,
      verticalLabelRotation = _f === void 0 ? 0 : _f,
      _g = _b.horizontalLabelRotation,
      horizontalLabelRotation = _g === void 0 ? 0 : _g,
      _h = _b.withInnerLines,
      withInnerLines = _h === void 0 ? true : _h,
      _j = _b.showBarTops,
      showBarTops = _j === void 0 ? true : _j,
      _k = _b.withCustomBarColorFromData,
      withCustomBarColorFromData = _k === void 0 ? false : _k,
      _l = _b.showValuesOnTopOfBars,
      showValuesOnTopOfBars = _l === void 0 ? false : _l,
      _m = _b.flatColor,
      flatColor = _m === void 0 ? false : _m,
      _o = _b.segments,
      segments = _o === void 0 ? 4 : _o;
    var uniqueKey = Math.random().toString();
    var _p = style.borderRadius,
      borderRadius = _p === void 0 ? 0 : _p,
      _q = style.paddingTop,
      paddingTop = _q === void 0 ? 16 : _q,
      _r = style.paddingRight,
      paddingRight = _r === void 0 ? 55 : _r;
    var config = {
      width: width,
      height: height,
      verticalLabelRotation: verticalLabelRotation,
      horizontalLabelRotation: horizontalLabelRotation,
      barRadius:
        (this.props.chartConfig && this.props.chartConfig.barRadius) || 0,
      decimalPlaces:
        (_a =
          this.props.chartConfig && this.props.chartConfig.decimalPlaces) !==
          null && _a !== void 0
          ? _a
          : 2,
      formatYLabel:
        (this.props.chartConfig && this.props.chartConfig.formatYLabel) ||
        function(label) {
          return label;
        },
      formatXLabel:
        (this.props.chartConfig && this.props.chartConfig.formatXLabel) ||
        function(label) {
          return label;
        }
    };
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            __assign(__assign({}, config), this.props.chartConfig),
            uniqueKey
          )}
          {this.renderColors(
            __assign(__assign({}, this.props.chartConfig), {
              flatColor: flatColor,
              data: this.props.data.datasets
            })
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
            {withInnerLines
              ? this.renderHorizontalLines(
                  __assign(__assign({}, config), {
                    count: segments,
                    paddingTop: paddingTop
                  })
                )
              : null}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: segments,
                    data: data.datasets[0].data,
                    paddingTop: paddingTop,
                    paddingRight: paddingRight
                  })
                )
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: data.labels,
                    paddingRight: withHorizontalLabels ? paddingRight : 0,
                    paddingTop: paddingTop,
                    horizontalOffset: (barWidth * this.getBarPercentage()) / 2
                  })
                )
              : null}
          </G>
          <G>
            {this.renderBars(
              __assign(__assign({}, config), {
                data: data.datasets[0].data,
                paddingTop: paddingTop,
                paddingRight: withHorizontalLabels ? paddingRight : 0,
                withCustomBarColorFromData: withCustomBarColorFromData
              }),
              uniqueKey
            )}
          </G>
          <G>
            {showValuesOnTopOfBars &&
              this.renderValuesOnTopOfBars(
                __assign(__assign({}, config), {
                  data: data.datasets[0].data,
                  paddingTop: paddingTop,
                  paddingRight: withHorizontalLabels ? paddingRight : 0
                })
              )}
          </G>
          <G>
            {showBarTops &&
              this.renderBarTops(
                __assign(__assign({}, config), {
                  data: data.datasets[0].data,
                  paddingTop: paddingTop,
                  paddingRight: withHorizontalLabels ? paddingRight : 0
                })
              )}
          </G>
        </Svg>
      </View>
    );
  };
  return BarChart;
})(AbstractChart);
export default BarChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQmFyQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUNMLElBQUksRUFDSixDQUFDLEVBQ0QsY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDTCxNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQWtDcEI7SUFBdUIsNEJBQTJDO0lBQWxFO1FBQUEscUVBd1NDO1FBdlNDLHNCQUFnQixHQUFHO1lBQ1QsSUFBQSxLQUFzQixLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsY0FBM0IsRUFBakIsYUFBYSxtQkFBRyxDQUFDLEtBQUEsQ0FBNEI7WUFDckQsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUYsZ0JBQVUsR0FBRyxVQUNYLEVBY0MsRUFDRCxTQUF3QjtnQkFkdEIsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sVUFBVSxnQkFBQSxFQUNWLFlBQVksa0JBQUEsRUFDWixTQUFTLGVBQUEsRUFDVCwwQkFBMEIsZ0NBQUE7WUFRNUIsMEJBQUEsRUFBQSxnQkFBd0I7WUFFeEIsSUFBTSxVQUFVLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFckQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFN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QXhTRCxDQUF1QixhQUFhLEdBd1NuQztBQUVELGVBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7XHJcbiAgRGVmcyxcclxuICBHLFxyXG4gIExpbmVhckdyYWRpZW50LFxyXG4gIFJlY3QsXHJcbiAgU3RvcCxcclxuICBTdmcsXHJcbiAgVGV4dFxyXG59IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xyXG4gIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgQWJzdHJhY3RDaGFydFByb3BzXHJcbn0gZnJvbSBcIi4vQWJzdHJhY3RDaGFydFwiO1xyXG5pbXBvcnQgeyBDaGFydERhdGEgfSBmcm9tIFwiLi9IZWxwZXJUeXBlc1wiO1xyXG5cclxuY29uc3QgYmFyV2lkdGggPSAzMjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFyQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZGF0YTogQ2hhcnREYXRhO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgZnJvbVplcm8/OiBib29sZWFuO1xyXG4gIHdpdGhJbm5lckxpbmVzPzogYm9vbGVhbjtcclxuICB5QXhpc0xhYmVsOiBzdHJpbmc7XHJcbiAgeUF4aXNTdWZmaXg6IHN0cmluZztcclxuICBjaGFydENvbmZpZzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICB2ZXJ0aWNhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBob3Jpem9udGFsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMYWJlbHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBsaW5lc1xyXG4gICAqL1xyXG4gIHNlZ21lbnRzPzogbnVtYmVyO1xyXG4gIHNob3dCYXJUb3BzPzogYm9vbGVhbjtcclxuICBzaG93VmFsdWVzT25Ub3BPZkJhcnM/OiBib29sZWFuO1xyXG4gIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhPzogYm9vbGVhbjtcclxuICBmbGF0Q29sb3I/OiBib29sZWFuO1xyXG59XHJcblxyXG50eXBlIEJhckNoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmNsYXNzIEJhckNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxCYXJDaGFydFByb3BzLCBCYXJDaGFydFN0YXRlPiB7XHJcbiAgZ2V0QmFyUGVyY2VudGFnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgYmFyUGVyY2VudGFnZSA9IDEgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4gYmFyUGVyY2VudGFnZTtcclxuICB9O1xyXG5cclxuICByZW5kZXJCYXJzID0gKFxyXG4gICAge1xyXG4gICAgICBkYXRhLFxyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgIGJhclJhZGl1cyxcclxuICAgICAgd2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGFcclxuICAgIH06IFBpY2s8XHJcbiAgICAgIE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+LFxyXG4gICAgICBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJiYXJSYWRpdXNcIlxyXG4gICAgPiAmIHtcclxuICAgICAgZGF0YTogbnVtYmVyW107XHJcbiAgICAgIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhOiBib29sZWFuO1xyXG4gICAgfSxcclxuICAgIHVuaXF1ZUtleTogc3RyaW5nID0gbnVsbFxyXG4gICkgPT4ge1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YSwgaGVpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgY29uc3QgYmFySGVpZ2h0ID0gdGhpcy5jYWxjSGVpZ2h0KHgsIGRhdGEsIGhlaWdodCk7XHJcbiAgICAgIGNvbnN0IGJhcldpZHRoID0gMzIgKiB0aGlzLmdldEJhclBlcmNlbnRhZ2UoKTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8UmVjdFxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17cGFkZGluZ1JpZ2h0ICsgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIGRhdGEubGVuZ3RofVxyXG4gICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICgoYmFySGVpZ2h0ID4gMCA/IGJhc2VIZWlnaHQgLSBiYXJIZWlnaHQgOiBiYXNlSGVpZ2h0KSAvIDQpICogMyArXHJcbiAgICAgICAgICAgIHBhZGRpbmdUb3BcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJ4PXtiYXJSYWRpdXN9XHJcbiAgICAgICAgICB3aWR0aD17YmFyV2lkdGh9XHJcbiAgICAgICAgICBoZWlnaHQ9eyhNYXRoLmFicyhiYXJIZWlnaHQpIC8gNCkgKiAzfVxyXG4gICAgICAgICAgZmlsbD17XHJcbiAgICAgICAgICAgIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhXHJcbiAgICAgICAgICAgICAgPyBgdXJsKCNjdXN0b21Db2xvcl8wXyR7aX0pYFxyXG4gICAgICAgICAgICAgIDogYHVybCgjZmlsbFNoYWRvd0dyYWRpZW50RnJvbV8ke3VuaXF1ZUtleX0pYFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJCYXJUb3BzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHRcclxuICB9OiBQaWNrPFxyXG4gICAgT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4sXHJcbiAgICBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXHJcbiAgPiAmIHtcclxuICAgIGRhdGE6IG51bWJlcltdO1xyXG4gIH0pID0+IHtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGEsIGhlaWdodCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGEubWFwKCh4LCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJhckhlaWdodCA9IHRoaXMuY2FsY0hlaWdodCh4LCBkYXRhLCBoZWlnaHQpO1xyXG4gICAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFJlY3RcclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3BhZGRpbmdSaWdodCArIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aH1cclxuICAgICAgICAgIHk9eygoYmFzZUhlaWdodCAtIGJhckhlaWdodCkgLyA0KSAqIDMgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxyXG4gICAgICAgICAgaGVpZ2h0PXsyfVxyXG4gICAgICAgICAgZmlsbD17dGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcigwLjYpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJDb2xvcnMgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIGZsYXRDb2xvclxyXG4gIH06IFBpY2s8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+ICYge1xyXG4gICAgZmxhdENvbG9yOiBib29sZWFuO1xyXG4gIH0pID0+IHtcclxuICAgIHJldHVybiBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IChcclxuICAgICAgPERlZnMga2V5PXtkYXRhc2V0LmtleSA/PyBpbmRleH0+XHJcbiAgICAgICAge2RhdGFzZXQuY29sb3JzPy5tYXAoKGNvbG9yLCBjb2xvckluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoaWdoT3BhY2l0eUNvbG9yID0gY29sb3IoMS4wKTtcclxuICAgICAgICAgIGNvbnN0IGxvd09wYWNpdHlDb2xvciA9IGNvbG9yKDAuMSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgICAgaWQ9e2BjdXN0b21Db2xvcl8ke2luZGV4fV8ke2NvbG9ySW5kZXh9YH1cclxuICAgICAgICAgICAgICBrZXk9e2Ake2luZGV4fV8ke2NvbG9ySW5kZXh9YH1cclxuICAgICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgICB4Mj17MH1cclxuICAgICAgICAgICAgICB5Mj17MX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxTdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9e2hpZ2hPcGFjaXR5Q29sb3J9IHN0b3BPcGFjaXR5PVwiMVwiIC8+XHJcbiAgICAgICAgICAgICAge2ZsYXRDb2xvciA/IChcclxuICAgICAgICAgICAgICAgIDxTdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e2hpZ2hPcGFjaXR5Q29sb3J9IHN0b3BPcGFjaXR5PVwiMVwiIC8+XHJcbiAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxTdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9e2xvd09wYWNpdHlDb2xvcn0gc3RvcE9wYWNpdHk9XCIwXCIgLz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KX1cclxuICAgICAgPC9EZWZzPlxyXG4gICAgKSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVmFsdWVzT25Ub3BPZkJhcnMgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodFxyXG4gIH06IFBpY2s8XHJcbiAgICBPbWl0PEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPixcclxuICAgIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+ICYge1xyXG4gICAgZGF0YTogbnVtYmVyW107XHJcbiAgfSkgPT4ge1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YSwgaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJMYWJlbCA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmZvcm1hdFRvcEJhclZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hhcnRDb25maWcuZm9ybWF0VG9wQmFyVmFsdWUodmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBkYXRhLm1hcCgoeCwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBiYXJIZWlnaHQgPSB0aGlzLmNhbGNIZWlnaHQoeCwgZGF0YSwgaGVpZ2h0KTtcclxuICAgICAgY29uc3QgYmFyV2lkdGggPSAzMiAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4PXtcclxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgICAgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIGRhdGEubGVuZ3RoICtcclxuICAgICAgICAgICAgYmFyV2lkdGggLyAyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB5PXsoKGJhc2VIZWlnaHQgLSBiYXJIZWlnaHQpIC8gNCkgKiAzICsgcGFkZGluZ1RvcCAtIDV9XHJcbiAgICAgICAgICBmaWxsPXt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuNil9XHJcbiAgICAgICAgICBmb250U2l6ZT1cIjEyXCJcclxuICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtyZW5kZXJMYWJlbChkYXRhW2ldKX1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIHdpdGhIb3Jpem9udGFsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICB3aXRoSW5uZXJMaW5lcyA9IHRydWUsXHJcbiAgICAgIHNob3dCYXJUb3BzID0gdHJ1ZSxcclxuICAgICAgd2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGEgPSBmYWxzZSxcclxuICAgICAgc2hvd1ZhbHVlc09uVG9wT2ZCYXJzID0gZmFsc2UsXHJcbiAgICAgIGZsYXRDb2xvciA9IGZhbHNlLFxyXG4gICAgICBzZWdtZW50cyA9IDRcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHVuaXF1ZUtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IHsgYm9yZGVyUmFkaXVzID0gMCwgcGFkZGluZ1RvcCA9IDE2LCBwYWRkaW5nUmlnaHQgPSA1NSB9ID0gc3R5bGU7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24sXHJcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uLFxyXG4gICAgICBiYXJSYWRpdXM6XHJcbiAgICAgICAgKHRoaXMucHJvcHMuY2hhcnRDb25maWcgJiYgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5iYXJSYWRpdXMpIHx8IDAsXHJcbiAgICAgIGRlY2ltYWxQbGFjZXM6XHJcbiAgICAgICAgKHRoaXMucHJvcHMuY2hhcnRDb25maWcgJiYgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5kZWNpbWFsUGxhY2VzKSA/PyAyLFxyXG4gICAgICBmb3JtYXRZTGFiZWw6XHJcbiAgICAgICAgKHRoaXMucHJvcHMuY2hhcnRDb25maWcgJiYgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5mb3JtYXRZTGFiZWwpIHx8XHJcbiAgICAgICAgZnVuY3Rpb24obGFiZWwpIHtcclxuICAgICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgICAgICB9LFxyXG4gICAgICBmb3JtYXRYTGFiZWw6XHJcbiAgICAgICAgKHRoaXMucHJvcHMuY2hhcnRDb25maWcgJiYgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5mb3JtYXRYTGFiZWwpIHx8XHJcbiAgICAgICAgZnVuY3Rpb24obGFiZWwpIHtcclxuICAgICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgPFN2ZyBoZWlnaHQ9e2hlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1bmlxdWVLZXlcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb2xvcnMoe1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNoYXJ0Q29uZmlnLFxyXG4gICAgICAgICAgICBmbGF0Q29sb3I6IGZsYXRDb2xvcixcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLmRhdGFzZXRzXHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XHJcbiAgICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIGZpbGw9e2B1cmwoI2JhY2tncm91bmRHcmFkaWVudF8ke3VuaXF1ZUtleX0pYH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3dpdGhJbm5lckxpbmVzXHJcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMaW5lcyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgY291bnQ6IHNlZ21lbnRzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7d2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICA/IHRoaXMucmVuZGVySG9yaXpvbnRhbExhYmVscyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgY291bnQ6IHNlZ21lbnRzLFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCBhcyBudW1iZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHNcclxuICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyVmVydGljYWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsczogZGF0YS5sYWJlbHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxPZmZzZXQ6IChiYXJXaWR0aCAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpKSAvIDJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckJhcnMoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICAgICAgICAgICAgIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhOiB3aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdW5pcXVlS2V5XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3Nob3dWYWx1ZXNPblRvcE9mQmFycyAmJlxyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyVmFsdWVzT25Ub3BPZkJhcnMoe1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHtzaG93QmFyVG9wcyAmJlxyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyQmFyVG9wcyh7XHJcbiAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgPC9Tdmc+XHJcbiAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXJDaGFydDtcclxuIl19
