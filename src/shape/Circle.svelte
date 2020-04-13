<script>
    let { r, ...rest } = $$props;
</script>

<circle
        on:click
        on:mouseenter
        on:mouseleave
        on:touchstart

        r={r}
        {...rest}
></circle>
