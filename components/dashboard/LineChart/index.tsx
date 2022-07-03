import { ResponsiveLine } from '@nivo/line'

type Props = {
  data: any
  enableArea?: boolean
  curve?:
    | 'linear'
    | 'catmullRom'
    | 'basis'
    | 'cardinal'
    | 'monotoneX'
    | 'monotoneY'
    | 'natural'
    | 'step'
    | 'stepAfter'
    | 'stepBefore'
    | undefined
  enablePointLabel?: boolean
}

const LineChart: React.FC<Props> = ({
  data /* see data tab */,
  enableArea = false,
  curve,
  enablePointLabel = false,
}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 35, right: 110, bottom: 115, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false,
    }}
    yFormat=' >-.2f'
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'from last x days',
      legendOffset: 40,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    enableGridX={false}
    enableGridY={false}
    curve={curve}
    enableArea={enableArea}
    enableSlices='x'
    colors={{ scheme: 'category10' }}
    pointSize={6}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    enablePointLabel={enablePointLabel}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    animate={true}
  />
)
export default LineChart
