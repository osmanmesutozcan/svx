<script>
    import reduceCSSCalc from 'reduce-css-calc';

    export let x = 0;
    export let y = 0;
    export let dx = 0;
    export let dy = 0;
    export let angle;
    export let width;
    export let transform;
    export let lineHeight = '1em';
    export let scaleToFit = false;
    export let capHeight = '0.71em';
    export let textAnchor = 'start';
    export let verticalAnchor = 'end';
    export let textProps = { 'font-size': 12 };

    const SVG_STYLE = 'overflow: visible;';

    const transforms = [transform];
    const wordsByLines = [{ words: ['yay. looking hot'], width: 80 }];
    let startDy;

    if (verticalAnchor === 'start') {
        startDy = reduceCSSCalc(`calc(${capHeight})`);
    } else if (verticalAnchor === 'middle') {
        startDy = reduceCSSCalc(
                `calc(${(wordsByLines.length - 1) / 2} * -${lineHeight} + (${capHeight} / 2))`,
        );
    } else {
        startDy = reduceCSSCalc(`calc(${wordsByLines.length - 1} * -${lineHeight})`);
    }

    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
        const lineWidth = wordsByLines[0].width || 1;
        const sx = width / lineWidth;
        const sy = sx;
        const originX = x - sx * x;
        const originY = y - sy * y;
        transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }

    if (angle) {
        transforms.push(`rotate(${angle}, ${x}, ${y})`);
    }

    function isNumber(val) {
        return typeof val === 'number';
    }
</script>

<svg x={dx} y={dy} font-size={textProps.fontSize} style={SVG_STYLE}>
    <text transform={transforms.join(' ')} {...textProps} text-anchor={textAnchor}>
        {#each wordsByLines as {words}, i}
            <tspan x={x} dy={i === 0 ? startDy : lineHeight}>
                {words.join(' ')}
            </tspan>
        {/each}
    </text>
</svg>
