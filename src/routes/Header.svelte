<script>
    import MenuDrawer from "./MenuDrawer.svelte";
    import { currentPage } from "./stores";

    let leftNav

    function toggleMenu(){
        leftNav.openMenu();
    }
</script>

<div class="header">
    <div class="header-icons">
        <button class="btn icon-btn menu-icon-btn" on:click={toggleMenu}>
            <svg viewBox="0 0 24 24" focusable="false" class="icon">
                <g><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path></g>
            </svg>
        </button>
        <div class="tabs">
            <a href="/stats" class="tabs-tab {$currentPage.includes('Statistics') ? 'tab-active':''}">Explore</a>
            <a href="/learn" class="tabs-tab {$currentPage.includes('Learn') ? 'tab-active':''}">Learn</a>
        </div>
    </div>
    <div class="logo-positioner">
        <a class="logo" href="/">LOGO GOES HERE</a>
    </div>
</div>
<MenuDrawer bind:this={leftNav} isOpen={false}></MenuDrawer>
<style>
    .header{
        position: fixed;
        top: 0;
        left: 0;
        border-bottom: 1px solid #000;
        /* display: flex;
        grid-template-areas: "menu-btn logo tabs";
        grid-template-columns: 40px 1fr 128px;
        justify-content: space-between; */
        width: 100%;
        height: 60px;
        background-color: #18181b;
        z-index: 11;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 90%), 0 0px 2px rgba(0,0,0,.9);
    }
    .header-icons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        height: 100%;
    }
    .logo-positioner{
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        align-items: center;
        z-index: 1;
        pointer-events: none;
    }
    .logo{
        grid-area: logo;
        display: flex;
        justify-content: center;
        pointer-events: auto;
    }
    .menu-icon-btn{
        background: transparent;
        border-radius: 50%;
        color: #fff;
        margin: 0;
        transition: background .2s ease-in-out;
        grid-area: menu-btn;
        justify-content: flex-start;
    }
    .menu-icon-btn:hover{
        background: #ffffff18;
        box-shadow: none;
    }
    .menu-icon-btn:focus{
        box-shadow: inset 0 0 0 1px #2451b2;
    }
    .menu-icon-btn .icon{
        fill: #fff;
    }
    .icon-btn.menu-icon-btn:hover .icon{
        stroke: #fff;
    }
    .tabs{
        grid-area: tabs;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        height: 100%;
    }
    .tabs-tab{
        color: #fff;
        text-decoration: none;
        height: 100%;
        display: flex;
        align-items: center;
        border-bottom: none;
        padding: 0 8px;
        transition: box-shadow .2s ease-in-out, background .2s ease-in-out;
    }
    .tabs-tab:hover{
        box-shadow: inset 0 -16px 0px -14px #fff;
        background-color: #ffffff08;
    }
    .tabs-tab.tab-active{
        box-shadow: inset 0 -16px 0px -12px #fff;
    }
    @media (max-width: 640px) {
        .logo-positioner{
            width: fit-content;
            left: 72px;
        }
    }
</style>