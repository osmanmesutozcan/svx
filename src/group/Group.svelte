<script>
    export let top = 0;
    export let left = 0;
    export let transform = '';
</script>

<g transform={transform || `translate(${left}, ${top})`}>
    <slot></slot>
</g>
