<script>
    let {
        from,
        to,
        fill = 'transparent',
        ...rest
    } = $$props;
</script>

<line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        fill={fill}
        {...rest}
></line>
