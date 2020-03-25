<script>
    let {
        id,
        from,
        to,
        x1: _x1,
        y1: _y1,
        x2: _x2,
        y2: _y2,
        fromOffset = '0%',
        fromOpacity = 1,
        toOffset = '100%',
        toOpacity = 1,
        rotate,
        transform,
        vertical = true,
        ...rest
    } = $$props;

    const gradientTransform = rotate ? `rotate(${rotate})` : transform;

    let x1 = _x1;
    let x2 = _x2;
    let y1 = _y1;
    let y2 = _y2;
    if (vertical && !x1 && !x2 && !y1 && !y2) {
        x1 = '0';
        x2 = '0';
        y1 = '0';
        y2 = '1';
    }
</script>

<defs>
    <linearGradient
            {id}
            {x1} {y1}
            {x2} {y2}
            {...rest}
    >
        <stop offset={fromOffset} stop-color={from} stop-opacity={fromOpacity}></stop>
        <stop offset={toOffset} stop-color={to} stop-opacity={toOpacity}></stop>
    </linearGradient>
</defs>
