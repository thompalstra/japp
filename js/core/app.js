window.extend = function(){
  return {
    obj: arguments,
    with: function(list, forceProperty){
      if(typeof forceProperty === "undefined"){
        forceProperty = false;
      }
      for(let x = 0; x < this.obj.length; x++){
        let target = this.obj[x].prototype && forceProperty == false ? this.obj[x].prototype : this.obj[x];
        for(let y in list){
          target[y] = list[y];
        }
      }
    }
  };
}
let App = function(){
  this.navigate = new Navigate();
  this.templates = new Templates();
}
document.addEventListener("DOMContentLoaded", function(e){
  document.do("app.ready");
})
window.App = App;
export { App };
