import toHtml from './toHtml.js'

const createWordBlankInput = ({id, type, entry})=>{
  const input = toHtml(`
<label class='wordblank-label'>${type}: 
  <input class='wordblank-input' 
         type='text' 
         placeholder="${type}" 
         data-id="${id}" 
         ${entry && `value="${entry}"`}>
</label>`)

  input.querySelector('input').addEventListener("input", (event)=>{
    const changedEvent = new CustomEvent('wordblank.changed', {
      bubbles: true,
      detail: {
        id: event.currentTarget.dataset.id,
        value: event.currentTarget.value,
      }
    })

    input.dispatchEvent(changedEvent)
  })
  return input;
}

const WordBlankView = ({filledString, wordBlanks})=>{
  let state = {
    blanks: wordBlanks.map(createWordBlankInput),
    filledString
  };

  const domEl = toHtml(`
<main class='wordblank-game'>
  <section class='blanks-pane'>
    <header><h2>Word Blanks!</h2></header>
    <ul>
    </ul>
  </section>
  <section class='filled-pane'>
    <p></p>
  </section>    
</main>`);

    domEl.querySelector(".filled-pane p").textContent = state.filledString;
    domEl.querySelector(".blanks-pane ul").textContent='';
    domEl.querySelector(".blanks-pane ul").append(...state.blanks.map(blank=>{
      const el = document.createElement(`li`)
      el.append(blank);
      return el; 
    }) );
  
  domEl.addEventListener("wordblank.updated", (event)=>{
    state.filledString = event.detail.filledString;

    domEl.querySelector(".filled-pane p").textContent = state.filledString;
    
  })

  return {
    domEl
  }
}

export default WordBlankView;