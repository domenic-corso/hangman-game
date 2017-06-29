let DefaultUI = {
    panels: {
        menu: MenuPanel,
        singlePlayerSetup: SinglePlayerSetupPanel,
        twoPlayerSetup: TwoPlayerSetupPanel,
        enterWordPanel: EnterWordPanel,
        gameplayPanel: GameplayPanel
    }
};

DefaultUI.init = function() {
    /* Initialize all the panels. */
    for (p in this.panels) {
        if (this.panels.hasOwnProperty(p)) {
            this.panels[p].init();
        }
    }
};

/*
    First checks if the given panel is defined in this object, if it is then
    sets the style of all the panels (incl. given panel) to 'none', and sets
    the given panel as 'block'.
*/
DefaultUI.showPanel = function(panel) {
    if (!this.panelExists(panel)) {
        console.error("Panel not defined in DefaultUI");
        return;
    }
    
    /* Hide all other panels. */
    let panelElements = document.querySelectorAll(".main-panel");
    for (let i = 0; i < panelElements.length; i++) {
        panelElements[i].style.display = "none";
    }
    
    /* Show target panel */
    panel.e.panel.style.display = "block";
};

/*
    Checks if the given panel is defined in this.panels.
*/
DefaultUI.panelExists = function(panel) {
    let panelExists = false;
    
    for (p in this.panels) {
        if (this.panels[p] === panel) {
            panelExists = true;
        }
    }
    
    return panelExists;
};