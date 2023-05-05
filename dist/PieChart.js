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
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={this.props.height}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUGllQ2hhcnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFhLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUQsT0FBTyxhQUFxQyxNQUFNLGlCQUFpQixDQUFDO0FBbUJwRTtJQUF1Qiw0QkFBMkM7SUFBbEU7O0lBcUpBLENBQUM7SUFwSkMseUJBQU0sR0FBTjtRQUFBLGlCQW1KQztRQWxKTyxJQUFBLEtBT0YsSUFBSSxDQUFDLEtBQUssRUFOWixhQUFVLEVBQVYsS0FBSyxtQkFBRyxFQUFFLEtBQUEsRUFDVixlQUFlLHFCQUFBLEVBQ2YsZ0JBQWdCLEVBQWhCLFFBQVEsbUJBQUcsS0FBSyxLQUFBLEVBQ2hCLGlCQUFnQixFQUFoQixTQUFTLG1CQUFHLElBQUksS0FBQSxFQUNoQixzQkFBc0IsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsRUFDdEIsOEJBQThCLEVBQTlCLHNCQUFzQixtQkFBRyxLQUFLLEtBQ2xCLENBQUM7UUFFUCxJQUFBLEtBQXFCLEtBQUssYUFBVixFQUFoQixZQUFZLG1CQUFHLENBQUMsS0FBQSxDQUFXO1FBRW5DLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDMUIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUNyQixRQUFRLEVBQUUsVUFBQSxDQUFDO2dCQUNULE9BQU8sQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQzdDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkMsSUFBSSxLQUFhLENBQUM7WUFFbEIsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2YsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNMLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQzNCLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDNUMsQ0FBQztvQkFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3RFLElBQUksY0FBYyxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7d0JBQ3RDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUM7cUJBQzFCO2lCQUNGO2FBQ0Y7WUFFRCxPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQ3BCO1VBQUEsQ0FBQyxJQUFJLENBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFFdkI7VUFBQSxDQUFDLHNCQUFzQixJQUFJLENBQ3pCLENBQUMsSUFBSSxDQUNILFVBQVUsQ0FBQyxPQUFPLENBQ2xCLFNBQVMsQ0FBQyxDQUNSLFlBQVk7d0JBQ1osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixHQUFHO3dCQUNILENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsR0FBRyxDQUNKLENBRUQ7Y0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUN6QjtZQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FDRDtVQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUMsSUFBSSxDQUNILEtBQUssQ0FBQyxNQUFNLENBQ1osTUFBTSxDQUFDLE1BQU0sQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDTixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDTixDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQy9CLENBQUMsQ0FBQyxDQUNBLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7d0JBQzFCLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUN4RCxFQUFFLENBQ0gsRUFDRCxDQUNILENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDUjtVQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUMsSUFBSSxDQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQzdCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQ2hDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FDcEMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQzFCLENBQUMsQ0FBQyxDQUNBLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7d0JBQzFCLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUN4RCxFQUFFLEdBQUcsQ0FBQyxDQUNQLENBRUQ7Y0FBQSxDQUFDLFVBQUcsS0FBSyxjQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQzVCO1lBQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ1Y7UUFBQSxFQUFFLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FDSCxLQUFLLENBQUMsWUFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDekIsT0FBTyxFQUFFLENBQUMsSUFDUCxLQUFLLEVBQ1IsQ0FFRjtRQUFBLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDdEQ7VUFBQSxDQUFDLENBQUMsQ0FDQTtZQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsWUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQ3pCLENBQ0o7VUFBQSxFQUFFLENBQUMsQ0FDSDtVQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsbUJBQW1CLElBQUksQ0FDN0MsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUMxQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDakIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ2pCLElBQUksQ0FBQywwQkFBMEIsRUFDL0IsQ0FDSCxDQUNEO1VBQUEsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUMxQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDakIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ2pCLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUV4QjtVQUFBLENBQUMsQ0FBQyxDQUNBLENBQUMsQ0FBQyxDQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUQsQ0FDRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FFekI7WUFBQSxDQUFDLE1BQU0sQ0FDVDtVQUFBLEVBQUUsQ0FBQyxDQUNMO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFySkQsQ0FBdUIsYUFBYSxHQXFKbkM7QUFFRCxlQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWUgZnJvbSBcInBhdGhzLWpzL3BpZVwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHsgRywgUGF0aCwgUmVjdCwgU3ZnLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7IEFic3RyYWN0Q2hhcnRQcm9wcyB9IGZyb20gXCIuL0Fic3RyYWN0Q2hhcnRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGllQ2hhcnRQcm9wcyBleHRlbmRzIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZGF0YTogQXJyYXk8YW55PjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGFjY2Vzc29yOiBzdHJpbmc7XHJcbiAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcbiAgcGFkZGluZ0xlZnQ6IHN0cmluZztcclxuICBjZW50ZXI/OiBBcnJheTxudW1iZXI+O1xyXG4gIGFic29sdXRlPzogYm9vbGVhbjtcclxuICBoYXNMZWdlbmQ/OiBib29sZWFuO1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIGF2b2lkRmFsc2VaZXJvPzogYm9vbGVhbjtcclxuICBzaG93VmFsdWVzSW5zaWRlUGllY2VzPzogYm9vbGVhbjtcclxufVxyXG5cclxudHlwZSBQaWVDaGFydFN0YXRlID0ge307XHJcblxyXG5jbGFzcyBQaWVDaGFydCBleHRlbmRzIEFic3RyYWN0Q2hhcnQ8UGllQ2hhcnRQcm9wcywgUGllQ2hhcnRTdGF0ZT4ge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc3R5bGUgPSB7fSxcclxuICAgICAgYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICBhYnNvbHV0ZSA9IGZhbHNlLFxyXG4gICAgICBoYXNMZWdlbmQgPSB0cnVlLFxyXG4gICAgICBhdm9pZEZhbHNlWmVybyA9IGZhbHNlLFxyXG4gICAgICBzaG93VmFsdWVzSW5zaWRlUGllY2VzID0gZmFsc2VcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHsgYm9yZGVyUmFkaXVzID0gMCB9ID0gc3R5bGU7XHJcblxyXG4gICAgY29uc3QgY2hhcnQgPSBQaWUoe1xyXG4gICAgICBjZW50ZXI6IHRoaXMucHJvcHMuY2VudGVyIHx8IFswLCAwXSxcclxuICAgICAgcjogMCxcclxuICAgICAgUjogdGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUsXHJcbiAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YSxcclxuICAgICAgYWNjZXNzb3I6IHggPT4ge1xyXG4gICAgICAgIHJldHVybiB4W3RoaXMucHJvcHMuYWNjZXNzb3JdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbCA9IHRoaXMucHJvcHMuZGF0YS5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gc3VtICsgaXRlbVt0aGlzLnByb3BzLmFjY2Vzc29yXTtcclxuICAgIH0sIDApO1xyXG5cclxuICAgIGNvbnN0IHNsaWNlcyA9IGNoYXJ0LmN1cnZlcy5tYXAoKGMsIGkpID0+IHtcclxuICAgICAgbGV0IHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgICBpZiAoYWJzb2x1dGUpIHtcclxuICAgICAgICB2YWx1ZSA9IGMuaXRlbVt0aGlzLnByb3BzLmFjY2Vzc29yXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodG90YWwgPT09IDApIHtcclxuICAgICAgICAgIHZhbHVlID0gMCArIFwiJVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5yb3VuZChcclxuICAgICAgICAgICAgKDEwMCAvIHRvdGFsKSAqIGMuaXRlbVt0aGlzLnByb3BzLmFjY2Vzc29yXVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCgoMTAwIC8gdG90YWwpICogYy5pdGVtW3RoaXMucHJvcHMuYWNjZXNzb3JdKSArIFwiJVwiO1xyXG4gICAgICAgICAgaWYgKGF2b2lkRmFsc2VaZXJvICYmIHBlcmNlbnRhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBcIjwxJVwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwZXJjZW50YWdlICsgXCIlXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxHIGtleT17TWF0aC5yYW5kb20oKX0+XHJcbiAgICAgICAgICA8UGF0aFxyXG4gICAgICAgICAgICBkPXtjLnNlY3Rvci5wYXRoLnByaW50KCl9XHJcbiAgICAgICAgICAgIGZpbGw9e2MuaXRlbS5jb2xvcn1cclxuICAgICAgICAgICAgc3Ryb2tlPXtjLml0ZW0uY29sb3J9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge3Nob3dWYWx1ZXNJbnNpZGVQaWVjZXMgJiYgKFxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgIHRleHRBbmNob3I9XCJzdGFydFwiXHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtPXtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKFwiICtcclxuICAgICAgICAgICAgICAgIGMuc2VjdG9yLmNlbnRyb2lkWzBdICtcclxuICAgICAgICAgICAgICAgIFwiLFwiICtcclxuICAgICAgICAgICAgICAgIGMuc2VjdG9yLmNlbnRyb2lkWzFdICtcclxuICAgICAgICAgICAgICAgIFwiKVwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3ZhbHVlLnJlcGxhY2UoXCIlXCIsIFwiXCIpfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge2hhc0xlZ2VuZCA/IChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD1cIjE2cHhcIlxyXG4gICAgICAgICAgICAgIGZpbGw9e2MuaXRlbS5jb2xvcn1cclxuICAgICAgICAgICAgICByeD17OH1cclxuICAgICAgICAgICAgICByeT17OH1cclxuICAgICAgICAgICAgICB4PXt0aGlzLnByb3BzLndpZHRoIC8gMi41IC0gMjR9XHJcbiAgICAgICAgICAgICAgeT17XHJcbiAgICAgICAgICAgICAgICAtKHRoaXMucHJvcHMuaGVpZ2h0IC8gMi41KSArXHJcbiAgICAgICAgICAgICAgICAoKHRoaXMucHJvcHMuaGVpZ2h0ICogMC44KSAvIHRoaXMucHJvcHMuZGF0YS5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICAgICAgICAxMlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge2hhc0xlZ2VuZCA/IChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICBmaWxsPXtjLml0ZW0ubGVnZW5kRm9udENvbG9yfVxyXG4gICAgICAgICAgICAgIGZvbnRTaXplPXtjLml0ZW0ubGVnZW5kRm9udFNpemV9XHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseT17Yy5pdGVtLmxlZ2VuZEZvbnRGYW1pbHl9XHJcbiAgICAgICAgICAgICAgeD17dGhpcy5wcm9wcy53aWR0aCAvIDIuNX1cclxuICAgICAgICAgICAgICB5PXtcclxuICAgICAgICAgICAgICAgIC0odGhpcy5wcm9wcy5oZWlnaHQgLyAyLjUpICtcclxuICAgICAgICAgICAgICAgICgodGhpcy5wcm9wcy5oZWlnaHQgKiAwLjgpIC8gdGhpcy5wcm9wcy5kYXRhLmxlbmd0aCkgKiBpICtcclxuICAgICAgICAgICAgICAgIDEyICogMlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgJHt2YWx1ZX0gJHtjLml0ZW0ubmFtZX1gfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L0c+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Vmlld1xyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgLi4uc3R5bGVcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPFN2ZyB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+XHJcbiAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyRGVmcyh7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH1cclxuICAgICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgZmlsbD1cInVybCgjYmFja2dyb3VuZEdyYWRpZW50KVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgICAgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH1cclxuICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgZmlsbD17YmFja2dyb3VuZENvbG9yfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxHXHJcbiAgICAgICAgICAgIHg9e1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMud2lkdGggLyAyIC8gMiArXHJcbiAgICAgICAgICAgICAgTnVtYmVyKHRoaXMucHJvcHMucGFkZGluZ0xlZnQgPyB0aGlzLnByb3BzLnBhZGRpbmdMZWZ0IDogMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB5PXt0aGlzLnByb3BzLmhlaWdodCAvIDJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzbGljZXN9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgPC9Tdmc+XHJcbiAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQaWVDaGFydDtcclxuIl19
