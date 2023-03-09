# WordBlanksGame

Experimenting with complete decoupling between the data and the view in vanilla javascript. There are often questions about "how can I completely decouple my data, and the representation *of* that data?" The linked article was mostly a thought experiment.

* We have a `WordBlanksFactory`, which will act as our "state" - it is aware of the actual content of the Word Blank thing.
* We have a `WordBlanksView`, which acts as the "view" component - it is the user-facing bit.

And we use custom events going from and to the `WordBlanksView` to trigger the `WordBlanksFactory` updates, and vice versa.

If this were more than a thought experiment, the code wandering about the `index.js` would have likely been better placed into some sort of controller or manager module, responsible for the communication between the two sides. As it is, I think this nicely demonstrates what I've written about in the attached article.
