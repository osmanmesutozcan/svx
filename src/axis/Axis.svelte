<script>
    import { Point } from '../point';
    import Group from '../group/Group';
    import Line from '../shape/Line';
    import Text from '../text/Text';

    import { ORIENT } from './constants/orientation';
    import { toString } from './utils/toString';
    import { center } from './utils/center';
    import { toNumberOrUndefined } from './utils/toNumberOrUndefined';
    import { labelTransform } from './utils/labelTransform';

    let {
        children,
        axisClassName,
        axisLineClassName,
        hideAxisLine = false,
        hideTicks = false,
        hideZero = false,
        label = '',
        labelClassName,
        labelOffset = 14,
        labelProps = {
            textAnchor: 'middle',
            fontFamily: 'Arial',
            fontSize: 10,
            fill: '#222',
        },
        left = 0,
        numTicks = 10,
        orientation = ORIENT.bottom,
        rangePadding = 0,
        scale,
        stroke = '#222',
        strokeWidth = 1,
        strokeDasharray,
        tickClassName,
        tickFormat,
        tickLabelProps = (/** tickValue, index */) => ({
            'text-anchor': 'middle',
            'font-family': 'Arial',
            'font-size': 10,
            fill: '#222',
        }),
        tickLength = 8,
        tickStroke = '#222',
        tickTransform,
        tickValues,
        tickComponent,
        top = 0,
    } = $$props;


    const format = tickFormat || (scale.tickFormat ? scale.tickFormat() : toString);

    const range = scale.range();
    const range0 = Number(range[0]) + 0.5 - rangePadding;
    const range1 = Number(range[range.length - 1]) + 0.5 + rangePadding;

    const isLeft = orientation === ORIENT.left;
    const isTop = orientation === ORIENT.top;
    const axisIsHorizontal = isTop || orientation === ORIENT.bottom;
    const tickSign = isLeft || isTop ? -1 : 1;

    const position = center(scale.copy());
    const axisFromPoint = new Point({
        x: axisIsHorizontal ? range0 : 0,
        y: axisIsHorizontal ? 0 : range0,
    });
    const axisToPoint = new Point({
        x: axisIsHorizontal ? range1 : 0,
        y: axisIsHorizontal ? 0 : range1,
    });

    let tickLabelFontSize = 10; // track the max tick label size to compute label offset

    function calculateProps(val, idx) {
        const scaledValue = toNumberOrUndefined(position(val));
        const tickFromPoint = new Point({
            x: axisIsHorizontal ? scaledValue : 0,
            y: axisIsHorizontal ? 0 : scaledValue,
        });
        const tickToPoint = new Point({
            x: axisIsHorizontal ? scaledValue : tickSign * tickLength,
            y: axisIsHorizontal ? tickLength * tickSign : scaledValue,
        });

        const tickLabelPropsObj = tickLabelProps(val, idx);
        tickLabelFontSize = Math.max(
                tickLabelFontSize,
                (typeof tickLabelPropsObj.fontSize === 'number' && tickLabelPropsObj.fontSize) || 0,
        );

        const tickYCoord = tickToPoint.y + (axisIsHorizontal && !isTop ? tickLabelFontSize : 0);
        const formattedValue = format(val, idx);

        return {
            val,
            idx,
            tickFromPoint,
            tickToPoint,
            tickLabelPropsObj,
            tickYCoord,
            formattedValue,
        };
    }

    let values = (tickValues || (scale.ticks ? scale.ticks(numTicks) : scale.domain()))
            .map((val, idx) => ({ val: calculateProps(val, idx), idx }));

    if (hideZero) {
        values.slice(1);
    }
</script>

<Group {top} {left}>
    {#each values as {val, idx}}
        <Group transform={tickTransform}>
            <Line
                    from={val.tickFromPoint}
                    to={val.tickToPoint}
                    stroke={tickStroke}
                    strokeLinecap="square"
            />
            <Text
                    x={val.tickToPoint.x}
                    y={val.tickYCoord}
                    text={val.formattedValue}
                    {...val.tickLabelPropsObj}
            />
        </Group>
    {/each}
    {#if label}
        <Text
                text="Left Axis Label"
                {...labelTransform({
                    labelOffset,
                    labelProps,
                    orientation,
                    range,
                    tickLabelFontSize,
                    tickLength
                })}/>
    {/if}
</Group>
