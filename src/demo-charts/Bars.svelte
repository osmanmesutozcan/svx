<script>
    import { letterFrequency } from '@vx/mock-data'
    import { scaleBand, scaleLinear } from '@vx/scale'

    import Bar from '../components/shape/Bar.svelte'
    import Group from '../components/group/Group.svelte'
    import GradientTealBlue from '../components/gradient/GradientTealBlue.svelte'

    export let height = 360
    export let width

    const data = letterFrequency.slice(5)

    // accessors
    const x = d => d.letter
    const y = d => +d.frequency * 100

    // bounds
    $: xMax = width
    $: yMax = height - 100
    $: xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: data.map(x),
        padding: 0.4,
    })
    $: yScale = scaleLinear({
        rangeRound: [yMax, 0],
        domain: [0, Math.max(...data.map(y))],
    })
    $: barProps = d => {
        const letter = x(d)
        const barWidth = xScale.bandwidth()
        const barHeight = yMax - yScale(y(d))
        const barX = xScale(letter)
        const barY = yMax - barHeight
        return {
            x: barX,
            y: barY,
            height: barHeight,
            width: barWidth,
            fill: 'rgba(23, 233, 217, .5)',
        }
    }
</script>

<svg width={width} height={height}>
    <GradientTealBlue id="pink"/>
    <rect width={width} height={height} fill="url(#pink)" rx="14"/>
    <Group top={40}>
        {#each data as d}
            <Bar
                    {...barProps(d)}
                    on:click={() => console.log(d)}
            />
        {/each}
    </Group>
</svg>

