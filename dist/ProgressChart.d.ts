/// <reference types="react" />
import { ViewStyle } from "react-native";
import AbstractChart, {
  AbstractChartConfig,
  AbstractChartProps
} from "./AbstractChart";
export type ProgressChartData =
  | Array<number>
  | {
      labels?: Array<string>;
      colors?: Array<string>;
      data: Array<number>;
    };
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
  radius?: number;
  withCustomBarColorFromData?: boolean;
}
type ProgressChartState = {};
declare class ProgressChart extends AbstractChart<
  ProgressChartProps,
  ProgressChartState
> {
  static defaultProps: {
    style: {};
    strokeWidth: number;
    radius: number;
  };
  render(): JSX.Element;
}
export default ProgressChart;
//# sourceMappingURL=ProgressChart.d.ts.map
