<script>
    import {genRandomNormalPoints} from '@vx/mock-data';
    import {scaleLinear} from '@vx/scale';

    import Group from "../components/group/Group.svelte";
    import Circle from "../components/shape/Circle.svelte";
    import GradientPinkRed from "../components/gradient/GradientPinkRed.svelte";

    export let height = 360;
    export let width = 600;

    const points = genRandomNormalPoints(600).filter((d, i) => {
        return i < 600;
    });

    const x = d => d[0];
    const y = d => d[1];
    const z = d => d[2];

    $: xMax = width;
    $: yMax = height - 80;

    $: xScale = scaleLinear({
        domain: [1.3, 2.2],
        range: [0, xMax],
        clamp: true
    });
    $: yScale = scaleLinear({
        domain: [0.75, 1.6],
        range: [yMax, 0],
        clamp: true
    });
</script>

<svg width={width} height={height}>
    <GradientPinkRed id="teal"/>
    <rect width={width} height={height} fill="url(#teal)" rx="14"/>
    <Group top={40}>
        {#each points as point, i}
            <Circle
                    r={i % 3 === 0 ? 2 : 2.765}
                    cx={xScale(x(point))}
                    cy={yScale(y(point))}
                    fill="#f6c431"
                    on:click={() => console.log(point)}
            />
        {/each}
    </Group>
</svg>

