const Component = {
  name: "generic-component",
  tag: "div",
  render() {
    this.elm = document.createElement(this.tag);
    this.elm.className = this.name;
    document.body.appendChild(this.elm);
  }
};

const Clickable = {
  listenToClickEvents(elm) {
    this.elm.addEventListener("click", (event) => this.onClick(event));
  },
  onClick(event) {
    console.log("click event", event);
  }
};

const Focusable = {
  listenToFocusEvents(elm) {
    this.elm.addEventListener("focus", (event) => this.onFocus(event));
    this.elm.addEventListener("blur", (event) => this.onBlur(event));
  },
  onFocus(event) {
    console.log("focus event", event);
  },
  onBlur(event) {
    console.log("blur event", event);
  }
};

const Editable = {
  listenToKeyboardEvents(elm) {
    this.elm.addEventListener("keyup", (event) => this.onKey(event));
  },
  onKey(event) {
    console.log("key pressed", event);
  }
};

const Button = {
  text: "Button",
  tag: "button",
  name: "button",
  render() {
    super.render();
    this.elm.textContent = this.text;
    // TODO: écouter les événements clic et focus
    this.listenToClickEvents(this.elem);
    this.listenToFocusEvents(this.elem);
    return this.elm;
  }
  //, ...Focusable,
};

const Input = {
  value: null,
  tag: "input",
  render() {
    super.render();
    this.elm.value = this.value;
    // TODO: écouter les événements keyup et focus
    this.listenToKeyboardEvents(this.elem);
    this.listenToFocusEvents(this.elem);
    return this.elm;
  }
};

const TextInput = {
  name: "text-input",
  onKey(event) {
    this.value = event.target.value;
  }
};

//TODO: établir et coder les relations entre les différents objets: délégation, composition ou encapsulation
/** Prototypes */
Object.setPrototypeOf(Button, Component);
Object.setPrototypeOf(Input, Component);
Object.setPrototypeOf(TextInput, Input);

/** Compositions */
Object.assign(Button, Focusable, Clickable);
Object.assign(Input, Editable, Focusable);

/**
 * Exemple d'utilisation
 * Décommenter la partie Exo 17 dans index.html pour tester le fonctionnel attendu
 */

let text = Object.create(TextInput);
text.value = "Bob";
text.render();

let btn = Object.create(Button);
btn.text = "Salut !";
btn.onClick = () => alert(`Salut ${text.value} !`);
btn.render();

/*
 *Component prototype de Button, Input
 *Input prototype de TextInput
 *Focusable, Clickable composé dans Button
 *Focusable,Editable composé dans Input
 */
