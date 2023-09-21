'use client';

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
import { type ConditionalKeys } from 'type-fest';

import { type Theme, useTheme } from '../../hooks/useTheme';
import { withI18nProvider } from '../../utils/with-i18n-provider';
import { Card } from '../Card/Card';

/** An array of arbitrary objects with data to graph  */
type LineGraphData = readonly Record<string, any>[];

/** Extract string keys from items in `T` where the value of `T[K]` extends `K` */
type ExtractValidKeys<T extends LineGraphData, K> = Extract<ConditionalKeys<T[number], K>, string>;

type LineGraphLine<T extends LineGraphData = Record<string, any>[]> = Pick<
  LineProps,
  'stroke' | 'strokeWidth' | 'type' | 'legendType' | 'strokeDasharray'
> & {
  name: string;
  val: ExtractValidKeys<T, number>;
  err?: ExtractValidKeys<T, number>;
};

const strokeColors = {
  light: '#475569', // slate-600
  dark: '#cbd5e1' // slate-300
};

const tooltipStyles: Record<Theme, React.CSSProperties> = {
  light: {
    backgroundColor: '#f1f5f9', // slate-100
    borderColor: strokeColors.dark,
    borderRadius: '2px'
  },
  dark: {
    backgroundColor: '#0f172a', // slate-900
    borderColor: strokeColors.light,
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
    <Card className="rounded-md p-3">
      <ResponsiveContainer height={400} width="100%">
        <LineChart data={[...data]} margin={{ left: 15, right: 15, bottom: 5, top: 5 }}>
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
          {lines.map(({ name, val, err, stroke, type, ...props }) => (
            <Line
              dataKey={val}
              key={val}
              name={name}
              stroke={stroke ?? strokeColors[theme]}
              type={type ?? 'linear'}
              {...props}
            >
              {err && <ErrorBar dataKey={err} stroke="#64748b" />}
            </Line>
          ))}
          <Legend wrapperStyle={{ paddingLeft: 40, paddingTop: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export const LineGraph = React.memo(withI18nProvider(LineGraphComponent)) as unknown as typeof LineGraphComponent;

export { type LineGraphLine };
