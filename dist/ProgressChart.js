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
      var r = 0;
      var center = [0, 0];
      var length = Array.isArray(data) ? data.length : data.data.length;
      var pieDataValidated = pieData > 1 ? 1 : pieData;
      if (length === 1) {
        r = ((height / 2 - 32) / 2) * 1 + radius;
        center = [0, 0];
      } else {
        r = ((height / 2 - 32) / length) * i + radius;
        center = [-15, 0];
      }
      return Pie({
        r: r,
        R: r,
        center: center,
        data: [pieDataValidated, 1 - pieDataValidated],
        accessor: function(x) {
          return x;
        }
      });
    });
    var pieBackgrounds = data.data.map(function(pieData, i) {
      var r = 0;
      var center = [0, 0];
      var length = Array.isArray(data) ? data.length : data.data.length;
      if (length === 1) {
        r = ((height / 2 - 32) / 2) * 1 + radius;
        center = [0, 0];
      } else {
        r = ((height / 2 - 32) / length) * i + radius;
        center = [-15, 0];
      }
      return Pie({
        r: r,
        R: r,
        center: center,
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
        <G key={Math.random()}>
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
                    ? strokeColor((i / pies.length) * 0.5, i)
                    : _this.props.chartConfig.color((i / pies.length) * 0.5, i)
                }
                rx={8}
                ry={8}
                x={_this.props.width / 2.5 - 30}
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
        <G key={Math.random()}>
          {pies.map(function(_, i) {
            return (
              <Text
                key={Math.random()}
                x={_this.props.width / 2.5 - 10}
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
                      .concat(Math.round(100 * data.data[i]), "% ")
                      .concat(data.labels[i])
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
            key={Math.random()}
            x={this.props.width / (hideLegend || pies.length === 1 ? 2 : 2.5)}
            y={this.props.height / 2}
          >
            <G key={Math.random()}>
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
            <G key={Math.random()}>
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
                        ? strokeColor((i / pies.length) * 0.5, i)
                        : _this.props.chartConfig.color(
                            (i / pies.length) * 0.5,
                            i
                          )
                    }
                  />
                );
              })}
            </G>
            <G key={Math.random()}>
              {pies.length === 1 &&
                pies.map(function(pie, i) {
                  return (
                    <G key={Math.random()}>
                      <Text
                        key={Math.random()}
                        x={0}
                        y={withLabel(i) ? -10 : 0}
                        textAnchor={"middle"}
                        alignmentBaseline={"middle"}
                        strokeWidth={0.5}
                        {..._this.getPropsForLabels()}
                        fontSize={22}
                        fontWeight={"bold"}
                      >
                        {"".concat(Math.round(100 * data.data[i]), "%")}
                      </Text>
                      {withLabel(i) && (
                        <Text
                          key={Math.random()}
                          x={0}
                          y={20}
                          textAnchor={"middle"}
                          alignmentBaseline={"bottom"}
                          strokeWidth={0.5}
                          {..._this.getPropsForLabels()}
                          fontSize={14}
                        >
                          {data.labels[i]}
                        </Text>
                      )}
                    </G>
                  );
                })}
            </G>
            {pies.length > 1 && legend}
          </G>
        </Svg>
      </View>
    );
  };
  ProgressChart.defaultProps = { style: {}, strokeWidth: 16, radius: 32 };
  return ProgressChart;
})(AbstractChart);
export default ProgressChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9ncmVzc0NoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQztBQUMvQixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLElBQUksRUFBYSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVELE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBd0J6QjtJQUE0QixpQ0FHM0I7SUFIRDs7SUE0UEEsQ0FBQztJQXRQQyw4QkFBTSxHQUFOO1FBQUEsaUJBcVBDO1FBcFBLLElBQUEsS0FTQSxJQUFJLENBQUMsS0FBSyxFQVJaLEtBQUssV0FBQSxFQUNMLE1BQU0sWUFBQSxFQUNOLEtBQUssV0FBQSxFQUNMLElBQUksVUFBQSxFQUNKLFVBQVUsZ0JBQUEsRUFDVixXQUFXLGlCQUFBLEVBQ1gsV0FBVyxpQkFBQSxFQUNYLE1BQU0sWUFDTSxDQUFDO1FBRWYsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5DLElBQUEsS0FBa0QsS0FBSyxhQUF2QyxFQUFoQixZQUFZLG1CQUFHLENBQUMsS0FBQSxFQUFFLEtBQWdDLEtBQUssT0FBM0IsRUFBVixNQUFNLG1CQUFHLENBQUMsS0FBQSxFQUFFLEtBQW9CLEtBQUssWUFBVixFQUFmLFdBQVcsbUJBQUcsQ0FBQyxLQUFBLENBQVc7UUFFaEUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksR0FBRztnQkFDTCxJQUFJLE1BQUE7YUFDTCxDQUFDO1NBQ0g7UUFFRCxJ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LENBQ047WUFBQSxFQUFFLENBQUMsQ0FDSDtZQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUM1QjtVQUFBLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBdlBhLDBCQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBd1AxRSxvQkFBQztDQUFBLEFBNVBELENBQTRCLGFBQWEsR0E0UHhDO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGllIGZyb20gXCJwYXRocy1qcy9waWVcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7IEcsIFBhdGgsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XHJcblxyXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xyXG4gIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgQWJzdHJhY3RDaGFydFByb3BzXHJcbn0gZnJvbSBcIi4vQWJzdHJhY3RDaGFydFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NDaGFydERhdGEgPVxyXG4gIHwgQXJyYXk8bnVtYmVyPlxyXG4gIHwgeyBsYWJlbHM/OiBBcnJheTxzdHJpbmc+OyBjb2xvcnM/OiBBcnJheTxzdHJpbmc+OyBkYXRhOiBBcnJheTxudW1iZXI+IH07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZGF0YTogUHJvZ3Jlc3NDaGFydERhdGE7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjZW50ZXI/OiBBcnJheTxudW1iZXI+O1xyXG4gIGFic29sdXRlPzogYm9vbGVhbjtcclxuICBoYXNMZWdlbmQ/OiBib29sZWFuO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICBoaWRlTGVnZW5kPzogYm9vbGVhbjtcclxuICBzdHJva2VXaWR0aD86IG51bWJlcjtcclxuICBzdHJva2VDb2xvcj86IChvcGFjaXR5OiBudW1iZXIsIGluZGV4PzogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgcmFkaXVzPzogbnVtYmVyO1xyXG4gIHdpdGhDdXN0b21CYXJDb2xvckZyb21EYXRhPzogYm9vbGVhbjtcclxufVxyXG5cclxudHlwZSBQcm9ncmVzc0NoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmNsYXNzIFByb2dyZXNzQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PFxyXG4gIFByb2dyZXNzQ2hhcnRQcm9wcyxcclxuICBQcm9ncmVzc0NoYXJ0U3RhdGVcclxuPiB7XHJcbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7IHN0eWxlOiB7fSwgc3Ryb2tlV2lkdGg6IDE2LCByYWRpdXM6IDMyIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHN0eWxlLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoaWRlTGVnZW5kLFxyXG4gICAgICBzdHJva2VXaWR0aCxcclxuICAgICAgc3Ryb2tlQ29sb3IsXHJcbiAgICAgIHJhZGl1c1xyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlS2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpO1xyXG5cclxuICAgIGNvbnN0IHsgYm9yZGVyUmFkaXVzID0gMCwgbWFyZ2luID0gMCwgbWFyZ2luUmlnaHQgPSAwIH0gPSBzdHlsZTtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICBkYXRhID0ge1xyXG4gICAgICAgIGRhdGFcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwaWVzID0gZGF0YS5kYXRhLm1hcCgocGllRGF0YSwgaSkgPT4ge1xyXG4gICAgICB2YXIgciA9IDA7XHJcbiAgICAgIHZhciBjZW50ZXIgPSBbMCwgMF07XHJcbiAgICAgIHZhciBsZW5ndGggPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5sZW5ndGggOiBkYXRhLmRhdGEubGVuZ3RoO1xyXG4gICAgICB2YXIgcGllRGF0YVZhbGlkYXRlZCA9IHBpZURhdGEgPiAxID8gMSA6IHBpZURhdGE7XHJcblxyXG4gICAgICBpZiAobGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgciA9ICgoaGVpZ2h0IC8gMiAtIDMyKSAvIDIpICogMSArIHJhZGl1cztcclxuICAgICAgICBjZW50ZXIgPSBbMCwgMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgciA9ICgoaGVpZ2h0IC8gMiAtIDMyKSAvIGxlbmd0aCkgKiBpICsgcmFkaXVzO1xyXG4gICAgICAgIGNlbnRlciA9IFstMTUsIDBdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gUGllKHtcclxuICAgICAgICByLFxyXG4gICAgICAgIFI6IHIsXHJcbiAgICAgICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICAgICAgZGF0YTogW3BpZURhdGFWYWxpZGF0ZWQsIDEgLSBwaWVEYXRhVmFsaWRhdGVkXSxcclxuICAgICAgICBhY2Nlc3Nvcih4OiBzdHJpbmcpIHtcclxuICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwaWVCYWNrZ3JvdW5kcyA9IGRhdGEuZGF0YS5tYXAoKHBpZURhdGEsIGkpID0+IHtcclxuICAgICAgdmFyIHIgPSAwO1xyXG4gICAgICB2YXIgY2VudGVyID0gWzAsIDBdO1xyXG4gICAgICB2YXIgbGVuZ3RoID0gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEubGVuZ3RoIDogZGF0YS5kYXRhLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcclxuICAgICAgICByID0gKChoZWlnaHQgLyAyIC0gMzIpIC8gMikgKiAxICsgcmFkaXVzO1xyXG4gICAgICAgIGNlbnRlciA9IFswLCAwXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByID0gKChoZWlnaHQgLyAyIC0gMzIpIC8gbGVuZ3RoKSAqIGkgKyByYWRpdXM7XHJcbiAgICAgICAgY2VudGVyID0gWy0xNSwgMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBQaWUoe1xyXG4gICAgICAgIHIsXHJcbiAgICAgICAgUjogcixcclxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICBkYXRhOiBbMC45OTksIDAuMDAxXSxcclxuICAgICAgICBhY2Nlc3Nvcih4OiBzdHJpbmcpIHtcclxuICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB3aXRoTGFiZWwgPSAoaTogbnVtYmVyKSA9PlxyXG4gICAgICAoZGF0YSBhcyBhbnkpLmxhYmVscyAmJiAoZGF0YSBhcyBhbnkpLmxhYmVsc1tpXTtcclxuXHJcbiAgICBjb25zdCB3aXRoQ29sb3IgPSAoaTogbnVtYmVyKSA9PlxyXG4gICAgICAoZGF0YSBhcyBhbnkpLmNvbG9ycyAmJiAoZGF0YSBhcyBhbnkpLmNvbG9yc1tpXTtcclxuXHJcbiAgICBjb25zdCBsZWdlbmQgPSAhaGlkZUxlZ2VuZCAmJiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cclxuICAgICAgICAgIHtwaWVzLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgICAgICBmaWxsPXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgID8gd2l0aENvbG9yKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzdHJva2VDb2xvclxyXG4gICAgICAgICAgICAgICAgICAgID8gc3Ryb2tlQ29sb3IoKGkgLyBwaWVzLmxlbmd0aCkgKiAwLjUsIGkpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKChpIC8gcGllcy5sZW5ndGgpICogMC41LCBpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcng9ezh9XHJcbiAgICAgICAgICAgICAgICByeT17OH1cclxuICAgICAgICAgICAgICAgIHg9e3RoaXMucHJvcHMud2lkdGggLyAyLjUgLSAzMH1cclxuICAgICAgICAgICAgICAgIHk9e1xyXG4gICAgICAgICAgICAgICAgICAtKHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41KSArXHJcbiAgICAgICAgICAgICAgICAgICgodGhpcy5wcm9wcy5oZWlnaHQgKiAwLjgpIC9cclxuICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEubGVuZ3RoIDogZGF0YS5kYXRhLmxlbmd0aCkpICpcclxuICAgICAgICAgICAgICAgICAgICBpICtcclxuICAgICAgICAgICAgICAgICAgMTJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9HPlxyXG4gICAgICAgIDxHIGtleT17TWF0aC5yYW5kb20oKX0+XHJcbiAgICAgICAgICB7cGllcy5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICAgICAgeD17dGhpcy5wcm9wcy53aWR0aCAvIDIuNSAtIDEwfVxyXG4gICAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICAgKCh0aGlzLnByb3BzLmhlaWdodCAqIDAuOCkgL1xyXG4gICAgICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5sZW5ndGggOiBkYXRhLmRhdGEubGVuZ3RoKSkgKlxyXG4gICAgICAgICAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAgICAgICAxMiAqIDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3dpdGhMYWJlbChpKVxyXG4gICAgICAgICAgICAgICAgICA/IGAke01hdGgucm91bmQoMTAwICogKGRhdGEgYXMgYW55KS5kYXRhW2ldKX0lICR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAoZGF0YSBhcyBhbnkpLmxhYmVsc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH1gXHJcbiAgICAgICAgICAgICAgICAgIDogYCR7TWF0aC5yb3VuZCgxMDAgKiAoZGF0YSBhcyBhbnkpLmRhdGFbaV0pfSVgfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvRz5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgIC4uLnN0eWxlXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxTdmdcclxuICAgICAgICAgIHdpZHRoPXt3aWR0aCAtIChtYXJnaW4gYXMgbnVtYmVyKSAqIDIgLSAobWFyZ2luUmlnaHQgYXMgbnVtYmVyKX1cclxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcclxuICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmNoYXJ0Q29uZmlnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVuaXF1ZUtleVxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH1cclxuICAgICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgZmlsbD17YHVybCgjYmFja2dyb3VuZEdyYWRpZW50XyR7dW5pcXVlS2V5fSlgfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxHXHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgeD17dGhpcy5wcm9wcy53aWR0aCAvIChoaWRlTGVnZW5kIHx8IHBpZXMubGVuZ3RoID09PSAxID8gMiA6IDIuNSl9XHJcbiAgICAgICAgICAgIHk9e3RoaXMucHJvcHMuaGVpZ2h0IC8gMn1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cclxuICAgICAgICAgICAgICB7cGllQmFja2dyb3VuZHMubWFwKChwaWUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICAgICAgICAgIGQ9e3BpZS5jdXJ2ZXNbMF0uc2VjdG9yLnBhdGgucHJpbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17c3Ryb2tlV2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuMiwgaSl9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHIGtleT17TWF0aC5yYW5kb20oKX0+XHJcbiAgICAgICAgICAgICAge3BpZXMubWFwKChwaWUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgZD17cGllLmN1cnZlc1swXS5zZWN0b3IucGF0aC5wcmludCgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy53aXRoQ3VzdG9tQmFyQ29sb3JGcm9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHdpdGhDb2xvcihpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHN0cm9rZUNvbG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc3Ryb2tlQ29sb3IoKGkgLyBwaWVzLmxlbmd0aCkgKiAwLjUsIGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpIC8gcGllcy5sZW5ndGgpICogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHIGtleT17TWF0aC5yYW5kb20oKX0+XHJcbiAgICAgICAgICAgICAge3BpZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICBwaWVzLm1hcCgocGllLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeD17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeT17d2l0aExhYmVsKGkpID8gLTEwIDogMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFuY2hvcj17XCJtaWRkbGVcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50QmFzZWxpbmU9e1wibWlkZGxlXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXswLjV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPXsyMn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD17XCJib2xkXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtgJHtNYXRoLnJvdW5kKDEwMCAqIChkYXRhIGFzIGFueSkuZGF0YVtpXSl9JWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7d2l0aExhYmVsKGkpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeD17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB5PXsyMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QW5jaG9yPXtcIm1pZGRsZVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudEJhc2VsaW5lPXtcImJvdHRvbVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXswLjV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7KGRhdGEgYXMgYW55KS5sYWJlbHNbaV19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAge3BpZXMubGVuZ3RoID4gMSAmJiBsZWdlbmR9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgPC9Tdmc+XHJcbiAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0NoYXJ0O1xyXG4iXX0=
