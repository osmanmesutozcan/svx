
<script>
    import { extent, max  } from 'd3-array';
    import { genDateValue } from '@vx/mock-data';
    import { scaleTime, scaleLinear } from '@vx/scale';
    import { curveMonotoneX } from '@vx/curve';

    import Group from "../components/group/Group.svelte";
    import LinePath from "../components/shape/LinePath.svelte";

    export let rx = 14;
    export let stroke = "#ffffff";
    export let fill= "#242424";

    export let height = 360;
    export let width;

    const x = d => d.date;
    const y = d => d.value;

    function genLines(num) {
        return new Array(num).fill(1).map(() => {
            return genDateValue(25);
        });
    }

    const series = genLines(12);
    const data = series.reduce((rec, d) => {
        return rec.concat(d);
    }, []);


    let xMax = width;
    let yMax = height / 8;
    let xScale;
    let yScale;

    $: if (height && width) {
        xMax = width;
        yMax = height / 8;
        xScale = scaleTime({
            range: [0, xMax],
            domain: extent(data, x)
        });
        yScale = scaleLinear({
            range: [yMax, 0],
            domain: [0, max(data, y)]
        });
    }
</script>

<svg  {width} {height}>
    <rect x="0" y="0" {width} {height} {rx} {fill}/>
    {#each series as d, i}
        <Group top={i * yMax / 2}>
            <LinePath
                    {stroke}
                    data={d}
                    curve={curveMonotoneX}
                    strokeWidth="1"
                    x={d => xScale(x(d))}
                    y={d => yScale(y(d))}
            />
        </Group>
    {/each}
</svg>
