let Templates = function(){

}
Templates.prototype.map = new Map();
Templates.prototype.set = function(url, text){
  this.map.set(url, text);
}
Templates.prototype.get = function(url){
  return this.map.get(url);
}
Templates.prototype.load = function(urls){
  return new Promise(function(resolve, reject){
    (function next(i){
      return fetch(urls[i])
        .then(res => res.text())
        .then(text => {
          app.templates.map.set(urls[i], text);
          if(i < urls.length-1){
            next(++i);
          } else {
            resolve();
          }
        })
    })(0);
  });
}
Templates.prototype.render = function(node, tmpl, obj){
  let fobj = Object.flatten(obj);
  let html = app.templates.get(tmpl);
  Object.keys(fobj).forEach(fk=>{
    let regexp = new RegExp("{{" + fk + "}}", "g");
    html = html.replace(regexp, fobj[fk]);
  });
  node.innerHTML = html;
  return node;
}
window.Templates = Templates;
export { Templates };
