<script>
    import { currentPage } from "./stores";
    export let isOpen = false;

    const level2Stats = [
        {name: 'Statistics', link: '/stats'}
    ];
    const level2Learn = [
        {name: 'Learn', link: '/learn'}
    ];
    const level1 = [
        {name: 'Statistics', link: '/stats', expandable: level2Stats},
        {name: 'Learn', link: '/learn', expandable: level2Learn}
    ];
    let menuLevel;
    let activeMenu;
    $: $currentPage, handleMenu();
       

    export function openMenu() {
        isOpen = !isOpen;
    }
    function closeMenu(){
        isOpen = false;
        handleMenu();
    }
    function handleMenu(){
        switch($currentPage){
            case 'Home': 
                // Show level 1 menu
                menuLevel = 1;
                activeMenu = level1;
                break;
            case 'Statistics':
                // Show level 2 statistics menu
                menuLevel = 2;
                activeMenu = level2Stats;
                break;
            case 'Learn':
                menuLevel = 2;
                activeMenu = level2Learn;
                break;
            default:
                console.log('Page not found');
        }
    } 
    function changeMenuLevel(menu){
        activeMenu = menu;
    }
    function handleBackButton(){
        menuLevel = menuLevel > 1 ? menuLevel-1:menuLevel;
        if (activeMenu == level1)return;
        else if (activeMenu==level2Stats || activeMenu==level2Learn){
            activeMenu = level1;
        }
    }
</script>

<div class="leftNav-drawer {isOpen ? 'drawer--open' : ''}">
    <ul class="leftNav">
        {#if activeMenu != level1}
            <li><button class="menu-btn" on:click={handleBackButton}><svg class="icon menu-icon" role="presentation" focusable="false" viewBox="0 0 24 24"><title>Return</title> <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg>Back</button></li>
        {/if}
        <li><a class="menu-link {$currentPage == 'Home'? 'menu-link--active':''}" href="/">Home</a></li>
        {#each activeMenu as menuItem}
            <li>
                <a class="menu-link {$currentPage == menuItem.name ? 'menu-link--active':''}" href="{menuItem.link}">{menuItem.name}</a>
                {#if menuItem.expandable}
                    <button class="menu-btn menu-expand-btn" on:click={()=>{changeMenuLevel(menuItem.expandable)}}>+</button>
                {/if}
            </li>
        {/each}
        <li><br>More Coming Soon<br><br></li>
    </ul>
    <div class="drawer-backdrop" on:click={closeMenu}></div>
</div>

<style>
    .leftNav-drawer{
        opacity: 0;
        position: fixed;
        pointer-events: none;
        left: -300px;
        top: 0;
        transition: opacity .1s ease-in-out, left .2s ease-in-out;
        z-index: 10;
    }
    .drawer--open{
        opacity: 1;
        pointer-events: all;
        left: 0;
    }
    ul.leftNav{
        list-style: none;
        background-color: #18181b;
        height: 100vh;
        width: 100%;
        max-width: 256px;
        position: fixed;
        top: 60px;
        margin: 0;
        padding: 16px 0;
        z-index: 1;
    }
    .drawer-backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #0004;
        z-index: 0;
        backdrop-filter: blur(1px);
    }
    ul.leftNav li{
        border-bottom: 1px solid #000;
        display: flex;
        height: 48px;
    }
    .menu-link{
        color: #fff;
        display: flex;
        align-items: center;
        padding: 8px 32px;
        width: 100%;
        text-decoration: none;
        transition: background .2s ease-in-out;
    }
    .menu-link--active{
        font-weight: 700;
        /* background-color: #ffffff10; */
        pointer-events: none;
    }
    .menu-link.menu-link--active:hover{
        background-color: #ffffff10;
    }
    .menu-link:hover{
        background-color: #ffffff08;
    }
    .menu-icon{
        fill: #fff;
    }
    .menu-btn{
        color: #fff;
        background-color: transparent;
        line-height: 14px;
        gap: 4px;
        width: 100%;
        height: 100%;
        margin: 0;
        justify-content: flex-start;
    }
    .menu-btn:hover{
        box-shadow: none;
        background-color: #ffffff08;
    }
    .menu-expand-btn{
        display: inline-flex;
        justify-content: center;
        width: 48px;
        font-size: 1.5rem;
        font-weight: 700;
    }
    @media (max-width: 640px) {
        .leftNav-drawer{
            left: -100vw;
        }
        ul.leftNav{
            max-width: 100vw;
        }
        .drawer--open{
            left: 0;
        }
    }
</style>