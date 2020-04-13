<script>
    import LinearGradient from './LinearGradient.svelte';

    export let id;
</script>

<LinearGradient
        {id}
        {...$$props}
        from="#17EAD9"
        to='#6078EA'
/>
