function create(tag,attriutes,content){
   const elementObject = React.createElement(tag,attriutes,content);
   return elementObject;
}

const prac = create("div",{id:"parent"},
   [create("div",{id:"child1"},
      [create("h1",{},"i am a h1 tag"),create("h2",{},"i am a h2 tag")]),
   create("div",{id:"child2"},
      [create("h3",{},"i am a h3 tag"),create("h4",{},"i am a h4 tag")])
   ]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(prac);

// there is something known as JSX to simlify the above stuff