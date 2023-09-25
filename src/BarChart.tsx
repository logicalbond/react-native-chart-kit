import React from "react";
import { View, ViewStyle } from "react-native";
import {
  Defs,
  G,
  LinearGradient,
  Rect,
  Stop,
  Svg,
  Text
} from "react-native-svg";

import AbstractChart, {
  AbstractChartConfig,
  AbstractChartProps
} from "./AbstractChart";
import { ChartData } from "./HelperTypes";

const barWidth = 32;

export interface BarChartProps extends AbstractChartProps {
  data: ChartData;
  width: number;
  height: number;
  fromZero?: boolean;
  withInnerLines?: boolean;
  yAxisLabel: string;
  yAxisSuffix: string;
  chartConfig: AbstractChartConfig;
  style?: Partial<ViewStyle>;
  horizontalLabelRotation?: number;
  verticalLabelRotation?: number;
  /**
   * Show vertical labels - default: True.
   */
  withVerticalLabels?: boolean;
  /**
   * Show horizontal labels - default: True.
   */
  withHorizontalLabels?: boolean;
  /**
   * The number of horizontal lines
   */
  segments?: number;
  showBarTops?: boolean;
  showValuesOnTopOfBars?: boolean;
  withCustomBarColorFromData?: boolean;
  flatColor?: boolean;
}

type BarChartState = {};

class BarChart extends AbstractChart<BarChartProps, BarChartState> {
  getBarPercentage = () => {
    const { barPercentage = 1 } = this.props.chartConfig;
    return barPercentage;
  };

  renderBars = (
    {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      barRadius,
      withCustomBarColorFromData
    }: Pick<
      Omit<AbstractChartConfig, "data">,
      "width" | "height" | "paddingRight" | "paddingTop" | "barRadius"
    > & {
      data: number[];
      withCustomBarColorFromData: boolean;
    },
    uniqueKey: string
  ) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = 32 * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={paddingRight + (i * (width - paddingRight)) / data.length}
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          rx={barRadius}
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill={
            withCustomBarColorFromData
              ? `url(#customColor_0_${i})`
              : `url(#fillShadowGradientFrom_${uniqueKey})`
          }
        />
      );
    });
  };

  renderBarTops = ({
    data,
    width,
    height,
    paddingTop,
    paddingRight
  }: Pick<
    Omit<AbstractChartConfig, "data">,
    "width" | "height" | "paddingRight" | "paddingTop"
  > & {
    data: number[];
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = 32 * this.getBarPercentage();
      return (
        <Rect
          key={Math.random()}
          x={paddingRight + (i * (width - paddingRight)) / data.length}
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      );
    });
  };

  renderColors = ({
    data,
    flatColor
  }: Pick<AbstractChartConfig, "data"> & {
    flatColor: boolean;
  }) => {
    return data.map((dataset, index) => (
      <Defs key={dataset.key ?? index}>
        {dataset.colors?.map((color, colorIndex) => {
          const highOpacityColor = color(1.0);
          const lowOpacityColor = color(0.1);

          return (
            <LinearGradient
              id={`customColor_${index}_${colorIndex}`}
              key={`${index}_${colorIndex}`}
              x1={0}
              y1={0}
              x2={0}
              y2={1}
            >
              <Stop offset="0" stopColor={highOpacityColor} stopOpacity="1" />
              {flatColor ? (
                <Stop offset="1" stopColor={highOpacityColor} stopOpacity="1" />
              ) : (
                <Stop offset="1" stopColor={lowOpacityColor} stopOpacity="0" />
              )}
            </LinearGradient>
          );
        })}
      </Defs>
    ));
  };

  renderValuesOnTopOfBars = ({
    data,
    width,
    height,
    paddingTop,
    paddingRight
  }: Pick<
    Omit<AbstractChartConfig, "data">,
    "width" | "height" | "paddingRight" | "paddingTop"
  > & {
    data: number[];
  }) => {
    const baseHeight = this.calcBaseHeight(data, height);

    const renderLabel = (value: number) => {
      if (this.props.chartConfig.formatTopBarValue) {
        return this.props.chartConfig.formatTopBarValue(value);
      } else {
        return value;
      }
    };
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height);
      const barWidth = 32 * this.getBarPercentage();
      return (
        <Text
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop - 2}
          fill={this.props.chartConfig.color(0.6)}
          fontSize="12"
          textAnchor="middle"
        >
          {renderLabel(data[i])}
        </Text>
      );
    });
  };

  render() {
    const {
      width,
      height,
      data,
      style = {},
      withHorizontalLabels = true,
      withVerticalLabels = true,
      verticalLabelRotation = 0,
      horizontalLabelRotation = 0,
      withInnerLines = true,
      showBarTops = true,
      withCustomBarColorFromData = false,
      showValuesOnTopOfBars = false,
      flatColor = false,
      segments = 4
    } = this.props;

    const uniqueKey = Math.random().toString();
    const { borderRadius = 0, paddingTop = 20, paddingRight = 55 } = style;

    const config = {
      width,
      height,
      verticalLabelRotation,
      horizontalLabelRotation,
      barRadius:
        (this.props.chartConfig && this.props.chartConfig.barRadius) || 0,
      decimalPlaces:
        (this.props.chartConfig && this.props.chartConfig.decimalPlaces) ?? 2,
      formatYLabel:
        (this.props.chartConfig && this.props.chartConfig.formatYLabel) ||
        function(label) {
          return label;
        },
      formatXLabel:
        (this.props.chartConfig && this.props.chartConfig.formatXLabel) ||
        function(label) {
          return label;
        }
    };

    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            {
              ...config,
              ...this.props.chartConfig
            },
            uniqueKey
          )}
          {this.renderColors({
            ...this.props.chartConfig,
            flatColor: flatColor,
            data: this.props.data.datasets
          })}
          {this.props.chartConfig.useBackgroundCanvas && (
            <Rect
              width="100%"
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill={`url(#backgroundGradient_${uniqueKey})`}
            />
          )}
          <G>
            {withInnerLines
              ? this.renderHorizontalLines({
                  ...config,
                  count: segments,
                  paddingTop
                })
              : null}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
                  ...config,
                  count: segments,
                  data: data.datasets[0].data,
                  paddingTop: paddingTop as number,
                  paddingRight: paddingRight as number
                })
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels({
                  ...config,
                  labels: data.labels,
                  paddingRight: withHorizontalLabels
                    ? (paddingRight as number)
                    : 20,
                  paddingTop: paddingTop as number,
                  horizontalOffset: (barWidth * this.getBarPercentage()) / 2
                })
              : null}
          </G>
          <G>
            {this.renderBars(
              {
                ...config,
                data: data.datasets[0].data,
                paddingTop: paddingTop as number,
                paddingRight: withHorizontalLabels
                  ? (paddingRight as number)
                  : 20,
                withCustomBarColorFromData: withCustomBarColorFromData
              },
              uniqueKey
            )}
          </G>
          <G>
            {showValuesOnTopOfBars &&
              this.renderValuesOnTopOfBars({
                ...config,
                data: data.datasets[0].data,
                paddingTop: paddingTop as number,
                paddingRight: withHorizontalLabels
                  ? (paddingRight as number)
                  : 20
              })}
          </G>
          <G>
            {showBarTops &&
              this.renderBarTops({
                ...config,
                data: data.datasets[0].data,
                paddingTop: paddingTop as number,
                paddingRight: withHorizontalLabels
                  ? (paddingRight as number)
                  : 20
              })}
          </G>
        </Svg>
      </View>
    );
  }
}

export default BarChart;
