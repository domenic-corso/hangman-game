let DefaultUI = {
    hangmanGame: null,
    panels: {
        menu: MenuPanel,
        singlePlayerSetup: SinglePlayerSetupPanel,
        twoPlayerSetup: TwoPlayerSetupPanel,
        enterWord: EnterWordPanel,
        gameplay: GameplayPanel
    },
    activePanel: null
};

DefaultUI.init = function(hangmanGame) {
    this.hangmanGame = hangmanGame;
    
    /* Initialize all the panels. */
    for (p in this.panels) {
        if (this.panels.hasOwnProperty(p)) {
            this.panels[p].init(this.hangmanGame);
        }
    }
    
    /* Show the menu panel at first. */
    this.showPanel(this.panels.gameplay);
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
    
    /* Don't do anything if this panel is already displayed. */
    if (this.activePanel === panel) {
        return;
    }
    
    /* Hide all other panels. */
    let panelElements = document.querySelectorAll(".main-panel");
    for (let i = 0; i < panelElements.length; i++) {
        panelElements[i].style.display = "none";
    }
    
    /* Show target panel */
    panel.e.panel.style.display = "block";
    
    /* Tell the panel it is now active */
    panel.onShow();
    
    this.activePanel = panel;
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