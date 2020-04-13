<script>
    import { area } from 'd3-shape';

    let {
        children,
        x,
        x0,
        x1,
        y,
        y0,
        y1,
        data = [],
        defined = () => true,
        className,
        curve,
        ...restProps
    } = $$props;

    let path;
    $: $$props, path = createPath();

    function createPath() {
        const path = area();
        if (x) path.x(x);
        if (x0) path.x0(x0);
        if (x1) path.x1(x1);
        if (y) path.y(y);
        if (y0) path.y0(y0);
        if (y1) path.y1(y1);
        if (defined) path.defined(defined);
        if (curve) path.curve(curve);
        // TODO: From vx.
        // if (children) return <>{children({ path })}</>;

        return path;
    }
</script>

{#if data.length > 0}
    <path
            d={path(data) || ''}
            {...restProps}
    ></path>
{/if}

