<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
        
        <!-- HTML Meta Tags -->
        <title>Tokoevent Bisnis | Jual Tiket Event Tanpa Biaya Pertama di Indonesia</title>
        <meta name="description" content="Tokoevent adalah partner tiketing platform tanpa biaya pertama di Indonesia.
        Sebagai platform penjualan tiket, kami memberikan pengalaman terbaik bagi penyelenggara acara dan pengguna.">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://bisnis.tokoevent.id">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Tokoevent Bisnis | Jual Tiket Event Tanpa Biaya Pertama di Indonesia">
        <meta property="og:description" content="Tokoevent adalah partner tiketing platform tanpa biaya pertama di Indonesia.
        Sebagai platform penjualan tiket, kami memberikan pengalaman terbaik bagi penyelenggara acara dan pengguna.">
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/a92c454e-3ffc-4450-b9a8-6adcfc663bd5.png?token=xNMuzUAEL-WWhWQBx3_3EZquQkpLPEgufqc6OoNhM9w&height=630&width=1200&expires=33259175202">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="bisnis.tokoevent.id">
        <meta property="twitter:url" content="https://bisnis.tokoevent.id">
        <meta name="twitter:title" content="Tokoevent Bisnis | Jual Tiket Event Tanpa Biaya Pertama di Indonesia">
        <meta name="twitter:description" content="Tokoevent adalah partner tiketing platform tanpa biaya pertama di Indonesia.
        Sebagai platform penjualan tiket, kami memberikan pengalaman terbaik bagi penyelenggara acara dan pengguna.">
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/a92c454e-3ffc-4450-b9a8-6adcfc663bd5.png?token=xNMuzUAEL-WWhWQBx3_3EZquQkpLPEgufqc6OoNhM9w&height=630&width=1200&expires=33259175202">
        <!-- Meta Tags Generated via https://www.opengraph.xyz -->

        <link rel="icon" href="/images/logo/icon.png" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <link id="theme-css" href={{asset('/themes/tailwind-light/theme.css')}} rel="stylesheet"></link>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
