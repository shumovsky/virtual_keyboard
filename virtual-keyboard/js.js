const Keyboard = {


    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },


    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard-hidden');
        this.elements.keysContainer.classList.add('keyboard_keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {

        const fragment = document.createDocumentFragment();
        const keyLayoutEng = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', `backspace`,
            'keyboard_tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
            `caps`, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'arrow up',
            'ctrl', 'view quilt', 'alt', 'space', 'alt', 'ctrl', 'arrow left', 'arrow down', 'arrow right'
        ];

        const keyLayoutRus = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'keyboard_tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
            'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
            'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'arrow up',
            'ctrl', 'view quilt', 'alt', `space`, 'alt', 'ctrl', 'arrow left', 'arrow down', 'arrow right'
        ]


        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        keyLayoutEng.forEach(key => {
            const keyElements = document.createElement('button');
            const insertLineBreak = ['backspace', 'del', 'enter', 'arrow up'].indexOf(key) !== -1;


            keyElements.setAttribute('type', 'button');
            keyElements.classList.add('keyboard_key');

            switch (key) {
                case 'backspace':
                    keyElements.classList.add('keyboard_key-wide');
                    keyElements.innerHTML = createIconHTML('backspace');

                    keyElements.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value - 1);
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'del':
                    keyElements.classList.add('keyboard_key-wide', 'del');
                    keyElements.innerHTML = 'del';

                    keyElements.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value - 1);
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'caps':
                    keyElements.classList.add('keyboard_key-wide', 'keyboard_key-active');
                    keyElements.innerHTML = createIconHTML('keyboard_capslock');

                    keyElements.addEventListener('click', () => {
                        this._toggleCapsLock()
                        keyElements.classList.toggle('keyboard_key-active', this.properties.capsLock)
                    })

                    break;

                case 'enter':
                    keyElements.classList.add('keyboard_key-wide');
                    keyElements.innerHTML = createIconHTML('keyboard_return');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'space':
                    keyElements.classList.add('keyboard_key-extra-wide', 'keyboard-space');
                    keyElements.innerHTML = createIconHTML('space_bar');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;
                case 'keyboard_tab':
                    keyElements.classList.add('keyboard_key-extra-wide');
                    keyElements.innerHTML = createIconHTML('keyboard_tab');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'arrow left':
                    keyElements.classList.add('keyboard_key-extra-wide');
                    keyElements.innerHTML = createIconHTML('arrow_left');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'arrow right':
                    keyElements.classList.add('keyboard_key-extra-wide');
                    keyElements.innerHTML = createIconHTML('arrow_right');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'arrow up':
                    keyElements.classList.add('keyboard_key-extra-wide', 'arrow-up');
                    keyElements.innerHTML = createIconHTML('arrow_right');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'arrow down':
                    keyElements.classList.add('keyboard_key-extra-wide', 'arrow-down');
                    keyElements.innerHTML = createIconHTML('arrow_right');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'shift':
                    keyElements.classList.add('keyboard_key-extra-wide', 'shift');
                    keyElements.innerHTML = 'shift';

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'ctrl':
                    keyElements.classList.add('keyboard_key-extra-wide', 'ctrl');
                    keyElements.innerHTML = 'ctrl';

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'alt':
                    keyElements.classList.add('keyboard_key-extra-wide', 'alt');
                    keyElements.innerHTML = 'alt';

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;

                case 'view quilt':
                    keyElements.classList.add('keyboard_key-extra-wide');
                    keyElements.innerHTML = createIconHTML('view_quilt');

                    keyElements.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvents('oninput');
                    })

                    break;


                case 'done':
                    keyElements.classList.add('keyboard_key-wide');
                    keyElements.innerHTML = createElement('check_circle');

                    keyElements.addEventListener('click', () => {
                        this.close()
                        this._triggerEvents('oninput');
                    })

                    break;
                default:
                    keyElements.textContent = key.toLocaleLowerCase()

                    keyElements.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toLocaleLowerCase() : key.toLocaleLowerCase();
                        this._triggerEvents('oninput');
                    })

                    break;
            }

            fragment.appendChild(keyElements);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'))
            }
        });

        return fragment;
    },

    _triggerEvents(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }
};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
});