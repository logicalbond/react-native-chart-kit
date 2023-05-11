import Pie from "paths-js/pie";
import React from "react";
import { View, ViewStyle } from "react-native";
import { G, Path, Rect, Svg, Text } from "react-native-svg";

import AbstractChart, {
  AbstractChartConfig,
  AbstractChartProps
} from "./AbstractChart";

export type ProgressChartData =
  | Array<number>
  | { labels?: Array<string>; colors?: Array<string>; data: Array<number> };

export interface ProgressChartProps extends AbstractChartProps {
  data: ProgressChartData;
  width: number;
  height: number;
  center?: Array<number>;
  absolute?: boolean;
  hasLegend?: boolean;
  style?: Partial<ViewStyle>;
  chartConfig?: AbstractChartConfig;
  hideLegend?: boolean;
  strokeWidth?: number;
  strokeColor?: (opacity: number, index?: number) => string;
  radius?: number;
  withCustomBarColorFromData?: boolean;
}

type ProgressChartState = {};

class ProgressChart extends AbstractChart<
  ProgressChartProps,
  ProgressChartState
> {
  public static defaultProps = { style: {}, strokeWidth: 16, radius: 32 };

  render() {
    let {
      width,
      height,
      style,
      data,
      hideLegend,
      strokeWidth,
      strokeColor,
      radius
    } = this.props;

    const uniqueKey = Math.random().toString();

    const { borderRadius = 0, margin = 0, marginRight = 0 } = style;

    if (Array.isArray(data)) {
      data = {
        data
      };
    }

    const pies = data.data.map((pieData, i) => {
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
        r,
        R: r,
        center: center,
        data: [pieDataValidated, 1 - pieDataValidated],
        accessor(x: string) {
          return x;
        }
      });
    });

    const pieBackgrounds = data.data.map((pieData, i) => {
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
        r,
        R: r,
        center: center,
        data: [0.999, 0.001],
        accessor(x: string) {
          return x;
        }
      });
    });

    const withLabel = (i: number) =>
      (data as any).labels && (data as any).labels[i];

    const withColor = (i: number) =>
      (data as any).colors && (data as any).colors[i];

    const legend = !hideLegend && (
      <>
        <G>
          {pies.map((_, i) => {
            return (
              <Rect
                key={Math.random()}
                width="16px"
                height="16px"
                fill={
                  this.props.withCustomBarColorFromData
                    ? withColor(i)
                    : strokeColor
                    ? strokeColor((i / pies.length) * 0.5, i)
                    : this.props.chartConfig.color((i / pies.length) * 0.5, i)
                }
                rx={8}
                ry={8}
                x={this.props.width / 2.5 - 30}
                y={
                  -(this.props.height / 2.5) +
                  ((this.props.height * 0.8) /
                    (Array.isArray(data) ? data.length : data.data.length)) *
                    i +
                  12
                }
              />
            );
          })}
        </G>
        <G>
          {pies.map((_, i) => {
            return (
              <Text
                key={Math.random()}
                x={this.props.width / 2.5 - 10}
                y={
                  -(this.props.height / 2.5) +
                  ((this.props.height * 0.8) /
                    (Array.isArray(data) ? data.length : data.data.length)) *
                    i +
                  12 * 2
                }
                {...this.getPropsForLabels()}
              >
                {withLabel(i)
                  ? `${Math.round(100 * (data as any).data[i])}% ${
                      (data as any).labels[i]
                    }`
                  : `${Math.round(100 * (data as any).data[i])}%`}
              </Text>
            );
          })}
        </G>
      </>
    );

    return (
      <View
        style={{
          width,
          height,
          padding: 0,
          ...style
        }}
      >
        <Svg
          width={width - (margin as number) * 2 - (marginRight as number)}
          height={height}
        >
          {this.renderDefs(
            {
              width: this.props.height,
              height: this.props.height,
              ...this.props.chartConfig
            },
            uniqueKey
          )}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={this.props.height}
              rx={borderRadius}
              ry={borderRadius}
              fill={`url(#backgroundGradient_${uniqueKey})`}
            />
          )}
          <G
            x={this.props.width / (hideLegend || pies.length === 1 ? 2 : 2.5)}
            y={this.props.height / 2}
          >
            <G>
              {pieBackgrounds.map((pie, i) => {
                return (
                  <Path
                    key={Math.random()}
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={strokeWidth}
                    stroke={this.props.chartConfig.color(0.2, i)}
                  />
                );
              })}
            </G>
            <G>
              {pies.map((pie, i) => {
                return (
                  <Path
                    key={Math.random()}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={strokeWidth}
                    stroke={
                      this.props.withCustomBarColorFromData
                        ? withColor(i)
                        : strokeColor
                        ? strokeColor((i / pies.length) * 0.5, i)
                        : this.props.chartConfig.color(
                            (i / pies.length) * 0.5,
                            i
                          )
                    }
                  />
                );
              })}
            </G>
            <G>
              {pies.length === 1 &&
                pies.map((pie, i) => {
                  return (
                    <G>
                      <Text
                        key={Math.random()}
                        x={0}
                        y={withLabel(i) ? -10 : 0}
                        textAnchor={"middle"}
                        alignmentBaseline={"middle"}
                        strokeWidth={0.5}
                        {...this.getPropsForLabels()}
                        fontSize={22}
                        fontWeight={"bold"}
                      >
                        {`${Math.round(100 * (data as any).data[i])}%`}
                      </Text>
                      {withLabel(i) && (
                        <Text
                          key={Math.random()}
                          x={0}
                          y={20}
                          textAnchor={"middle"}
                          alignmentBaseline={"bottom"}
                          strokeWidth={0.5}
                          {...this.getPropsForLabels()}
                          fontSize={14}
                        >
                          {(data as any).labels[i]}
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
  }
}

export default ProgressChart;
