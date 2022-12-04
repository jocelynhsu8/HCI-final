const data = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 20, region: 'China' },
    { id: 'd3', value: 30, region: 'Germany' },
    { id: 'd4', value: 40, region: 'Canada' },
]

const container = d3.select('div')
    .classed('container', true)
    .style('border', '1px solid black')

const bars = container
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('div')
    .classed('bar', true)
    .attr('width', 50)
    .attr('height', d => d.value * 10);

