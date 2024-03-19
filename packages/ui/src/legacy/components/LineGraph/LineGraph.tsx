import React from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/utils';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  ErrorBar,
  Label,
  Legend,
  Line,
  LineChart,
  type LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { ConditionalKeys } from 'type-fest';

import { type Theme, useTheme } from '@/hooks/useTheme';

import { Card } from '../Card/Card';

/** An array of arbitrary objects with data to graph  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LineGraphData = readonly Record<string, any>[];

/** Extract string keys from items in `T` where the value of `T[K]` extends `K` */
type ExtractValidKeys<T extends LineGraphData, K> = Extract<ConditionalKeys<T[number], K>, string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LineGraphLine<T extends LineGraphData = Record<string, any>[]> = Pick<
  LineProps,
  'legendType' | 'stroke' | 'strokeDasharray' | 'strokeWidth' | 'type'
> & {
  err?: ExtractValidKeys<T, number>;
  name: string;
  val: ExtractValidKeys<T, number>;
};

const strokeColors = {
  dark: '#cbd5e1', // slate-300
  light: '#475569' // slate-600
};

const tooltipStyles: Record<Theme, React.CSSProperties> = {
  dark: {
    backgroundColor: '#0f172a', // slate-900
    borderColor: strokeColors.light,
    borderRadius: '2px'
  },
  light: {
    backgroundColor: '#f1f5f9', // slate-100
    borderColor: strokeColors.dark,
    borderRadius: '2px'
  }
};

// eslint-disable-next-line react/function-component-definition
function LineGraphComponent<const T extends LineGraphData>({
  data,
  lines,
  xAxis
}: {
  /** An array of objects, where each object represents one point on the x-axis */
  data: T;
  lines: LineGraphLine<T>[];
  xAxis?: {
    key?: ExtractValidKeys<T, number>; // unix time
    label?: string;
  };
}) {
  const { i18n } = useTranslation();
  const [theme] = useTheme();

  return (
    <Card className="rounded-md p-3 [&_.recharts-legend-wrapper]:pl-[75%]" onClick={() => print()}>
      <ResponsiveContainer height={400} width="100%">
        <LineChart data={[...data]} margin={{ bottom: 5, left: 15, right: 15, top: 5 }}>
          <CartesianGrid stroke="#64748b" strokeDasharray="5 5" />
          <XAxis
            axisLine={{ stroke: '#64748b' }}
            dataKey={xAxis?.key}
            domain={['auto', 'auto']}
            height={50}
            interval="preserveStartEnd"
            padding={{ left: 20, right: 20 }}
            stroke={strokeColors[theme]}
            tickFormatter={(time: number) => toBasicISOString(new Date(time))}
            tickLine={{ stroke: '#64748b' }}
            tickMargin={8}
            tickSize={8}
            type={'number'}
          >
            <Label fill={strokeColors[theme]} offset={0} position="insideBottom" value={xAxis?.label} />
          </XAxis>
          <YAxis
            axisLine={{ stroke: '#64748b' }}
            stroke={strokeColors[theme]}
            tickLine={{ stroke: '#64748b' }}
            tickMargin={5}
            tickSize={8}
            width={40}
          />
          <Tooltip
            contentStyle={tooltipStyles[theme]}
            labelFormatter={(time: number) => {
              const date = new Date(time);
              return new Intl.DateTimeFormat(i18n.resolvedLanguage, {
                dateStyle: 'full',
                timeStyle: 'medium'
              }).format(date);
            }}
            labelStyle={{ color: strokeColors[theme], fontWeight: 500, whiteSpace: 'pre-wrap' }}
          />
          {lines.map(({ err, name, stroke, type, val, ...props }) => (
            <Line
              {...props}
              dataKey={val}
              key={val}
              name={name}
              stroke={stroke ?? strokeColors[theme]}
              type={type ?? 'linear'}
            >
              {err && <ErrorBar dataKey={err} stroke="#64748b" />}
            </Line>
          ))}
          <Legend wrapperStyle={{ paddingLeft: 10, paddingTop: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export const LineGraph = React.memo(LineGraphComponent) as typeof LineGraphComponent;

export { type LineGraphLine };
