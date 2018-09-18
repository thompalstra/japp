import { App } from "./core/app.js";
import { Templates } from "./core/templates.js";
import { Navigate } from "./core/navigate.js";
import "./helpers/dom.js";
import "./helpers/data.js";
import { Dialog } from "./widgets/dialog.js";
import { Drawer } from "./widgets/drawer.js";

window.App = App;

window.app = new App();
document.on("app.ready", function(event){
  app.templates.load(["./html/splash.html"])
    .then(function(){
      app.templates.render(document.body, "./html/splash.html", { title: "Loading...", derp: {
        herp: {
          nerf: "stuff",
          better: {
            things: "ahead"
          }
        }
      }});
    }).then(function(){
      app.templates.load(["/html/index.html", "/html/user/account.html", "/html/user/settings.html", "/html/user/notifications.html"])
        .then(function(){
          app.navigate.to("/html/index.html");
        });
    });
});
