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
              x={_this.props.width / 2.5 - 24}
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
              x={_this.props.width / 2.5}
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
              )
            )}
          </G>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGllQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUQsT0FBTyxhQUFxQyxNQUFNLGlCQUFpQixDQUFDO0FBbUJwRTtJQUF1Qiw0QkFBMkM7SUFBbEU7O0lBNElBLENBQUM7SUEzSUMseUJBQU0sR0FBTjtRQUFBLGlCQTBJQztRQXpJTyxJQUFBLEtBT0YsSUFBSSxDQUFDLEtBQUssRUFOWixhQUFVLEVBQVYsS0FBSyxtQkFBRyxFQUFFLEtBQUEsRUFDVixlQUFlLHFCQUFBLEVBQ2YsZ0JBQWdCLEVBQWhCLFFBQVEsbUJBQUcsS0FBSyxLQUFBLEVBQ2hCLGlCQUFnQixFQUFoQixTQUFTLG1CQUFHLElBQUksS0FBQSxFQUNoQixzQkFBc0IsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsRUFDdEIsOEJBQThCLEVBQTlCLHNCQUFzQixtQkFBRyxLQUFLLEtBQ2xCLENBQUM7UUFFUCxJQUFBLEtBQXFCLEtBQUssYUFBVixFQUFoQixZQUFZLG1CQUFHLENBQUMsS0FBQSxDQUFXO1FBRW5DLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUc7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Q0FBQyxDQUFDLENBRXpCO1lBQUEsQ0FBQyxNQUFNLENBQ1Q7VUFBQSxFQUFFLENBQUMsQ0FDTDtRQUFBLEVBQUUsR0FBRyxDQUNQO01BQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBNUlELENBQXVCLGFBQWEsR0E0SW5DO0FBRUQsZUFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGllIGZyb20gXCJwYXRocy1qcy9waWVcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7IEcsIFBhdGgsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwgeyBBYnN0cmFjdENoYXJ0UHJvcHMgfSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBpZUNoYXJ0UHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIGRhdGE6IEFycmF5PGFueT47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBhY2Nlc3Nvcjogc3RyaW5nO1xyXG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xyXG4gIHBhZGRpbmdMZWZ0OiBzdHJpbmc7XHJcbiAgY2VudGVyPzogQXJyYXk8bnVtYmVyPjtcclxuICBhYnNvbHV0ZT86IGJvb2xlYW47XHJcbiAgaGFzTGVnZW5kPzogYm9vbGVhbjtcclxuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcclxuICBhdm9pZEZhbHNlWmVybz86IGJvb2xlYW47XHJcbiAgc2hvd1ZhbHVlc0luc2lkZVBpZWNlcz86IGJvb2xlYW47XHJcbn1cclxuXHJcbnR5cGUgUGllQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgUGllQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PFBpZUNoYXJ0UHJvcHMsIFBpZUNoYXJ0U3RhdGU+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcixcclxuICAgICAgYWJzb2x1dGUgPSBmYWxzZSxcclxuICAgICAgaGFzTGVnZW5kID0gdHJ1ZSxcclxuICAgICAgYXZvaWRGYWxzZVplcm8gPSBmYWxzZSxcclxuICAgICAgc2hvd1ZhbHVlc0luc2lkZVBpZWNlcyA9IGZhbHNlXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAgfSA9IHN0eWxlO1xyXG5cclxuICAgIGNvbnN0IGNoYXJ0ID0gUGllKHtcclxuICAgICAgY2VudGVyOiB0aGlzLnByb3BzLmNlbnRlciB8fCBbMCwgMF0sXHJcbiAgICAgIHI6IDAsXHJcbiAgICAgIFI6IHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41LFxyXG4gICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgIGFjY2Vzc29yOiB4ID0+IHtcclxuICAgICAgICByZXR1cm4geFt0aGlzLnByb3BzLmFjY2Vzc29yXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWwgPSB0aGlzLnByb3BzLmRhdGEucmVkdWNlKChzdW0sIGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIGl0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl07XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICBjb25zdCBzbGljZXMgPSBjaGFydC5jdXJ2ZXMubWFwKChjLCBpKSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgaWYgKGFic29sdXRlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBjLml0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRvdGFsID09PSAwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IDAgKyBcIiVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgICAgICgxMDAgLyB0b3RhbCkgKiBjLml0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB2YWx1ZSA9IE1hdGgucm91bmQoKDEwMCAvIHRvdGFsKSAqIGMuaXRlbVt0aGlzLnByb3BzLmFjY2Vzc29yXSkgKyBcIiVcIjtcclxuICAgICAgICAgIGlmIChhdm9pZEZhbHNlWmVybyAmJiBwZXJjZW50YWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXCI8MSVcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gcGVyY2VudGFnZSArIFwiJVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgICAgPFBhdGhcclxuICAgICAgICAgICAgZD17Yy5zZWN0b3IucGF0aC5wcmludCgpfVxyXG4gICAgICAgICAgICBmaWxsPXtjLml0ZW0uY29sb3J9XHJcbiAgICAgICAgICAgIHN0cm9rZT17Yy5pdGVtLmNvbG9yfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtzaG93VmFsdWVzSW5zaWRlUGllY2VzICYmIChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICB0ZXh0QW5jaG9yPVwic3RhcnRcIlxyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybT17XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZShcIiArXHJcbiAgICAgICAgICAgICAgICBjLnNlY3Rvci5jZW50cm9pZFswXSArXHJcbiAgICAgICAgICAgICAgICBcIixcIiArXHJcbiAgICAgICAgICAgICAgICBjLnNlY3Rvci5jZW50cm9pZFsxXSArXHJcbiAgICAgICAgICAgICAgICBcIilcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt2YWx1ZS5yZXBsYWNlKFwiJVwiLCBcIlwiKX1cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHtoYXNMZWdlbmQgPyAoXHJcbiAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgd2lkdGg9XCIxNnB4XCJcclxuICAgICAgICAgICAgICBoZWlnaHQ9XCIxNnB4XCJcclxuICAgICAgICAgICAgICBmaWxsPXtjLml0ZW0uY29sb3J9XHJcbiAgICAgICAgICAgICAgcng9ezh9XHJcbiAgICAgICAgICAgICAgcnk9ezh9XHJcbiAgICAgICAgICAgICAgeD17dGhpcy5wcm9wcy53aWR0aCAvIDIuNSAtIDI0fVxyXG4gICAgICAgICAgICAgIHk9e1xyXG4gICAgICAgICAgICAgICAgLSh0aGlzLnByb3BzLmhlaWdodCAvIDIuNSkgK1xyXG4gICAgICAgICAgICAgICAgKCh0aGlzLnByb3BzLmhlaWdodCAqIDAuOCkgLyB0aGlzLnByb3BzLmRhdGEubGVuZ3RoKSAqIGkgK1xyXG4gICAgICAgICAgICAgICAgMTJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIHtoYXNMZWdlbmQgPyAoXHJcbiAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgZmlsbD17Yy5pdGVtLmxlZ2VuZEZvbnRDb2xvcn1cclxuICAgICAgICAgICAgICBmb250U2l6ZT17Yy5pdGVtLmxlZ2VuZEZvbnRTaXplfVxyXG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk9e2MuaXRlbS5sZWdlbmRGb250RmFtaWx5fVxyXG4gICAgICAgICAgICAgIHg9e3RoaXMucHJvcHMud2lkdGggLyAyLjV9XHJcbiAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAtKHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMucHJvcHMuaGVpZ2h0ICogMC44KSAvIHRoaXMucHJvcHMuZGF0YS5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICAgICAgICAxMiAqIDJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7YCR7dmFsdWV9ICR7Yy5pdGVtLm5hbWV9YH1cclxuICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPC9HPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFZpZXdcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgIC4uLnN0eWxlXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxTdmcgd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9PlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoe1xyXG4gICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLmhlaWdodCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxyXG4gICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICBmaWxsPXtiYWNrZ3JvdW5kQ29sb3J9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEdcclxuICAgICAgICAgICAgeD17XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aWR0aCAvIDIgLyAyICtcclxuICAgICAgICAgICAgICBOdW1iZXIodGhpcy5wcm9wcy5wYWRkaW5nTGVmdCA/IHRoaXMucHJvcHMucGFkZGluZ0xlZnQgOiAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHk9e3RoaXMucHJvcHMuaGVpZ2h0IC8gMn1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3NsaWNlc31cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBpZUNoYXJ0O1xyXG4iXX0=
