// import Draggable from "vuedraggable";
import Draggable from 'zhyswan-vuedraggable';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('draggable', Draggable);
});
