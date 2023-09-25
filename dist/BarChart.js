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
            y={((baseHeight - barHeight) / 4) * 3 + paddingTop - 2}
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
      paddingTop = _q === void 0 ? 20 : _q,
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
                    paddingRight: withHorizontalLabels ? paddingRight : 20,
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
                paddingRight: withHorizontalLabels ? paddingRight : 20,
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
                  paddingRight: withHorizontalLabels ? paddingRight : 20
                })
              )}
          </G>
          <G>
            {showBarTops &&
              this.renderBarTops(
                __assign(__assign({}, config), {
                  data: data.datasets[0].data,
                  paddingTop: paddingTop,
                  paddingRight: withHorizontalLabels ? paddingRight : 20
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQmFyQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUNMLElBQUksRUFDSixDQUFDLEVBQ0QsY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osR0FBRyxFQUNILElBQUksRUFDTCxNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQWtDcEI7SUFBdUIsNEJBQTJDO0lBQWxFO1FBQUEscUVBd1NDO1FBdlNDLHNCQUFnQixHQUFHO1lBQ1QsSUFBQSxLQUFzQixLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsY0FBM0IsRUFBakIsYUFBYSxtQkFBRyxDQUFDLEtBQUEsQ0FBNEI7WUFDckQsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUYsZ0JBQVUsR0FBRyxVQUNYLEVBY0MsRUFDRCxTQUFpQjtnQkFkZixJQUFJLFVBQUEsRUFDSixLQUFLLFdBQUEsRUFDTCxNQUFNLFlBQUEsRUFDTixVQUFVLGdCQUFBLEVBQ1YsWUFBWSxrQkFBQSxFQUNaLFNBQVMsZUFBQSxFQUNULDBCQUEwQixnQ0FBQTtZQVU1QixJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVyRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxJQUFNLFFB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RUQsZUFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHtcclxuICBEZWZzLFxyXG4gIEcsXHJcbiAgTGluZWFyR3JhZGllbnQsXHJcbiAgUmVjdCxcclxuICBTdG9wLFxyXG4gIFN2ZyxcclxuICBUZXh0XHJcbn0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHNcclxufSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0RGF0YSB9IGZyb20gXCIuL0hlbHBlclR5cGVzXCI7XHJcblxyXG5jb25zdCBiYXJXaWR0aCA9IDMyO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXJDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICBkYXRhOiBDaGFydERhdGE7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBmcm9tWmVybz86IGJvb2xlYW47XHJcbiAgd2l0aElubmVyTGluZXM/OiBib29sZWFuO1xyXG4gIHlBeGlzTGFiZWw6IHN0cmluZztcclxuICB5QXhpc1N1ZmZpeDogc3RyaW5nO1xyXG4gIGNoYXJ0Q29uZmlnOiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGhvcml6b250YWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBTaG93IHZlcnRpY2FsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFZlcnRpY2FsTGFiZWxzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoSG9yaXpvbnRhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBob3Jpem9udGFsIGxpbmVzXHJcbiAgICovXHJcbiAgc2VnbWVudHM/OiBudW1iZXI7XHJcbiAgc2hvd0JhclRvcHM/OiBib29sZWFuO1xyXG4gIHNob3dWYWx1ZXNPblRvcE9mQmFycz86IGJvb2xlYW47XHJcbiAgd2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGE/OiBib29sZWFuO1xyXG4gIGZsYXRDb2xvcj86IGJvb2xlYW47XHJcbn1cclxuXHJcbnR5cGUgQmFyQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgQmFyQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PEJhckNoYXJ0UHJvcHMsIEJhckNoYXJ0U3RhdGU+IHtcclxuICBnZXRCYXJQZXJjZW50YWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBiYXJQZXJjZW50YWdlID0gMSB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiBiYXJQZXJjZW50YWdlO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckJhcnMgPSAoXHJcbiAgICB7XHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgYmFyUmFkaXVzLFxyXG4gICAgICB3aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgfTogUGljazxcclxuICAgICAgT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4sXHJcbiAgICAgIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCIgfCBcImJhclJhZGl1c1wiXHJcbiAgICA+ICYge1xyXG4gICAgICBkYXRhOiBudW1iZXJbXTtcclxuICAgICAgd2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGE6IGJvb2xlYW47XHJcbiAgICB9LFxyXG4gICAgdW5pcXVlS2V5OiBzdHJpbmdcclxuICApID0+IHtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGEsIGhlaWdodCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGEubWFwKCh4LCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJhckhlaWdodCA9IHRoaXMuY2FsY0hlaWdodCh4LCBkYXRhLCBoZWlnaHQpO1xyXG4gICAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFJlY3RcclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHg9e3BhZGRpbmdSaWdodCArIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aH1cclxuICAgICAgICAgIHk9e1xyXG4gICAgICAgICAgICAoKGJhckhlaWdodCA+IDAgPyBiYXNlSGVpZ2h0IC0gYmFySGVpZ2h0IDogYmFzZUhlaWdodCkgLyA0KSAqIDMgK1xyXG4gICAgICAgICAgICBwYWRkaW5nVG9wXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByeD17YmFyUmFkaXVzfVxyXG4gICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxyXG4gICAgICAgICAgaGVpZ2h0PXsoTWF0aC5hYnMoYmFySGVpZ2h0KSAvIDQpICogM31cclxuICAgICAgICAgIGZpbGw9e1xyXG4gICAgICAgICAgICB3aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgID8gYHVybCgjY3VzdG9tQ29sb3JfMF8ke2l9KWBcclxuICAgICAgICAgICAgICA6IGB1cmwoI2ZpbGxTaGFkb3dHcmFkaWVudEZyb21fJHt1bmlxdWVLZXl9KWBcclxuICAgICAgICAgIH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQmFyVG9wcyA9ICh7XHJcbiAgICBkYXRhLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0XHJcbiAgfTogUGljazxcclxuICAgIE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+LFxyXG4gICAgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIlxyXG4gID4gJiB7XHJcbiAgICBkYXRhOiBudW1iZXJbXTtcclxuICB9KSA9PiB7XHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhLCBoZWlnaHQpO1xyXG5cclxuICAgIHJldHVybiBkYXRhLm1hcCgoeCwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBiYXJIZWlnaHQgPSB0aGlzLmNhbGNIZWlnaHQoeCwgZGF0YSwgaGVpZ2h0KTtcclxuICAgICAgY29uc3QgYmFyV2lkdGggPSAzMiAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxSZWN0XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4PXtwYWRkaW5nUmlnaHQgKyAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8gZGF0YS5sZW5ndGh9XHJcbiAgICAgICAgICB5PXsoKGJhc2VIZWlnaHQgLSBiYXJIZWlnaHQpIC8gNCkgKiAzICsgcGFkZGluZ1RvcH1cclxuICAgICAgICAgIHdpZHRoPXtiYXJXaWR0aH1cclxuICAgICAgICAgIGhlaWdodD17Mn1cclxuICAgICAgICAgIGZpbGw9e3RoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC42KX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQ29sb3JzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICBmbGF0Q29sb3JcclxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPiAmIHtcclxuICAgIGZsYXRDb2xvcjogYm9vbGVhbjtcclxuICB9KSA9PiB7XHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiAoXHJcbiAgICAgIDxEZWZzIGtleT17ZGF0YXNldC5rZXkgPz8gaW5kZXh9PlxyXG4gICAgICAgIHtkYXRhc2V0LmNvbG9ycz8ubWFwKChjb2xvciwgY29sb3JJbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaGlnaE9wYWNpdHlDb2xvciA9IGNvbG9yKDEuMCk7XHJcbiAgICAgICAgICBjb25zdCBsb3dPcGFjaXR5Q29sb3IgPSBjb2xvcigwLjEpO1xyXG5cclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMaW5lYXJHcmFkaWVudFxyXG4gICAgICAgICAgICAgIGlkPXtgY3VzdG9tQ29sb3JfJHtpbmRleH1fJHtjb2xvckluZGV4fWB9XHJcbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1fJHtjb2xvckluZGV4fWB9XHJcbiAgICAgICAgICAgICAgeDE9ezB9XHJcbiAgICAgICAgICAgICAgeTE9ezB9XHJcbiAgICAgICAgICAgICAgeDI9ezB9XHJcbiAgICAgICAgICAgICAgeTI9ezF9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPXtoaWdoT3BhY2l0eUNvbG9yfSBzdG9wT3BhY2l0eT1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgIHtmbGF0Q29sb3IgPyAoXHJcbiAgICAgICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtoaWdoT3BhY2l0eUNvbG9yfSBzdG9wT3BhY2l0eT1cIjFcIiAvPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtsb3dPcGFjaXR5Q29sb3J9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvRGVmcz5cclxuICAgICkpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZhbHVlc09uVG9wT2ZCYXJzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHRcclxuICB9OiBQaWNrPFxyXG4gICAgT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4sXHJcbiAgICBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXHJcbiAgPiAmIHtcclxuICAgIGRhdGE6IG51bWJlcltdO1xyXG4gIH0pID0+IHtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGEsIGhlaWdodCk7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyTGFiZWwgPSAodmFsdWU6IG51bWJlcikgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5jaGFydENvbmZpZy5mb3JtYXRUb3BCYXJWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmZvcm1hdFRvcEJhclZhbHVlKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgY29uc3QgYmFySGVpZ2h0ID0gdGhpcy5jYWxjSGVpZ2h0KHgsIGRhdGEsIGhlaWdodCk7XHJcbiAgICAgIGNvbnN0IGJhcldpZHRoID0gMzIgKiB0aGlzLmdldEJhclBlcmNlbnRhZ2UoKTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGV4dFxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17XHJcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAgIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aCArXHJcbiAgICAgICAgICAgIGJhcldpZHRoIC8gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgeT17KChiYXNlSGVpZ2h0IC0gYmFySGVpZ2h0KSAvIDQpICogMyArIHBhZGRpbmdUb3AgLSAyfVxyXG4gICAgICAgICAgZmlsbD17dGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcigwLjYpfVxyXG4gICAgICAgICAgZm9udFNpemU9XCIxMlwiXHJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7cmVuZGVyTGFiZWwoZGF0YVtpXSl9XHJcbiAgICAgICAgPC9UZXh0PlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBzdHlsZSA9IHt9LFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHdpdGhWZXJ0aWNhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9IDAsXHJcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgICAgd2l0aElubmVyTGluZXMgPSB0cnVlLFxyXG4gICAgICBzaG93QmFyVG9wcyA9IHRydWUsXHJcbiAgICAgIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhID0gZmFsc2UsXHJcbiAgICAgIHNob3dWYWx1ZXNPblRvcE9mQmFycyA9IGZhbHNlLFxyXG4gICAgICBmbGF0Q29sb3IgPSBmYWxzZSxcclxuICAgICAgc2VnbWVudHMgPSA0XHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB1bmlxdWVLZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAsIHBhZGRpbmdUb3AgPSAyMCwgcGFkZGluZ1JpZ2h0ID0gNTUgfSA9IHN0eWxlO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbFJvdGF0aW9uLFxyXG4gICAgICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbixcclxuICAgICAgYmFyUmFkaXVzOlxyXG4gICAgICAgICh0aGlzLnByb3BzLmNoYXJ0Q29uZmlnICYmIHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzKSB8fCAwLFxyXG4gICAgICBkZWNpbWFsUGxhY2VzOlxyXG4gICAgICAgICh0aGlzLnByb3BzLmNoYXJ0Q29uZmlnICYmIHRoaXMucHJvcHMuY2hhcnRDb25maWcuZGVjaW1hbFBsYWNlcykgPz8gMixcclxuICAgICAgZm9ybWF0WUxhYmVsOlxyXG4gICAgICAgICh0aGlzLnByb3BzLmNoYXJ0Q29uZmlnICYmIHRoaXMucHJvcHMuY2hhcnRDb25maWcuZm9ybWF0WUxhYmVsKSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGxhYmVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgZm9ybWF0WExhYmVsOlxyXG4gICAgICAgICh0aGlzLnByb3BzLmNoYXJ0Q29uZmlnICYmIHRoaXMucHJvcHMuY2hhcnRDb25maWcuZm9ybWF0WExhYmVsKSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uKGxhYmVsKSB7XHJcbiAgICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VmlldyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgIDxTdmcgaGVpZ2h0PXtoZWlnaHR9IHdpZHRoPXt3aWR0aH0+XHJcbiAgICAgICAgICB7dGhpcy5yZW5kZXJEZWZzKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5pcXVlS2V5XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge3RoaXMucmVuZGVyQ29sb3JzKHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZyxcclxuICAgICAgICAgICAgZmxhdENvbG9yOiBmbGF0Q29sb3IsXHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YS5kYXRhc2V0c1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGFydENvbmZpZy51c2VCYWNrZ3JvdW5kQ2FudmFzICYmIChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgIHJ4PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICBmaWxsPXtgdXJsKCNiYWNrZ3JvdW5kR3JhZGllbnRfJHt1bmlxdWVLZXl9KWB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoSW5uZXJMaW5lc1xyXG4gICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50cyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3dpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50cyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nUmlnaHQgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7d2l0aFZlcnRpY2FsTGFiZWxzXHJcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbHM6IGRhdGEubGFiZWxzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IDIwLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbE9mZnNldDogKGJhcldpZHRoICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCkpIC8gMlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyQmFycyhcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgOiAyMCxcclxuICAgICAgICAgICAgICAgIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhOiB3aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdW5pcXVlS2V5XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3Nob3dWYWx1ZXNPblRvcE9mQmFycyAmJlxyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyVmFsdWVzT25Ub3BPZkJhcnMoe1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgIDogMjBcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7c2hvd0JhclRvcHMgJiZcclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlckJhclRvcHMoe1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgIDogMjBcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhckNoYXJ0O1xyXG4iXX0=
