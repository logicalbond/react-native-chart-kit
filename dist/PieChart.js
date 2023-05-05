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
      avoidFalseZero = _e === void 0 ? false : _e;
    var _f = style.borderRadius,
      borderRadius = _f === void 0 ? 0 : _f;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGllQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUQsT0FBTyxhQUFxQyxNQUFNLGlCQUFpQixDQUFDO0FBa0JwRTtJQUF1Qiw0QkFBMkM7SUFBbEU7O0lBeUlBLENBQUM7SUF4SUMseUJBQU0sR0FBTjtRQUFBLGlCQXVJQztRQXRJTyxJQUFBLEtBTUYsSUFBSSxDQUFDLEtBQUssRUFMWixhQUFVLEVBQVYsS0FBSyxtQkFBRyxFQUFFLEtBQUEsRUFDVixlQUFlLHFCQUFBLEVBQ2YsZ0JBQWdCLEVBQWhCLFFBQVEsbUJBQUcsS0FBSyxLQUFBLEVBQ2hCLGlCQUFnQixFQUFoQixTQUFTLG1CQUFHLElBQUksS0FBQSxFQUNoQixzQkFBc0IsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQ1YsQ0FBQztRQUVQLElBQUEsS0FBcUIsS0FBSyxhQUFWLEVBQWhCLFlBQVksbUJBQUcsQ0FBQyxLQUFBLENBQVc7UUFFbkMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lB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TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUF6SUQsQ0FBdUIsYUFBYSxHQXlJbkM7QUFFRCxlQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWUgZnJvbSBcInBhdGhzLWpzL3BpZVwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHsgRywgUGF0aCwgUmVjdCwgU3ZnLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7IEFic3RyYWN0Q2hhcnRQcm9wcyB9IGZyb20gXCIuL0Fic3RyYWN0Q2hhcnRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGllQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZGF0YTogQXJyYXk8YW55PjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGFjY2Vzc29yOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcbiAgcGFkZGluZ0xlZnQ6IHN0cmluZztcclxuICBjZW50ZXI/OiBBcnJheTxudW1iZXI+O1xyXG4gIGFic29sdXRlPzogYm9vbGVhbjtcclxuICBoYXNMZWdlbmQ/OiBib29sZWFuO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGF2b2lkRmFsc2VaZXJvPzogYm9vbGVhbjtcclxufVxyXG5cclxudHlwZSBQaWVDaGFydFN0YXRlID0ge307XHJcblxyXG5jbGFzcyBQaWVDaGFydCBleHRlbmRzIEFic3RyYWN0Q2hhcnQ8UGllQ2hhcnRQcm9wcywgUGllQ2hhcnRTdGF0ZT4ge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc3R5bGUgPSB7fSxcclxuICAgICAgYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICBhYnNvbHV0ZSA9IGZhbHNlLFxyXG4gICAgICBoYXNMZWdlbmQgPSB0cnVlLFxyXG4gICAgICBhdm9pZEZhbHNlWmVybyA9IGZhbHNlXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAgfSA9IHN0eWxlO1xyXG5cclxuICAgIGNvbnN0IGNoYXJ0ID0gUGllKHtcclxuICAgICAgY2VudGVyOiB0aGlzLnByb3BzLmNlbnRlciB8fCBbMCwgMF0sXHJcbiAgICAgIHI6IDAsXHJcbiAgICAgIFI6IHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41LFxyXG4gICAgICBkYXRhOiB0aGlzLnByb3BzLmRhdGEsXHJcbiAgICAgIGFjY2Vzc29yOiB4ID0+IHtcclxuICAgICAgICByZXR1cm4geFt0aGlzLnByb3BzLmFjY2Vzc29yXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWwgPSB0aGlzLnByb3BzLmRhdGEucmVkdWNlKChzdW0sIGl0ZW0pID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIGl0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl07XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICBjb25zdCBzbGljZXMgPSBjaGFydC5jdXJ2ZXMubWFwKChjLCBpKSA9PiB7XHJcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgaWYgKGFic29sdXRlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBjLml0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRvdGFsID09PSAwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IDAgKyBcIiVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IE1hdGgucm91bmQoXHJcbiAgICAgICAgICAgICgxMDAgLyB0b3RhbCkgKiBjLml0ZW1bdGhpcy5wcm9wcy5hY2Nlc3Nvcl1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB2YWx1ZSA9IE1hdGgucm91bmQoKDEwMCAvIHRvdGFsKSAqIGMuaXRlbVt0aGlzLnByb3BzLmFjY2Vzc29yXSkgKyBcIiVcIjtcclxuICAgICAgICAgIGlmIChhdm9pZEZhbHNlWmVybyAmJiBwZXJjZW50YWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXCI8MSVcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gcGVyY2VudGFnZSArIFwiJVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgICAgPFBhdGhcclxuICAgICAgICAgICAgZD17Yy5zZWN0b3IucGF0aC5wcmludCgpfVxyXG4gICAgICAgICAgICBmaWxsPXtjLml0ZW0uY29sb3J9XHJcbiAgICAgICAgICAgIHN0cm9rZT17Yy5pdGVtLmNvbG9yfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHRleHRBbmNob3I9XCJzdGFydFwiXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybT17XHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xyXG4gICAgICAgICAgICAgIGMuc2VjdG9yLmNlbnRyb2lkWzBdICtcclxuICAgICAgICAgICAgICBcIixcIiArXHJcbiAgICAgICAgICAgICAgYy5zZWN0b3IuY2VudHJvaWRbMV0gK1xyXG4gICAgICAgICAgICAgIFwiKVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3ZhbHVlLnJlcGxhY2UoXCIlXCIsIFwiXCIpfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAge2hhc0xlZ2VuZCA/IChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgIGZpbGw9e2MuaXRlbS5jb2xvcn1cclxuICAgICAgICAgICAgICByeD17OH1cclxuICAgICAgICAgICAgICByeT17OH1cclxuICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41IC0gMjR9XHJcbiAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAtKHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMucHJvcHMuaGVpZ2h0ICogMC44KSAvIHRoaXMucHJvcHMuZGF0YS5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICAgICAgICAxMlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge2hhc0xlZ2VuZCA/IChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICBmaWxsPXtjLml0ZW0ubGVnZW5kRm9udENvbG9yfVxyXG4gICAgICAgICAgICAgIGZvbnRTaXplPXtjLml0ZW0ubGVnZW5kRm9udFNpemV9XHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseT17Yy5pdGVtLmxlZ2VuZEZvbnRGYW1pbHl9XHJcbiAgICAgICAgICAgICAgeD17dGhpcy5wcm9wcy53aWR0aCAvIDIuNX1cclxuICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5wcm9wcy5oZWlnaHQgKiAwLjgpIC8gdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCkgKiBpICtcclxuICAgICAgICAgICAgICAgIDEyICogMlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgJHt2YWx1ZX0gJHtjLml0ZW0ubmFtZX1gfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L0c+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Vmlld1xyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgLi4uc3R5bGVcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPFN2ZyB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyRGVmcyh7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgIGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9XHJcbiAgICAgICAgICAgIHJ4PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgIGZpbGw9e2JhY2tncm91bmRDb2xvcn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8R1xyXG4gICAgICAgICAgICB4PXtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLndpZHRoIC8gMiAvIDIgK1xyXG4gICAgICAgICAgICAgIE51bWJlcih0aGlzLnByb3BzLnBhZGRpbmdMZWZ0ID8gdGhpcy5wcm9wcy5wYWRkaW5nTGVmdCA6IDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeT17dGhpcy5wcm9wcy5oZWlnaHQgLyAyfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7c2xpY2VzfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgIDwvU3ZnPlxyXG4gICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGllQ2hhcnQ7XHJcbiJdfQ==
