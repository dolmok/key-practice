(function() {

class Game {
    /** The container DOM element */
    dom;
    /** The DOM element containing the input */
    inputContainer;
    /** The input of the game */
    input;

    constructor() {
        this.dom = document.createElement("div");
        this.inputContainer = document.createElement("div");
        this.input = document.createElement("input");

        this.#setupDOM();
    }

    /**
     * Setups the DOM properties. Only used in the constructor.
     */
    #setupDOM() {
        this.dom.classList.add("game-container");
        this.inputContainer.classList.add("game-input-container");
        this.input.classList.add("game-input");

        this.input.addEventListener("keyup", event => {
            if (event.code === "Enter" || event.code === "Space") {
                const value = this.input.value.trim();
                if (value.length > 0) {
                    const logText = "Submit '" + value + "'.";
                    this.dom.appendChild(document.createTextNode(logText));
                    this.dom.appendChild(document.createElement("br"));
                    this.input.value = '';
                }
            }
        });
        this.input.addEventListener("input", () => {
            const logText = "Input '" + this.input.value + "'.";
            this.dom.appendChild(document.createTextNode(logText));
            this.dom.appendChild(document.createElement("br"));
        });

        this.inputContainer.appendChild(this.input);
        this.dom.appendChild(this.inputContainer);
    }

    /**
     * Focues the input.
     */
    focusInput() {
        this.input.focus();
    }
}

function setup() {
    const game = new Game();
    document.body.appendChild(game.dom);
    game.focusInput();
}

if (document.readyState === "complete") {
    setup();
}
else {
    document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete") {
            setup();
        }
    });
}

})();