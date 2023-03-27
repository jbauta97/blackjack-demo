<script>
    import { currentPage } from "./stores";
    import { bodyScrollable } from "./stores";
    import { fly } from 'svelte/transition';
    import { page } from "$app/stores";
    export let isOpen = false;

    const level2Stats = [
        {name: 'Statistics', link: '/stats'}
    ];
    const level2Learn = [
        {name: 'Learn', link: '/learn'},
        {name: 'Basic Strategy', link: '/learn/BasicStrategy'}
    ];
    const level1 = [
        {name: 'Statistics', link: '/stats', expandable: level2Stats},
        {name: 'Learn', link: '/learn', expandable: level2Learn}
    ];
    let menuLevel;
    let activeMenu;
    let startX;
    let menuOffset = 0;
    let endX;
    let screenWidth = 1200;
    let menuTouchTranslate;
    $: $currentPage, closeMenu();
    $: menuTouchTranslate = screenWidth>640 ? `${400+menuOffset}px`:'calc(100vw + '+menuOffset+'px)';


    export function openMenu() {
        isOpen = !isOpen;
        $bodyScrollable = !isOpen;
    }
    function closeMenu(){
        isOpen = false;
        $bodyScrollable = true;
        menuOffset = 0;
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
            case 'Learn/BasicStrategy':
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
    
    function handleTouchStart(event) {
        // record the starting touch position
        startX = event.touches[0].clientX;
        endX = startX;
    }
    function handleTouchMove(event) {
        // calculate the distance of the touch move
        endX =  event.touches[0].clientX;
        let distance = endX - startX;

        // if the user has moved their finger more than 50 pixels to the left, close the menu
        if (distance < -20) {
            menuOffset = distance;
        }
        else{
            menuOffset = 0;
        }
    }
    function handleTouchEnd(event){
        let distance = endX - startX;
        menuOffset = 0;
        if (distance < -100) {
            closeMenu();
        }
    }
</script>
<svelte:window bind:innerWidth={screenWidth}/>
<div class="leftNav-drawer {isOpen ? 'drawer--open' : ''}" style="{menuOffset==0 ? '':'transition:transform 0s;transform:translate3d('+menuTouchTranslate+',0,0)'}">
    <ul class="leftNav" on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd} transition:fly="{{x:50}}">
        {#if activeMenu != level1}
            <li><button class="menu-btn" on:click={handleBackButton}><svg class="icon menu-icon" role="presentation" focusable="false" viewBox="0 0 24 24"><title>Return</title> <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg>Back</button></li>
        {/if}
        <li><a class="menu-link {$currentPage == 'Home'? 'menu-link--active':''}" href="/">Home</a></li>
        {#each activeMenu as menuItem}
            <li>
                <a class="menu-link {$page.route.id == menuItem.link ? 'menu-link--active':''}" href="{menuItem.link}">{menuItem.name}</a>
                {#if menuItem.expandable}
                    <button class="menu-btn menu-expand-btn" on:click={()=>{changeMenuLevel(menuItem.expandable)}}>+</button>
                {/if}
            </li>
        {/each}
    </ul>
    <div class="drawer-backdrop" on:click={closeMenu}></div>
</div>

<style>
    .leftNav-drawer{
        opacity: 0;
        position: fixed;
        pointer-events: none;
        left: -400px;
        top: 0;
        transition: opacity .1s ease-in-out, transform .2s ease-in-out;
        z-index: 10;
    }
    .drawer--open{
        opacity: 1;
        pointer-events: all;
        transform: translate3d(400px, 0, 0);
    }
    ul.leftNav{
        list-style: none;
        background-color: #18181b;
        height: 100vh;
        width: 100vw;
        max-width: 320px;
        position: relative;
        top: 60px;
        margin: 0;
        padding: 16px 0;
        z-index: 1;
    }
    .drawer-backdrop{
        position: fixed;
        top: 0;
        left: 320px;
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
            width: 100vw;
            max-width: 100vw;
        }
        .drawer--open{
            /* left: 0; */
            transform: translate3d(100vw, 0, 0);
        }
        .drawer-backdrop{
            display: none;
        }
    }
</style>