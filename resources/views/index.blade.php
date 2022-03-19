<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laravel React Social</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div id="root"></div>

    <script type="module">
        import RefreshRuntime from "{{ env('VITE_SERVER_HOST', 'http://localhost:3000') }}/@@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>

    @vite
</body>
</html>