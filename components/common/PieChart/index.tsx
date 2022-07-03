import { ResponsivePie } from '@nivo/pie'

const PieChart = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 0, right: 130, bottom: 130, left: 130 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'nivo' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor='#333333'
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 3]] }}
    legends={[
      {
        anchor: 'bottom',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 10,
        itemWidth: 100,
        itemHeight: 16,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 16,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
)

export default PieChart
