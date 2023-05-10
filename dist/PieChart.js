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
import Pie from "paths-js/pie";
import React from "react";
import { View } from "react-native";
import { G, Path, Rect, Svg, Text } from "react-native-svg";
import AbstractChart from "./AbstractChart";
var PieChart = /** @class */ (function(_super) {
  __extends(PieChart, _super);
  function PieChart() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  PieChart.prototype.render = function() {
    var _this = this;
    var uniqueKey = Math.random().toString();
    var _a = this.props,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      backgroundColor = _a.backgroundColor,
      _c = _a.absolute,
      absolute = _c === void 0 ? false : _c,
      _d = _a.hasLegend,
      hasLegend = _d === void 0 ? true : _d,
      _e = _a.avoidFalseZero,
      avoidFalseZero = _e === void 0 ? false : _e,
      _f = _a.showValuesInsidePieces,
      showValuesInsidePieces = _f === void 0 ? false : _f;
    var _g = style.borderRadius,
      borderRadius = _g === void 0 ? 0 : _g;
    var chart = Pie({
      center: this.props.center || [0, 0],
      r: 0,
      R: this.props.height / 2.5,
      data: this.props.data,
      accessor: function(x) {
        return x[_this.props.accessor];
      }
    });
    var total = this.props.data.reduce(function(sum, item) {
      return sum + item[_this.props.accessor];
    }, 0);
    var slices = chart.curves.map(function(c, i) {
      var value;
      if (absolute) {
        value = c.item[_this.props.accessor];
      } else {
        if (total === 0) {
          value = 0 + "%";
        } else {
          var percentage = Math.round(
            (100 / total) * c.item[_this.props.accessor]
          );
          value =
            Math.round((100 / total) * c.item[_this.props.accessor]) + "%";
          if (avoidFalseZero && percentage === 0) {
            value = "<1%";
          } else {
            value = percentage + "%";
          }
        }
      }
      return (
        <G key={Math.random()}>
          <Path
            d={c.sector.path.print()}
            fill={c.item.color}
            stroke={c.item.color}
          />
          {showValuesInsidePieces && (
            <Text
              textAnchor="start"
              transform={
                "translate(" +
                c.sector.centroid[0] +
                "," +
                c.sector.centroid[1] +
                ")"
              }
            >
              {value.replace("%", "")}
            </Text>
          )}
          {hasLegend ? (
            <Rect
              width="16px"
              height="16px"
              fill={c.item.color}
              rx={8}
              ry={8}
              x={_this.props.width / 2.5 - 14}
              y={
                -(_this.props.height / 2.5) +
                ((_this.props.height * 0.8) / _this.props.data.length) * i +
                12
              }
            />
          ) : null}
          {hasLegend ? (
            <Text
              fill={c.item.legendFontColor}
              fontSize={c.item.legendFontSize}
              fontFamily={c.item.legendFontFamily}
              x={_this.props.width / 2.5 + 6}
              y={
                -(_this.props.height / 2.5) +
                ((_this.props.height * 0.8) / _this.props.data.length) * i +
                12 * 2
              }
            >
              {"".concat(value, " ").concat(c.item.name)}
            </Text>
          ) : null}
        </G>
      );
    });
    return (
      <View
        style={__assign(
          { width: this.props.width, height: this.props.height, padding: 0 },
          style
        )}
      >
        <Svg width={this.props.width} height={this.props.height}>
          <G>
            {this.renderDefs(
              __assign(
                { width: this.props.height, height: this.props.height },
                this.props.chartConfig
              ),
              uniqueKey
            )}
          </G>
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={this.props.height}
              rx={borderRadius}
              ry={borderRadius}
              fill={"url(#backgroundGradient_".concat(uniqueKey, ")")}
            />
          )}
          <Rect
            width="100%"
            height={this.props.height}
            rx={borderRadius}
            ry={borderRadius}
            fill={backgroundColor}
          />
          <G
            x={
              this.props.width / 2 / 2 +
              5 +
              Number(this.props.paddingLeft ? this.props.paddingLeft : 0)
            }
            y={this.props.height / 2}
          >
            {slices}
          </G>
        </Svg>
      </View>
    );
  };
  return PieChart;
})(AbstractChart);
export default PieChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGllQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUQsT0FBTyxhQUFxQyxNQUFNLGlCQUFpQixDQUFDO0FBbUJwRTtJQUF1Qiw0QkFBMkM7SUFBbEU7O0lBMkpBLENBQUM7SUExSkMseUJBQU0sR0FBTjtRQUFBLGlCQXlKQztRQXhKQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckMsSUFBQSxLQU9GLElBQUksQ0FBQyxLQUFLLEVBTlosYUFBVSxFQUFWLEtBQUssbUJBQUcsRUFBRSxLQUFBLEVBQ1YsZUFBZSxxQkFBQSxFQUNmLGdCQUFnQixFQUFoQixRQUFRLG1CQUFHLEtBQUssS0FBQSxFQUNoQixpQkFBZ0IsRUFBaEIsU0FBUyxtQkFBRyxJQUFJLEtBQUEsRUFDaEIsc0JBQXNCLEVBQXRCLGNBQWMsbUJBQUcsS0FBSyxLQUFBLEVBQ3RCLDhCQUE4QixFQUE5QixzQkFBc0IsbUJBQUcsS0FBSyxLQUNsQixDQUFDO1FBRVAsSUFBQSxLQUFxQixLQUFLLGFBQVYsRUFBaEIsWUFBWSxtQkFBRyxDQUFDLEtBQUEsQ0FBVztRQUVuQyxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxDQUFD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QzFCLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUNqQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDakIsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBRXhCO1VBQUEsQ0FBQyxDQUFDLENBQ0EsQ0FBQyxDQUFDLENBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVELENBQ0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBRXpCO1lBQUEsQ0FBQyxNQUFNLENBQ1Q7VUFBQSxFQUFFLENBQUMsQ0FDTDtRQUFBLEVBQUUsR0FBRyxDQUNQO01BQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBM0pELENBQXVCLGFBQWEsR0EySm5DO0FBRUQsZUFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGllIGZyb20gXCJwYXRocy1qcy9waWVcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7IEcsIFBhdGgsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwgeyBBYnN0cmFjdENoYXJ0UHJvcHMgfSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBpZUNoYXJ0UHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIGRhdGE6IEFycmF5PGFueT47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBhY2Nlc3Nvcjogc3RyaW5nO1xyXG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xyXG4gIHBhZGRpbmdMZWZ0OiBzdHJpbmc7XHJcbiAgY2VudGVyPzogQXJyYXk8bnVtYmVyPjtcclxuICBhYnNvbHV0ZT86IGJvb2xlYW47XHJcbiAgaGFzTGVnZW5kPzogYm9vbGVhbjtcclxuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcclxuICBhdm9pZEZhbHNlWmVybz86IGJvb2xlYW47XHJcbiAgc2hvd1ZhbHVlc0luc2lkZVBpZWNlcz86IGJvb2xlYW47XHJcbn1cclxuXHJcbnR5cGUgUGllQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgUGllQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PFBpZUNoYXJ0UHJvcHMsIFBpZUNoYXJ0U3RhdGU+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB1bmlxdWVLZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBzdHlsZSA9IHt9LFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgIGFic29sdXRlID0gZmFsc2UsXHJcbiAgICAgIGhhc0xlZ2VuZCA9IHRydWUsXHJcbiAgICAgIGF2b2lkRmFsc2VaZXJvID0gZmFsc2UsXHJcbiAgICAgIHNob3dWYWx1ZXNJbnNpZGVQaWVjZXMgPSBmYWxzZVxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgeyBib3JkZXJSYWRpdXMgPSAwIH0gPSBzdHlsZTtcclxuXHJcbiAgICBjb25zdCBjaGFydCA9IFBpZSh7XHJcbiAgICAgIGNlbnRlcjogdGhpcy5wcm9wcy5jZW50ZXIgfHwgWzAsIDBdLFxyXG4gICAgICByOiAwLFxyXG4gICAgICBSOiB0aGlzLnByb3BzLmhlaWdodCAvIDIuNSxcclxuICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLFxyXG4gICAgICBhY2Nlc3NvcjogeCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHhbdGhpcy5wcm9wcy5hY2Nlc3Nvcl07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5wcm9wcy5kYXRhLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdW0gKyBpdGVtW3RoaXMucHJvcHMuYWNjZXNzb3JdO1xyXG4gICAgfSwgMCk7XHJcblxyXG4gICAgY29uc3Qgc2xpY2VzID0gY2hhcnQuY3VydmVzLm1hcCgoYywgaSkgPT4ge1xyXG4gICAgICBsZXQgdmFsdWU6IHN0cmluZztcclxuXHJcbiAgICAgIGlmIChhYnNvbHV0ZSkge1xyXG4gICAgICAgIHZhbHVlID0gYy5pdGVtW3RoaXMucHJvcHMuYWNjZXNzb3JdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0b3RhbCA9PT0gMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAwICsgXCIlXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAoMTAwIC8gdG90YWwpICogYy5pdGVtW3RoaXMucHJvcHMuYWNjZXNzb3JdXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKCgxMDAgLyB0b3RhbCkgKiBjLml0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl0pICsgXCIlXCI7XHJcbiAgICAgICAgICBpZiAoYXZvaWRGYWxzZVplcm8gJiYgcGVyY2VudGFnZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFwiPDElXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHBlcmNlbnRhZ2UgKyBcIiVcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cclxuICAgICAgICAgIDxQYXRoXHJcbiAgICAgICAgICAgIGQ9e2Muc2VjdG9yLnBhdGgucHJpbnQoKX1cclxuICAgICAgICAgICAgZmlsbD17Yy5pdGVtLmNvbG9yfVxyXG4gICAgICAgICAgICBzdHJva2U9e2MuaXRlbS5jb2xvcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7c2hvd1ZhbHVlc0luc2lkZVBpZWNlcyAmJiAoXHJcbiAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cInN0YXJ0XCJcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm09e1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xyXG4gICAgICAgICAgICAgICAgYy5zZWN0b3IuY2VudHJvaWRbMF0gK1xyXG4gICAgICAgICAgICAgICAgXCIsXCIgK1xyXG4gICAgICAgICAgICAgICAgYy5zZWN0b3IuY2VudHJvaWRbMV0gK1xyXG4gICAgICAgICAgICAgICAgXCIpXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7dmFsdWUucmVwbGFjZShcIiVcIiwgXCJcIil9XHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7aGFzTGVnZW5kID8gKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTZweFwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgICAgZmlsbD17Yy5pdGVtLmNvbG9yfVxyXG4gICAgICAgICAgICAgIHJ4PXs4fVxyXG4gICAgICAgICAgICAgIHJ5PXs4fVxyXG4gICAgICAgICAgICAgIHg9e3RoaXMucHJvcHMud2lkdGggLyAyLjUgLSAxNH1cclxuICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5wcm9wcy5oZWlnaHQgKiAwLjgpIC8gdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCkgKiBpICtcclxuICAgICAgICAgICAgICAgIDEyXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICB7aGFzTGVnZW5kID8gKFxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgIGZpbGw9e2MuaXRlbS5sZWdlbmRGb250Q29sb3J9XHJcbiAgICAgICAgICAgICAgZm9udFNpemU9e2MuaXRlbS5sZWdlbmRGb250U2l6ZX1cclxuICAgICAgICAgICAgICBmb250RmFtaWx5PXtjLml0ZW0ubGVnZW5kRm9udEZhbWlseX1cclxuICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41ICsgNn1cclxuICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5wcm9wcy5oZWlnaHQgKiAwLjgpIC8gdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCkgKiBpICtcclxuICAgICAgICAgICAgICAgIDEyICogMlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgJHt2YWx1ZX0gJHtjLml0ZW0ubmFtZX1gfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L0c+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Vmlld1xyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgLi4uc3R5bGVcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPFN2ZyB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyRGVmcyhcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgdW5pcXVlS2V5XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGFydENvbmZpZy51c2VCYWNrZ3JvdW5kQ2FudmFzICYmIChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9XHJcbiAgICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIGZpbGw9e2B1cmwoI2JhY2tncm91bmRHcmFkaWVudF8ke3VuaXF1ZUtleX0pYH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxyXG4gICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICBmaWxsPXtiYWNrZ3JvdW5kQ29sb3J9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEdcclxuICAgICAgICAgICAgeD17XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCAvIDIgLyAyICtcclxuICAgICAgICAgICAgICA1ICtcclxuICAgICAgICAgICAgICBOdW1iZXIodGhpcy5wcm9wcy5wYWRkaW5nTGVmdCA/IHRoaXMucHJvcHMucGFkZGluZ0xlZnQgOiAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHk9e3RoaXMucHJvcHMuaGVpZ2h0IC8gMn1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3NsaWNlc31cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBpZUNoYXJ0O1xyXG4iXX0=
