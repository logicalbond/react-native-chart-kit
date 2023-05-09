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
                : "_".concat(uniqueKey),
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
                : "_".concat(uniqueKey),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpbmUtY2hhcnQvTGluZUNoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxJQUFJLEVBRUwsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUNMLE1BQU0sRUFDTixDQUFDLEVBQ0QsSUFBSSxFQUNKLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sYUFHTixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUMsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBb005RDtJQUF3Qiw2QkFBNkM7SUFBckU7UUFBQSxxRUEyeUJDO1FBMXlCQyxXQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBYSxDQUFDO1FBRXJDLFdBQUssR0FBRztZQUNOLDZCQUE2QixFQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDckQsQ0FBQztRQUVGLGNBQVEsR0FBRyxVQUFDLE9BQWdCLEVBQUUsT0FBZTtZQUMzQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7UUFFRixvQkFBYyxHQUFHLFVBQUMsT0FBZ0I7WUFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFD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QUF1Qjt3QkFDMUIsQ0FBQyxDQUFDLENBQUMsSUFDTCxDQUNOO1lBQUEsRUFBRSxDQUFDLENBQ0w7VUFBQSxFQUFFLENBQUMsQ0FDTDtRQUFBLEVBQUUsR0FBRyxDQUNMO1FBQUEsQ0FBQyxpQkFBaUIsSUFBSSxDQUNwQixDQUFDLFVBQVUsQ0FDVCxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQy9CLHFCQUFxQixDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQzVDLDhCQUE4QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQ3RDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3hCLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ3RCO29CQUNFO3dCQUNFLFdBQVcsRUFBRTs0QkFDWCxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsNkJBQTZCLEVBQUU7eUJBQ3BEO3FCQUNGO2lCQUNGLEVBQ0QsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQzNCLENBQUMsQ0FDRixVQUFVLENBQ1YsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ2YsQ0FDSCxDQUNIO01BQUEsRUFBRSxJQUFJLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTN5QkQsQ0FBd0IsYUFBYSxHQTJ5QnBDO0FBRUQsZUFBZSxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgQW5pbWF0ZWQsXHJcbiAgU2Nyb2xsVmlldyxcclxuICBTdHlsZVNoZWV0LFxyXG4gIFRleHRJbnB1dCxcclxuICBWaWV3LFxyXG4gIFZpZXdTdHlsZVxyXG59IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHtcclxuICBDaXJjbGUsXHJcbiAgRyxcclxuICBQYXRoLFxyXG4gIFBvbHlnb24sXHJcbiAgUG9seWxpbmUsXHJcbiAgUmVjdCxcclxuICBTdmdcclxufSBmcm9tIFwicmVhY3QtbmF0aXZlLXN2Z1wiO1xyXG5cclxuaW1wb3J0IEFic3RyYWN0Q2hhcnQsIHtcclxuICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gIEFic3RyYWN0Q2hhcnRQcm9wc1xyXG59IGZyb20gXCIuLi9BYnN0cmFjdENoYXJ0XCI7XHJcbmltcG9ydCB7IENoYXJ0RGF0YSwgRGF0YXNldCB9IGZyb20gXCIuLi9IZWxwZXJUeXBlc1wiO1xyXG5pbXBvcnQgeyBMZWdlbmRJdGVtIH0gZnJvbSBcIi4vTGVnZW5kSXRlbVwiO1xyXG5cclxubGV0IEFuaW1hdGVkQ2lyY2xlID0gQW5pbWF0ZWQuY3JlYXRlQW5pbWF0ZWRDb21wb25lbnQoQ2lyY2xlKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGluZUNoYXJ0RGF0YSBleHRlbmRzIENoYXJ0RGF0YSB7XHJcbiAgbGVnZW5kPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGluZUNoYXJ0UHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMge1xyXG4gIC8qKlxyXG4gICAqIERhdGEgZm9yIHRoZSBjaGFydC5cclxuICAgKlxyXG4gICAqIEV4YW1wbGUgZnJvbSBbZG9jc10oaHR0cHM6Ly9naXRodWIuY29tL2luZGllc3Bpcml0L3JlYWN0LW5hdGl2ZS1jaGFydC1raXQjbGluZS1jaGFydCk6XHJcbiAgICpcclxuICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICogY29uc3QgZGF0YSA9IHtcclxuICAgKiAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJ10sXHJcbiAgICogICBkYXRhc2V0czogW3tcclxuICAgKiAgICAgZGF0YTogWyAyMCwgNDUsIDI4LCA4MCwgOTksIDQzIF0sXHJcbiAgICogICAgIGNvbG9yOiAob3BhY2l0eSA9IDEpID0+IGByZ2JhKDEzNCwgNjUsIDI0NCwgJHtvcGFjaXR5fSlgLCAvLyBvcHRpb25hbFxyXG4gICAqICAgICBzdHJva2VXaWR0aDogMiAvLyBvcHRpb25hbFxyXG4gICAqICAgfV0sXHJcbiAgICogICBsZWdlbmQ6IFtcIlJhaW55IERheXNcIiwgXCJTdW5ueSBEYXlzXCIsIFwiU25vd3kgRGF5c1wiXSAvLyBvcHRpb25hbFxyXG4gICAqIH1cclxuICAgKiBgYGBcclxuICAgKi9cclxuICBkYXRhOiBMaW5lQ2hhcnREYXRhO1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHRoZSBjaGFydCwgdXNlICdEaW1lbnNpb25zJyBsaWJyYXJ5IHRvIGdldCB0aGUgd2lkdGggb2YgeW91ciBzY3JlZW4gZm9yIHJlc3BvbnNpdmUuXHJcbiAgICovXHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBIZWlnaHQgb2YgdGhlIGNoYXJ0LlxyXG4gICAqL1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgZG90cyBvbiB0aGUgbGluZSAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aERvdHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgc2hhZG93IGZvciBsaW5lIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoU2hhZG93PzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IGlubmVyIGRhc2hlZCBsaW5lcyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcblxyXG4gIHdpdGhTY3JvbGxhYmxlRG90PzogYm9vbGVhbjtcclxuICB3aXRoSW5uZXJMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBvdXRlciBkYXNoZWQgbGluZXMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhPdXRlckxpbmVzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IHZlcnRpY2FsIGxpbmVzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoVmVydGljYWxMaW5lcz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2hvdyBob3Jpem9udGFsIGxpbmVzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoSG9yaXpvbnRhbExpbmVzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IHZlcnRpY2FsIGxhYmVscyAtIGRlZmF1bHQ6IFRydWUuXHJcbiAgICovXHJcbiAgd2l0aFZlcnRpY2FsTGFiZWxzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBTaG93IGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoSG9yaXpvbnRhbExhYmVscz86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIGNoYXJ0cyBmcm9tIDAgbm90IGZyb20gdGhlIG1pbmltdW0gdmFsdWUuIC0gZGVmYXVsdDogRmFsc2UuXHJcbiAgICovXHJcbiAgZnJvbVplcm8/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFByZXBlbmQgdGV4dCB0byBob3Jpem9udGFsIGxhYmVscyAtLSBkZWZhdWx0OiAnJy5cclxuICAgKi9cclxuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEFwcGVuZCB0ZXh0IHRvIGhvcml6b250YWwgbGFiZWxzIC0tIGRlZmF1bHQ6ICcnLlxyXG4gICAqL1xyXG4gIHlBeGlzU3VmZml4Pzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFByZXBlbmQgdGV4dCB0byB2ZXJ0aWNhbCBsYWJlbHMgLS0gZGVmYXVsdDogJycuXHJcbiAgICovXHJcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBDb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIGNoYXJ0LCBzZWUgZXhhbXBsZTpcclxuICAgKlxyXG4gICAqIGBgYGphdmFzY3JpcHRcclxuICAgKiBjb25zdCBjaGFydENvbmZpZyA9IHtcclxuICAgKiAgIGJhY2tncm91bmRHcmFkaWVudEZyb206IFwiIzFFMjkyM1wiLFxyXG4gICAqICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHk6IDAsXHJcbiAgICogICBiYWNrZ3JvdW5kR3JhZGllbnRUbzogXCIjMDgxMzBEXCIsXHJcbiAgICogICBiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHk6IDAuNSxcclxuICAgKiAgIGNvbG9yOiAob3BhY2l0eSA9IDEpID0+IGByZ2JhKDI2LCAyNTUsIDE0NiwgJHtvcGFjaXR5fSlgLFxyXG4gICAqICAgbGFiZWxDb2xvcjogKG9wYWNpdHkgPSAxKSA9PiBgcmdiYSgyNiwgMjU1LCAxNDYsICR7b3BhY2l0eX0pYCxcclxuICAgKiAgIHN0cm9rZVdpZHRoOiAyLCAvLyBvcHRpb25hbCwgZGVmYXVsdCAzXHJcbiAgICogICBiYXJQZXJjZW50YWdlOiAwLjVcclxuICAgKiB9O1xyXG4gICAqIGBgYFxyXG4gICAqL1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuXHJcbiAgLyoqXHJcbiAgICogRGl2aWRlIGF4aXMgcXVhbnRpdHkgYnkgdGhlIGlucHV0IG51bWJlciAtLSBkZWZhdWx0OiAxLlxyXG4gICAqL1xyXG4gIHlBeGlzSW50ZXJ2YWw/OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZXMgaWYgY2hhcnQgaXMgdHJhbnNwYXJlbnRcclxuICAgKi9cclxuICB0cmFuc3BhcmVudD86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhIFt3aG9sZSBidW5jaF0oaHR0cHM6Ly9naXRodWIuY29tL2luZGllc3Bpcml0L3JlYWN0LW5hdGl2ZS1jaGFydC1raXQvYmxvYi9tYXN0ZXIvc3JjL2xpbmUtY2hhcnQuanMjTDI2NilcclxuICAgKiBvZiBzdHVmZiBhbmQgY2FuIHJlbmRlciBleHRyYSBlbGVtZW50cyxcclxuICAgKiBzdWNoIGFzIGRhdGEgcG9pbnQgaW5mbyBvciBhZGRpdGlvbmFsIG1hcmt1cC5cclxuICAgKi9cclxuICBkZWNvcmF0b3I/OiBGdW5jdGlvbjtcclxuICAvKipcclxuICAgKiBDYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIGEgZGF0YSBwb2ludCBpcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIG9uRGF0YVBvaW50Q2xpY2s/OiAoZGF0YToge1xyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIHZhbHVlOiBudW1iZXI7XHJcbiAgICBkYXRhc2V0OiBEYXRhc2V0O1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgZ2V0Q29sb3I6IChvcGFjaXR5OiBudW1iZXIpID0+IHN0cmluZztcclxuICB9KSA9PiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIFN0eWxlIG9mIHRoZSBjb250YWluZXIgdmlldyBvZiB0aGUgY2hhcnQuXHJcbiAgICovXHJcbiAgc3R5bGU/OiBQYXJ0aWFsPFZpZXdTdHlsZT47XHJcbiAgLyoqXHJcbiAgICogQWRkIHRoaXMgcHJvcCB0byBtYWtlIHRoZSBsaW5lIGNoYXJ0IHNtb290aCBhbmQgY3VydnkuXHJcbiAgICpcclxuICAgKiBbRXhhbXBsZV0oaHR0cHM6Ly9naXRodWIuY29tL2luZGllc3Bpcml0L3JlYWN0LW5hdGl2ZS1jaGFydC1raXQjYmV6aWVyLWxpbmUtY2hhcnQpXHJcbiAgICovXHJcbiAgYmV6aWVyPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBEZWZpbmVzIHRoZSBkb3QgY29sb3IgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSBjb2xvcnMgb2YgZG90cyBpbiBhIGxpbmUgY2hhcnQuXHJcbiAgICogVGFrZXMgYChkYXRhUG9pbnQsIGRhdGFQb2ludEluZGV4KWAgYXMgYXJndW1lbnRzLlxyXG4gICAqL1xyXG4gIGdldERvdENvbG9yPzogKGRhdGFQb2ludDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogUmVuZGVycyBhZGRpdGlvbmFsIGNvbnRlbnQgZm9yIGRvdHMgaW4gYSBsaW5lIGNoYXJ0LlxyXG4gICAqIFRha2VzIGAoe3gsIHksIGluZGV4fSlgIGFzIGFyZ3VtZW50cy5cclxuICAgKi9cclxuICByZW5kZXJEb3RDb250ZW50PzogKHBhcmFtczoge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgaW5kZXg6IG51bWJlcjtcclxuICAgIGluZGV4RGF0YTogbnVtYmVyO1xyXG4gIH0pID0+IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAvKipcclxuICAgKiBSb3RhdGlvbiBhbmdsZSBvZiB0aGUgaG9yaXpvbnRhbCBsYWJlbHMgLSBkZWZhdWx0IDAgKGRlZ3JlZXMpLlxyXG4gICAqL1xyXG4gIGhvcml6b250YWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFJvdGF0aW9uIGFuZ2xlIG9mIHRoZSB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0IDAgKGRlZ3JlZXMpLlxyXG4gICAqL1xyXG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBPZmZzZXQgZm9yIFkgYXhpcyBsYWJlbHMuXHJcbiAgICovXHJcbiAgeUxhYmVsc09mZnNldD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBPZmZzZXQgZm9yIFggYXhpcyBsYWJlbHMuXHJcbiAgICovXHJcbiAgeExhYmVsc09mZnNldD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBBcnJheSBvZiBpbmRpY2VzIG9mIHRoZSBkYXRhIHBvaW50cyB5b3UgZG9uJ3Qgd2FudCB0byBkaXNwbGF5LlxyXG4gICAqL1xyXG4gIGhpZGVQb2ludHNBdEluZGV4PzogbnVtYmVyW107XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjaGFuZ2UgdGhlIGZvcm1hdCBvZiB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgWSBsYWJlbC5cclxuICAgKiBUYWtlcyB0aGUgeSB2YWx1ZSBhcyBhcmd1bWVudCBhbmQgc2hvdWxkIHJldHVybiB0aGUgZGVzaXJhYmxlIHN0cmluZy5cclxuICAgKi9cclxuICBmb3JtYXRZTGFiZWw/OiAoeVZhbHVlOiBzdHJpbmcpID0+IHN0cmluZztcclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNoYW5nZSB0aGUgZm9ybWF0IG9mIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBYIGxhYmVsLlxyXG4gICAqIFRha2VzIHRoZSBYIHZhbHVlIGFzIGFyZ3VtZW50IGFuZCBzaG91bGQgcmV0dXJuIHRoZSBkZXNpcmFibGUgc3RyaW5nLlxyXG4gICAqL1xyXG4gIGZvcm1hdFhMYWJlbD86ICh4VmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFByb3ZpZGUgcHJvcHMgZm9yIGEgZGF0YSBwb2ludCBkb3QuXHJcbiAgICovXHJcbiAgZ2V0RG90UHJvcHM/OiAoZGF0YVBvaW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IG9iamVjdDtcclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIGhvcml6b250YWwgbGluZXNcclxuICAgKi9cclxuICBzZWdtZW50cz86IG51bWJlcjtcclxufVxyXG5cclxudHlwZSBMaW5lQ2hhcnRTdGF0ZSA9IHtcclxuICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldDogQW5pbWF0ZWQuVmFsdWU7XHJcbn07XHJcblxyXG5jbGFzcyBMaW5lQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PExpbmVDaGFydFByb3BzLCBMaW5lQ2hhcnRTdGF0ZT4ge1xyXG4gIGxhYmVsID0gUmVhY3QuY3JlYXRlUmVmPFRleHRJbnB1dD4oKTtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldDogbmV3IEFuaW1hdGVkLlZhbHVlKDApXHJcbiAgfTtcclxuXHJcbiAgZ2V0Q29sb3IgPSAoZGF0YXNldDogRGF0YXNldCwgb3BhY2l0eTogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gKGRhdGFzZXQuY29sb3IgfHwgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5jb2xvcikob3BhY2l0eSk7XHJcbiAgfTtcclxuXHJcbiAgZ2V0U3Ryb2tlV2lkdGggPSAoZGF0YXNldDogRGF0YXNldCkgPT4ge1xyXG4gICAgcmV0dXJuIGRhdGFzZXQuc3Ryb2tlV2lkdGggfHwgdGhpcy5wcm9wcy5jaGFydENvbmZpZy5zdHJva2VXaWR0aCB8fCAzO1xyXG4gIH07XHJcblxyXG4gIGdldERhdGFzID0gKGRhdGE6IERhdGFzZXRbXSk6IG51bWJlcltdID0+IHtcclxuICAgIHJldHVybiBkYXRhLnJlZHVjZShcclxuICAgICAgKGFjYywgaXRlbSkgPT4gKGl0ZW0uZGF0YSA/IFsuLi5hY2MsIC4uLml0ZW0uZGF0YV0gOiBhY2MpLFxyXG4gICAgICBbXVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBnZXRQcm9wc0ZvckRvdHMgPSAoeDogYW55LCBpOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHsgZ2V0RG90UHJvcHMsIGNoYXJ0Q29uZmlnIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGlmICh0eXBlb2YgZ2V0RG90UHJvcHMgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICByZXR1cm4gZ2V0RG90UHJvcHMoeCwgaSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBwcm9wc0ZvckRvdHMgPSB7fSB9ID0gY2hhcnRDb25maWc7XHJcblxyXG4gICAgcmV0dXJuIHsgcjogXCI0XCIsIC4uLnByb3BzRm9yRG90cyB9O1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckRvdHMgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodCxcclxuICAgIG9uRGF0YVBvaW50Q2xpY2tcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIFwiZGF0YVwiIHwgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIlxyXG4gID4gJiB7XHJcbiAgICBvbkRhdGFQb2ludENsaWNrOiBMaW5lQ2hhcnRQcm9wc1tcIm9uRGF0YVBvaW50Q2xpY2tcIl07XHJcbiAgfSkgPT4ge1xyXG4gICAgY29uc3Qgb3V0cHV0OiBSZWFjdE5vZGVbXSA9IFtdO1xyXG4gICAgY29uc3QgZGF0YXMgPSB0aGlzLmdldERhdGFzKGRhdGEpO1xyXG4gICAgY29uc3QgYmFzZUhlaWdodCA9IHRoaXMuY2FsY0Jhc2VIZWlnaHQoZGF0YXMsIGhlaWdodCk7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBnZXREb3RDb2xvcixcclxuICAgICAgaGlkZVBvaW50c0F0SW5kZXggPSBbXSxcclxuICAgICAgcmVuZGVyRG90Q29udGVudCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB4TWF4ID0gdGhpcy5nZXRYTWF4VmFsdWVzKGRhdGEpO1xyXG4gICAgZGF0YS5mb3JFYWNoKGRhdGFzZXQgPT4ge1xyXG4gICAgICBpZiAoZGF0YXNldC53aXRoRG90cyA9PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgZGF0YXNldC5kYXRhLmZvckVhY2goKHgsIGkpID0+IHtcclxuICAgICAgICBpZiAoaGlkZVBvaW50c0F0SW5kZXguaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN4ID0gcGFkZGluZ1JpZ2h0ICsgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIHhNYXg7XHJcblxyXG4gICAgICAgIGNvbnN0IGN5ID1cclxuICAgICAgICAgICgoYmFzZUhlaWdodCAtIHRoaXMuY2FsY0hlaWdodCh4LCBkYXRhcywgaGVpZ2h0KSkgLyA0KSAqIDMgK1xyXG4gICAgICAgICAgcGFkZGluZ1RvcDtcclxuXHJcbiAgICAgICAgY29uc3Qgb25QcmVzcyA9ICgpID0+IHtcclxuICAgICAgICAgIGlmICghb25EYXRhUG9pbnRDbGljayB8fCBoaWRlUG9pbnRzQXRJbmRleC5pbmNsdWRlcyhpKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb25EYXRhUG9pbnRDbGljayh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgICB2YWx1ZTogeCxcclxuICAgICAgICAgICAgZGF0YXNldCxcclxuICAgICAgICAgICAgeDogY3gsXHJcbiAgICAgICAgICAgIHk6IGN5LFxyXG4gICAgICAgICAgICBnZXRDb2xvcjogb3BhY2l0eSA9PiB0aGlzLmdldENvbG9yKGRhdGFzZXQsIG9wYWNpdHkpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvdXRwdXQucHVzaChcclxuICAgICAgICAgIDxDaXJjbGVcclxuICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgICBjeD17Y3h9XHJcbiAgICAgICAgICAgIGN5PXtjeX1cclxuICAgICAgICAgICAgZmlsbD17XHJcbiAgICAgICAgICAgICAgdHlwZW9mIGdldERvdENvbG9yID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgICAgID8gZ2V0RG90Q29sb3IoeCwgaSlcclxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXRDb2xvcihkYXRhc2V0LCAwLjkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb25QcmVzcz17b25QcmVzc31cclxuICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JEb3RzKHgsIGkpfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIC8vIDxDaXJjbGVcclxuICAgICAgICAgIC8vICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgLy8gICBjeD17Y3h9XHJcbiAgICAgICAgICAvLyAgIGN5PXtjeX1cclxuICAgICAgICAgIC8vICAgcj1cIjE0XCJcclxuICAgICAgICAgIC8vICAgZmlsbD1cIiNmZmZcIlxyXG4gICAgICAgICAgLy8gICBmaWxsT3BhY2l0eT17MH1cclxuICAgICAgICAgIC8vICAgb25QcmVzcz17b25QcmVzc31cclxuICAgICAgICAgIC8vIC8+LFxyXG4gICAgICAgICAgLy8gcmVuZGVyRG90Q29udGVudCh7IHg6IGN4LCB5OiBjeSwgaW5kZXg6IGksIGluZGV4RGF0YTogeCB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9O1xyXG5cclxuICByZW5kZXJTY3JvbGxhYmxlRG90ID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldCxcclxuICAgIHNjcm9sbGFibGVEb3RGaWxsLFxyXG4gICAgc2Nyb2xsYWJsZURvdFN0cm9rZUNvbG9yLFxyXG4gICAgc2Nyb2xsYWJsZURvdFN0cm9rZVdpZHRoLFxyXG4gICAgc2Nyb2xsYWJsZURvdFJhZGl1cyxcclxuICAgIHNjcm9sbGFibGVJbmZvVmlld1N0eWxlLFxyXG4gICAgc2Nyb2xsYWJsZUluZm9UZXh0U3R5bGUsXHJcbiAgICBzY3JvbGxhYmxlSW5mb1RleHREZWNvcmF0b3IgPSB4ID0+IGAke3h9YCxcclxuICAgIHNjcm9sbGFibGVJbmZvU2l6ZSxcclxuICAgIHNjcm9sbGFibGVJbmZvT2Zmc2V0XHJcbiAgfTogQWJzdHJhY3RDaGFydENvbmZpZyAmIHtcclxuICAgIG9uRGF0YVBvaW50Q2xpY2s6IExpbmVDaGFydFByb3BzW1wib25EYXRhUG9pbnRDbGlja1wiXTtcclxuICAgIHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0OiBBbmltYXRlZC5WYWx1ZTtcclxuICB9KSA9PiB7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhKTtcclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGFzLCBoZWlnaHQpO1xyXG5cclxuICAgIGxldCB2bDogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdCBwZXJEYXRhID0gd2lkdGggLyBkYXRhWzBdLmRhdGEubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFbMF0uZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgdmwucHVzaChpbmRleCAqIHBlckRhdGEpO1xyXG4gICAgfVxyXG4gICAgbGV0IGxhc3RJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LmFkZExpc3RlbmVyKHZhbHVlID0+IHtcclxuICAgICAgY29uc3QgaW5kZXggPSB2YWx1ZS52YWx1ZSAvIHBlckRhdGE7XHJcbiAgICAgIGlmICghbGFzdEluZGV4KSB7XHJcbiAgICAgICAgbGFzdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBhYnMgPSBNYXRoLmZsb29yKGluZGV4KTtcclxuICAgICAgbGV0IHBlcmNlbnQgPSBpbmRleCAtIGFicztcclxuICAgICAgYWJzID0gZGF0YVswXS5kYXRhLmxlbmd0aCAtIGFicyAtIDE7XHJcblxyXG4gICAgICBpZiAoaW5kZXggPj0gZGF0YVswXS5kYXRhLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKE1hdGguZmxvb3IoZGF0YVswXS5kYXRhWzBdKSlcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcclxuICAgICAgICAgIC8vIHRvIHJpZ2h0XHJcblxyXG4gICAgICAgICAgY29uc3QgYmFzZSA9IGRhdGFbMF0uZGF0YVthYnNdO1xyXG4gICAgICAgICAgY29uc3QgcHJldiA9IGRhdGFbMF0uZGF0YVthYnMgLSAxXTtcclxuICAgICAgICAgIGlmIChwcmV2ID4gYmFzZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdCA9IHByZXYgLSBiYXNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihcclxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYmFzZSArIHBlcmNlbnQgKiByZXN0KVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVzdCA9IGJhc2UgLSBwcmV2O1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLmN1cnJlbnQuc2V0TmF0aXZlUHJvcHMoe1xyXG4gICAgICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihcclxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYmFzZSAtIHBlcmNlbnQgKiByZXN0KVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHRvIGxlZnRcclxuXHJcbiAgICAgICAgICBjb25zdCBiYXNlID0gZGF0YVswXS5kYXRhW2FicyAtIDFdO1xyXG4gICAgICAgICAgY29uc3QgbmV4dCA9IGRhdGFbMF0uZGF0YVthYnNdO1xyXG4gICAgICAgICAgcGVyY2VudCA9IDEgLSBwZXJjZW50O1xyXG4gICAgICAgICAgaWYgKG5leHQgPiBiYXNlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN0ID0gbmV4dCAtIGJhc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihiYXNlICsgcGVyY2VudCAqIHJlc3QpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXN0ID0gYmFzZSAtIG5leHQ7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwuY3VycmVudC5zZXROYXRpdmVQcm9wcyh7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2Nyb2xsYWJsZUluZm9UZXh0RGVjb3JhdG9yKFxyXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihiYXNlIC0gcGVyY2VudCAqIHJlc3QpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGFzdEluZGV4ID0gaW5kZXg7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhLmZvckVhY2goZGF0YXNldCA9PiB7XHJcbiAgICAgIGlmIChkYXRhc2V0LndpdGhTY3JvbGxhYmxlRG90ID09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBwZXJEYXRhID0gd2lkdGggLyBkYXRhc2V0LmRhdGEubGVuZ3RoO1xyXG4gICAgICBsZXQgdmFsdWVzID0gW107XHJcbiAgICAgIGxldCB5VmFsdWVzID0gW107XHJcbiAgICAgIGxldCB4VmFsdWVzID0gW107XHJcblxyXG4gICAgICBsZXQgeVZhbHVlc0xhYmVsID0gW107XHJcbiAgICAgIGxldCB4VmFsdWVzTGFiZWwgPSBbXTtcclxuXHJcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhc2V0LmRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdmFsdWVzLnB1c2goaW5kZXggKiBwZXJEYXRhKTtcclxuICAgICAgICBjb25zdCB5dmFsID1cclxuICAgICAgICAgICgoYmFzZUhlaWdodCAtXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY0hlaWdodChcclxuICAgICAgICAgICAgICBkYXRhc2V0LmRhdGFbZGF0YXNldC5kYXRhLmxlbmd0aCAtIGluZGV4IC0gMV0sXHJcbiAgICAgICAgICAgICAgZGF0YXMsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgICkpIC9cclxuICAgICAgICAgICAgNCkgKlxyXG4gICAgICAgICAgICAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3A7XHJcbiAgICAgICAgeVZhbHVlcy5wdXNoKHl2YWwpO1xyXG4gICAgICAgIGNvbnN0IHh2YWwgPVxyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgICgoZGF0YXNldC5kYXRhLmxlbmd0aCAtIGluZGV4IC0gMSkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvXHJcbiAgICAgICAgICAgIGRhdGFzZXQuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgeFZhbHVlcy5wdXNoKHh2YWwpO1xyXG5cclxuICAgICAgICB5VmFsdWVzTGFiZWwucHVzaChcclxuICAgICAgICAgIHl2YWwgLSAoc2Nyb2xsYWJsZUluZm9TaXplLmhlaWdodCArIHNjcm9sbGFibGVJbmZvT2Zmc2V0KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgeFZhbHVlc0xhYmVsLnB1c2goeHZhbCAtIHNjcm9sbGFibGVJbmZvU2l6ZS53aWR0aCAvIDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0cmFuc2xhdGVYID0gc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQuaW50ZXJwb2xhdGUoe1xyXG4gICAgICAgIGlucHV0UmFuZ2U6IHZhbHVlcyxcclxuICAgICAgICBvdXRwdXRSYW5nZTogeFZhbHVlcyxcclxuICAgICAgICBleHRyYXBvbGF0ZTogXCJjbGFtcFwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgdHJhbnNsYXRlWSA9IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LmludGVycG9sYXRlKHtcclxuICAgICAgICBpbnB1dFJhbmdlOiB2YWx1ZXMsXHJcbiAgICAgICAgb3V0cHV0UmFuZ2U6IHlWYWx1ZXMsXHJcbiAgICAgICAgZXh0cmFwb2xhdGU6IFwiY2xhbXBcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGxhYmVsVHJhbnNsYXRlWCA9IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0LmludGVycG9sYXRlKHtcclxuICAgICAgICBpbnB1dFJhbmdlOiB2YWx1ZXMsXHJcbiAgICAgICAgb3V0cHV0UmFuZ2U6IHhWYWx1ZXNMYWJlbCxcclxuICAgICAgICBleHRyYXBvbGF0ZTogXCJjbGFtcFwiXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbGFiZWxUcmFuc2xhdGVZID0gc2Nyb2xsYWJsZURvdEhvcml6b250YWxPZmZzZXQuaW50ZXJwb2xhdGUoe1xyXG4gICAgICAgIGlucHV0UmFuZ2U6IHZhbHVlcyxcclxuICAgICAgICBvdXRwdXRSYW5nZTogeVZhbHVlc0xhYmVsLFxyXG4gICAgICAgIGV4dHJhcG9sYXRlOiBcImNsYW1wXCJcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBvdXRwdXQucHVzaChbXHJcbiAgICAgICAgPEFuaW1hdGVkLlZpZXdcclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIHN0eWxlPXtbXHJcbiAgICAgICAgICAgIHNjcm9sbGFibGVJbmZvVmlld1N0eWxlLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBbXHJcbiAgICAgICAgICAgICAgICB7IHRyYW5zbGF0ZVg6IGxhYmVsVHJhbnNsYXRlWCB9LFxyXG4gICAgICAgICAgICAgICAgeyB0cmFuc2xhdGVZOiBsYWJlbFRyYW5zbGF0ZVkgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgd2lkdGg6IHNjcm9sbGFibGVJbmZvU2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgICBoZWlnaHQ6IHNjcm9sbGFibGVJbmZvU2l6ZS5oZWlnaHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dElucHV0XHJcbiAgICAgICAgICAgIG9uTGF5b3V0PXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sYWJlbC5jdXJyZW50LnNldE5hdGl2ZVByb3BzKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHNjcm9sbGFibGVJbmZvVGV4dERlY29yYXRvcihcclxuICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihkYXRhWzBdLmRhdGFbZGF0YVswXS5kYXRhLmxlbmd0aCAtIDFdKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBzdHlsZT17c2Nyb2xsYWJsZUluZm9UZXh0U3R5bGV9XHJcbiAgICAgICAgICAgIHJlZj17dGhpcy5sYWJlbH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9BbmltYXRlZC5WaWV3PixcclxuICAgICAgICA8QW5pbWF0ZWRDaXJjbGVcclxuICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgIGN4PXt0cmFuc2xhdGVYfVxyXG4gICAgICAgICAgY3k9e3RyYW5zbGF0ZVl9XHJcbiAgICAgICAgICByPXtzY3JvbGxhYmxlRG90UmFkaXVzfVxyXG4gICAgICAgICAgc3Ryb2tlPXtzY3JvbGxhYmxlRG90U3Ryb2tlQ29sb3J9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17c2Nyb2xsYWJsZURvdFN0cm9rZVdpZHRofVxyXG4gICAgICAgICAgZmlsbD17c2Nyb2xsYWJsZURvdEZpbGx9XHJcbiAgICAgICAgLz5cclxuICAgICAgXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclNoYWRvdyA9IChcclxuICAgIHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICB1c2VDb2xvckZyb21EYXRhc2V0XHJcbiAgICB9OiBQaWNrPFxyXG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgID4gJiB7XHJcbiAgICAgIHVzZUNvbG9yRnJvbURhdGFzZXQ6IEFic3RyYWN0Q2hhcnRDb25maWdbXCJ1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XCJdO1xyXG4gICAgfSxcclxuICAgIHVuaXF1ZUtleTogc3RyaW5nID0gbnVsbFxyXG4gICkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuYmV6aWVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckJlemllclNoYWRvdyh7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YSk7XHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhcywgaGVpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFBvbHlnb25cclxuICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICBwb2ludHM9e1xyXG4gICAgICAgICAgICBkYXRhc2V0LmRhdGFcclxuICAgICAgICAgICAgICAubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID1cclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcclxuICAgICAgICAgICAgICAgICAgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIGRhdGFzZXQuZGF0YS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9XHJcbiAgICAgICAgICAgICAgICAgICgoYmFzZUhlaWdodCAtIHRoaXMuY2FsY0hlaWdodChkLCBkYXRhcywgaGVpZ2h0KSkgLyA0KSAqIDMgK1xyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt4fSwke3l9YDtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5qb2luKFwiIFwiKSArXHJcbiAgICAgICAgICAgIGAgJHtwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgICAgICgod2lkdGggLSBwYWRkaW5nUmlnaHQpIC8gZGF0YXNldC5kYXRhLmxlbmd0aCkgKlxyXG4gICAgICAgICAgICAgICAgKGRhdGFzZXQuZGF0YS5sZW5ndGggLSAxKX0sJHsoaGVpZ2h0IC8gNCkgKiAzICtcclxuICAgICAgICAgICAgICBwYWRkaW5nVG9wfSAke3BhZGRpbmdSaWdodH0sJHsoaGVpZ2h0IC8gNCkgKiAzICsgcGFkZGluZ1RvcH1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmaWxsPXtgdXJsKCNmaWxsU2hhZG93R3JhZGllbnRGcm9tJHtcclxuICAgICAgICAgICAgdXNlQ29sb3JGcm9tRGF0YXNldCA/IGBfJHt1bmlxdWVLZXl9XyR7aW5kZXh9YCA6ICBgXyR7dW5pcXVlS2V5fWBcclxuICAgICAgICAgIH0pYH1cclxuICAgICAgICAgIHN0cm9rZVdpZHRoPXswfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJMaW5lID0gKHtcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGRhdGEsXHJcbiAgICBsaW5lam9pblR5cGVcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIFwiZGF0YVwiIHwgXCJ3aWR0aFwiIHwgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwibGluZWpvaW5UeXBlXCJcclxuICA+KSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5iZXppZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQmV6aWVyTGluZSh7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdUb3BcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0ID0gW107XHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YSk7XHJcbiAgICBjb25zdCBiYXNlSGVpZ2h0ID0gdGhpcy5jYWxjQmFzZUhlaWdodChkYXRhcywgaGVpZ2h0KTtcclxuICAgIGNvbnN0IHhNYXggPSB0aGlzLmdldFhNYXhWYWx1ZXMoZGF0YSk7XHJcblxyXG4gICAgbGV0IGxhc3RQb2ludDogc3RyaW5nO1xyXG5cclxuICAgIGRhdGEuZm9yRWFjaCgoZGF0YXNldCwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgcG9pbnRzID0gZGF0YXNldC5kYXRhLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChkID09PSBudWxsKSByZXR1cm4gbGFzdFBvaW50O1xyXG4gICAgICAgIGNvbnN0IHggPSAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8geE1heCArIHBhZGRpbmdSaWdodDtcclxuICAgICAgICBjb25zdCB5ID1cclxuICAgICAgICAgICgoYmFzZUhlaWdodCAtIHRoaXMuY2FsY0hlaWdodChkLCBkYXRhcywgaGVpZ2h0KSkgLyA0KSAqIDMgK1xyXG4gICAgICAgICAgcGFkZGluZ1RvcDtcclxuICAgICAgICBsYXN0UG9pbnQgPSBgJHt4fSwke3l9YDtcclxuICAgICAgICByZXR1cm4gYCR7eH0sJHt5fWA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgb3V0cHV0LnB1c2goXHJcbiAgICAgICAgPFBvbHlsaW5lXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgc3Ryb2tlTGluZWpvaW49e2xpbmVqb2luVHlwZX1cclxuICAgICAgICAgIHBvaW50cz17cG9pbnRzLmpvaW4oXCIgXCIpfVxyXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgc3Ryb2tlPXt0aGlzLmdldENvbG9yKGRhdGFzZXQsIDAuMil9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17dGhpcy5nZXRTdHJva2VXaWR0aChkYXRhc2V0KX1cclxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17ZGF0YXNldC5zdHJva2VEYXNoQXJyYXl9XHJcbiAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtkYXRhc2V0LnN0cm9rZURhc2hPZmZzZXR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfTtcclxuXHJcbiAgZ2V0WE1heFZhbHVlcyA9IChkYXRhOiBEYXRhc2V0W10pID0+IHtcclxuICAgIHJldHVybiBkYXRhLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgcmV0dXJuIGN1ci5kYXRhLmxlbmd0aCA+IGFjYyA/IGN1ci5kYXRhLmxlbmd0aCA6IGFjYztcclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIGdldEJlemllckxpbmVQb2ludHMgPSAoXHJcbiAgICBkYXRhc2V0OiBEYXRhc2V0LFxyXG4gICAge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIGRhdGFcclxuICAgIH06IFBpY2s8XHJcbiAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICAgIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCIgfCBcImRhdGFcIlxyXG4gICAgPlxyXG4gICkgPT4ge1xyXG4gICAgaWYgKGRhdGFzZXQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIFwiTTAsMFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGFzID0gdGhpcy5nZXREYXRhcyhkYXRhKTtcclxuICAgIGNvbnN0IHhNYXggPSB0aGlzLmdldFhNYXhWYWx1ZXMoZGF0YSk7XHJcblxyXG4gICAgY29uc3QgeCA9IChpOiBudW1iZXIpID0+XHJcbiAgICAgIE1hdGguZmxvb3IocGFkZGluZ1JpZ2h0ICsgKGkgKiAod2lkdGggLSBwYWRkaW5nUmlnaHQpKSAvIHhNYXgpO1xyXG5cclxuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSB0aGlzLmNhbGNCYXNlSGVpZ2h0KGRhdGFzLCBoZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IHkgPSAoaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IHlIZWlnaHQgPSB0aGlzLmNhbGNIZWlnaHQoZGF0YXNldC5kYXRhW2ldLCBkYXRhcywgaGVpZ2h0KTtcclxuXHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKCgoYmFzZUhlaWdodCAtIHlIZWlnaHQpIC8gNCkgKiAzICsgcGFkZGluZ1RvcCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBbYE0ke3goMCl9LCR7eSgwKX1gXVxyXG4gICAgICAuY29uY2F0KFxyXG4gICAgICAgIGRhdGFzZXQuZGF0YS5zbGljZSgwLCAtMSkubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB4X21pZCA9ICh4KGkpICsgeChpICsgMSkpIC8gMjtcclxuICAgICAgICAgIGNvbnN0IHlfbWlkID0gKHkoaSkgKyB5KGkgKyAxKSkgLyAyO1xyXG4gICAgICAgICAgY29uc3QgY3BfeDEgPSAoeF9taWQgKyB4KGkpKSAvIDI7XHJcbiAgICAgICAgICBjb25zdCBjcF94MiA9ICh4X21pZCArIHgoaSArIDEpKSAvIDI7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICBgUSAke2NwX3gxfSwgJHt5KGkpfSwgJHt4X21pZH0sICR7eV9taWR9YCArXHJcbiAgICAgICAgICAgIGAgUSAke2NwX3gyfSwgJHt5KGkgKyAxKX0sICR7eChpICsgMSl9LCAke3koaSArIDEpfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyQmV6aWVyTGluZSA9ICh7XHJcbiAgICBkYXRhLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBwYWRkaW5nVG9wXHJcbiAgfTogUGljazxcclxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXHJcbiAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICA+KSA9PiB7XHJcbiAgICByZXR1cm4gZGF0YS5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZ2V0QmV6aWVyTGluZVBvaW50cyhkYXRhc2V0LCB7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgIGRhdGFcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQYXRoXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgZD17cmVzdWx0fVxyXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgc3Ryb2tlPXt0aGlzLmdldENvbG9yKGRhdGFzZXQsIDAuMil9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17dGhpcy5nZXRTdHJva2VXaWR0aChkYXRhc2V0KX1cclxuICAgICAgICAgIHN0cm9rZURhc2hhcnJheT17ZGF0YXNldC5zdHJva2VEYXNoQXJyYXl9XHJcbiAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0PXtkYXRhc2V0LnN0cm9rZURhc2hPZmZzZXR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckJlemllclNoYWRvdyA9IChcclxuICAgIHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICB1c2VDb2xvckZyb21EYXRhc2V0XHJcbiAgICB9OiBQaWNrPFxyXG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgID4gJiB7XHJcbiAgICAgIHVzZUNvbG9yRnJvbURhdGFzZXQ6IEFic3RyYWN0Q2hhcnRDb25maWdbXCJ1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XCJdO1xyXG4gICAgfSxcclxuICAgIHVuaXF1ZUtleTogc3RyaW5nID0gbnVsbFxyXG4gICkgPT5cclxuICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB4TWF4ID0gdGhpcy5nZXRYTWF4VmFsdWVzKGRhdGEpO1xyXG4gICAgICBjb25zdCBkID1cclxuICAgICAgICB0aGlzLmdldEJlemllckxpbmVQb2ludHMoZGF0YXNldCwge1xyXG4gICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgZGF0YVxyXG4gICAgICAgIH0pICtcclxuICAgICAgICBgIEwke3BhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIHhNYXgpICpcclxuICAgICAgICAgICAgKGRhdGFzZXQuZGF0YS5sZW5ndGggLSAxKX0sJHsoaGVpZ2h0IC8gNCkgKiAzICtcclxuICAgICAgICAgIHBhZGRpbmdUb3B9IEwke3BhZGRpbmdSaWdodH0sJHsoaGVpZ2h0IC8gNCkgKiAzICsgcGFkZGluZ1RvcH0gWmA7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQYXRoXHJcbiAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgZD17ZH1cclxuICAgICAgICAgIGZpbGw9e2B1cmwoI2ZpbGxTaGFkb3dHcmFkaWVudEZyb20ke1xyXG4gICAgICAgICAgICB1c2VDb2xvckZyb21EYXRhc2V0ID8gYF8ke3VuaXF1ZUtleX1fJHtpbmRleH1gIDogYF8ke3VuaXF1ZUtleX1gXHJcbiAgICAgICAgICB9KWB9XHJcbiAgICAgICAgICBzdHJva2VXaWR0aD17MH1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gIHJlbmRlckxlZ2VuZCA9ICh3aWR0aCwgbGVnZW5kT2Zmc2V0KSA9PiB7XHJcbiAgICBjb25zdCB7IGxlZ2VuZCwgZGF0YXNldHMgfSA9IHRoaXMucHJvcHMuZGF0YTtcclxuICAgIGNvbnN0IGJhc2VMZWdlbmRJdGVtWCA9IHdpZHRoIC8gKGxlZ2VuZC5sZW5ndGggKyAxKTtcclxuXHJcbiAgICByZXR1cm4gbGVnZW5kLm1hcCgobGVnZW5kSXRlbSwgaSkgPT4gKFxyXG4gICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgIDxMZWdlbmRJdGVtXHJcbiAgICAgICAgICBpbmRleD17aX1cclxuICAgICAgICAgIGljb25Db2xvcj17dGhpcy5nZXRDb2xvcihkYXRhc2V0c1tpXSwgMC45KX1cclxuICAgICAgICAgIGJhc2VMZWdlbmRJdGVtWD17YmFzZUxlZ2VuZEl0ZW1YfVxyXG4gICAgICAgICAgbGVnZW5kVGV4dD17bGVnZW5kSXRlbX1cclxuICAgICAgICAgIGxhYmVsUHJvcHM9e3sgLi4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpIH19XHJcbiAgICAgICAgICBsZWdlbmRPZmZzZXQ9e2xlZ2VuZE9mZnNldH1cclxuICAgICAgICAvPlxyXG4gICAgICA8L0c+XHJcbiAgICApKTtcclxuICB9O1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHdpdGhTY3JvbGxhYmxlRG90ID0gZmFsc2UsXHJcbiAgICAgIHdpdGhTaGFkb3cgPSB0cnVlLFxyXG4gICAgICB3aXRoRG90cyA9IHRydWUsXHJcbiAgICAgIHdpdGhJbm5lckxpbmVzID0gdHJ1ZSxcclxuICAgICAgd2l0aE91dGVyTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExpbmVzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGluZXMgPSB0cnVlLFxyXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHdpdGhWZXJ0aWNhbExhYmVscyA9IHRydWUsXHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIGRlY29yYXRvcixcclxuICAgICAgb25EYXRhUG9pbnRDbGljayxcclxuICAgICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBmb3JtYXRZTGFiZWwgPSB5TGFiZWwgPT4geUxhYmVsLFxyXG4gICAgICBmb3JtYXRYTGFiZWwgPSB4TGFiZWwgPT4geExhYmVsLFxyXG4gICAgICBzZWdtZW50cyxcclxuICAgICAgdHJhbnNwYXJlbnQgPSBmYWxzZSxcclxuICAgICAgY2hhcnRDb25maWdcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHVuaXF1ZUtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICBjb25zdCB7IHNjcm9sbGFibGVEb3RIb3Jpem9udGFsT2Zmc2V0IH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgeyBsYWJlbHMgPSBbXSB9ID0gZGF0YTtcclxuICAgIGNvbnN0IHtcclxuICAgICAgYm9yZGVyUmFkaXVzID0gMCxcclxuICAgICAgcGFkZGluZ1RvcCA9IDE2LFxyXG4gICAgICBwYWRkaW5nUmlnaHQgPSA1NSxcclxuICAgICAgbWFyZ2luID0gMCxcclxuICAgICAgbWFyZ2luUmlnaHQgPSAwLFxyXG4gICAgICBwYWRkaW5nQm90dG9tID0gMFxyXG4gICAgfSA9IHN0eWxlO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgdmVydGljYWxMYWJlbFJvdGF0aW9uLFxyXG4gICAgICBob3Jpem9udGFsTGFiZWxSb3RhdGlvblxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBkYXRhcyA9IHRoaXMuZ2V0RGF0YXMoZGF0YS5kYXRhc2V0cyk7XHJcblxyXG4gICAgbGV0IGNvdW50ID0gTWF0aC5taW4oLi4uZGF0YXMpID09PSBNYXRoLm1heCguLi5kYXRhcykgPyAxIDogNDtcclxuICAgIGlmIChzZWdtZW50cykge1xyXG4gICAgICBjb3VudCA9IHNlZ21lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlZ2VuZE9mZnNldCA9IHRoaXMucHJvcHMuZGF0YS5sZWdlbmQgPyBoZWlnaHQgKiAwLjE1IDogMDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VmlldyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgIDxTdmdcclxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0ICsgKHBhZGRpbmdCb3R0b20gYXMgbnVtYmVyKSArIGxlZ2VuZE9mZnNldH1cclxuICAgICAgICAgIHdpZHRoPXt3aWR0aCAtIChtYXJnaW4gYXMgbnVtYmVyKSAqIDIgLSAobWFyZ2luUmlnaHQgYXMgbnVtYmVyKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGFydENvbmZpZy51c2VCYWNrZ3JvdW5kQ2FudmFzICYmIChcclxuICAgICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0ICsgbGVnZW5kT2Zmc2V0fVxyXG4gICAgICAgICAgICAgIHJ4PXtib3JkZXJSYWRpdXN9XHJcbiAgICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgICBmaWxsPXtgdXJsKCNiYWNrZ3JvdW5kR3JhZGllbnRfJHt1bmlxdWVLZXl9KWB9XHJcbiAgICAgICAgICAgICAgZmlsbE9wYWNpdHk9e3RyYW5zcGFyZW50ID8gMCA6IDF9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge3RoaXMucHJvcHMuZGF0YS5sZWdlbmQgJiZcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmQoY29uZmlnLndpZHRoLCBsZWdlbmRPZmZzZXQpfVxyXG4gICAgICAgICAgPEcgeD1cIjBcIiB5PXtsZWdlbmRPZmZzZXR9PlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJEZWZzKFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB1bmlxdWVLZXlcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhIb3Jpem9udGFsTGluZXMgJiZcclxuICAgICAgICAgICAgICAgICh3aXRoSW5uZXJMaW5lc1xyXG4gICAgICAgICAgICAgICAgICA/IHRoaXMucmVuZGVySG9yaXpvbnRhbExpbmVzKHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogd2l0aE91dGVyTGluZXNcclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMaW5lKHtcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogbnVsbCl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhIb3Jpem9udGFsTGFiZWxzICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckhvcml6b250YWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YXMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1hdFlMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlczogY2hhcnRDb25maWcuZGVjaW1hbFBsYWNlc1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhWZXJ0aWNhbExpbmVzICYmXHJcbiAgICAgICAgICAgICAgICAod2l0aElubmVyTGluZXNcclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGluZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0c1swXS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIDogd2l0aE91dGVyTGluZXNcclxuICAgICAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGluZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgOiBudWxsKX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aFZlcnRpY2FsTGFiZWxzICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclZlcnRpY2FsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGZvcm1hdFhMYWJlbFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3RoaXMucmVuZGVyTGluZSh7XHJcbiAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAuLi5jaGFydENvbmZpZyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgOiAwLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzXHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhTaGFkb3cgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2hhZG93KHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHBhZGRpbmdUb3AgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICB1c2VDb2xvckZyb21EYXRhc2V0OiBjaGFydENvbmZpZy51c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgICA8Rz5cclxuICAgICAgICAgICAgICB7d2l0aERvdHMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRG90cyh7XHJcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhc2V0cyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcGFkZGluZ1RvcCBhcyBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogd2l0aEhvcml6b250YWxMYWJlbHNcclxuICAgICAgICAgICAgICAgICAgICA/IChwYWRkaW5nUmlnaHQgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIDogMCxcclxuICAgICAgICAgICAgICAgICAgb25EYXRhUG9pbnRDbGlja1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge3dpdGhTY3JvbGxhYmxlRG90ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNjcm9sbGFibGVEb3Qoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIC4uLmNoYXJ0Q29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwYWRkaW5nVG9wIGFzIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiB3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgICAgICAgID8gKHBhZGRpbmdSaWdodCBhcyBudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBvbkRhdGFQb2ludENsaWNrLFxyXG4gICAgICAgICAgICAgICAgICBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvRz5cclxuICAgICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgICAge2RlY29yYXRvciAmJlxyXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGFzZXRzLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHdpdGhIb3Jpem9udGFsTGFiZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgPyAocGFkZGluZ1JpZ2h0IGFzIG51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICA6IDBcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgPC9Tdmc+XHJcbiAgICAgICAge3dpdGhTY3JvbGxhYmxlRG90ICYmIChcclxuICAgICAgICAgIDxTY3JvbGxWaWV3XHJcbiAgICAgICAgICAgIHN0eWxlPXtTdHlsZVNoZWV0LmFic29sdXRlRmlsbH1cclxuICAgICAgICAgICAgY29udGVudENvbnRhaW5lclN0eWxlPXt7IHdpZHRoOiB3aWR0aCAqIDIgfX1cclxuICAgICAgICAgICAgc2hvd3NIb3Jpem9udGFsU2Nyb2xsSW5kaWNhdG9yPXtmYWxzZX1cclxuICAgICAgICAgICAgc2Nyb2xsRXZlbnRUaHJvdHRsZT17MTZ9XHJcbiAgICAgICAgICAgIG9uU2Nyb2xsPXtBbmltYXRlZC5ldmVudChcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZUV2ZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudE9mZnNldDogeyB4OiBzY3JvbGxhYmxlRG90SG9yaXpvbnRhbE9mZnNldCB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgIHsgdXNlTmF0aXZlRHJpdmVyOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIGhvcml6b250YWxcclxuICAgICAgICAgICAgYm91bmNlcz17ZmFsc2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lQ2hhcnQ7XHJcbiJdfQ==
