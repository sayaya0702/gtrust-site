/* G-Trust 共通スクリプト（サブページ用） */
(function(){
  var header=document.getElementById('header');
  if(header){addEventListener('scroll',function(){header.classList.toggle('scrolled',scrollY>20)});}
  var ham=document.getElementById('hamburger'),nav=document.getElementById('nav');
  if(ham&&nav){
    ham.addEventListener('click',function(){nav.classList.toggle('open')});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
  }
  var reveals=document.querySelectorAll('.reveal');
  function showIfInView(){reveals.forEach(function(el){if(el.classList.contains('in'))return;var r=el.getBoundingClientRect();if(r.top<innerHeight*0.92)el.classList.add('in')})}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    reveals.forEach(function(el){io.observe(el)});
  }
  showIfInView();
  addEventListener('scroll',showIfInView,{passive:true});
  addEventListener('load',showIfInView);
  setTimeout(function(){reveals.forEach(function(el){el.classList.add('in')})},1800);

  /* 記事カードを日付の新しい順に並べ替え＋最新に NEW バッジを付与 */
  window.processPostList=function(container, cardSel, metaSel){
    if(!container)return;
    var cards=[].slice.call(container.querySelectorAll(cardSel));
    var items=cards.map(function(c){
      var t=c.querySelector('time');
      var d=t?Date.parse((t.getAttribute('datetime')||t.textContent).trim().replace(/[.\/]/g,'-')):NaN;
      return {c:c, d:isNaN(d)?-Infinity:d};
    });
    items.sort(function(a,b){return b.d-a.d;});
    items.forEach(function(x){container.appendChild(x.c);});
    if(items.length){
      var m=items[0].c.querySelector(metaSel);
      if(m && !m.querySelector('.tag-new')){
        var b=document.createElement('span'); b.className='tag-new'; b.textContent='NEW';
        m.insertBefore(b, m.firstChild);
      }
    }
  };
  processPostList(document.querySelector('.bloglist'), 'a', '.m');
})();
