import{r as l,aO as i,A as s,aH as f}from"./index.5b155391.js";const c=e=>e.toLocaleString("pt-br",{style:"currency",currency:"BRL"}),d=[{name:"img_url",align:"left",label:"Img",field:"img_url",sortable:!1},{name:"name",align:"left",label:"Descri\xE7\xE3o",field:"name",sortable:!0},{name:"amount",align:"left",label:"Estoque",field:"amount",sortable:!0},{name:"price",align:"left",label:"Valor",field:"price",format:e=>c(e),sortable:!0},{name:"actions",align:"right",label:"A\xE7\xF5es",field:"actions",sortable:!1}],m=l({page:1,rowsPerPage:8});function p(e){const o=Object.assign({noopener:!0},e),r=[];for(const n in o){const a=o[n];a===!0?r.push(n):(f(a)||typeof a=="string"&&a!=="")&&r.push(n+"="+a)}return r.join(",")}function t(e,o,r){let n=window.open;if(i.is.cordova===!0){if(cordova!==void 0&&cordova.InAppBrowser!==void 0&&cordova.InAppBrowser.open!==void 0)n=cordova.InAppBrowser.open;else if(navigator!==void 0&&navigator.app!==void 0)return navigator.app.loadUrl(e,{openExternal:!0})}const a=n(e,"_blank",p(r));if(a)return i.is.desktop&&a.focus(),a;o&&o()}var g=(e,o,r)=>{if(i.is.ios===!0&&window.SafariViewController!==void 0){window.SafariViewController.isAvailable(n=>{n?window.SafariViewController.show({url:e},s,o):t(e,o,r)});return}return t(e,o,r)};export{d as c,c as f,m as i,g as o};
