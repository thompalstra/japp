extend(Document, Node).with({
  one: function(q){
    return this.querySelector(q);
  },
  find: function(q){
    return this.querySelectorAll(q);
  },
  on: function(eventTypes, a, b, c){
    eventTypes.split(" ").forEach((eventType) => {
      if(typeof a === "function"){
        this.addEventListener(eventType, a);
      }else if(typeof b === "function"){
        this.addEventListener(eventType, function(oe){
          let target = null;
          if(oe.target.matches(a)){
            b.call(oe.target, oe);
          } else if((target = oe.target.closest(a))){
            target.call(target, oe);
          }
        });
      }
    });
  },
  do: function(eventType, options){
    if(typeof options === "undefined"){
      options = { cancelable: true, bubbles: true };
    } else if(typeof options === "boolean"){
      options = { cancelable: options, bubbles: options };
    }
    let e = new CustomEvent(eventType, options);
    this.dispatchEvent(e);
    return e;
  }
});
Object.flatten = function(obj){
  let out = {};
  Object.keys(obj).forEach((k)=>{
    if(typeof obj[k] == "object"){
      let fobj = Object.flatten(obj[k]);
      Object.keys(fobj).forEach((fk)=>{
        out[ fk + "." + k ] = fobj[fk];
      });
    } else {
      out[k] = obj[k];
    }
  });
  return out;
}
// document.on("click", ".myclass", function(e){
//   e.preventDefault(); e.stopPropagation();
//   console.log(event.type, "myclass");
// })
// document.on("click", function(e){
//   console.log(event.type, "dir");
// })
