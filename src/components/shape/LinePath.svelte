<script>
    import {line} from 'd3-shape';

    let {
        curve,
        fill = 'transparent',
        defined = () => true,
        data: _data,
        x: _x,
        y: _y,
        ...rest
    } = $$props;
    export let x;
    export let y;
    export let data = [];

    let path;
    $: $$props, path = createPath();

    function createPath() {
        const path = line();
        if (x) path.x(x);
        if (y) path.y(y);
        if (curve) path.curve(curve);
        if (defined) path.defined(defined);
        return path;
    }
</script>

{#if data.length > 0}
    <path
            fill={fill}
            d={path(data)}
            {...rest}
    ></path>
{/if}
