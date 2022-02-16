import WordBlanksFactory from './libs/wordblanksFactory.js';
import WordBlanksView from './libs/wordblanksHtml.js';

const wbModel = WordBlanksFactory("To be or not to be, that is the __noun__. Whether 'tis __adjective__ to __verb__ the slings and arrows of outrageous fortune...");

const wbView = WordBlanksView(wbModel);

console.log(wbModel.filledString);
console.log(wbModel.wordBlanks)


document.body.append(
  wbView
)

wbView.addEventListener("wordblank.changed", (event)=>{
  const {id, value} = event.detail
  wbModel.byId(id).entry=value;
  
  const updatedEvent = new CustomEvent("wordblank.updated", {
    detail: wbModel
  })

  wbView.dispatchEvent(updatedEvent);
})

