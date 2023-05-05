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
var __spreadArray =
  (this && this.__spreadArray) ||
  function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
import React from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import {
  Circle,
  G,
  Path,
  Polygon,
  Polyline,
  Rect,
  Svg
} from "react-native-svg";
import AbstractChart from "../AbstractChart";
import { LegendItem } from "./LegendItem";
var AnimatedCircle = Animated.createAnimatedComponent(Circle);
var LineChart = /** @class */ (function(_super) {
  __extends(LineChart, _super);
  function LineChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.label = React.createRef();
    _this.state = {
      scrollableDotHorizontalOffset: new Animated.Value(0)
    };
    _this.getColor = function(dataset, opacity) {
      return (dataset.color || _this.props.chartConfig.color)(opacity);
    };
    _this.getStrokeWidth = function(dataset) {
      return dataset.strokeWidth || _this.props.chartConfig.strokeWidth || 3;
    };
    _this.getDatas = function(data) {
      return data.reduce(function(acc, item) {
        return item.data
          ? __spreadArray(__spreadArray([], acc, true), item.data, true)
          : acc;
      }, []);
    };
    _this.getPropsForDots = function(x, i) {
      var _a = _this.props,
        getDotProps = _a.getDotProps,
        chartConfig = _a.chartConfig;
      if (typeof getDotProps === "function") {
        return getDotProps(x, i);
      }
      var _b = chartConfig.propsForDots,
        propsForDots = _b === void 0 ? {} : _b;
      return __assign({ r: "4" }, propsForDots);
    };
    _this.renderDots = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        onDataPointClick = _a.onDataPointClick;
      var output = [];
      var datas = _this.getDatas(data);
      var baseHeight = _this.calcBaseHeight(datas, height);
      var _b = _this.props,
        getDotColor = _b.getDotColor,
        _c = _b.hidePointsAtIndex,
        hidePointsAtIndex = _c === void 0 ? [] : _c,
        _d = _b.renderDotContent,
        renderDotContent =
          _d === void 0
            ? function() {
                return null;
              }
            : _d;
      var xMax = _this.getXMaxValues(data);
      data.forEach(function(dataset) {
        if (dataset.withDots == false) return;
        dataset.data.forEach(function(x, i) {
          if (hidePointsAtIndex.includes(i)) {
            return;
          }
          var cx = paddingRight + (i * (width - paddingRight)) / xMax;
          var cy =
            ((baseHeight - _this.calcHeight(x, datas, height)) / 4) * 3 +
            paddingTop;
          var onPress = function() {
            if (!onDataPointClick || hidePointsAtIndex.includes(i)) {
              return;
            }
            onDataPointClick({
              index: i,
              value: x,
              dataset: dataset,
              x: cx,
              y: cy,
              getColor: function(opacity) {
                return _this.getColor(dataset, opacity);
              }
            });
          };
          output.push(
            <Circle
              key={Math.random()}
              cx={cx}
              cy={cy}
              fill={
                typeof getDotColor === "function"
                  ? getDotColor(x, i)
                  : _this.getColor(dataset, 0.9)
              }
              onPress={onPress}
              {..._this.getPropsForDots(x, i)}
            />,
            <Circle
              key={Math.random()}
              cx={cx}
              cy={cy}
              r="14"
              fill="#fff"
              fillOpacity={0}
              onPress={onPress}
            />,
            renderDotContent({ x: cx, y: cy, index: i, indexData: x })
          );
        });
      });
      return output;
    };
    _this.renderScrollableDot = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        scrollableDotHorizontalOffset = _a.scrollableDotHorizontalOffset,
        scrollableDotFill = _a.scrollableDotFill,
        scrollableDotStrokeColor = _a.scrollableDotStrokeColor,
        scrollableDotStrokeWidth = _a.scrollableDotStrokeWidth,
        scrollableDotRadius = _a.scrollableDotRadius,
        scrollableInfoViewStyle = _a.scrollableInfoViewStyle,
        scrollableInfoTextStyle = _a.scrollableInfoTextStyle,
        _b = _a.scrollableInfoTextDecorator,
        scrollableInfoTextDecorator =
          _b === void 0
            ? function(x) {
                return "".concat(x);
              }
            : _b,
        scrollableInfoSize = _a.scrollableInfoSize,
        scrollableInfoOffset = _a.scrollableInfoOffset;
      var output = [];
      var datas = _this.getDatas(data);
      var baseHeight = _this.calcBaseHeight(datas, height);
      var vl = [];
      var perData = width / data[0].data.length;
      for (var index = 0; index < data[0].data.length; index++) {
        vl.push(index * perData);
      }
      var lastIndex;
      scrollableDotHorizontalOffset.addListener(function(value) {
        var index = value.value / perData;
        if (!lastIndex) {
          lastIndex = index;
        }
        var abs = Math.floor(index);
        var percent = index - abs;
        abs = data[0].data.length - abs - 1;
        if (index >= data[0].data.length - 1) {
          _this.label.current.setNativeProps({
            text: scrollableInfoTextDecorator(Math.floor(data[0].data[0]))
          });
        } else {
          if (index > lastIndex) {
            // to right
            var base = data[0].data[abs];
            var prev = data[0].data[abs - 1];
            if (prev > base) {
              var rest = prev - base;
              _this.label.current.setNativeProps({
                text: scrollableInfoTextDecorator(
                  Math.floor(base + percent * rest)
                )
              });
            } else {
              var rest = base - prev;
              _this.label.current.setNativeProps({
                text: scrollableInfoTextDecorator(
                  Math.floor(base - percent * rest)
                )
              });
            }
          } else {
            // to left
            var base = data[0].data[abs - 1];
            var next = data[0].data[abs];
            percent = 1 - percent;
            if (next > base) {
              var rest = next - base;
              _this.label.current.setNativeProps({
                text: scrollableInfoTextDecorator(
                  Math.floor(base + percent * rest)
                )
              });
            } else {
              var rest = base - next;
              _this.label.current.setNativeProps({
                text: scrollableInfoTextDecorator(
                  Math.floor(base - percent * rest)
                )
              });
            }
          }
        }
        lastIndex = index;
      });
      data.forEach(function(dataset) {
        if (dataset.withScrollableDot == false) return;
        var perData = width / dataset.data.length;
        var values = [];
        var yValues = [];
        var xValues = [];
        var yValuesLabel = [];
        var xValuesLabel = [];
        for (var index = 0; index < dataset.data.length; index++) {
          values.push(index * perData);
          var yval =
            ((baseHeight -
              _this.calcHeight(
                dataset.data[dataset.data.length - index - 1],
                datas,
                height
              )) /
              4) *
              3 +
            paddingTop;
          yValues.push(yval);
          var xval =
            paddingRight +
            ((dataset.data.length - index - 1) * (width - paddingRight)) /
              dataset.data.length;
          xValues.push(xval);
          yValuesLabel.push(
            yval - (scrollableInfoSize.height + scrollableInfoOffset)
          );
          xValuesLabel.push(xval - scrollableInfoSize.width / 2);
        }
        var translateX = scrollableDotHorizontalOffset.interpolate({
          inputRange: values,
          outputRange: xValues,
          extrapolate: "clamp"
        });
        var translateY = scrollableDotHorizontalOffset.interpolate({
          inputRange: values,
          outputRange: yValues,
          extrapolate: "clamp"
        });
        var labelTranslateX = scrollableDotHorizontalOffset.interpolate({
          inputRange: values,
          outputRange: xValuesLabel,
          extrapolate: "clamp"
        });
        var labelTranslateY = scrollableDotHorizontalOffset.interpolate({
          inputRange: values,
          outputRange: yValuesLabel,
          extrapolate: "clamp"
        });
        output.push([
          <Animated.View
            key={Math.random()}
            style={[
              scrollableInfoViewStyle,
              {
                transform: [
                  { translateX: labelTranslateX },
                  { translateY: labelTranslateY }
                ],
                width: scrollableInfoSize.width,
                height: scrollableInfoSize.height
              }
            ]}
          >
            <TextInput
              onLayout={function() {
                _this.label.current.setNativeProps({
                  text: scrollableInfoTextDecorator(
                    Math.floor(data[0].data[data[0].data.length - 1])
                  )
                });
              }}
              style={scrollableInfoTextStyle}
              ref={_this.label}
            />
          </Animated.View>,
          <AnimatedCircle
            key={Math.random()}
            cx={translateX}
            cy={translateY}
            r={scrollableDotRadius}
            stroke={scrollableDotStrokeColor}
            strokeWidth={scrollableDotStrokeWidth}
            fill={scrollableDotFill}
          />
        ]);
      });
      return output;
    };
    _this.renderShadow = function(_a) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data,
        useColorFromDataset = _a.useColorFromDataset;
      if (_this.props.bezier) {
        return _this.renderBezierShadow({
          width: width,
          height: height,
          paddingRight: paddingRight,
          paddingTop: paddingTop,
          data: data,
          useColorFromDataset: useColorFromDataset
        });
      }
      var datas = _this.getDatas(data);
      var baseHeight = _this.calcBaseHeight(datas, height);
      return data.map(function(dataset, index) {
        return (
          <Polygon
            key={index}
            points={
              dataset.data
                .map(function(d, i) {
                  var x =
                    paddingRight +
                    (i * (width - paddingRight)) / dataset.data.length;
                  var y =
                    ((baseHeight - _this.calcHeight(d, datas, height)) / 4) *
                      3 +
                    paddingTop;
                  return "".concat(x, ",").concat(y);
                })
                .join(" ") +
              " "
                .concat(
                  paddingRight +
                    ((width - paddingRight) / dataset.data.length) *
                      (dataset.data.length - 1),
                  ","
                )
                .concat((height / 4) * 3 + paddingTop, " ")
                .concat(paddingRight, ",")
                .concat((height / 4) * 3 + paddingTop)
            }
            fill={"url(#fillShadowGradientFrom".concat(
              useColorFromDataset ? "_".concat(index) : "",
              ")"
            )}
            strokeWidth={0}
          />
        );
      });
    };
    _this.renderLine = function(_a) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data,
        linejoinType = _a.linejoinType;
      if (_this.props.bezier) {
        return _this.renderBezierLine({
          data: data,
          width: width,
          height: height,
          paddingRight: paddingRight,
          paddingTop: paddingTop
        });
      }
      var output = [];
      var datas = _this.getDatas(data);
      var baseHeight = _this.calcBaseHeight(datas, height);
      var xMax = _this.getXMaxValues(data);
      var lastPoint;
      data.forEach(function(dataset, index) {
        var points = dataset.data.map(function(d, i) {
          if (d === null) return lastPoint;
          var x = (i * (width - paddingRight)) / xMax + paddingRight;
          var y =
            ((baseHeight - _this.calcHeight(d, datas, height)) / 4) * 3 +
            paddingTop;
          lastPoint = "".concat(x, ",").concat(y);
          return "".concat(x, ",").concat(y);
        });
        output.push(
          <Polyline
            key={index}
            strokeLinejoin={linejoinType}
            points={points.join(" ")}
            fill="none"
            stroke={_this.getColor(dataset, 0.2)}
            strokeWidth={_this.getStrokeWidth(dataset)}
            strokeDasharray={dataset.strokeDashArray}
            strokeDashoffset={dataset.strokeDashOffset}
          />
        );
      });
      return output;
    };
    _this.getXMaxValues = function(data) {
      return data.reduce(function(acc, cur) {
        return cur.data.length > acc ? cur.data.length : acc;
      }, 0);
    };
    _this.getBezierLinePoints = function(dataset, _a) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data;
      if (dataset.data.length === 0) {
        return "M0,0";
      }
      var datas = _this.getDatas(data);
      var xMax = _this.getXMaxValues(data);
      var x = function(i) {
        return Math.floor(paddingRight + (i * (width - paddingRight)) / xMax);
      };
      var baseHeight = _this.calcBaseHeight(datas, height);
      var y = function(i) {
        var yHeight = _this.calcHeight(dataset.data[i], datas, height);
        return Math.floor(((baseHeight - yHeight) / 4) * 3 + paddingTop);
      };
      return ["M".concat(x(0), ",").concat(y(0))]
        .concat(
          dataset.data.slice(0, -1).map(function(_, i) {
            var x_mid = (x(i) + x(i + 1)) / 2;
            var y_mid = (y(i) + y(i + 1)) / 2;
            var cp_x1 = (x_mid + x(i)) / 2;
            var cp_x2 = (x_mid + x(i + 1)) / 2;
            return (
              "Q "
                .concat(cp_x1, ", ")
                .concat(y(i), ", ")
                .concat(x_mid, ", ")
                .concat(y_mid) +
              " Q "
                .concat(cp_x2, ", ")
                .concat(y(i + 1), ", ")
                .concat(x(i + 1), ", ")
                .concat(y(i + 1))
            );
          })
        )
        .join(" ");
    };
    _this.renderBezierLine = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop;
      return data.map(function(dataset, index) {
        var result = _this.getBezierLinePoints(dataset, {
          width: width,
          height: height,
          paddingRight: paddingRight,
          paddingTop: paddingTop,
          data: data
        });
        return (
          <Path
            key={index}
            d={result}
            fill="none"
            stroke={_this.getColor(dataset, 0.2)}
            strokeWidth={_this.getStrokeWidth(dataset)}
            strokeDasharray={dataset.strokeDashArray}
            strokeDashoffset={dataset.strokeDashOffset}
          />
        );
      });
    };
    _this.renderBezierShadow = function(_a) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data,
        useColorFromDataset = _a.useColorFromDataset;
      return data.map(function(dataset, index) {
        var xMax = _this.getXMaxValues(data);
        var d =
          _this.getBezierLinePoints(dataset, {
            width: width,
            height: height,
            paddingRight: paddingRight,
            paddingTop: paddingTop,
            data: data
          }) +
          " L"
            .concat(
              paddingRight +
                ((width - paddingRight) / xMax) * (dataset.data.length - 1),
              ","
            )
            .concat((height / 4) * 3 + paddingTop, " L")
            .concat(paddingRight, ",")
            .concat((height / 4) * 3 + paddingTop, " Z");
        return (
          <Path
            key={index}
            d={d}
            fill={"url(#fillShadowGradientFrom".concat(
              useColorFromDataset ? "_".concat(index) : "",
              ")"
            )}
            strokeWidth={0}
          />
        );
      });
    };
    _this.renderLegend = function(width, legendOffset) {
      var _a = _this.props.data,
        legend = _a.legend,
        datasets = _a.datasets;
      var baseLegendItemX = width / (legend.length + 1);
      return legend.map(function(legendItem, i) {
        return (
          <G key={Math.random()}>
            <LegendItem
              index={i}
              iconColor={_this.getColor(datasets[i], 0.9)}
              baseLegendItemX={baseLegendItemX}
              legendText={legendItem}
              labelProps={__assign({}, _this.getPropsForLabels())}
              legendOffset={legendOffset}
            />
          </G>
        );
      });
    };
    return _this;
  }
  LineChart.prototype.render = function() {
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      data = _a.data,
      _b = _a.withScrollableDot,
      withScrollableDot = _b === void 0 ? false : _b,
      _c = _a.withShadow,
      withShadow = _c === void 0 ? true : _c,
      _d = _a.withDots,
      withDots = _d === void 0 ? true : _d,
      _e = _a.withInnerLines,
      withInnerLines = _e === void 0 ? true : _e,
      _f = _a.withOuterLines,
      withOuterLines = _f === void 0 ? true : _f,
      _g = _a.withHorizontalLines,
      withHorizontalLines = _g === void 0 ? true : _g,
      _h = _a.withVerticalLines,
      withVerticalLines = _h === void 0 ? true : _h,
      _j = _a.withHorizontalLabels,
      withHorizontalLabels = _j === void 0 ? true : _j,
      _k = _a.withVerticalLabels,
      withVerticalLabels = _k === void 0 ? true : _k,
      _l = _a.style,
      style = _l === void 0 ? {} : _l,
      decorator = _a.decorator,
      onDataPointClick = _a.onDataPointClick,
      _m = _a.verticalLabelRotation,
      verticalLabelRotation = _m === void 0 ? 0 : _m,
      _o = _a.horizontalLabelRotation,
      horizontalLabelRotation = _o === void 0 ? 0 : _o,
      _p = _a.formatYLabel,
      formatYLabel =
        _p === void 0
          ? function(yLabel) {
              return yLabel;
            }
          : _p,
      _q = _a.formatXLabel,
      formatXLabel =
        _q === void 0
          ? function(xLabel) {
              return xLabel;
            }
          : _q,
      segments = _a.segments,
      _r = _a.transparent,
      transparent = _r === void 0 ? false : _r,
      chartConfig = _a.chartConfig;
    var scrollableDotHorizontalOffset = this.state
      .scrollableDotHorizontalOffset;
    var _s = data.labels,
      labels = _s === void 0 ? [] : _s;
    var _t = style.borderRadius,
      borderRadius = _t === void 0 ? 0 : _t,
      _u = style.paddingTop,
      paddingTop = _u === void 0 ? 16 : _u,
      _v = style.paddingRight,
      paddingRight = _v === void 0 ? 64 : _v,
      _w = style.margin,
      margin = _w === void 0 ? 0 : _w,
      _x = style.marginRight,
      marginRight = _x === void 0 ? 0 : _x,
      _y = style.paddingBottom,
      paddingBottom = _y === void 0 ? 0 : _y;
    var config = {
      width: width,
      height: height,
      verticalLabelRotation: verticalLabelRotation,
      horizontalLabelRotation: horizontalLabelRotation
    };
    var datas = this.getDatas(data.datasets);
    var count =
      Math.min.apply(Math, datas) === Math.max.apply(Math, datas) ? 1 : 4;
    if (segments) {
      count = segments;
    }
    var legendOffset = this.props.data.legend ? height * 0.15 : 0;
    return (
      <View style={style}>
        <Svg
          height={height + paddingBottom + legendOffset}
          width={width - margin * 2 - marginRight}
        >
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={height + legendOffset}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
              fillOpacity={transparent ? 0 : 1}
            />
          )}
          {this.props.data.legend &&
            this.renderLegend(config.width, legendOffset)}
          <G x="0" y={legendOffset}>
            {this.renderDefs(
              __assign(__assign(__assign({}, config), chartConfig), {
                data: data.datasets
              })
            )}
            <G>
              {withHorizontalLines &&
                (withInnerLines
                  ? this.renderHorizontalLines(
                      __assign(__assign({}, config), {
                        count: count,
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels
                          ? paddingRight
                          : paddingRight / 2
                      })
                    )
                  : withOuterLines
                  ? this.renderHorizontalLine(
                      __assign(__assign({}, config), {
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels
                          ? paddingRight
                          : paddingRight / 2
                      })
                    )
                  : null)}
            </G>
            <G>
              {withHorizontalLabels &&
                this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: count,
                    data: datas,
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    formatYLabel: formatYLabel,
                    decimalPlaces: chartConfig.decimalPlaces
                  })
                )}
            </G>
            <G>
              {withVerticalLines &&
                (withInnerLines
                  ? this.renderVerticalLines(
                      __assign(__assign({}, config), {
                        data: data.datasets[0].data,
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels
                          ? paddingRight
                          : paddingRight / 2
                      })
                    )
                  : withOuterLines
                  ? this.renderVerticalLine(
                      __assign(__assign({}, config), {
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels
                          ? paddingRight
                          : paddingRight / 2
                      })
                    )
                  : null)}
            </G>
            <G>
              {withVerticalLabels &&
                this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: labels,
                    paddingTop: paddingTop,
                    paddingRight: withHorizontalLabels
                      ? paddingRight
                      : paddingRight / 2,
                    formatXLabel: formatXLabel
                  })
                )}
            </G>
            <G>
              {this.renderLine(
                __assign(__assign(__assign({}, config), chartConfig), {
                  paddingRight: withHorizontalLabels
                    ? paddingRight
                    : paddingRight / 2,
                  paddingTop: paddingTop,
                  data: data.datasets
                })
              )}
            </G>
            <G>
              {withShadow &&
                this.renderShadow(
                  __assign(__assign({}, config), {
                    data: data.datasets,
                    paddingRight: withHorizontalLabels
                      ? paddingRight
                      : paddingRight / 2,
                    paddingTop: paddingTop,
                    useColorFromDataset: chartConfig.useShadowColorFromDataset
                  })
                )}
            </G>
            <G>
              {withDots &&
                this.renderDots(
                  __assign(__assign({}, config), {
                    data: data.datasets,
                    paddingTop: paddingTop,
                    paddingRight: withHorizontalLabels
                      ? paddingRight
                      : paddingRight / 2,
                    onDataPointClick: onDataPointClick
                  })
                )}
            </G>
            <G>
              {withScrollableDot &&
                this.renderScrollableDot(
                  __assign(__assign(__assign({}, config), chartConfig), {
                    data: data.datasets,
                    paddingTop: paddingTop,
                    paddingRight: withHorizontalLabels
                      ? paddingRight
                      : paddingRight / 2,
                    onDataPointClick: onDataPointClick,
                    scrollableDotHorizontalOffset: scrollableDotHorizontalOffset
                  })
                )}
            </G>
            <G>
              {decorator &&
                decorator(
                  __assign(__assign({}, config), {
                    data: data.datasets,
                    paddingTop: paddingTop,
                    paddingRight: withHorizontalLabels
                      ? paddingRight
                      : paddingRight / 2
                  })
                )}
            </G>
          </G>
        </Svg>
        {withScrollableDot && (
          <ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: width * 2 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollableDotHorizontalOffset }
                  }
                }
              ],
              { useNativeDriver: false }
            )}
            horizontal
            bounces={false}
          />
        )}
      </View>
    );
  };
  return LineChart;
})(AbstractChart);
export default LineChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpbmUtY2hhcnQvTGluZUNoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxJQUFJLEVBRUwsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUNMLE1BQU0sRUFDTixDQUFDLEVBQ0QsSUFBSSxFQUNKLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sYUFHTixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUMsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBb005RDtJQUF3Qiw2QkFBNkM7SUFBckU7UUFBQSxxRUFneUJDO1FBL3hCQyxXQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBYSxDQUFDO1FBRXJDLFdBQUssR0FBRztZQUNOLDZCQUE2QixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDckQsQ0FBQztRQUVGLGNBQVEsR0FBRyxVQUFDLE9BQWdCLEVBQUUsT0FBZTtZQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7UUFFRixvQkFBYyxHQUFHLFVBQUMsT0FBZ0I7WUFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFD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O2dCQUNSLFNBQVMsdUJBQ0osTUFBTSxLQUNULElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUNuQixVQUFVLFlBQUEsRUFDVixZQUFZLEVBQUUsb0JBQW9CO3dCQUNoQyxDQUFDLENBQUUsWUFBdUI7d0JBQzFCLENBQUMsQ0FBRSxZQUF1QixHQUFHLENBQUMsSUFDaEMsQ0FDTjtZQUFBLEVBQUUsQ0FBQyxDQUNMO1VBQUEsRUFBRSxDQUFDLENBQ0w7UUFBQSxFQUFFLEdBQUcsQ0FDTDtRQUFBLENBQUMsaUJBQWlCLElBQUksQ0FDcEIsQ0FBQyxVQUFVLENBQ1QsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUMvQixxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUM1Qyw4QkFBOEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUN0QyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUN4QixRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUN0QjtvQkFDRTt3QkFDRSxXQUFXLEVBQUU7NEJBQ1gsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLDZCQUE2QixFQUFFO3lCQUNwRDtxQkFDRjtpQkFDRixFQUNELEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUMzQixDQUFDLENBQ0YsVUFBVSxDQUNWLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNmLENBQ0gsQ0FDSDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFoeUJELENBQXdCLGFBQWEsR0FneUJwQztBQUVELGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIEFuaW1hdGVkLFxyXG4gIFNjcm9sbFZpZXcsXHJcbiAgU3R5bGVTaGVldCxcclxuICBUZXh0SW5wdXQsXHJcbiAgVmlldyxcclxuICBWaWV3U3R5bGVcclxufSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7XHJcbiAgQ2lyY2xlLFxyXG4gIEcsXHJcbiAgUGF0aCxcclxuICBQb2x5Z29uLFxyXG4gIFBvbHlsaW5lLFxyXG4gIFJlY3QsXHJcbiAgU3ZnXHJcbn0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHNcclxufSBmcm9tIFwiLi4vQWJzdHJhY3RDaGFydFwiO1xyXG5pbXBvcnQgeyBDaGFydERhdGEsIERhdGFzZXQgfSBmcm9tIFwiLi4vSGVscGVyVHlwZXNcIjtcclxuaW1wb3J0IHsgTGVnZW5kSXRlbSB9IGZyb20gXCIuL0xlZ2VuZEl0ZW1cIjtcclxuXHJcbmxldCBBbmltYXRlZENpcmNsZSA9IEFuaW1hdGVkLmNyZWF0ZUFuaW1hdGVkQ29tcG9uZW50KENpcmNsZSk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFydERhdGEgZXh0ZW5kcyBDaGFydERhdGEge1xyXG4gIGxlZ2VuZD86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICAvKipcclxuICAgKiBEYXRhIGZvciB0aGUgY2hhcnQuXHJcbiAgICpcclxuICAgKiBFeGFtcGxlIGZyb20gW2RvY3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0I2xpbmUtY2hhcnQpOlxyXG4gICAqXHJcbiAgICogYGBgamF2YXNjcmlwdFxyXG4gICAqIGNvbnN0IGRhdGEgPSB7XHJcbiAgICogICBsYWJlbHM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZSddLFxyXG4gICAqICAgZGF0YXNldHM6IFt7XHJcbiAgICogICAgIGRhdGE6IFsgMjAsIDQ1LCAyOCwgODAsIDk5LCA0MyBdLFxyXG4gICAqICAgICBjb2xvcjogKG9wYWNpdHkgPSAxKSA9PiBgcmdiYSgxMzQsIDY1LCAyNDQsICR7b3BhY2l0eX0pYCwgLy8gb3B0aW9uYWxcclxuICAgKiAgICAgc3Ryb2tlV2lkdGg6IDIgLy8gb3B0aW9uYWxcclxuICAgKiAgIH1dLFxyXG4gICAqICAgbGVnZW5kOiBbXCJSYWlueSBEYXlzXCIsIFwiU3VubnkgRGF5c1wiLCBcIlNub3d5IERheXNcIl0gLy8gb3B0aW9uYWxcclxuICAgKiB9XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgZGF0YTogTGluZUNoYXJ0RGF0YTtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB0aGUgY2hhcnQsIHVzZSAnRGltZW5zaW9ucycgbGlicmFyeSB0byBnZXQgdGhlIHdpZHRoIG9mIHlvdXIgc2NyZWVuIGZvciByZXNwb25zaXZlLlxyXG4gICAqL1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogSGVpZ2h0IG9mIHRoZSBjaGFydC5cclxuICAgKi9cclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBTaG93IGRvdHMgb24gdGhlIGxpbmUgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhEb3RzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IHNoYWRvdyBmb3IgbGluZSAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFNoYWRvdz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBpbm5lciBkYXNoZWQgbGluZXMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG5cclxuICB3aXRoU2Nyb2xsYWJsZURvdD86IGJvb2xlYW47XHJcbiAgd2l0aElubmVyTGluZXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgb3V0ZXIgZGFzaGVkIGxpbmVzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoT3V0ZXJMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsaW5lcyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFZlcnRpY2FsTGluZXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgaG9yaXpvbnRhbCBsaW5lcyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBob3Jpem9udGFsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMYWJlbHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFJlbmRlciBjaGFydHMgZnJvbSAwIG5vdCBmcm9tIHRoZSBtaW5pbXVtIHZhbHVlLiAtIGRlZmF1bHQ6IEZhbHNlLlxyXG4gICAqL1xyXG4gIGZyb21aZXJvPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBQcmVwZW5kIHRleHQgdG8gaG9yaXpvbnRhbCBsYWJlbHMgLS0gZGVmYXVsdDogJycuXHJcbiAgICovXHJcbiAgeUF4aXNMYWJlbD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBBcHBlbmQgdGV4dCB0byBob3Jpem9udGFsIGxhYmVscyAtLSBkZWZhdWx0OiAnJy5cclxuICAgKi9cclxuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBQcmVwZW5kIHRleHQgdG8gdmVydGljYWwgbGFiZWxzIC0tIGRlZmF1bHQ6ICcnLlxyXG4gICAqL1xyXG4gIHhBeGlzTGFiZWw/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQ29uZmlndXJhdGlvbiBvYmplY3QgZm9yIHRoZSBjaGFydCwgc2VlIGV4YW1wbGU6XHJcbiAgICpcclxuICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICogY29uc3QgY2hhcnRDb25maWcgPSB7XHJcbiAgICogICBiYWNrZ3JvdW5kR3JhZGllbnRGcm9tOiBcIiMxRTI5MjNcIixcclxuICAgKiAgIGJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5OiAwLFxyXG4gICAqICAgYmFja2dyb3VuZEdyYWRpZW50VG86IFwiIzA4MTMwRFwiLFxyXG4gICAqICAgYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5OiAwLjUsXHJcbiAgICogICBjb2xvcjogKG9wYWNpdHkgPSAxKSA9PiBgcmdiYSgyNiwgMjU1LCAxNDYsICR7b3BhY2l0eX0pYCxcclxuICAgKiAgIGxhYmVsQ29sb3I6IChvcGFjaXR5ID0gMSkgPT4gYHJnYmEoMjYsIDI1NSwgMTQ2LCAke29wYWNpdHl9KWAsXHJcbiAgICogICBzdHJva2VXaWR0aDogMiwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgM1xyXG4gICAqICAgYmFyUGVyY2VudGFnZTogMC41XHJcbiAgICogfTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBjaGFydENvbmZpZz86IEFic3RyYWN0Q2hhcnRDb25maWc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERpdmlkZSBheGlzIHF1YW50aXR5IGJ5IHRoZSBpbnB1dCBudW1iZXIgLS0gZGVmYXVsdDogMS5cclxuICAgKi9cclxuICB5QXhpc0ludGVydmFsPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGlmIGNoYXJ0IGlzIHRyYW5zcGFyZW50XHJcbiAgICovXHJcbiAgdHJhbnNwYXJlbnQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBbd2hvbGUgYnVuY2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0L2Jsb2IvbWFzdGVyL3NyYy9saW5lLWNoYXJ0LmpzI0wyNjYpXHJcbiAgICogb2Ygc3R1ZmYgYW5kIGNhbiByZW5kZXIgZXh0cmEgZWxlbWVudHMsXHJcbiAgICogc3VjaCBhcyBkYXRhIHBvaW50IGluZm8gb3IgYWRkaXRpb25hbCBtYXJrdXAuXHJcbiAgICovXHJcbiAgZGVjb3JhdG9yPzogRnVuY3Rpb247XHJcbiAgLyoqXHJcbiAgICogQ2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhIGRhdGEgcG9pbnQgaXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBvbkRhdGFQb2ludENsaWNrPzogKGRhdGE6IHtcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgZGF0YXNldDogRGF0YXNldDtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGdldENvbG9yOiAob3BhY2l0eTogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgfSkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBTdHlsZSBvZiB0aGUgY29udGFpbmVyIHZpZXcgb2YgdGhlIGNoYXJ0LlxyXG4gICAqL1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGlzIHByb3AgdG8gbWFrZSB0aGUgbGluZSBjaGFydCBzbW9vdGggYW5kIGN1cnZ5LlxyXG4gICAqXHJcbiAgICogW0V4YW1wbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0I2Jlemllci1saW5lLWNoYXJ0KVxyXG4gICAqL1xyXG4gIGJlemllcj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyB0aGUgZG90IGNvbG9yIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBjYWxjdWxhdGUgY29sb3JzIG9mIGRvdHMgaW4gYSBsaW5lIGNoYXJ0LlxyXG4gICAqIFRha2VzIGAoZGF0YVBvaW50LCBkYXRhUG9pbnRJbmRleClgIGFzIGFyZ3VtZW50cy5cclxuICAgKi9cclxuICBnZXREb3RDb2xvcj86IChkYXRhUG9pbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFJlbmRlcnMgYWRkaXRpb25hbCBjb250ZW50IGZvciBkb3RzIGluIGEgbGluZSBjaGFydC5cclxuICAgKiBUYWtlcyBgKHt4LCB5LCBpbmRleH0pYCBhcyBhcmd1bWVudHMuXHJcbiAgICovXHJcbiAgcmVuZGVyRG90Q29udGVudD86IChwYXJhbXM6IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICBpbmRleERhdGE6IG51bWJlcjtcclxuICB9KSA9PiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgLyoqXHJcbiAgICogUm90YXRpb24gYW5nbGUgb2YgdGhlIGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdCAwIChkZWdyZWVzKS5cclxuICAgKi9cclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBSb3RhdGlvbiBhbmdsZSBvZiB0aGUgdmVydGljYWwgbGFiZWxzIC0gZGVmYXVsdCAwIChkZWdyZWVzKS5cclxuICAgKi9cclxuICB2ZXJ0aWNhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogT2Zmc2V0IGZvciBZIGF4aXMgbGFiZWxzLlxyXG4gICAqL1xyXG4gIHlMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogT2Zmc2V0IGZvciBYIGF4aXMgbGFiZWxzLlxyXG4gICAqL1xyXG4gIHhMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2YgaW5kaWNlcyBvZiB0aGUgZGF0YSBwb2ludHMgeW91IGRvbid0IHdhbnQgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBoaWRlUG9pbnRzQXRJbmRleD86IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY2hhbmdlIHRoZSBmb3JtYXQgb2YgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIFkgbGFiZWwuXHJcbiAgICogVGFrZXMgdGhlIHkgdmFsdWUgYXMgYXJndW1lbnQgYW5kIHNob3VsZCByZXR1cm4gdGhlIGRlc2lyYWJsZSBzdHJpbmcuXHJcbiAgICovXHJcbiAgZm9ybWF0WUxhYmVsPzogKHlWYWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjaGFuZ2UgdGhlIGZvcm1hdCBvZiB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgWCBsYWJlbC5cclxuICAgKiBUYWtlcyB0aGUgWCB2YWx1ZSBhcyBhcmd1bWVudCBhbmQgc2hvdWxkIHJldHVybiB0aGUgZGVzaXJhYmxlIHN0cmluZy5cclxuICAgKi9cclxuICBmb3JtYXRYTGFiZWw/OiAoeFZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICAvKipcclxuICAgKiBQcm92aWRlIHByb3BzIGZvciBhIGRhdGEgcG9pbnQgZG90LlxyXG4gICAqL1xyXG4gIGdldERvdFByb3BzPzogKGRhdGFQb2ludDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBvYmplY3Q7XHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBob3Jpem9udGFsIGxpbmVzXHJcbiAgICovXHJcbiAgc2VnbWVudHM/OiBudW1iZXI7XHJcbn1cclxuXHJcbnR5cGUgTGluZUNoYXJ0U3RhdGUgPSB7XHJcbiAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQ6IEFuaW1hdGVkLlZhbHVlO1xyXG59O1xyXG5cclxuY2xhc3MgTGluZUNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxMaW5lQ2hhcnRQcm9wcywgTGluZUNoYXJ0U3RhdGU+IHtcclxuICBsYWJlbCA9IFJlYWN0LmNyZWF0ZVJlZjxUZXh0SW5wdXQ+KCk7XHJcblxyXG4gIHN0YXRlID0ge1xyXG4gICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQ6IG5ldyBBbmltYXRlZC5WYWx1ZSgwKVxyXG4gIH07XHJcblxyXG4gIGdldENvbG9yID0gKGRhdGFzZXQ6IERhdGFzZXQsIG9wYWNpdHk6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuIChkYXRhc2V0LmNvbG9yIHx8IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IpKG9wYWNpdHkpO1xyXG4gIH07XHJcblxyXG4gIGdldFN0cm9rZVdpZHRoID0gKGRhdGFzZXQ6IERhdGFzZXQpID0+IHtcclxuICAgIHJldHVybiBkYXRhc2V0LnN0cm9rZVdpZHRoIHx8IHRoaXMucHJvcHMuY2hhcnRDb25maWcuc3Ryb2tlV2lkdGggfHwgMztcclxuICB9O1xyXG5cclxuICBnZXREYXRhcyA9IChkYXRhOiBEYXRhc2V0W10pOiBudW1iZXJbXSA9PiB7XHJcbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoXHJcbiAgICAgIChhY2MsIGl0ZW0pID0+IChpdGVtLmRhdGEgPyBbLi4uYWNjLCAuLi5pdGVtLmRhdGFdIDogYWNjKSxcclxuICAgICAgW11cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvcHNGb3JEb3RzID0gKHg6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB7IGdldERvdFByb3BzLCBjaGFydENvbmZpZyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAodHlwZW9mIGdldERvdFByb3BzID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgcmV0dXJuIGdldERvdFByb3BzKHgsIGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgcHJvcHNGb3JEb3RzID0ge30gfSA9IGNoYXJ0Q29uZmlnO1xyXG5cclxuICAgIHJldHVybiB7IHI6IFwiNFwiLCAuLi5wcm9wc0ZvckRvdHMgfTtcclxuICB9O1xyXG5cclxuICByZW5kZXJEb3RzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBvbkRhdGFQb2ludENsaWNrXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+ICYge1xyXG4gICAgb25EYXRhUG9pbnRDbGljazogTGluZUNoYXJ0UHJvcHNbXCJvbkRhdGFQb2ludENsaWNrXCJdO1xyXG4gIH0pID0+IHtcclxuICAgIGNvbnN0IG91dHB1dDogUmVhY3ROb2RlW10gPSBbXTtcclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhKTtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGFzLCBoZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgZ2V0RG90Q29sb3IsXHJcbiAgICAgIGhpZGVQb2ludHNBdEluZGV4ID0gW10sXHJcbiAgICAgIHJlbmRlckRvdENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeE1heCA9IHRoaXMuZ2V0WE1heFZhbHVlcyhkYXRhKTtcclxuICAgIGRhdGEuZm9yRWFjaChkYXRhc2V0ID0+IHtcclxuICAgICAgaWYgKGRhdGFzZXQud2l0aERvdHMgPT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICAgIGRhdGFzZXQuZGF0YS5mb3JFYWNoKCh4LCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjeCA9IHBhZGRpbmdSaWdodCArIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyB4TWF4O1xyXG5cclxuICAgICAgICBjb25zdCBjeSA9XHJcbiAgICAgICAgICAoKGJhc2VIZWlnaHQgLSB0aGlzLmNhbGNIZWlnaHQoeCwgZGF0YXMsIGhlaWdodCkpIC8gNCkgKiAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3A7XHJcblxyXG4gICAgICAgIGNvbnN0IG9uUHJlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIW9uRGF0YVBvaW50Q2xpY2sgfHwgaGlkZVBvaW50c0F0SW5kZXguaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG9uRGF0YVBvaW50Q2xpY2soe1xyXG4gICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgdmFsdWU6IHgsXHJcbiAgICAgICAgICAgIGRhdGFzZXQsXHJcbiAgICAgICAgICAgIHg6IGN4LFxyXG4gICAgICAgICAgICB5OiBjeSxcclxuICAgICAgICAgICAgZ2V0Q29sb3I6IG9wYWNpdHkgPT4gdGhpcy5nZXRDb2xvcihkYXRhc2V0LCBvcGFjaXR5KVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb3V0cHV0LnB1c2goXHJcbiAgICAgICAgICA8Q2lyY2xlXHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgY3g9e2N4fVxyXG4gICAgICAgICAgICBjeT17Y3l9XHJcbiAgICAgICAgICAgIGZpbGw9e1xyXG4gICAgICAgICAgICAgIHR5cGVvZiBnZXREb3RDb2xvciA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICAgICA/IGdldERvdENvbG9yKHgsIGkpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0Q29sb3IoZGF0YXNldCwgMC45KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uUHJlc3M9e29uUHJlc3N9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yRG90cyh4LCBpKX1cclxuICAgICAgICAgIC8+LFxyXG4gICAgICAgICAgPENpcmNsZVxyXG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICAgIGN4PXtjeH1cclxuICAgICAgICAgICAgY3k9e2N5fVxyXG4gICAgICAgICAgICByPVwiMTRcIlxyXG4gICAgICAgICAgICBmaWxsPVwiI2ZmZlwiXHJcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5PXswfVxyXG4gICAgICAgICAgICBvblByZXNzPXtvblByZXNzfVxyXG4gICAgICAgICAgLz4sXHJcbiAgICAgICAgICByZW5kZXJEb3RDb250ZW50KHsgeDogY3gsIHk6IGN5LCBpbmRleDogaSwgaW5kZXhEYXRhOiB4IH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclNjcm9sbGFibGVEb3QgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LFxyXG4gICAgc2Nyb2xsYWJsZURvdEZpbGwsXHJcbiAgICBzY3JvbGxhYmxlRG90U3Ryb2tlQ29sb3IsXHJcbiAgICBzY3JvbGxhYmxlRG90U3Ryb2tlV2lkdGgsXHJcbiAgICBzY3JvbGxhYmxlRG90UmFkaXVzLFxyXG4gICAgc2Nyb2xsYWJsZUluZm9WaWV3U3R5bGUsXHJcbiAgICBzY3JvbGxhYmxlSW5mb1RleHRTdHlsZSxcclxuICAgIHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvciA9IHggPT4gYCR7eH1gLFxyXG4gICAgc2Nyb2xsYWJsZUluZm9TaXplLFxyXG4gICAgc2Nyb2xsYWJsZUluZm9PZmZzZXRcclxuICB9OiBBYnN0cmFjdENoYXJ0Q29uZmlnICYge1xyXG4gICAgb25EYXRhUG9pbnRDbGljazogTGluZUNoYXJ0UHJvcHNbXCJvbkRhdGFQb2ludENsaWNrXCJdO1xyXG4gICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQ6IEFuaW1hdGVkLlZhbHVlO1xyXG4gIH0pID0+IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xyXG4gICAgY29uc3QgZGF0YXMgPSB0aGlzLmdldERhdGFzKGRhdGEpO1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YXMsIGhlaWdodCk7XHJcblxyXG4gICAgbGV0IHZsOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHBlckRhdGEgPSB3aWR0aCAvIGRhdGFbMF0uZGF0YS5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YVswXS5kYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICB2bC5wdXNoKGluZGV4ICogcGVyRGF0YSk7XHJcbiAgICB9XHJcbiAgICBsZXQgbGFzdEluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQuYWRkTGlzdGVuZXIodmFsdWUgPT4ge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHZhbHVlLnZhbHVlIC8gcGVyRGF0YTtcclxuICAgICAgaWYgKCFsYXN0SW5kZXgpIHtcclxuICAgICAgICBsYXN0SW5kZXggPSBpbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGFicyA9IE1hdGguZmxvb3IoaW5kZXgpO1xyXG4gICAgICBsZXQgcGVyY2VudCA9IGluZGV4IC0gYWJzO1xyXG4gICAgICBhYnMgPSBkYXRhWzBdLmRhdGEubGVuZ3RoIC0gYWJzIC0gMTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+PSBkYXRhWzBdLmRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoTWF0aC5mbG9vcihkYXRhWzBdLmRhdGFbMF0pKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xyXG4gICAgICAgICAgLy8gdG8gcmlnaHRcclxuXHJcbiAgICAgICAgICBjb25zdCBiYXNlID0gZGF0YVswXS5kYXRhW2Fic107XHJcbiAgICAgICAgICBjb25zdCBwcmV2ID0gZGF0YVswXS5kYXRhW2FicyAtIDFdO1xyXG4gICAgICAgICAgaWYgKHByZXYgPiBiYXNlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN0ID0gcHJldiAtIGJhc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihiYXNlICsgcGVyY2VudCAqIHJlc3QpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXN0ID0gYmFzZSAtIHByZXY7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihiYXNlIC0gcGVyY2VudCAqIHJlc3QpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdG8gbGVmdFxyXG5cclxuICAgICAgICAgIGNvbnN0IGJhc2UgPSBkYXRhWzBdLmRhdGFbYWJzIC0gMV07XHJcbiAgICAgICAgICBjb25zdCBuZXh0ID0gZGF0YVswXS5kYXRhW2Fic107XHJcbiAgICAgICAgICBwZXJjZW50ID0gMSAtIHBlcmNlbnQ7XHJcbiAgICAgICAgICBpZiAobmV4dCA+IGJhc2UpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBuZXh0IC0gYmFzZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJhc2UgKyBwZXJjZW50ICogcmVzdClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBiYXNlIC0gbmV4dDtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJhc2UgLSBwZXJjZW50ICogcmVzdClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsYXN0SW5kZXggPSBpbmRleDtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEuZm9yRWFjaChkYXRhc2V0ID0+IHtcclxuICAgICAgaWYgKGRhdGFzZXQud2l0aFNjcm9sbGFibGVEb3QgPT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHBlckRhdGEgPSB3aWR0aCAvIGRhdGFzZXQuZGF0YS5sZW5ndGg7XHJcbiAgICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgICAgbGV0IHlWYWx1ZXMgPSBbXTtcclxuICAgICAgbGV0IHhWYWx1ZXMgPSBbXTtcclxuXHJcbiAgICAgIGxldCB5VmFsdWVzTGFiZWwgPSBbXTtcclxuICAgICAgbGV0IHhWYWx1ZXNMYWJlbCA9IFtdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICB2YWx1ZXMucHVzaChpbmRleCAqIHBlckRhdGEpO1xyXG4gICAgICAgIGNvbnN0IHl2YWwgPVxyXG4gICAgICAgICAgKChiYXNlSGVpZ2h0IC1cclxuICAgICAgICAgICAgdGhpcy5jYWxjSGVpZ2h0KFxyXG4gICAgICAgICAgICAgIGRhdGFzZXQuZGF0YVtkYXRhc2V0LmRhdGEubGVuZ3RoIC0gaW5kZXggLSAxXSxcclxuICAgICAgICAgICAgICBkYXRhcyxcclxuICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgKSkgL1xyXG4gICAgICAgICAgICA0KSAqXHJcbiAgICAgICAgICAgIDMgK1xyXG4gICAgICAgICAgcGFkZGluZ1RvcDtcclxuICAgICAgICB5VmFsdWVzLnB1c2goeXZhbCk7XHJcbiAgICAgICAgY29uc3QgeHZhbCA9XHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgKChkYXRhc2V0LmRhdGEubGVuZ3RoIC0gaW5kZXggLSAxKSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC9cclxuICAgICAgICAgICAgZGF0YXNldC5kYXRhLmxlbmd0aDtcclxuICAgICAgICB4VmFsdWVzLnB1c2goeHZhbCk7XHJcblxyXG4gICAgICAgIHlWYWx1ZXNMYWJlbC5wdXNoKFxyXG4gICAgICAgICAgeXZhbCAtIChzY3JvbGxhYmxlSW5mb1NpemUuaGVpZ2h0ICsgc2Nyb2xsYWJsZUluZm9PZmZzZXQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB4VmFsdWVzTGFiZWwucHVzaCh4dmFsIC0gc2Nyb2xsYWJsZUluZm9TaXplLndpZHRoIC8gMik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldC5pbnRlcnBvbGF0ZSh7XHJcbiAgICAgICAgaW5wdXRSYW5nZTogdmFsdWVzLFxyXG4gICAgICAgIG91dHB1dFJhbmdlOiB4VmFsdWVzLFxyXG4gICAgICAgIGV4dHJhcG9sYXRlOiBcImNsYW1wXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCB0cmFuc2xhdGVZID0gc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQuaW50ZXJwb2xhdGUoe1xyXG4gICAgICAgIGlucHV0UmFuZ2U6IHZhbHVlcyxcclxuICAgICAgICBvdXRwdXRSYW5nZTogeVZhbHVlcyxcclxuICAgICAgICBleHRyYXBvbGF0ZTogXCJjbGFtcFwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbGFiZWxUcmFuc2xhdGVYID0gc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQuaW50ZXJwb2xhdGUoe1xyXG4gICAgICAgIGlucHV0UmFuZ2U6IHZhbHVlcyxcclxuICAgICAgICBvdXRwdXRSYW5nZTogeFZhbHVlc0xhYmVsLFxyXG4gICAgICAgIGV4dHJhcG9sYXRlOiBcImNsYW1wXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBsYWJlbFRyYW5zbGF0ZVkgPSBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldC5pbnRlcnBvbGF0ZSh7XHJcbiAgICAgICAgaW5wdXRSYW5nZTogdmFsdWVzLFxyXG4gICAgICAgIG91dHB1dFJhbmdlOiB5VmFsdWVzTGFiZWwsXHJcbiAgICAgICAgZXh0cmFwb2xhdGU6IFwiY2xhbXBcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICA8QW5pbWF0ZWQuVmlld1xyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgc3R5bGU9e1tcclxuICAgICAgICAgICAgc2Nyb2xsYWJsZUluZm9WaWV3U3R5bGUsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IFtcclxuICAgICAgICAgICAgICAgIHsgdHJhbnNsYXRlWDogbGFiZWxUcmFuc2xhdGVYIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRyYW5zbGF0ZVk6IGxhYmVsVHJhbnNsYXRlWSB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICB3aWR0aDogc2Nyb2xsYWJsZUluZm9TaXplLndpZHRoLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogc2Nyb2xsYWJsZUluZm9TaXplLmhlaWdodFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0SW5wdXRcclxuICAgICAgICAgICAgb25MYXlvdXQ9eygpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKFxyXG4gICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGRhdGFbMF0uZGF0YVtkYXRhWzBdLmRhdGEubGVuZ3RoIC0gMV0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHN0eWxlPXtzY3JvbGxhYmxlSW5mb1RleHRTdHlsZX1cclxuICAgICAgICAgICAgcmVmPXt0aGlzLmxhYmVsfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0FuaW1hdGVkLlZpZXc+LFxyXG4gICAgICAgIDxBbmltYXRlZENpcmNsZVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgY3g9e3RyYW5zbGF0ZVh9XHJcbiAgICAgICAgICBjeT17dHJhbnNsYXRlWX1cclxuICAgICAgICAgIHI9e3Njcm9sbGFibGVEb3RSYWRpdXN9XHJcbiAgICAgICAgICBzdHJva2U9e3Njcm9sbGFibGVEb3RTdHJva2VDb2xvcn1cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXtzY3JvbGxhYmxlRG90U3Ryb2tlV2lkdGh9XHJcbiAgICAgICAgICBmaWxsPXtzY3JvbGxhYmxlRG90RmlsbH1cclxuICAgICAgICAvPlxyXG4gICAgICBdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyU2hhZG93ID0gKHtcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGRhdGEsXHJcbiAgICB1c2VDb2xvckZyb21EYXRhc2V0XHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+ICYge1xyXG4gICAgdXNlQ29sb3JGcm9tRGF0YXNldDogQWJzdHJhY3RDaGFydENvbmZpZ1tcInVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXRcIl07XHJcbiAgfSkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuYmV6aWVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckJlemllclNoYWRvdyh7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YSk7XHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhcywgaGVpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFBvbHlnb25cclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICBwb2ludHM9e1xyXG4gICAgICAgICAgICBkYXRhc2V0LmRhdGFcclxuICAgICAgICAgICAgICAubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID1cclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgICAgICAgICAgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIGRhdGFzZXQuZGF0YS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9XHJcbiAgICAgICAgICAgICAgICAgICgoYmFzZUhlaWdodCAtIHRoaXMuY2FsY0hlaWdodChkLCBkYXRhcywgaGVpZ2h0KSkgLyA0KSAqIDMgK1xyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt4fSwke3l9YDtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5qb2luKFwiIFwiKSArXHJcbiAgICAgICAgICAgIGAgJHtwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gZGF0YXNldC5kYXRhLmxlbmd0aCkgKlxyXG4gICAgICAgICAgICAgICAgKGRhdGFzZXQuZGF0YS5sZW5ndGggLSAxKX0sJHsoaGVpZ2h0IC8gNCkgKiAzICtcclxuICAgICAgICAgICAgICBwYWRkaW5nVG9wfSAke3BhZGRpbmdSaWdodH0sJHsoaGVpZ2h0IC8gNCkgKiAzICsgcGFkZGluZ1RvcH1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmaWxsPXtgdXJsKCNmaWxsU2hhZG93R3JhZGllbnRGcm9tJHtcclxuICAgICAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldCA/IGBfJHtpbmRleH1gIDogXCJcIlxyXG4gICAgICAgICAgfSlgfVxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9ezB9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckxpbmUgPSAoe1xyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgZGF0YSxcclxuICAgIGxpbmVqb2luVHlwZVxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJsaW5lam9pblR5cGVcIlxyXG4gID4pID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLmJlemllcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJCZXppZXJMaW5lKHtcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgcGFkZGluZ1RvcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhKTtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGFzLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgeE1heCA9IHRoaXMuZ2V0WE1heFZhbHVlcyhkYXRhKTtcclxuXHJcbiAgICBsZXQgbGFzdFBvaW50OiBzdHJpbmc7XHJcblxyXG4gICAgZGF0YS5mb3JFYWNoKChkYXRhc2V0LCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBwb2ludHMgPSBkYXRhc2V0LmRhdGEubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGQgPT09IG51bGwpIHJldHVybiBsYXN0UG9pbnQ7XHJcbiAgICAgICAgY29uc3QgeCA9IChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyB4TWF4ICsgcGFkZGluZ1JpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgICAgKChiYXNlSGVpZ2h0IC0gdGhpcy5jYWxjSGVpZ2h0KGQsIGRhdGFzLCBoZWlnaHQpKSAvIDQpICogMyArXHJcbiAgICAgICAgICBwYWRkaW5nVG9wO1xyXG4gICAgICAgIGxhc3RQb2ludCA9IGAke3h9LCR7eX1gO1xyXG4gICAgICAgIHJldHVybiBgJHt4fSwke3l9YDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBvdXRwdXQucHVzaChcclxuICAgICAgICA8UG9seWxpbmVcclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj17bGluZWpvaW5UeXBlfVxyXG4gICAgICAgICAgcG9pbnRzPXtwb2ludHMuam9pbihcIiBcIil9XHJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICBzdHJva2U9e3RoaXMuZ2V0Q29sb3IoZGF0YXNldCwgMC4yKX1cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXt0aGlzLmdldFN0cm9rZVdpZHRoKGRhdGFzZXQpfVxyXG4gICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtkYXRhc2V0LnN0cm9rZURhc2hBcnJheX1cclxuICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9e2RhdGFzZXQuc3Ryb2tlRGFzaE9mZnNldH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9O1xyXG5cclxuICBnZXRYTWF4VmFsdWVzID0gKGRhdGE6IERhdGFzZXRbXSkgPT4ge1xyXG4gICAgcmV0dXJuIGRhdGEucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICByZXR1cm4gY3VyLmRhdGEubGVuZ3RoID4gYWNjID8gY3VyLmRhdGEubGVuZ3RoIDogYWNjO1xyXG4gICAgfSwgMCk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0QmV6aWVyTGluZVBvaW50cyA9IChcclxuICAgIGRhdGFzZXQ6IERhdGFzZXQsXHJcbiAgICB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgZGF0YVxyXG4gICAgfTogUGljazxcclxuICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgICAgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwiZGF0YVwiXHJcbiAgICA+XHJcbiAgKSA9PiB7XHJcbiAgICBpZiAoZGF0YXNldC5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gXCJNMCwwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YXMgPSB0aGlzLmdldERhdGFzKGRhdGEpO1xyXG4gICAgY29uc3QgeE1heCA9IHRoaXMuZ2V0WE1heFZhbHVlcyhkYXRhKTtcclxuXHJcbiAgICBjb25zdCB4ID0gKGk6IG51bWJlcikgPT5cclxuICAgICAgTWF0aC5mbG9vcihwYWRkaW5nUmlnaHQgKyAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8geE1heCk7XHJcblxyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YXMsIGhlaWdodCk7XHJcblxyXG4gICAgY29uc3QgeSA9IChpOiBudW1iZXIpID0+IHtcclxuICAgICAgY29uc3QgeUhlaWdodCA9IHRoaXMuY2FsY0hlaWdodChkYXRhc2V0LmRhdGFbaV0sIGRhdGFzLCBoZWlnaHQpO1xyXG5cclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKChiYXNlSGVpZ2h0IC0geUhlaWdodCkgLyA0KSAqIDMgKyBwYWRkaW5nVG9wKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFtgTSR7eCgwKX0sJHt5KDApfWBdXHJcbiAgICAgIC5jb25jYXQoXHJcbiAgICAgICAgZGF0YXNldC5kYXRhLnNsaWNlKDAsIC0xKS5tYXAoKF8sIGkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHhfbWlkID0gKHgoaSkgKyB4KGkgKyAxKSkgLyAyO1xyXG4gICAgICAgICAgY29uc3QgeV9taWQgPSAoeShpKSArIHkoaSArIDEpKSAvIDI7XHJcbiAgICAgICAgICBjb25zdCBjcF94MSA9ICh4X21pZCArIHgoaSkpIC8gMjtcclxuICAgICAgICAgIGNvbnN0IGNwX3gyID0gKHhfbWlkICsgeChpICsgMSkpIC8gMjtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIGBRICR7Y3BfeDF9LCAke3koaSl9LCAke3hfbWlkfSwgJHt5X21pZH1gICtcclxuICAgICAgICAgICAgYCBRICR7Y3BfeDJ9LCAke3koaSArIDEpfSwgJHt4KGkgKyAxKX0sICR7eShpICsgMSl9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9O1xyXG5cclxuICByZW5kZXJCZXppZXJMaW5lID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHBhZGRpbmdUb3BcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIFwiZGF0YVwiIHwgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIlxyXG4gID4pID0+IHtcclxuICAgIHJldHVybiBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRCZXppZXJMaW5lUG9pbnRzKGRhdGFzZXQsIHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgZGF0YVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFBhdGhcclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICBkPXtyZXN1bHR9XHJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICBzdHJva2U9e3RoaXMuZ2V0Q29sb3IoZGF0YXNldCwgMC4yKX1cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXt0aGlzLmdldFN0cm9rZVdpZHRoKGRhdGFzZXQpfVxyXG4gICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXtkYXRhc2V0LnN0cm9rZURhc2hBcnJheX1cclxuICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9e2RhdGFzZXQuc3Ryb2tlRGFzaE9mZnNldH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQmV6aWVyU2hhZG93ID0gKHtcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGRhdGEsXHJcbiAgICB1c2VDb2xvckZyb21EYXRhc2V0XHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+ICYge1xyXG4gICAgdXNlQ29sb3JGcm9tRGF0YXNldDogQWJzdHJhY3RDaGFydENvbmZpZ1tcInVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXRcIl07XHJcbiAgfSkgPT5cclxuICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB4TWF4ID0gdGhpcy5nZXRYTWF4VmFsdWVzKGRhdGEpO1xyXG4gICAgICBjb25zdCBkID1cclxuICAgICAgICB0aGlzLmdldEJlemllckxpbmVQb2ludHMoZGF0YXNldCwge1xyXG4gICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgIH0pICtcclxuICAgICAgICBgIEwke3BhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIHhNYXgpICpcclxuICAgICAgICAgICAgKGRhdGFzZXQuZGF0YS5sZW5ndGggLSAxKX0sJHsoaGVpZ2h0IC8gNCkgKiAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3B9IEwke3BhZGRpbmdSaWdodH0sJHsoaGVpZ2h0IC8gNCkgKiAzICsgcGFkZGluZ1RvcH0gWmA7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQYXRoXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgZD17ZH1cclxuICAgICAgICAgIGZpbGw9e2B1cmwoI2ZpbGxTaGFkb3dHcmFkaWVudEZyb20ke1xyXG4gICAgICAgICAgICB1c2VDb2xvckZyb21EYXRhc2V0ID8gYF8ke2luZGV4fWAgOiBcIlwiXHJcbiAgICAgICAgICB9KWB9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17MH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gIHJlbmRlckxlZ2VuZCA9ICh3aWR0aCwgbGVnZW5kT2Zmc2V0KSA9PiB7XHJcbiAgICBjb25zdCB7IGxlZ2VuZCwgZGF0YXNldHMgfSA9IHRoaXMucHJvcHMuZGF0YTtcclxuICAgIGNvbnN0IGJhc2VMZWdlbmRJdGVtWCA9IHdpZHRoIC8gKGxlZ2VuZC5sZW5ndGggKyAxKTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kLm1hcCgobGVnZW5kSXRlbSwgaSkgPT4gKFxyXG4gICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgIDxMZWdlbmRJdGVtXHJcbiAgICAgICAgICBpbmRleD17aX1cclxuICAgICAgICAgIGljb25Db2xvcj17dGhpcy5nZXRDb2xvcihkYXRhc2V0c1tpXSwgMC45KX1cclxuICAgICAgICAgIGJhc2VMZWdlbmRJdGVtWD17YmFzZUxlZ2VuZEl0ZW1YfVxyXG4gICAgICAgICAgbGVnZW5kVGV4dD17bGVnZW5kSXRlbX1cclxuICAgICAgICAgIGxhYmVsUHJvcHM9e3sgLi4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpIH19XHJcbiAgICAgICAgICBsZWdlbmRPZmZzZXQ9e2xlZ2VuZE9mZnNldH1cclxuICAgICAgICAvPlxyXG4gICAgICA8L0c+XHJcbiAgICApKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHdpdGhTY3JvbGxhYmxlRG90ID0gZmFsc2UsXHJcbiAgICAgIHdpdGhTaGFkb3cgPSB0cnVlLFxyXG4gICAgICB3aXRoRG90cyA9IHRydWUsXHJcbiAgICAgIHdpdGhJbm5lckxpbmVzID0gdHJ1ZSxcclxuICAgICAgd2l0aE91dGVyTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExpbmVzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHdpdGhWZXJ0aWNhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIGRlY29yYXRvcixcclxuICAgICAgb25EYXRhUG9pbnRDbGljayxcclxuICAgICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBmb3JtYXRZTGFiZWwgPSB5TGFiZWwgPT4geUxhYmVsLFxyXG4gICAgICBmb3JtYXRYTGFiZWwgPSB4TGFiZWwgPT4geExhYmVsLFxyXG4gICAgICBzZWdtZW50cyxcclxuICAgICAgdHJhbnNwYXJlbnQgPSBmYWxzZSxcclxuICAgICAgY2hhcnRDb25maWdcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHsgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IGxhYmVscyA9IFtdIH0gPSBkYXRhO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBib3JkZXJSYWRpdXMgPSAwLFxyXG4gICAgICBwYWRkaW5nVG9wID0gMTYsXHJcbiAgICAgIHBhZGRpbmdSaWdodCA9IDY0LFxyXG4gICAgICBtYXJnaW4gPSAwLFxyXG4gICAgICBtYXJnaW5SaWdodCA9IDAsXHJcbiAgICAgIHBhZGRpbmdCb3R0b20gPSAwXHJcbiAgICB9ID0gc3R5bGU7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24sXHJcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhLmRhdGFzZXRzKTtcclxuXHJcbiAgICBsZXQgY291bnQgPSBNYXRoLm1pbiguLi5kYXRhcykgPT09IE1hdGgubWF4KC4uLmRhdGFzKSA/IDEgOiA0O1xyXG4gICAgaWYgKHNlZ21lbnRzKSB7XHJcbiAgICAgIGNvdW50ID0gc2VnbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVnZW5kT2Zmc2V0ID0gdGhpcy5wcm9wcy5kYXRhLmxlZ2VuZCA/IGhlaWdodCAqIDAuMTUgOiAwO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgPFN2Z1xyXG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgKyAocGFkZGluZ0JvdHRvbSBhcyBudW1iZXIpICsgbGVnZW5kT2Zmc2V0fVxyXG4gICAgICAgICAgd2lkdGg9e3dpZHRoIC0gKG1hcmdpbiBhcyBudW1iZXIpICogMiAtIChtYXJnaW5SaWdodCBhcyBudW1iZXIpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgKyBsZWdlbmRPZmZzZXR9XHJcbiAgICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIGZpbGw9XCJ1cmwoI2JhY2tncm91bmRHcmFkaWVudClcIlxyXG4gICAgICAgICAgICAgIGZpbGxPcGFjaXR5PXt0cmFuc3BhcmVudCA/IDAgOiAxfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmRhdGEubGVnZW5kICYmXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKGNvbmZpZy53aWR0aCwgbGVnZW5kT2Zmc2V0KX1cclxuICAgICAgICAgIDxHIHg9XCIwXCIgeT17bGVnZW5kT2Zmc2V0fT5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyRGVmcyh7XHJcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgIC4uLmNoYXJ0Q29uZmlnLFxyXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHNcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExpbmVzICYmXHJcbiAgICAgICAgICAgICAgICAod2l0aElubmVyTGluZXNcclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMaW5lcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKSAvIDJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IHdpdGhPdXRlckxpbmVzXHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKSAvIDJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IG51bGwpfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExhYmVscyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIb3Jpem9udGFsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nUmlnaHQgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtYXRZTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXM6IGNoYXJ0Q29uZmlnLmRlY2ltYWxQbGFjZXNcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoVmVydGljYWxMaW5lcyAmJlxyXG4gICAgICAgICAgICAgICAgKHdpdGhJbm5lckxpbmVzXHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJWZXJ0aWNhbExpbmVzKHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHNbMF0uZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKSAvIDJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IHdpdGhPdXRlckxpbmVzXHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJWZXJ0aWNhbExpbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpIC8gMlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbCl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhWZXJ0aWNhbExhYmVscyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJWZXJ0aWNhbExhYmVscyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgbGFiZWxzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcikgLyAyLFxyXG4gICAgICAgICAgICAgICAgICBmb3JtYXRYTGFiZWxcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlckxpbmUoe1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgLi4uY2hhcnRDb25maWcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgIDogKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpIC8gMixcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoU2hhZG93ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNoYWRvdyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0cyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcikgLyAyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldDogY2hhcnRDb25maWcudXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhEb3RzICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckRvdHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgIG9uRGF0YVBvaW50Q2xpY2tcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoU2Nyb2xsYWJsZURvdCAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTY3JvbGxhYmxlRG90KHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAuLi5jaGFydENvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0cyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpIC8gMixcclxuICAgICAgICAgICAgICAgICAgb25EYXRhUG9pbnRDbGljayxcclxuICAgICAgICAgICAgICAgICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXRcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHtkZWNvcmF0b3IgJiZcclxuICAgICAgICAgICAgICAgIGRlY29yYXRvcih7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0cyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcikgLyAyXHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgIDwvU3ZnPlxyXG4gICAgICAgIHt3aXRoU2Nyb2xsYWJsZURvdCAmJiAoXHJcbiAgICAgICAgICA8U2Nyb2xsVmlld1xyXG4gICAgICAgICAgICBzdHlsZT17U3R5bGVTaGVldC5hYnNvbHV0ZUZpbGx9XHJcbiAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXJTdHlsZT17eyB3aWR0aDogd2lkdGggKiAyIH19XHJcbiAgICAgICAgICAgIHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17ZmFsc2V9XHJcbiAgICAgICAgICAgIHNjcm9sbEV2ZW50VGhyb3R0bGU9ezE2fVxyXG4gICAgICAgICAgICBvblNjcm9sbD17QW5pbWF0ZWQuZXZlbnQoXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBuYXRpdmVFdmVudDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRPZmZzZXQ6IHsgeDogc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICB7IHVzZU5hdGl2ZURyaXZlcjogZmFsc2UgfVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBob3Jpem9udGFsXHJcbiAgICAgICAgICAgIGJvdW5jZXM9e2ZhbHNlfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L1ZpZXc+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGluZUNoYXJ0O1xyXG4iXX0=
