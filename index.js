(function() {

const WORDS = [
    "소나무",
    "호랑이"
];

class GameMain {
    /** The container DOM element */
    dom;
    /** Whether the game is now playing */
    isPlaying;
    /** The current word */
    currentWord;

    constructor() {
        this.dom = document.createElement("div");
        this.isPlaying = false;
        this.currentWord = '';

        this.#setupDOM();
    }

    /**
     * Setups the DOM properties. Only used in the constructor.
     */
    #setupDOM() {
        this.dom.classList.add("game-main-container");
    }

    /**
     * Initializes the game. It may be run many times.
     */
    initialize() {
        while (this.dom.hasChildNodes()) {
            this.dom.removeChild(this.dom.lastChild);
        }
    }

    /**
     * Generates a new word.
     */
    generateWord() {
        console.log("A word was generated.");
        this.currentWord = WORDS[~~(Math.random() * WORDS.length)];
        this.dom.textContent = this.currentWord;
    }

    /**
     * Recieves an input.
     * 
     * @param {string} value The input value
     */
    recieveInput(value) {
        if (value.normalize("NFC") === this.currentWord.normalize("NFC")) {
            this.generateWord();
        }
    }

    /**
     * Starts the game.
     */
    startGame() {
        if (this.isPlaying) {
            return;
        }
        this.isPlaying = true;
        this.generateWord();

        const frame = () => {
            if (!this.isPlaying) {
                return;
            }
            // Frame thing...
            window.requestAnimationFrame(frame);
        };
        window.requestAnimationFrame(frame);
    }

    /**
     * Stops the game.
     */
    stopGame() {
        this.isPlaying = false;
    }
}

class GameUI {
    /** The container DOM element */
    dom;
    /** The main game */
    game;
    /** The DOM element containing the input */
    inputContainer;
    /** The input of the game */
    input;
    /** The submit button */
    submitButton;
    /** Whether the enter key is pressed */
    isAfterSubmit;

    /**
     * @param {GameMain} game The game to use
     */
    constructor(game) {
        this.dom = document.createElement("div");
        this.inputContainer = document.createElement("div");
        this.input = document.createElement("input");
        this.submitButton = document.createElement("button");

        this.isAfterSubmit = false;

        this.game = game;
        this.game.initialize();
        this.#setupDOM();
    }

    /**
     * Setups the DOM properties. Only used in the constructor.
     */
    #setupDOM() {
        this.dom.classList.add("game-container");
        this.inputContainer.classList.add("game-input-container");
        this.input.classList.add("game-input");
        this.submitButton.classList.add("game-submit-button");
        this.submitButton.textContent = "Send";

        this.input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                this.isAfterSubmit = true;
                this.submitButton.click();
            }
        });
        this.input.addEventListener("keyup", event => {
            if (event.key === "Enter") {
                this.isAfterSubmit = false;
            }
        });
        this.input.addEventListener("input", event => {
            if (this.isAfterSubmit) {
                this.input.value = '';
                return;
            }
            if (event.data === ' ') {
                this.submitButton.click();
                event.preventDefault();
                return;
            }
        });
        this.submitButton.addEventListener("click", () => {
            const value = this.input.value.trim();
            if (value.length > 0) {
                this.game.recieveInput(value);
                const logText = "Submit '" + value + "'.";
                this.dom.appendChild(document.createTextNode(logText));
                this.dom.appendChild(document.createElement("br"));
                this.input.value = '';
            }
        });

        this.dom.appendChild(this.game.dom);
        this.inputContainer.appendChild(this.input);
        this.inputContainer.appendChild(this.submitButton);
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
    const gameMain = new GameMain();
    const gameUI = new GameUI(gameMain);
    document.body.appendChild(gameUI.dom);
    gameUI.focusInput();
    gameMain.startGame();
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