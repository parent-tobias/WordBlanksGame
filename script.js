import WordBlanksFactory from './libs/wordblanksFactory.js';
import WordBlanksView from './libs/wordblanksHtml.js';

const wbModel = WordBlanksFactory("To be or not to be, that is the __noun__. Whether 'tis __adjective__ to __verb__ the slings and arrows of outrageous fortune...");

const wbView = WordBlanksView(wbModel);


document.body.append(
  wbView.domEl
)

wbView.domEl.addEventListener("wordblank.changed", (event)=>{
  const {id, value} = event.detail
  wbModel.byId(id).entry=value;
  
  const updatedEvent = new CustomEvent("wordblank.updated", {
    detail: wbModel
  })

  wbView.domEl.dispatchEvent(updatedEvent);
})

