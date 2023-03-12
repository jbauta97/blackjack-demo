<script>
    import { deckNum } from './stores';
    let isOpen = false;
    let openClass = '';
    
    function togglePopup(){
        if (isOpen){
            openClass = 'settings-popup--open';
            isOpen = false;
        }else{
            openClass = '';
            isOpen = true;
        }
    }
</script>

<div class="header">
    <button on:click={togglePopup}>Settings</button>
</div>
<div class="settings-popup {openClass}">
    <div class="backdrop" on:click={togglePopup}></div>
    <div class="modal">
        <h1>Settings</h1>
        <div class="settings-grid">
            <div class="setting-option">
                <div class="setting-label">Decks:</div>
                <input type="number" class="setting-input" bind:value="{$deckNum}" min="1" step="1">
            </div>
        </div>
    </div>
</div>
<style>
    .header{
        position: fixed;
        top: 0;
        left: 0;
        border-bottom: 1px solid #000;
        display: block;
        width: 100%;
        padding: 8px;
        background-color: #18181b;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 90%), 0 0px 2px rgba(0,0,0,.9);
    }
    .settings-popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        display: none;
    }
    .settings-popup--open{
        display: flex;
    }
    .backdrop{
        background-color: #0004;
        position: fixed;
        width: 100vw;
        height: 100vh;
    }
    .modal{
        background-color: #fff;
        color: #212121;
        border-radius: 4px;
        width: 600px;
        height: auto;
        padding: 16px;
        z-index: 1;
    }
    .settings-grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .setting-option{
        display: flex;
    }
</style>