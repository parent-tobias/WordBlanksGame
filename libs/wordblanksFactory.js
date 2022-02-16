const WordBlank = (string) => {
  const id = crypto.randomUUID();
  const type = string.replaceAll(/[_.]/g,'');
  let entry = '';

  return Object.freeze({
    id,
    type,
    get entry(){ return entry; },
    set entry(value){ entry = value;},
    reset(){ entry = ''; }
  })
}

const WordBlanksFactory = (string)=>{
  // Break the string into words...
  const blanks = string.split(' ')
                // remove anything that's not a blank...
                .filter((word)=>word.startsWith('__'))
                // and make each blank a WordBlank thing!
                .map(WordBlank);
  return Object.freeze({
    get originalString(){ return string; },
    get filledString(){
      return String.raw({raw: string.split(/__[a-z\s]*[a-z]__/i)}, ...blanks.map((blank)=>blank.entry ? blank.entry : '_______'))
	  },
    byId: (id)=>blanks.find(blank => blank.id===id),
    get words(){return blanks.map((blank)=>blank.entry) },
    get blanks(){return blanks.map((blank)=>blank.type) },
    get wordBlanks(){ return blanks.map((blank)=>({...blank}) ) },
    reset: ()=> blanks.forEach(blank=>blank.reset() ),
  })
};

export default WordBlanksFactory;