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
    var uniqueKey = Math.random().toString();
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
        center: [-10, 0],
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
        center: [-10, 0],
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
            ),
            uniqueKey
          )}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={this.props.height}
              rx={borderRadius}
              ry={borderRadius}
              fill={"url(#backgroundGradient_".concat(uniqueKey, ")")}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9ncmVzc0NoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLElBQUksRUFBYSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVELE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBd0J6QjtJQUE0QixpQ0FHM0I7SUFIRDs7SUF5TUEsQ0FBQztJQW5NQyw4QkFBTSxHQUFOO1FBQUEsaUJBa01DO1FBak1LLElBQUEsS0FTQSxJQUFJLENBQUMsS0FBSyxFQVJaLEtBQUssV0FBQSxFQUNMLE1BQU0sWUFBQSxFQUNOLEtBQUssV0FBQSxFQUNMLElBQUksVUFBQSxFQUNKLFVBQVUsZ0JBQUEsRUFDVixXQUFXLGlCQUFBLEVBQ1gsV0FBVyxpQkFBQSxFQUNYLE1BQU0sWUFDTSxDQUFDO1FBRWYsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5DLElBQUEsS0FBa0QsS0FBSyxhQUF2QyxFQUFoQixZQUFZLG1CQUFHLENBQUMsS0FBQSxFQUFFLEtBQWdDLEtBQUssT0FBM0IsRUFBVixNQUFNLG1CQUFHLENBQUMsS0FBQSxFQUFFLEtBQW9CLEtBQUssWUFBVixFQUFmLFdBQVcsbUJBQUcsQ0FBQyxLQUFBLENBQVc7UUFFaEUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksR0FBRztnQkFDTCxJQUFJLE1BQUE7YUFDTCxDQUFDO1NBQ0g7UUFFRCxJ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bkIsYUFBYSxDQUFDLE9BQU8sQ0FDckIsY0FBYyxDQUFDLE9BQU8sQ0FDdEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ3JDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN6QixNQUFNLENBQUMsQ0FDTCxLQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQjt3QkFDbkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsQ0FBQyxDQUFDLFdBQVc7NEJBQ2IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQy9DLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQzFCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUM3QixDQUFDLENBQ0YsQ0FDTixFQUNELENBQ0gsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNKO1lBQUEsRUFBRSxDQUFDLENBQ0g7WUFBQSxDQUFDLE1BQU0sQ0FDVDtVQUFBLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBcE1hLDBCQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBcU0xRSxvQkFBQztDQUFBLEFBek1ELENBQTRCLGFBQWEsR0F5TXhDO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGllIGZyb20gXCJwYXRocy1qcy9waWVcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7IEcsIFBhdGgsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xyXG4gIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgQWJzdHJhY3RDaGFydFByb3BzXHJcbn0gZnJvbSBcIi4vQWJzdHJhY3RDaGFydFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NDaGFydERhdGEgPVxyXG4gIHwgQXJyYXk8bnVtYmVyPlxyXG4gIHwgeyBsYWJlbHM/OiBBcnJheTxzdHJpbmc+OyBjb2xvcnM/OiBBcnJheTxzdHJpbmc+OyBkYXRhOiBBcnJheTxudW1iZXI+IH07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZGF0YTogUHJvZ3Jlc3NDaGFydERhdGE7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjZW50ZXI/OiBBcnJheTxudW1iZXI+O1xyXG4gIGFic29sdXRlPzogYm9vbGVhbjtcclxuICBoYXNMZWdlbmQ/OiBib29sZWFuO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICBoaWRlTGVnZW5kPzogYm9vbGVhbjtcclxuICBzdHJva2VXaWR0aD86IG51bWJlcjtcclxuICBzdHJva2VDb2xvcj86IChvcGFjaXR5OiBudW1iZXIsIGluZGV4PzogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgcmFkaXVzPzogbnVtYmVyO1xyXG4gIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhPzogYm9vbGVhbjtcclxufVxyXG5cclxudHlwZSBQcm9ncmVzc0NoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmNsYXNzIFByb2dyZXNzQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PFxyXG4gIFByb2dyZXNzQ2hhcnRQcm9wcyxcclxuICBQcm9ncmVzc0NoYXJ0U3RhdGVcclxuPiB7XHJcbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7IHN0eWxlOiB7fSwgc3Ryb2tlV2lkdGg6IDE2LCByYWRpdXM6IDMyIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHN0eWxlLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoaWRlTGVnZW5kLFxyXG4gICAgICBzdHJva2VXaWR0aCxcclxuICAgICAgc3Ryb2tlQ29sb3IsXHJcbiAgICAgIHJhZGl1c1xyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlS2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpO1xyXG5cclxuICAgIGNvbnN0IHsgYm9yZGVyUmFkaXVzID0gMCwgbWFyZ2luID0gMCwgbWFyZ2luUmlnaHQgPSAwIH0gPSBzdHlsZTtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICBkYXRhID0ge1xyXG4gICAgICAgIGRhdGFcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwaWVzID0gZGF0YS5kYXRhLm1hcCgocGllRGF0YSwgaSkgPT4ge1xyXG4gICAgICBjb25zdCByID1cclxuICAgICAgICAoKGhlaWdodCAvIDIgLSAzMikgL1xyXG4gICAgICAgICAgKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLmxlbmd0aCA6IGRhdGEuZGF0YS5sZW5ndGgpKSAqXHJcbiAgICAgICAgICBpICtcclxuICAgICAgICByYWRpdXM7XHJcblxyXG4gICAgICByZXR1cm4gUGllKHtcclxuICAgICAgICByLFxyXG4gICAgICAgIFI6IHIsXHJcbiAgICAgICAgY2VudGVyOiBbLTEwLCAwXSxcclxuICAgICAgICBkYXRhOiBbcGllRGF0YSwgMSAtIHBpZURhdGFdLFxyXG4gICAgICAgIGFjY2Vzc29yKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHBpZUJhY2tncm91bmRzID0gZGF0YS5kYXRhLm1hcCgocGllRGF0YSwgaSkgPT4ge1xyXG4gICAgICBjb25zdCByID1cclxuICAgICAgICAoKGhlaWdodCAvIDIgLSAzMikgL1xyXG4gICAgICAgICAgKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLmxlbmd0aCA6IGRhdGEuZGF0YS5sZW5ndGgpKSAqXHJcbiAgICAgICAgICBpICtcclxuICAgICAgICByYWRpdXM7XHJcbiAgICAgIHJldHVybiBQaWUoe1xyXG4gICAgICAgIHIsXHJcbiAgICAgICAgUjogcixcclxuICAgICAgICBjZW50ZXI6IFstMTAsIDBdLFxyXG4gICAgICAgIGRhdGE6IFswLjk5OSwgMC4wMDFdLFxyXG4gICAgICAgIGFjY2Vzc29yKHg6IHN0cmluZykge1xyXG4gICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHdpdGhMYWJlbCA9IChpOiBudW1iZXIpID0+XHJcbiAgICAgIChkYXRhIGFzIGFueSkubGFiZWxzICYmIChkYXRhIGFzIGFueSkubGFiZWxzW2ldO1xyXG5cclxuICAgIGNvbnN0IHdpdGhDb2xvciA9IChpOiBudW1iZXIpID0+XHJcbiAgICAgIChkYXRhIGFzIGFueSkuY29sb3JzICYmIChkYXRhIGFzIGFueSkuY29sb3JzW2ldO1xyXG5cclxuICAgIGNvbnN0IGxlZ2VuZCA9ICFoaWRlTGVnZW5kICYmIChcclxuICAgICAgPD5cclxuICAgICAgICA8Rz5cclxuICAgICAgICAgIHtwaWVzLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgICAgICBmaWxsPXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgID8gd2l0aENvbG9yKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzdHJva2VDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gc3Ryb2tlQ29sb3IoMC43ICogKGkgKyAxKSwgaSlcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC43ICogKGkgKyAxKSwgaSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJ4PXs4fVxyXG4gICAgICAgICAgICAgICAgcnk9ezh9XHJcbiAgICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41IC0gMjR9XHJcbiAgICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgICAgLSh0aGlzLnByb3BzLmhlaWdodCAvIDIuNSkgK1xyXG4gICAgICAgICAgICAgICAgICAoKHRoaXMucHJvcHMuaGVpZ2h0ICogMC44KSAvXHJcbiAgICAgICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLmxlbmd0aCA6IGRhdGEuZGF0YS5sZW5ndGgpKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgICAgICAgIDEyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvRz5cclxuICAgICAgICA8Rz5cclxuICAgICAgICAgIHtwaWVzLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41fVxyXG4gICAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICAgKCh0aGlzLnByb3BzLmhlaWdodCAqIDAuOCkgL1xyXG4gICAgICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5sZW5ndGggOiBkYXRhLmRhdGEubGVuZ3RoKSkgKlxyXG4gICAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAxMiAqIDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3dpdGhMYWJlbChpKVxyXG4gICAgICAgICAgICAgICAgICA/IGAkeyhkYXRhIGFzIGFueSkubGFiZWxzW2ldfSAke01hdGgucm91bmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAxMDAgKiAoZGF0YSBhcyBhbnkpLmRhdGFbaV1cclxuICAgICAgICAgICAgICAgICAgICApfSVgXHJcbiAgICAgICAgICAgICAgICAgIDogYCR7TWF0aC5yb3VuZCgxMDAgKiAoZGF0YSBhcyBhbnkpLmRhdGFbaV0pfSVgfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvRz5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgIC4uLnN0eWxlXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxTdmdcclxuICAgICAgICAgIHdpZHRoPXt3aWR0aCAtIChtYXJnaW4gYXMgbnVtYmVyKSAqIDIgLSAobWFyZ2luUmlnaHQgYXMgbnVtYmVyKX1cclxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcclxuICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmNoYXJ0Q29uZmlnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVuaXF1ZUtleVxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH1cclxuICAgICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgZmlsbD17YHVybCgjYmFja2dyb3VuZEdyYWRpZW50XyR7dW5pcXVlS2V5fSlgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxHXHJcbiAgICAgICAgICAgIHg9e3RoaXMucHJvcHMud2lkdGggLyAoaGlkZUxlZ2VuZCA/IDIgOiAyLjUpfVxyXG4gICAgICAgICAgICB5PXt0aGlzLnByb3BzLmhlaWdodCAvIDJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHtwaWVCYWNrZ3JvdW5kcy5tYXAoKHBpZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPFBhdGhcclxuICAgICAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgZD17cGllLmN1cnZlc1swXS5zZWN0b3IucGF0aC5wcmludCgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9e3RoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMC4yLCBpKX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3BpZXMubWFwKChwaWUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgZD17cGllLmN1cnZlc1swXS5zZWN0b3IucGF0aC5wcmludCgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHdpdGhDb2xvcihpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHN0cm9rZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3Ryb2tlQ29sb3IoKGkgLyBwaWVzLmxlbmd0aCkgKiAwLjcgKyAwLjUsIGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpIC8gcGllcy5sZW5ndGgpICogMC43ICsgMC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIHtsZWdlbmR9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgPC9Tdmc+XHJcbiAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0NoYXJ0O1xyXG4iXX0=
