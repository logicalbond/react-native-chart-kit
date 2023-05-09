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
              // onPress={onPress}
              {..._this.getPropsForDots(x, i)}
            />
            // <Circle
            //   key={Math.random()}
            //   cx={cx}
            //   cy={cy}
            //   r="14"
            //   fill="#fff"
            //   fillOpacity={0}
            //   onPress={onPress}
            // />,
            // renderDotContent({ x: cx, y: cy, index: i, indexData: x })
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
    _this.renderShadow = function(_a, uniqueKey) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data,
        useColorFromDataset = _a.useColorFromDataset;
      if (uniqueKey === void 0) {
        uniqueKey = null;
      }
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
              useColorFromDataset
                ? "_".concat(uniqueKey, "_").concat(index)
                : "",
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
    _this.renderBezierShadow = function(_a, uniqueKey) {
      var width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        data = _a.data,
        useColorFromDataset = _a.useColorFromDataset;
      if (uniqueKey === void 0) {
        uniqueKey = null;
      }
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
              useColorFromDataset
                ? "_".concat(uniqueKey, "_").concat(index)
                : "",
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
    var uniqueKey = Math.random().toString();
    var scrollableDotHorizontalOffset = this.state
      .scrollableDotHorizontalOffset;
    var _s = data.labels,
      labels = _s === void 0 ? [] : _s;
    var _t = style.borderRadius,
      borderRadius = _t === void 0 ? 0 : _t,
      _u = style.paddingTop,
      paddingTop = _u === void 0 ? 16 : _u,
      _v = style.paddingRight,
      paddingRight = _v === void 0 ? 55 : _v,
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
              fill={"url(#backgroundGradient_".concat(uniqueKey, ")")}
              fillOpacity={transparent ? 0 : 1}
            />
          )}
          {this.props.data.legend &&
            this.renderLegend(config.width, legendOffset)}
          <G x="0" y={legendOffset}>
            {this.renderDefs(
              __assign(__assign(__assign({}, config), this.props.chartConfig), {
                data: data.datasets
              }),
              uniqueKey
            )}
            <G>
              {withHorizontalLines &&
                (withInnerLines
                  ? this.renderHorizontalLines(
                      __assign(__assign({}, config), {
                        count: count,
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels ? paddingRight : 0
                      })
                    )
                  : withOuterLines
                  ? this.renderHorizontalLine(
                      __assign(__assign({}, config), {
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels ? paddingRight : 0
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
                        paddingRight: withHorizontalLabels ? paddingRight : 0
                      })
                    )
                  : withOuterLines
                  ? this.renderVerticalLine(
                      __assign(__assign({}, config), {
                        paddingTop: paddingTop,
                        paddingRight: withHorizontalLabels ? paddingRight : 0
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
                    paddingRight: withHorizontalLabels ? paddingRight : 0,
                    formatXLabel: formatXLabel
                  })
                )}
            </G>
            <G>
              {this.renderLine(
                __assign(__assign(__assign({}, config), chartConfig), {
                  paddingRight: withHorizontalLabels ? paddingRight : 0,
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
                    paddingRight: withHorizontalLabels ? paddingRight : 0,
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
                    paddingRight: withHorizontalLabels ? paddingRight : 0,
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
                    paddingRight: withHorizontalLabels ? paddingRight : 0,
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
                    paddingRight: withHorizontalLabels ? paddingRight : 0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpbmUtY2hhcnQvTGluZUNoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxJQUFJLEVBRUwsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUNMLE1BQU0sRUFDTixDQUFDLEVBQ0QsSUFBSSxFQUNKLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sYUFHTixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUMsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBb005RDtJQUF3Qiw2QkFBNkM7SUFBckU7UUFBQSxxRUEyeUJDO1FBMXlCQyxXQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBYSxDQUFDO1FBRXJDLFdBQUssR0FBRztZQUNOLDZCQUE2QixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDckQsQ0FBQztRQUVGLGNBQVEsR0FBRyxVQUFDLE9BQWdCLEVBQUUsT0FBZTtZQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7UUFFRixvQkFBYyxHQUFHLFVBQUMsT0FBZ0I7WUFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFD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QyxDQUFDLElBQ0wsQ0FDTjtZQUFBLEVBQUUsQ0FBQyxDQUNMO1VBQUEsRUFBRSxDQUFDLENBQ0w7UUFBQSxFQUFFLEdBQUcsQ0FDTDtRQUFBLENBQUMsaUJBQWlCLElBQUksQ0FDcEIsQ0FBQyxVQUFVLENBQ1QsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUMvQixxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUM1Qyw4QkFBOEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUN0QyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUN4QixRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUN0QjtvQkFDRTt3QkFDRSxXQUFXLEVBQUU7NEJBQ1gsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLDZCQUE2QixFQUFFO3lCQUNwRDtxQkFDRjtpQkFDRixFQUNELEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUMzQixDQUFDLENBQ0YsVUFBVSxDQUNWLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNmLENBQ0gsQ0FDSDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUEzeUJELENBQXdCLGFBQWEsR0EyeUJwQztBQUVELGVBQWUsU0FBUyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1xyXG4gIEFuaW1hdGVkLFxyXG4gIFNjcm9sbFZpZXcsXHJcbiAgU3R5bGVTaGVldCxcclxuICBUZXh0SW5wdXQsXHJcbiAgVmlldyxcclxuICBWaWV3U3R5bGVcclxufSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XHJcbmltcG9ydCB7XHJcbiAgQ2lyY2xlLFxyXG4gIEcsXHJcbiAgUGF0aCxcclxuICBQb2x5Z29uLFxyXG4gIFBvbHlsaW5lLFxyXG4gIFJlY3QsXHJcbiAgU3ZnXHJcbn0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHNcclxufSBmcm9tIFwiLi4vQWJzdHJhY3RDaGFydFwiO1xyXG5pbXBvcnQgeyBDaGFydERhdGEsIERhdGFzZXQgfSBmcm9tIFwiLi4vSGVscGVyVHlwZXNcIjtcclxuaW1wb3J0IHsgTGVnZW5kSXRlbSB9IGZyb20gXCIuL0xlZ2VuZEl0ZW1cIjtcclxuXHJcbmxldCBBbmltYXRlZENpcmNsZSA9IEFuaW1hdGVkLmNyZWF0ZUFuaW1hdGVkQ29tcG9uZW50KENpcmNsZSk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFydERhdGEgZXh0ZW5kcyBDaGFydERhdGEge1xyXG4gIGxlZ2VuZD86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbmVDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICAvKipcclxuICAgKiBEYXRhIGZvciB0aGUgY2hhcnQuXHJcbiAgICpcclxuICAgKiBFeGFtcGxlIGZyb20gW2RvY3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0I2xpbmUtY2hhcnQpOlxyXG4gICAqXHJcbiAgICogYGBgamF2YXNjcmlwdFxyXG4gICAqIGNvbnN0IGRhdGEgPSB7XHJcbiAgICogICBsYWJlbHM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZSddLFxyXG4gICAqICAgZGF0YXNldHM6IFt7XHJcbiAgICogICAgIGRhdGE6IFsgMjAsIDQ1LCAyOCwgODAsIDk5LCA0MyBdLFxyXG4gICAqICAgICBjb2xvcjogKG9wYWNpdHkgPSAxKSA9PiBgcmdiYSgxMzQsIDY1LCAyNDQsICR7b3BhY2l0eX0pYCwgLy8gb3B0aW9uYWxcclxuICAgKiAgICAgc3Ryb2tlV2lkdGg6IDIgLy8gb3B0aW9uYWxcclxuICAgKiAgIH1dLFxyXG4gICAqICAgbGVnZW5kOiBbXCJSYWlueSBEYXlzXCIsIFwiU3VubnkgRGF5c1wiLCBcIlNub3d5IERheXNcIl0gLy8gb3B0aW9uYWxcclxuICAgKiB9XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgZGF0YTogTGluZUNoYXJ0RGF0YTtcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB0aGUgY2hhcnQsIHVzZSAnRGltZW5zaW9ucycgbGlicmFyeSB0byBnZXQgdGhlIHdpZHRoIG9mIHlvdXIgc2NyZWVuIGZvciByZXNwb25zaXZlLlxyXG4gICAqL1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogSGVpZ2h0IG9mIHRoZSBjaGFydC5cclxuICAgKi9cclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBTaG93IGRvdHMgb24gdGhlIGxpbmUgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhEb3RzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IHNoYWRvdyBmb3IgbGluZSAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFNoYWRvdz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBpbm5lciBkYXNoZWQgbGluZXMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG5cclxuICB3aXRoU2Nyb2xsYWJsZURvdD86IGJvb2xlYW47XHJcbiAgd2l0aElubmVyTGluZXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgb3V0ZXIgZGFzaGVkIGxpbmVzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoT3V0ZXJMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsaW5lcyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFZlcnRpY2FsTGluZXM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgaG9yaXpvbnRhbCBsaW5lcyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBob3Jpem9udGFsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aEhvcml6b250YWxMYWJlbHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFJlbmRlciBjaGFydHMgZnJvbSAwIG5vdCBmcm9tIHRoZSBtaW5pbXVtIHZhbHVlLiAtIGRlZmF1bHQ6IEZhbHNlLlxyXG4gICAqL1xyXG4gIGZyb21aZXJvPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBQcmVwZW5kIHRleHQgdG8gaG9yaXpvbnRhbCBsYWJlbHMgLS0gZGVmYXVsdDogJycuXHJcbiAgICovXHJcbiAgeUF4aXNMYWJlbD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBBcHBlbmQgdGV4dCB0byBob3Jpem9udGFsIGxhYmVscyAtLSBkZWZhdWx0OiAnJy5cclxuICAgKi9cclxuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBQcmVwZW5kIHRleHQgdG8gdmVydGljYWwgbGFiZWxzIC0tIGRlZmF1bHQ6ICcnLlxyXG4gICAqL1xyXG4gIHhBeGlzTGFiZWw/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQ29uZmlndXJhdGlvbiBvYmplY3QgZm9yIHRoZSBjaGFydCwgc2VlIGV4YW1wbGU6XHJcbiAgICpcclxuICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICogY29uc3QgY2hhcnRDb25maWcgPSB7XHJcbiAgICogICBiYWNrZ3JvdW5kR3JhZGllbnRGcm9tOiBcIiMxRTI5MjNcIixcclxuICAgKiAgIGJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5OiAwLFxyXG4gICAqICAgYmFja2dyb3VuZEdyYWRpZW50VG86IFwiIzA4MTMwRFwiLFxyXG4gICAqICAgYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5OiAwLjUsXHJcbiAgICogICBjb2xvcjogKG9wYWNpdHkgPSAxKSA9PiBgcmdiYSgyNiwgMjU1LCAxNDYsICR7b3BhY2l0eX0pYCxcclxuICAgKiAgIGxhYmVsQ29sb3I6IChvcGFjaXR5ID0gMSkgPT4gYHJnYmEoMjYsIDI1NSwgMTQ2LCAke29wYWNpdHl9KWAsXHJcbiAgICogICBzdHJva2VXaWR0aDogMiwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgM1xyXG4gICAqICAgYmFyUGVyY2VudGFnZTogMC41XHJcbiAgICogfTtcclxuICAgKiBgYGBcclxuICAgKi9cclxuICBjaGFydENvbmZpZz86IEFic3RyYWN0Q2hhcnRDb25maWc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERpdmlkZSBheGlzIHF1YW50aXR5IGJ5IHRoZSBpbnB1dCBudW1iZXIgLS0gZGVmYXVsdDogMS5cclxuICAgKi9cclxuICB5QXhpc0ludGVydmFsPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIGlmIGNoYXJ0IGlzIHRyYW5zcGFyZW50XHJcbiAgICovXHJcbiAgdHJhbnNwYXJlbnQ/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBbd2hvbGUgYnVuY2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0L2Jsb2IvbWFzdGVyL3NyYy9saW5lLWNoYXJ0LmpzI0wyNjYpXHJcbiAgICogb2Ygc3R1ZmYgYW5kIGNhbiByZW5kZXIgZXh0cmEgZWxlbWVudHMsXHJcbiAgICogc3VjaCBhcyBkYXRhIHBvaW50IGluZm8gb3IgYWRkaXRpb25hbCBtYXJrdXAuXHJcbiAgICovXHJcbiAgZGVjb3JhdG9yPzogRnVuY3Rpb247XHJcbiAgLyoqXHJcbiAgICogQ2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhIGRhdGEgcG9pbnQgaXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBvbkRhdGFQb2ludENsaWNrPzogKGRhdGE6IHtcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICB2YWx1ZTogbnVtYmVyO1xyXG4gICAgZGF0YXNldDogRGF0YXNldDtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGdldENvbG9yOiAob3BhY2l0eTogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgfSkgPT4gdm9pZDtcclxuICAvKipcclxuICAgKiBTdHlsZSBvZiB0aGUgY29udGFpbmVyIHZpZXcgb2YgdGhlIGNoYXJ0LlxyXG4gICAqL1xyXG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGlzIHByb3AgdG8gbWFrZSB0aGUgbGluZSBjaGFydCBzbW9vdGggYW5kIGN1cnZ5LlxyXG4gICAqXHJcbiAgICogW0V4YW1wbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9pbmRpZXNwaXJpdC9yZWFjdC1uYXRpdmUtY2hhcnQta2l0I2Jlemllci1saW5lLWNoYXJ0KVxyXG4gICAqL1xyXG4gIGJlemllcj86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcyB0aGUgZG90IGNvbG9yIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBjYWxjdWxhdGUgY29sb3JzIG9mIGRvdHMgaW4gYSBsaW5lIGNoYXJ0LlxyXG4gICAqIFRha2VzIGAoZGF0YVBvaW50LCBkYXRhUG9pbnRJbmRleClgIGFzIGFyZ3VtZW50cy5cclxuICAgKi9cclxuICBnZXREb3RDb2xvcj86IChkYXRhUG9pbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFJlbmRlcnMgYWRkaXRpb25hbCBjb250ZW50IGZvciBkb3RzIGluIGEgbGluZSBjaGFydC5cclxuICAgKiBUYWtlcyBgKHt4LCB5LCBpbmRleH0pYCBhcyBhcmd1bWVudHMuXHJcbiAgICovXHJcbiAgcmVuZGVyRG90Q29udGVudD86IChwYXJhbXM6IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIGluZGV4OiBudW1iZXI7XHJcbiAgICBpbmRleERhdGE6IG51bWJlcjtcclxuICB9KSA9PiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgLyoqXHJcbiAgICogUm90YXRpb24gYW5nbGUgb2YgdGhlIGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdCAwIChkZWdyZWVzKS5cclxuICAgKi9cclxuICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBSb3RhdGlvbiBhbmdsZSBvZiB0aGUgdmVydGljYWwgbGFiZWxzIC0gZGVmYXVsdCAwIChkZWdyZWVzKS5cclxuICAgKi9cclxuICB2ZXJ0aWNhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogT2Zmc2V0IGZvciBZIGF4aXMgbGFiZWxzLlxyXG4gICAqL1xyXG4gIHlMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogT2Zmc2V0IGZvciBYIGF4aXMgbGFiZWxzLlxyXG4gICAqL1xyXG4gIHhMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2YgaW5kaWNlcyBvZiB0aGUgZGF0YSBwb2ludHMgeW91IGRvbid0IHdhbnQgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBoaWRlUG9pbnRzQXRJbmRleD86IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY2hhbmdlIHRoZSBmb3JtYXQgb2YgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIFkgbGFiZWwuXHJcbiAgICogVGFrZXMgdGhlIHkgdmFsdWUgYXMgYXJndW1lbnQgYW5kIHNob3VsZCByZXR1cm4gdGhlIGRlc2lyYWJsZSBzdHJpbmcuXHJcbiAgICovXHJcbiAgZm9ybWF0WUxhYmVsPzogKHlWYWx1ZTogc3RyaW5nKSA9PiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjaGFuZ2UgdGhlIGZvcm1hdCBvZiB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgWCBsYWJlbC5cclxuICAgKiBUYWtlcyB0aGUgWCB2YWx1ZSBhcyBhcmd1bWVudCBhbmQgc2hvdWxkIHJldHVybiB0aGUgZGVzaXJhYmxlIHN0cmluZy5cclxuICAgKi9cclxuICBmb3JtYXRYTGFiZWw/OiAoeFZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICAvKipcclxuICAgKiBQcm92aWRlIHByb3BzIGZvciBhIGRhdGEgcG9pbnQgZG90LlxyXG4gICAqL1xyXG4gIGdldERvdFByb3BzPzogKGRhdGFQb2ludDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBvYmplY3Q7XHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciBvZiBob3Jpem9udGFsIGxpbmVzXHJcbiAgICovXHJcbiAgc2VnbWVudHM/OiBudW1iZXI7XHJcbn1cclxuXHJcbnR5cGUgTGluZUNoYXJ0U3RhdGUgPSB7XHJcbiAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQ6IEFuaW1hdGVkLlZhbHVlO1xyXG59O1xyXG5cclxuY2xhc3MgTGluZUNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxMaW5lQ2hhcnRQcm9wcywgTGluZUNoYXJ0U3RhdGU+IHtcclxuICBsYWJlbCA9IFJlYWN0LmNyZWF0ZVJlZjxUZXh0SW5wdXQ+KCk7XHJcblxyXG4gIHN0YXRlID0ge1xyXG4gICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQ6IG5ldyBBbmltYXRlZC5WYWx1ZSgwKVxyXG4gIH07XHJcblxyXG4gIGdldENvbG9yID0gKGRhdGFzZXQ6IERhdGFzZXQsIG9wYWNpdHk6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuIChkYXRhc2V0LmNvbG9yIHx8IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IpKG9wYWNpdHkpO1xyXG4gIH07XHJcblxyXG4gIGdldFN0cm9rZVdpZHRoID0gKGRhdGFzZXQ6IERhdGFzZXQpID0+IHtcclxuICAgIHJldHVybiBkYXRhc2V0LnN0cm9rZVdpZHRoIHx8IHRoaXMucHJvcHMuY2hhcnRDb25maWcuc3Ryb2tlV2lkdGggfHwgMztcclxuICB9O1xyXG5cclxuICBnZXREYXRhcyA9IChkYXRhOiBEYXRhc2V0W10pOiBudW1iZXJbXSA9PiB7XHJcbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoXHJcbiAgICAgIChhY2MsIGl0ZW0pID0+IChpdGVtLmRhdGEgPyBbLi4uYWNjLCAuLi5pdGVtLmRhdGFdIDogYWNjKSxcclxuICAgICAgW11cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0UHJvcHNGb3JEb3RzID0gKHg6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB7IGdldERvdFByb3BzLCBjaGFydENvbmZpZyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAodHlwZW9mIGdldERvdFByb3BzID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgcmV0dXJuIGdldERvdFByb3BzKHgsIGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgcHJvcHNGb3JEb3RzID0ge30gfSA9IGNoYXJ0Q29uZmlnO1xyXG5cclxuICAgIHJldHVybiB7IHI6IFwiNFwiLCAuLi5wcm9wc0ZvckRvdHMgfTtcclxuICB9O1xyXG5cclxuICByZW5kZXJEb3RzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBvbkRhdGFQb2ludENsaWNrXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+ICYge1xyXG4gICAgb25EYXRhUG9pbnRDbGljazogTGluZUNoYXJ0UHJvcHNbXCJvbkRhdGFQb2ludENsaWNrXCJdO1xyXG4gIH0pID0+IHtcclxuICAgIGNvbnN0IG91dHB1dDogUmVhY3ROb2RlW10gPSBbXTtcclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhKTtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGFzLCBoZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgZ2V0RG90Q29sb3IsXHJcbiAgICAgIGhpZGVQb2ludHNBdEluZGV4ID0gW10sXHJcbiAgICAgIHJlbmRlckRvdENvbnRlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeE1heCA9IHRoaXMuZ2V0WE1heFZhbHVlcyhkYXRhKTtcclxuICAgIGRhdGEuZm9yRWFjaChkYXRhc2V0ID0+IHtcclxuICAgICAgaWYgKGRhdGFzZXQud2l0aERvdHMgPT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICAgIGRhdGFzZXQuZGF0YS5mb3JFYWNoKCh4LCBpKSA9PiB7XHJcbiAgICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjeCA9IHBhZGRpbmdSaWdodCArIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyB4TWF4O1xyXG5cclxuICAgICAgICBjb25zdCBjeSA9XHJcbiAgICAgICAgICAoKGJhc2VIZWlnaHQgLSB0aGlzLmNhbGNIZWlnaHQoeCwgZGF0YXMsIGhlaWdodCkpIC8gNCkgKiAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3A7XHJcblxyXG4gICAgICAgIGNvbnN0IG9uUHJlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIW9uRGF0YVBvaW50Q2xpY2sgfHwgaGlkZVBvaW50c0F0SW5kZXguaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG9uRGF0YVBvaW50Q2xpY2soe1xyXG4gICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgdmFsdWU6IHgsXHJcbiAgICAgICAgICAgIGRhdGFzZXQsXHJcbiAgICAgICAgICAgIHg6IGN4LFxyXG4gICAgICAgICAgICB5OiBjeSxcclxuICAgICAgICAgICAgZ2V0Q29sb3I6IG9wYWNpdHkgPT4gdGhpcy5nZXRDb2xvcihkYXRhc2V0LCBvcGFjaXR5KVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb3V0cHV0LnB1c2goXHJcbiAgICAgICAgICA8Q2lyY2xlXHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgY3g9e2N4fVxyXG4gICAgICAgICAgICBjeT17Y3l9XHJcbiAgICAgICAgICAgIGZpbGw9e1xyXG4gICAgICAgICAgICAgIHR5cGVvZiBnZXREb3RDb2xvciA9PT0gXCJmdW5jdGlvblwiXHJcbiAgICAgICAgICAgICAgICA/IGdldERvdENvbG9yKHgsIGkpXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0Q29sb3IoZGF0YXNldCwgMC45KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG9uUHJlc3M9e29uUHJlc3N9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yRG90cyh4LCBpKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICAvLyA8Q2lyY2xlXHJcbiAgICAgICAgICAvLyAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIC8vICAgY3g9e2N4fVxyXG4gICAgICAgICAgLy8gICBjeT17Y3l9XHJcbiAgICAgICAgICAvLyAgIHI9XCIxNFwiXHJcbiAgICAgICAgICAvLyAgIGZpbGw9XCIjZmZmXCJcclxuICAgICAgICAgIC8vICAgZmlsbE9wYWNpdHk9ezB9XHJcbiAgICAgICAgICAvLyAgIG9uUHJlc3M9e29uUHJlc3N9XHJcbiAgICAgICAgICAvLyAvPixcclxuICAgICAgICAgIC8vIHJlbmRlckRvdENvbnRlbnQoeyB4OiBjeCwgeTogY3ksIGluZGV4OiBpLCBpbmRleERhdGE6IHggfSlcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyU2Nyb2xsYWJsZURvdCA9ICh7XHJcbiAgICBkYXRhLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nVG9wLFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQsXHJcbiAgICBzY3JvbGxhYmxlRG90RmlsbCxcclxuICAgIHNjcm9sbGFibGVEb3RTdHJva2VDb2xvcixcclxuICAgIHNjcm9sbGFibGVEb3RTdHJva2VXaWR0aCxcclxuICAgIHNjcm9sbGFibGVEb3RSYWRpdXMsXHJcbiAgICBzY3JvbGxhYmxlSW5mb1ZpZXdTdHlsZSxcclxuICAgIHNjcm9sbGFibGVJbmZvVGV4dFN0eWxlLFxyXG4gICAgc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yID0geCA9PiBgJHt4fWAsXHJcbiAgICBzY3JvbGxhYmxlSW5mb1NpemUsXHJcbiAgICBzY3JvbGxhYmxlSW5mb09mZnNldFxyXG4gIH06IEFic3RyYWN0Q2hhcnRDb25maWcgJiB7XHJcbiAgICBvbkRhdGFQb2ludENsaWNrOiBMaW5lQ2hhcnRQcm9wc1tcIm9uRGF0YVBvaW50Q2xpY2tcIl07XHJcbiAgICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldDogQW5pbWF0ZWQuVmFsdWU7XHJcbiAgfSkgPT4ge1xyXG4gICAgY29uc3Qgb3V0cHV0ID0gW107XHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YSk7XHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhcywgaGVpZ2h0KTtcclxuXHJcbiAgICBsZXQgdmw6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgY29uc3QgcGVyRGF0YSA9IHdpZHRoIC8gZGF0YVswXS5kYXRhLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhWzBdLmRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHZsLnB1c2goaW5kZXggKiBwZXJEYXRhKTtcclxuICAgIH1cclxuICAgIGxldCBsYXN0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldC5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdmFsdWUudmFsdWUgLyBwZXJEYXRhO1xyXG4gICAgICBpZiAoIWxhc3RJbmRleCkge1xyXG4gICAgICAgIGxhc3RJbmRleCA9IGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgYWJzID0gTWF0aC5mbG9vcihpbmRleCk7XHJcbiAgICAgIGxldCBwZXJjZW50ID0gaW5kZXggLSBhYnM7XHJcbiAgICAgIGFicyA9IGRhdGFbMF0uZGF0YS5sZW5ndGggLSBhYnMgLSAxO1xyXG5cclxuICAgICAgaWYgKGluZGV4ID49IGRhdGFbMF0uZGF0YS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihNYXRoLmZsb29yKGRhdGFbMF0uZGF0YVswXSkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gbGFzdEluZGV4KSB7XHJcbiAgICAgICAgICAvLyB0byByaWdodFxyXG5cclxuICAgICAgICAgIGNvbnN0IGJhc2UgPSBkYXRhWzBdLmRhdGFbYWJzXTtcclxuICAgICAgICAgIGNvbnN0IHByZXYgPSBkYXRhWzBdLmRhdGFbYWJzIC0gMV07XHJcbiAgICAgICAgICBpZiAocHJldiA+IGJhc2UpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBwcmV2IC0gYmFzZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJhc2UgKyBwZXJjZW50ICogcmVzdClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlc3QgPSBiYXNlIC0gcHJldjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoXHJcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJhc2UgLSBwZXJjZW50ICogcmVzdClcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyB0byBsZWZ0XHJcblxyXG4gICAgICAgICAgY29uc3QgYmFzZSA9IGRhdGFbMF0uZGF0YVthYnMgLSAxXTtcclxuICAgICAgICAgIGNvbnN0IG5leHQgPSBkYXRhWzBdLmRhdGFbYWJzXTtcclxuICAgICAgICAgIHBlcmNlbnQgPSAxIC0gcGVyY2VudDtcclxuICAgICAgICAgIGlmIChuZXh0ID4gYmFzZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdCA9IG5leHQgLSBiYXNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihcclxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYmFzZSArIHBlcmNlbnQgKiByZXN0KVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVzdCA9IGJhc2UgLSBuZXh0O1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihcclxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYmFzZSAtIHBlcmNlbnQgKiByZXN0KVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGxhc3RJbmRleCA9IGluZGV4O1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xyXG4gICAgICBpZiAoZGF0YXNldC53aXRoU2Nyb2xsYWJsZURvdCA9PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgcGVyRGF0YSA9IHdpZHRoIC8gZGF0YXNldC5kYXRhLmxlbmd0aDtcclxuICAgICAgbGV0IHZhbHVlcyA9IFtdO1xyXG4gICAgICBsZXQgeVZhbHVlcyA9IFtdO1xyXG4gICAgICBsZXQgeFZhbHVlcyA9IFtdO1xyXG5cclxuICAgICAgbGV0IHlWYWx1ZXNMYWJlbCA9IFtdO1xyXG4gICAgICBsZXQgeFZhbHVlc0xhYmVsID0gW107XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YXNldC5kYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIHZhbHVlcy5wdXNoKGluZGV4ICogcGVyRGF0YSk7XHJcbiAgICAgICAgY29uc3QgeXZhbCA9XHJcbiAgICAgICAgICAoKGJhc2VIZWlnaHQgLVxyXG4gICAgICAgICAgICB0aGlzLmNhbGNIZWlnaHQoXHJcbiAgICAgICAgICAgICAgZGF0YXNldC5kYXRhW2RhdGFzZXQuZGF0YS5sZW5ndGggLSBpbmRleCAtIDFdLFxyXG4gICAgICAgICAgICAgIGRhdGFzLFxyXG4gICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICApKSAvXHJcbiAgICAgICAgICAgIDQpICpcclxuICAgICAgICAgICAgMyArXHJcbiAgICAgICAgICBwYWRkaW5nVG9wO1xyXG4gICAgICAgIHlWYWx1ZXMucHVzaCh5dmFsKTtcclxuICAgICAgICBjb25zdCB4dmFsID1cclxuICAgICAgICAgIHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAoKGRhdGFzZXQuZGF0YS5sZW5ndGggLSBpbmRleCAtIDEpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgL1xyXG4gICAgICAgICAgICBkYXRhc2V0LmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHhWYWx1ZXMucHVzaCh4dmFsKTtcclxuXHJcbiAgICAgICAgeVZhbHVlc0xhYmVsLnB1c2goXHJcbiAgICAgICAgICB5dmFsIC0gKHNjcm9sbGFibGVJbmZvU2l6ZS5oZWlnaHQgKyBzY3JvbGxhYmxlSW5mb09mZnNldClcclxuICAgICAgICApO1xyXG4gICAgICAgIHhWYWx1ZXNMYWJlbC5wdXNoKHh2YWwgLSBzY3JvbGxhYmxlSW5mb1NpemUud2lkdGggLyAyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LmludGVycG9sYXRlKHtcclxuICAgICAgICBpbnB1dFJhbmdlOiB2YWx1ZXMsXHJcbiAgICAgICAgb3V0cHV0UmFuZ2U6IHhWYWx1ZXMsXHJcbiAgICAgICAgZXh0cmFwb2xhdGU6IFwiY2xhbXBcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVkgPSBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldC5pbnRlcnBvbGF0ZSh7XHJcbiAgICAgICAgaW5wdXRSYW5nZTogdmFsdWVzLFxyXG4gICAgICAgIG91dHB1dFJhbmdlOiB5VmFsdWVzLFxyXG4gICAgICAgIGV4dHJhcG9sYXRlOiBcImNsYW1wXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBsYWJlbFRyYW5zbGF0ZVggPSBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldC5pbnRlcnBvbGF0ZSh7XHJcbiAgICAgICAgaW5wdXRSYW5nZTogdmFsdWVzLFxyXG4gICAgICAgIG91dHB1dFJhbmdlOiB4VmFsdWVzTGFiZWwsXHJcbiAgICAgICAgZXh0cmFwb2xhdGU6IFwiY2xhbXBcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGxhYmVsVHJhbnNsYXRlWSA9IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LmludGVycG9sYXRlKHtcclxuICAgICAgICBpbnB1dFJhbmdlOiB2YWx1ZXMsXHJcbiAgICAgICAgb3V0cHV0UmFuZ2U6IHlWYWx1ZXNMYWJlbCxcclxuICAgICAgICBleHRyYXBvbGF0ZTogXCJjbGFtcFwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgb3V0cHV0LnB1c2goW1xyXG4gICAgICAgIDxBbmltYXRlZC5WaWV3XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICBzdHlsZT17W1xyXG4gICAgICAgICAgICBzY3JvbGxhYmxlSW5mb1ZpZXdTdHlsZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogW1xyXG4gICAgICAgICAgICAgICAgeyB0cmFuc2xhdGVYOiBsYWJlbFRyYW5zbGF0ZVggfSxcclxuICAgICAgICAgICAgICAgIHsgdHJhbnNsYXRlWTogbGFiZWxUcmFuc2xhdGVZIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHdpZHRoOiBzY3JvbGxhYmxlSW5mb1NpemUud2lkdGgsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiBzY3JvbGxhYmxlSW5mb1NpemUuaGVpZ2h0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRleHRJbnB1dFxyXG4gICAgICAgICAgICBvbkxheW91dD17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IoXHJcbiAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoZGF0YVswXS5kYXRhW2RhdGFbMF0uZGF0YS5sZW5ndGggLSAxXSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgc3R5bGU9e3Njcm9sbGFibGVJbmZvVGV4dFN0eWxlfVxyXG4gICAgICAgICAgICByZWY9e3RoaXMubGFiZWx9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQW5pbWF0ZWQuVmlldz4sXHJcbiAgICAgICAgPEFuaW1hdGVkQ2lyY2xlXHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICBjeD17dHJhbnNsYXRlWH1cclxuICAgICAgICAgIGN5PXt0cmFuc2xhdGVZfVxyXG4gICAgICAgICAgcj17c2Nyb2xsYWJsZURvdFJhZGl1c31cclxuICAgICAgICAgIHN0cm9rZT17c2Nyb2xsYWJsZURvdFN0cm9rZUNvbG9yfVxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9e3Njcm9sbGFibGVEb3RTdHJva2VXaWR0aH1cclxuICAgICAgICAgIGZpbGw9e3Njcm9sbGFibGVEb3RGaWxsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9O1xyXG5cclxuICByZW5kZXJTaGFkb3cgPSAoXHJcbiAgICB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgZGF0YSxcclxuICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldFxyXG4gICAgfTogUGljazxcclxuICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgICAgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICA+ICYge1xyXG4gICAgICB1c2VDb2xvckZyb21EYXRhc2V0OiBBYnN0cmFjdENoYXJ0Q29uZmlnW1widXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXTtcclxuICAgIH0sXHJcbiAgICB1bmlxdWVLZXk6IHN0cmluZyA9IG51bGxcclxuICApID0+IHtcclxuICAgIGlmICh0aGlzLnByb3BzLmJlemllcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJCZXppZXJTaGFkb3coe1xyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIHVzZUNvbG9yRnJvbURhdGFzZXRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YXMgPSB0aGlzLmdldERhdGFzKGRhdGEpO1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YXMsIGhlaWdodCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4ge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQb2x5Z29uXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgcG9pbnRzPXtcclxuICAgICAgICAgICAgZGF0YXNldC5kYXRhXHJcbiAgICAgICAgICAgICAgLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9XHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAgICAgICAgIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhc2V0LmRhdGEubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHkgPVxyXG4gICAgICAgICAgICAgICAgICAoKGJhc2VIZWlnaHQgLSB0aGlzLmNhbGNIZWlnaHQoZCwgZGF0YXMsIGhlaWdodCkpIC8gNCkgKiAzICtcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7eH0sJHt5fWA7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuam9pbihcIiBcIikgK1xyXG4gICAgICAgICAgICBgICR7cGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGRhdGFzZXQuZGF0YS5sZW5ndGgpICpcclxuICAgICAgICAgICAgICAgIChkYXRhc2V0LmRhdGEubGVuZ3RoIC0gMSl9LCR7KGhlaWdodCAvIDQpICogMyArXHJcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcH0gJHtwYWRkaW5nUmlnaHR9LCR7KGhlaWdodCAvIDQpICogMyArIHBhZGRpbmdUb3B9YFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmlsbD17YHVybCgjZmlsbFNoYWRvd0dyYWRpZW50RnJvbSR7XHJcbiAgICAgICAgICAgIHVzZUNvbG9yRnJvbURhdGFzZXQgPyBgXyR7dW5pcXVlS2V5fV8ke2luZGV4fWAgOiBcIlwiXHJcbiAgICAgICAgICB9KWB9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17MH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyTGluZSA9ICh7XHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBkYXRhLFxyXG4gICAgbGluZWpvaW5UeXBlXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCIgfCBcImxpbmVqb2luVHlwZVwiXHJcbiAgPikgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuYmV6aWVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckJlemllckxpbmUoe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgICBwYWRkaW5nVG9wXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xyXG4gICAgY29uc3QgZGF0YXMgPSB0aGlzLmdldERhdGFzKGRhdGEpO1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YXMsIGhlaWdodCk7XHJcbiAgICBjb25zdCB4TWF4ID0gdGhpcy5nZXRYTWF4VmFsdWVzKGRhdGEpO1xyXG5cclxuICAgIGxldCBsYXN0UG9pbnQ6IHN0cmluZztcclxuXHJcbiAgICBkYXRhLmZvckVhY2goKGRhdGFzZXQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IGRhdGFzZXQuZGF0YS5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICBpZiAoZCA9PT0gbnVsbCkgcmV0dXJuIGxhc3RQb2ludDtcclxuICAgICAgICBjb25zdCB4ID0gKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIHhNYXggKyBwYWRkaW5nUmlnaHQ7XHJcbiAgICAgICAgY29uc3QgeSA9XHJcbiAgICAgICAgICAoKGJhc2VIZWlnaHQgLSB0aGlzLmNhbGNIZWlnaHQoZCwgZGF0YXMsIGhlaWdodCkpIC8gNCkgKiAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3A7XHJcbiAgICAgICAgbGFzdFBvaW50ID0gYCR7eH0sJHt5fWA7XHJcbiAgICAgICAgcmV0dXJuIGAke3h9LCR7eX1gO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG91dHB1dC5wdXNoKFxyXG4gICAgICAgIDxQb2x5bGluZVxyXG4gICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPXtsaW5lam9pblR5cGV9XHJcbiAgICAgICAgICBwb2ludHM9e3BvaW50cy5qb2luKFwiIFwiKX1cclxuICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgIHN0cm9rZT17dGhpcy5nZXRDb2xvcihkYXRhc2V0LCAwLjIpfVxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9e3RoaXMuZ2V0U3Ryb2tlV2lkdGgoZGF0YXNldCl9XHJcbiAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9e2RhdGFzZXQuc3Ryb2tlRGFzaEFycmF5fVxyXG4gICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17ZGF0YXNldC5zdHJva2VEYXNoT2Zmc2V0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH07XHJcblxyXG4gIGdldFhNYXhWYWx1ZXMgPSAoZGF0YTogRGF0YXNldFtdKSA9PiB7XHJcbiAgICByZXR1cm4gZGF0YS5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgIHJldHVybiBjdXIuZGF0YS5sZW5ndGggPiBhY2MgPyBjdXIuZGF0YS5sZW5ndGggOiBhY2M7XHJcbiAgICB9LCAwKTtcclxuICB9O1xyXG5cclxuICBnZXRCZXppZXJMaW5lUG9pbnRzID0gKFxyXG4gICAgZGF0YXNldDogRGF0YXNldCxcclxuICAgIHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBkYXRhXHJcbiAgICB9OiBQaWNrPFxyXG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJkYXRhXCJcclxuICAgID5cclxuICApID0+IHtcclxuICAgIGlmIChkYXRhc2V0LmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBcIk0wLDBcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YSk7XHJcbiAgICBjb25zdCB4TWF4ID0gdGhpcy5nZXRYTWF4VmFsdWVzKGRhdGEpO1xyXG5cclxuICAgIGNvbnN0IHggPSAoaTogbnVtYmVyKSA9PlxyXG4gICAgICBNYXRoLmZsb29yKHBhZGRpbmdSaWdodCArIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyB4TWF4KTtcclxuXHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhcywgaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCB5ID0gKGk6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCB5SGVpZ2h0ID0gdGhpcy5jYWxjSGVpZ2h0KGRhdGFzZXQuZGF0YVtpXSwgZGF0YXMsIGhlaWdodCk7XHJcblxyXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoKGJhc2VIZWlnaHQgLSB5SGVpZ2h0KSAvIDQpICogMyArIHBhZGRpbmdUb3ApO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gW2BNJHt4KDApfSwke3koMCl9YF1cclxuICAgICAgLmNvbmNhdChcclxuICAgICAgICBkYXRhc2V0LmRhdGEuc2xpY2UoMCwgLTEpLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeF9taWQgPSAoeChpKSArIHgoaSArIDEpKSAvIDI7XHJcbiAgICAgICAgICBjb25zdCB5X21pZCA9ICh5KGkpICsgeShpICsgMSkpIC8gMjtcclxuICAgICAgICAgIGNvbnN0IGNwX3gxID0gKHhfbWlkICsgeChpKSkgLyAyO1xyXG4gICAgICAgICAgY29uc3QgY3BfeDIgPSAoeF9taWQgKyB4KGkgKyAxKSkgLyAyO1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgYFEgJHtjcF94MX0sICR7eShpKX0sICR7eF9taWR9LCAke3lfbWlkfWAgK1xyXG4gICAgICAgICAgICBgIFEgJHtjcF94Mn0sICR7eShpICsgMSl9LCAke3goaSArIDEpfSwgJHt5KGkgKyAxKX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckJlemllckxpbmUgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcFxyXG4gIH06IFBpY2s8XHJcbiAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXHJcbiAgPikgPT4ge1xyXG4gICAgcmV0dXJuIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldEJlemllckxpbmVQb2ludHMoZGF0YXNldCwge1xyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICBkYXRhXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8UGF0aFxyXG4gICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgIGQ9e3Jlc3VsdH1cclxuICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgIHN0cm9rZT17dGhpcy5nZXRDb2xvcihkYXRhc2V0LCAwLjIpfVxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9e3RoaXMuZ2V0U3Ryb2tlV2lkdGgoZGF0YXNldCl9XHJcbiAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9e2RhdGFzZXQuc3Ryb2tlRGFzaEFycmF5fVxyXG4gICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17ZGF0YXNldC5zdHJva2VEYXNoT2Zmc2V0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJCZXppZXJTaGFkb3cgPSAoXHJcbiAgICB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgZGF0YSxcclxuICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldFxyXG4gICAgfTogUGljazxcclxuICAgICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgICAgXCJkYXRhXCIgfCBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICA+ICYge1xyXG4gICAgICB1c2VDb2xvckZyb21EYXRhc2V0OiBBYnN0cmFjdENoYXJ0Q29uZmlnW1widXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXTtcclxuICAgIH0sXHJcbiAgICB1bmlxdWVLZXk6IHN0cmluZyA9IG51bGxcclxuICApID0+XHJcbiAgICBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgeE1heCA9IHRoaXMuZ2V0WE1heFZhbHVlcyhkYXRhKTtcclxuICAgICAgY29uc3QgZCA9XHJcbiAgICAgICAgdGhpcy5nZXRCZXppZXJMaW5lUG9pbnRzKGRhdGFzZXQsIHtcclxuICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgIGRhdGFcclxuICAgICAgICB9KSArXHJcbiAgICAgICAgYCBMJHtwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyB4TWF4KSAqXHJcbiAgICAgICAgICAgIChkYXRhc2V0LmRhdGEubGVuZ3RoIC0gMSl9LCR7KGhlaWdodCAvIDQpICogMyArXHJcbiAgICAgICAgICBwYWRkaW5nVG9wfSBMJHtwYWRkaW5nUmlnaHR9LCR7KGhlaWdodCAvIDQpICogMyArIHBhZGRpbmdUb3B9IFpgO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8UGF0aFxyXG4gICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgIGQ9e2R9XHJcbiAgICAgICAgICBmaWxsPXtgdXJsKCNmaWxsU2hhZG93R3JhZGllbnRGcm9tJHtcclxuICAgICAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldCA/IGBfJHt1bmlxdWVLZXl9XyR7aW5kZXh9YCA6IFwiXCJcclxuICAgICAgICAgIH0pYH1cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXswfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgcmVuZGVyTGVnZW5kID0gKHdpZHRoLCBsZWdlbmRPZmZzZXQpID0+IHtcclxuICAgIGNvbnN0IHsgbGVnZW5kLCBkYXRhc2V0cyB9ID0gdGhpcy5wcm9wcy5kYXRhO1xyXG4gICAgY29uc3QgYmFzZUxlZ2VuZEl0ZW1YID0gd2lkdGggLyAobGVnZW5kLmxlbmd0aCArIDEpO1xyXG5cclxuICAgIHJldHVybiBsZWdlbmQubWFwKChsZWdlbmRJdGVtLCBpKSA9PiAoXHJcbiAgICAgIDxHIGtleT17TWF0aC5yYW5kb20oKX0+XHJcbiAgICAgICAgPExlZ2VuZEl0ZW1cclxuICAgICAgICAgIGluZGV4PXtpfVxyXG4gICAgICAgICAgaWNvbkNvbG9yPXt0aGlzLmdldENvbG9yKGRhdGFzZXRzW2ldLCAwLjkpfVxyXG4gICAgICAgICAgYmFzZUxlZ2VuZEl0ZW1YPXtiYXNlTGVnZW5kSXRlbVh9XHJcbiAgICAgICAgICBsZWdlbmRUZXh0PXtsZWdlbmRJdGVtfVxyXG4gICAgICAgICAgbGFiZWxQcm9wcz17eyAuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCkgfX1cclxuICAgICAgICAgIGxlZ2VuZE9mZnNldD17bGVnZW5kT2Zmc2V0fVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvRz5cclxuICAgICkpO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgZGF0YSxcclxuICAgICAgd2l0aFNjcm9sbGFibGVEb3QgPSBmYWxzZSxcclxuICAgICAgd2l0aFNoYWRvdyA9IHRydWUsXHJcbiAgICAgIHdpdGhEb3RzID0gdHJ1ZSxcclxuICAgICAgd2l0aElubmVyTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoT3V0ZXJMaW5lcyA9IHRydWUsXHJcbiAgICAgIHdpdGhIb3Jpem9udGFsTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoVmVydGljYWxMaW5lcyA9IHRydWUsXHJcbiAgICAgIHdpdGhIb3Jpem9udGFsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgc3R5bGUgPSB7fSxcclxuICAgICAgZGVjb3JhdG9yLFxyXG4gICAgICBvbkRhdGFQb2ludENsaWNrLFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBob3Jpem9udGFsTGFiZWxSb3RhdGlvbiA9IDAsXHJcbiAgICAgIGZvcm1hdFlMYWJlbCA9IHlMYWJlbCA9PiB5TGFiZWwsXHJcbiAgICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWwsXHJcbiAgICAgIHNlZ21lbnRzLFxyXG4gICAgICB0cmFuc3BhcmVudCA9IGZhbHNlLFxyXG4gICAgICBjaGFydENvbmZpZ1xyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgdW5pcXVlS2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpO1xyXG5cclxuICAgIGNvbnN0IHsgc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7IGxhYmVscyA9IFtdIH0gPSBkYXRhO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBib3JkZXJSYWRpdXMgPSAwLFxyXG4gICAgICBwYWRkaW5nVG9wID0gMTYsXHJcbiAgICAgIHBhZGRpbmdSaWdodCA9IDU1LFxyXG4gICAgICBtYXJnaW4gPSAwLFxyXG4gICAgICBtYXJnaW5SaWdodCA9IDAsXHJcbiAgICAgIHBhZGRpbmdCb3R0b20gPSAwXHJcbiAgICB9ID0gc3R5bGU7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICB2ZXJ0aWNhbExhYmVsUm90YXRpb24sXHJcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhLmRhdGFzZXRzKTtcclxuXHJcbiAgICBsZXQgY291bnQgPSBNYXRoLm1pbiguLi5kYXRhcykgPT09IE1hdGgubWF4KC4uLmRhdGFzKSA/IDEgOiA0O1xyXG4gICAgaWYgKHNlZ21lbnRzKSB7XHJcbiAgICAgIGNvdW50ID0gc2VnbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVnZW5kT2Zmc2V0ID0gdGhpcy5wcm9wcy5kYXRhLmxlZ2VuZCA/IGhlaWdodCAqIDAuMTUgOiAwO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxWaWV3IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgPFN2Z1xyXG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgKyAocGFkZGluZ0JvdHRvbSBhcyBudW1iZXIpICsgbGVnZW5kT2Zmc2V0fVxyXG4gICAgICAgICAgd2lkdGg9e3dpZHRoIC0gKG1hcmdpbiBhcyBudW1iZXIpICogMiAtIChtYXJnaW5SaWdodCBhcyBudW1iZXIpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLnVzZUJhY2tncm91bmRDYW52YXMgJiYgKFxyXG4gICAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgKyBsZWdlbmRPZmZzZXR9XHJcbiAgICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICByeT17Ym9yZGVyUmFkaXVzfVxyXG4gICAgICAgICAgICAgIGZpbGw9e2B1cmwoI2JhY2tncm91bmRHcmFkaWVudF8ke3VuaXF1ZUtleX0pYH1cclxuICAgICAgICAgICAgICBmaWxsT3BhY2l0eT17dHJhbnNwYXJlbnQgPyAwIDogMX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5kYXRhLmxlZ2VuZCAmJlxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxlZ2VuZChjb25maWcud2lkdGgsIGxlZ2VuZE9mZnNldCl9XHJcbiAgICAgICAgICA8RyB4PVwiMFwiIHk9e2xlZ2VuZE9mZnNldH0+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHNcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHVuaXF1ZUtleVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aEhvcml6b250YWxMaW5lcyAmJlxyXG4gICAgICAgICAgICAgICAgKHdpdGhJbm5lckxpbmVzXHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiB3aXRoT3V0ZXJMaW5lc1xyXG4gICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVySG9yaXpvbnRhbExpbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiBudWxsKX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aEhvcml6b250YWxMYWJlbHMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySG9yaXpvbnRhbExhYmVscyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhcyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZ1JpZ2h0IGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0WUxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzOiBjaGFydENvbmZpZy5kZWNpbWFsUGxhY2VzXHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aFZlcnRpY2FsTGluZXMgJiZcclxuICAgICAgICAgICAgICAgICh3aXRoSW5uZXJMaW5lc1xyXG4gICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyVmVydGljYWxMaW5lcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzWzBdLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiB3aXRoT3V0ZXJMaW5lc1xyXG4gICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyVmVydGljYWxMaW5lKHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICA6IG51bGwpfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVmVydGljYWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVscyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0WExhYmVsXHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJMaW5lKHtcclxuICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgIC4uLmNoYXJ0Q29uZmlnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICA6IDAsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHNcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aFNoYWRvdyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTaGFkb3coe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIHVzZUNvbG9yRnJvbURhdGFzZXQ6IGNoYXJ0Q29uZmlnLnVzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXRcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICAgIHt3aXRoRG90cyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJEb3RzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBvbkRhdGFQb2ludENsaWNrXHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aFNjcm9sbGFibGVEb3QgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2Nyb2xsYWJsZURvdCh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgLi4uY2hhcnRDb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIG9uRGF0YVBvaW50Q2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgIHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7ZGVjb3JhdG9yICYmXHJcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YXNldHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgICB7d2l0aFNjcm9sbGFibGVEb3QgJiYgKFxyXG4gICAgICAgICAgPFNjcm9sbFZpZXdcclxuICAgICAgICAgICAgc3R5bGU9e1N0eWxlU2hlZXQuYWJzb2x1dGVGaWxsfVxyXG4gICAgICAgICAgICBjb250ZW50Q29udGFpbmVyU3R5bGU9e3sgd2lkdGg6IHdpZHRoICogMiB9fVxyXG4gICAgICAgICAgICBzaG93c0hvcml6b250YWxTY3JvbGxJbmRpY2F0b3I9e2ZhbHNlfVxyXG4gICAgICAgICAgICBzY3JvbGxFdmVudFRocm90dGxlPXsxNn1cclxuICAgICAgICAgICAgb25TY3JvbGw9e0FuaW1hdGVkLmV2ZW50KFxyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgbmF0aXZlRXZlbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50T2Zmc2V0OiB7IHg6IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0IH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgeyB1c2VOYXRpdmVEcml2ZXI6IGZhbHNlIH1cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICBib3VuY2VzPXtmYWxzZX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmVDaGFydDtcclxuIl19
