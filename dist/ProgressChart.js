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
var ProgressChart = /** @class */ (function(_super) {
  __extends(ProgressChart, _super);
  function ProgressChart() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ProgressChart.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      style = _a.style,
      data = _a.data,
      hideLegend = _a.hideLegend,
      strokeWidth = _a.strokeWidth,
      strokeColor = _a.strokeColor,
      radius = _a.radius;
    var _b = style.borderRadius,
      borderRadius = _b === void 0 ? 0 : _b,
      _c = style.margin,
      margin = _c === void 0 ? 0 : _c,
      _d = style.marginRight,
      marginRight = _d === void 0 ? 0 : _d;
    if (Array.isArray(data)) {
      data = {
        data: data
      };
    }
    var pies = data.data.map(function(pieData, i) {
      var r =
        ((height / 2 - 32) /
          (Array.isArray(data) ? data.length : data.data.length)) *
          i +
        radius;
      return Pie({
        r: r,
        R: r,
        center: [0, 0],
        data: [pieData, 1 - pieData],
        accessor: function(x) {
          return x;
        }
      });
    });
    var pieBackgrounds = data.data.map(function(pieData, i) {
      var r =
        ((height / 2 - 32) /
          (Array.isArray(data) ? data.length : data.data.length)) *
          i +
        radius;
      return Pie({
        r: r,
        R: r,
        center: [0, 0],
        data: [0.999, 0.001],
        accessor: function(x) {
          return x;
        }
      });
    });
    var withLabel = function(i) {
      return data.labels && data.labels[i];
    };
    var withColor = function(i) {
      return data.colors && data.colors[i];
    };
    var legend = !hideLegend && (
      <>
        <G>
          {pies.map(function(_, i) {
            return (
              <Rect
                key={Math.random()}
                width="16px"
                height="16px"
                fill={
                  _this.props.withCustomBarColorFromData
                    ? withColor(i)
                    : strokeColor
                    ? strokeColor(0.7 * (i + 1), i)
                    : _this.props.chartConfig.color(0.7 * (i + 1), i)
                }
                rx={8}
                ry={8}
                x={_this.props.width / 2.5 - 24}
                y={
                  -(_this.props.height / 2.5) +
                  ((_this.props.height * 0.8) /
                    (Array.isArray(data) ? data.length : data.data.length)) *
                    i +
                  12
                }
              />
            );
          })}
        </G>
        <G>
          {pies.map(function(_, i) {
            return (
              <Text
                key={Math.random()}
                x={_this.props.width / 2.5}
                y={
                  -(_this.props.height / 2.5) +
                  ((_this.props.height * 0.8) /
                    (Array.isArray(data) ? data.length : data.data.length)) *
                    i +
                  12 * 2
                }
                {..._this.getPropsForLabels()}
              >
                {withLabel(i)
                  ? ""
                      .concat(data.labels[i], " ")
                      .concat(Math.round(100 * data.data[i]), "%")
                  : "".concat(Math.round(100 * data.data[i]), "%")}
              </Text>
            );
          })}
        </G>
      </>
    );
    return (
      <View
        style={__assign({ width: width, height: height, padding: 0 }, style)}
      >
        <Svg width={width - margin * 2 - marginRight} height={height}>
          {this.renderDefs(
            __assign(
              { width: this.props.height, height: this.props.height },
              this.props.chartConfig
            )
          )}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={this.props.height}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
            />
          )}
          <G
            x={this.props.width / (hideLegend ? 2 : 2.5)}
            y={this.props.height / 2}
          >
            <G>
              {pieBackgrounds.map(function(pie, i) {
                return (
                  <Path
                    key={Math.random()}
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={strokeWidth}
                    stroke={_this.props.chartConfig.color(0.2, i)}
                  />
                );
              })}
            </G>
            <G>
              {pies.map(function(pie, i) {
                return (
                  <Path
                    key={Math.random()}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={strokeWidth}
                    stroke={
                      _this.props.withCustomBarColorFromData
                        ? withColor(i)
                        : strokeColor
                        ? strokeColor((i / pies.length) * 0.7 + 0.5, i)
                        : _this.props.chartConfig.color(
                            (i / pies.length) * 0.7 + 0.5,
                            i
                          )
                    }
                  />
                );
              })}
            </G>
            {legend}
          </G>
        </Svg>
      </View>
    );
  };
  ProgressChart.defaultProps = { style: {}, strokeWidth: 16, radius: 32 };
  return ProgressChart;
})(AbstractChart);
export default ProgressChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9ncmVzc0NoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLElBQUksRUFBYSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVELE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBd0J6QjtJQUE0QixpQ0FHM0I7SUFIRDs7SUFvTUEsQ0FBQztJQTlMQyw4QkFBTSxHQUFOO1FBQUEsaUJBNkxDO1FBNUxLLElBQUEsS0FTQSxJQUFJLENBQUMsS0FBSyxFQVJaLEtBQUssV0FBQSxFQUNMLE1BQU0sWUFBQSxFQUNOLEtBQUssV0FBQSxFQUNMLElBQUksVUFBQSxFQUNKLFVBQVUsZ0JBQUEsRUFDVixXQUFXLGlCQUFBLEVBQ1gsV0FBVyxpQkFBQSxFQUNYLE1BQU0sWUFDTSxDQUFDO1FBRVAsSUFBQSxLQUFrRCxLQUFLLGFBQXZDLEVBQWhCLFlBQVksbUJBQUcsQ0FBQyxLQUFBLEVBQUUsS0FBZ0MsS0FBSyxPQUEzQixFQUFWLE1BQU0sbUJBQUcsQ0FBQyxLQUFBLEVBQUUsS0FBb0IsS0FBSyxZQUFWLEVBQWYsV0FBVyxtQkFBRyxDQUFDLEtBQUEsQ0FBVztRQUVoRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxHQUFHO2dCQUNMLElBQUksTUFBQTthQUNMLENBQUM7U0FDSDtRQUVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLENB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QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FDckMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQ3pCLE1BQU0sQ0FBQyxDQUNMLEtBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCO3dCQUNuQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxDQUFDLENBQUMsV0FBVzs0QkFDYixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDL0MsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FDMUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLENBQUMsQ0FDRixDQUNOLEVBQ0QsQ0FDSCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0o7WUFBQSxFQUFFLENBQUMsQ0FDSDtZQUFBLENBQUMsTUFBTSxDQUNUO1VBQUEsRUFBRSxDQUFDLENBQ0w7UUFBQSxFQUFFLEdBQUcsQ0FDUDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztJQUNKLENBQUM7SUEvTGEsMEJBQVksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFnTTFFLG9CQUFDO0NBQUEsQUFwTUQsQ0FBNEIsYUFBYSxHQW9NeEM7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWUgZnJvbSBcInBhdGhzLWpzL3BpZVwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHsgRywgUGF0aCwgUmVjdCwgU3ZnLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHNcclxufSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcblxyXG5leHBvcnQgdHlwZSBQcm9ncmVzc0NoYXJ0RGF0YSA9XHJcbiAgfCBBcnJheTxudW1iZXI+XHJcbiAgfCB7IGxhYmVscz86IEFycmF5PHN0cmluZz47IGNvbG9ycz86IEFycmF5PHN0cmluZz47IGRhdGE6IEFycmF5PG51bWJlcj4gfTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICBkYXRhOiBQcm9ncmVzc0NoYXJ0RGF0YTtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGNlbnRlcj86IEFycmF5PG51bWJlcj47XHJcbiAgYWJzb2x1dGU/OiBib29sZWFuO1xyXG4gIGhhc0xlZ2VuZD86IGJvb2xlYW47XHJcbiAgc3R5bGU/OiBQYXJ0aWFsPFZpZXdTdHlsZT47XHJcbiAgY2hhcnRDb25maWc/OiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xyXG4gIGhpZGVMZWdlbmQ/OiBib29sZWFuO1xyXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xyXG4gIHN0cm9rZUNvbG9yPzogKG9wYWNpdHk6IG51bWJlciwgaW5kZXg/OiBudW1iZXIpID0+IHN0cmluZztcclxuICByYWRpdXM/OiBudW1iZXI7XHJcbiAgd2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGE/OiBib29sZWFuO1xyXG59XHJcblxyXG50eXBlIFByb2dyZXNzQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgUHJvZ3Jlc3NDaGFydCBleHRlbmRzIEFic3RyYWN0Q2hhcnQ8XHJcbiAgUHJvZ3Jlc3NDaGFydFByb3BzLFxyXG4gIFByb2dyZXNzQ2hhcnRTdGF0ZVxyXG4+IHtcclxuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHsgc3R5bGU6IHt9LCBzdHJva2VXaWR0aDogMTYsIHJhZGl1czogMzIgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgc3R5bGUsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGhpZGVMZWdlbmQsXHJcbiAgICAgIHN0cm9rZVdpZHRoLFxyXG4gICAgICBzdHJva2VDb2xvcixcclxuICAgICAgcmFkaXVzXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAsIG1hcmdpbiA9IDAsIG1hcmdpblJpZ2h0ID0gMCB9ID0gc3R5bGU7XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgZGF0YSA9IHtcclxuICAgICAgICBkYXRhXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGllcyA9IGRhdGEuZGF0YS5tYXAoKHBpZURhdGEsIGkpID0+IHtcclxuICAgICAgY29uc3QgciA9XHJcbiAgICAgICAgKChoZWlnaHQgLyAyIC0gMzIpIC9cclxuICAgICAgICAgIChBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5sZW5ndGggOiBkYXRhLmRhdGEubGVuZ3RoKSkgKlxyXG4gICAgICAgICAgaSArXHJcbiAgICAgICAgcmFkaXVzO1xyXG5cclxuICAgICAgcmV0dXJuIFBpZSh7XHJcbiAgICAgICAgcixcclxuICAgICAgICBSOiByLFxyXG4gICAgICAgIGNlbnRlcjogWzAsIDBdLFxyXG4gICAgICAgIGRhdGE6IFtwaWVEYXRhLCAxIC0gcGllRGF0YV0sXHJcbiAgICAgICAgYWNjZXNzb3IoeDogc3RyaW5nKSB7XHJcbiAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcGllQmFja2dyb3VuZHMgPSBkYXRhLmRhdGEubWFwKChwaWVEYXRhLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPVxyXG4gICAgICAgICgoaGVpZ2h0IC8gMiAtIDMyKSAvXHJcbiAgICAgICAgICAoQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEubGVuZ3RoIDogZGF0YS5kYXRhLmxlbmd0aCkpICpcclxuICAgICAgICAgIGkgK1xyXG4gICAgICAgIHJhZGl1cztcclxuICAgICAgcmV0dXJuIFBpZSh7XHJcbiAgICAgICAgcixcclxuICAgICAgICBSOiByLFxyXG4gICAgICAgIGNlbnRlcjogWzAsIDBdLFxyXG4gICAgICAgIGRhdGE6IFswLjk5OSwgMC4wMDFdLFxyXG4gICAgICAgIGFjY2Vzc29yKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHdpdGhMYWJlbCA9IChpOiBudW1iZXIpID0+XHJcbiAgICAgIChkYXRhIGFzIGFueSkubGFiZWxzICYmIChkYXRhIGFzIGFueSkubGFiZWxzW2ldO1xyXG5cclxuICAgIGNvbnN0IHdpdGhDb2xvciA9IChpOiBudW1iZXIpID0+XHJcbiAgICAgIChkYXRhIGFzIGFueSkuY29sb3JzICYmIChkYXRhIGFzIGFueSkuY29sb3JzW2ldO1xyXG5cclxuICAgIGNvbnN0IGxlZ2VuZCA9ICFoaWRlTGVnZW5kICYmIChcclxuICAgICAgPD5cclxuICAgICAgICA8Rz5cclxuICAgICAgICAgIHtwaWVzLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgICAgICBmaWxsPXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgID8gd2l0aENvbG9yKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzdHJva2VDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gc3Ryb2tlQ29sb3IoMC43ICogKGkgKyAxKSwgaSlcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC43ICogKGkgKyAxKSwgaSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJ4PXs4fVxyXG4gICAgICAgICAgICAgICAgcnk9ezh9XHJcbiAgICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41IC0gMjR9XHJcbiAgICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgICAgLSh0aGlzLnByb3BzLmhlaWdodCAvIDIuNSkgK1xyXG4gICAgICAgICAgICAgICAgICAoKHRoaXMucHJvcHMuaGVpZ2h0ICogMC44KSAvXHJcbiAgICAgICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLmxlbmd0aCA6IGRhdGEuZGF0YS5sZW5ndGgpKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgICAgIDEyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvRz5cclxuICAgICAgICA8Rz5cclxuICAgICAgICAgIHtwaWVzLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41fVxyXG4gICAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICAgKCh0aGlzLnByb3BzLmhlaWdodCAqIDAuOCkgL1xyXG4gICAgICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5sZW5ndGggOiBkYXRhLmRhdGEubGVuZ3RoKSkgKlxyXG4gICAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAxMiAqIDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3dpdGhMYWJlbChpKVxyXG4gICAgICAgICAgICAgICAgICA/IGAkeyhkYXRhIGFzIGFueSkubGFiZWxzW2ldfSAke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAxMDAgKiAoZGF0YSBhcyBhbnkpLmRhdGFbaV1cclxuICAgICAgICAgICAgICAgICAgICApfSVgXHJcbiAgICAgICAgICAgICAgICAgIDogYCR7TWF0aC5yb3VuZCgxMDAgKiAoZGF0YSBhcyBhbnkpLmRhdGFbaV0pfSVgfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvRz5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgIC4uLnN0eWxlXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxTdmdcclxuICAgICAgICAgIHdpZHRoPXt3aWR0aCAtIChtYXJnaW4gYXMgbnVtYmVyKSAqIDIgLSAobWFyZ2luUmlnaHQgYXMgbnVtYmVyKX1cclxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoe1xyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAge3RoaXMucHJvcHMuY2hhcnRDb25maWcudXNlQmFja2dyb3VuZENhbnZhcyAmJiAoXHJcbiAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fVxyXG4gICAgICAgICAgICAgIHJ4PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICBmaWxsPVwidXJsKCNiYWNrZ3JvdW5kR3JhZGllbnQpXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8R1xyXG4gICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gKGhpZGVMZWdlbmQgPyAyIDogMi41KX1cclxuICAgICAgICAgICAgeT17dGhpcy5wcm9wcy5oZWlnaHQgLyAyfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7cGllQmFja2dyb3VuZHMubWFwKChwaWUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICAgICAgICAgIGQ9e3BpZS5jdXJ2ZXNbMF0uc2VjdG9yLnBhdGgucHJpbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17c3Ryb2tlV2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuMiwgaSl9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHtwaWVzLm1hcCgocGllLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8UGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGQ9e3BpZS5jdXJ2ZXNbMF0uc2VjdG9yLnBhdGgucHJpbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17c3Ryb2tlV2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMud2l0aEN1c3RvbUJhckNvbG9yRnJvbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB3aXRoQ29sb3IoaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJva2VDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHN0cm9rZUNvbG9yKChpIC8gcGllcy5sZW5ndGgpICogMC43ICsgMC41LCBpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSAvIHBpZXMubGVuZ3RoKSAqIDAuNyArIDAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICB7bGVnZW5kfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgIDwvU3ZnPlxyXG4gICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NDaGFydDtcclxuIl19
