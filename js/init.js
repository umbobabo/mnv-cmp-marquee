/*
  Author: Umberto Babini
  Purpose: Provide a basic marque with a public method to update the text inside the widget
  Based  on an original script of Stephen Chapman from http://javascript.about.com
*/
var mqrEcMarquee = [];
function ecMarquee(){
  var start, widgetSelector = ".mnv-ec-marquee", widget, marquee, span, mq;
  widget = document.querySelector(widgetSelector);
  function objWidth(obj) {
    if (obj.offsetWidth)
        return obj.offsetWidth;
    if (obj.clip)
        return obj.clip.width;
    return 0;
  }
  function mq() {
      this.mqo = widget;
      var wid = objWidth(span) + 5;
      var fulwid = objWidth(this.mqo);
      var txt = this.mqo.getElementsByTagName('span')[0].innerHTML;
      this.mqo.innerHTML = '';
      var heit = this.mqo.style.height;
      if(mqrEcMarquee[0]!=undefined){
        clearTimeout(mqrEcMarquee[0].TO);
      }
      this.mqo.onmouseout = function() {
          mqRotate(mqrEcMarquee);
      };
      this.mqo.onmouseover = function() {
          clearTimeout(mqrEcMarquee[0].TO);
      };
      this.mqo.ary = [];
      var maxw = Math.ceil(fulwid / wid) + 1;
      for (var i = 0; i < maxw; i++) {
          this.mqo.ary[i] = document.createElement('div');
          this.mqo.ary[i].innerHTML = txt;
          this.mqo.ary[i].style.position = 'absolute';
          this.mqo.ary[i].style.left = (wid * i) + 'px';
          this.mqo.ary[i].style.width = wid + 'px';
          this.mqo.ary[i].style.height = heit;
          this.mqo.appendChild(this.mqo.ary[i]);
      }
      mqrEcMarquee[0] = this.mqo;
  }
  function start(string){
    this.string = string;
    span = document.createElement('span');
    span.innerHTML = string;
    widget.appendChild(span);
    new mq();
    mqRotate(mqrEcMarquee);
  }

  function update(string){
    while (widget.firstChild) {
        widget.removeChild(widget.firstChild);
    }
    start(string);
  }

  return {
    start: start,
    update: update
  }
}

function mqRotate(mqrEcMarquee) {
  if (!mqrEcMarquee)
      return;
  for (var j = mqrEcMarquee.length - 1; j > -1; j--) {
      maxa = mqrEcMarquee[j].ary.length;
      for (var i = 0; i < maxa; i++) {
          var x = mqrEcMarquee[j].ary[i].style;
          x.left = (parseInt(x.left, 10) - 1) + 'px';
      }
      var y = mqrEcMarquee[j].ary[0].style;
      if (parseInt(y.left, 10) + parseInt(y.width, 10) < 0) {
          var z = mqrEcMarquee[j].ary.shift();
          z.style.left = (parseInt(z.style.left) + parseInt(z.style.width) * maxa) + 'px';
          mqrEcMarquee[j].ary.push(z);
      }
  }
  mqrEcMarquee[0].TO = setTimeout('mqRotate(mqrEcMarquee)', 30);
}