dragElement(document.getElementById("POI-area"));function dragElement(e){var n=0,t=0,o=0,u=0;document.getElementById(e.id+"header")?document.getElementById(e.id+"header").onmousedown=l:e.onmousedown=l;function l(e){e=e||window.event,o=e.clientX,u=e.clientY,document.onmouseup=m,document.onmousemove=c}function c(l){l=l||window.event,n=o-l.clientX,t=u-l.clientY,o=l.clientX,u=l.clientY,e.style.top=e.offsetTop-t+"px",e.style.left=e.offsetLeft-n+"px"}function m(){document.onmouseup=null,document.onmousemove=null}}$("#menu-toggle").click(function(e){e.preventDefault(),$("#wrapper").toggleClass("active")});