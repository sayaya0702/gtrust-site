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

  /* 最新記事に自動で NEW バッジを付与（日付が最新のカード） */
  window.markNewestPost=function(cards, metaSel){
    var newest=null, newestT=-1;
    cards.forEach(function(c){
      var t=c.querySelector('time'); if(!t)return;
      var d=Date.parse((t.getAttribute('datetime')||t.textContent).trim().replace(/[.\/]/g,'-'));
      if(!isNaN(d)&&d>newestT){newestT=d;newest=c;}
    });
    if(newest){
      var meta=newest.querySelector(metaSel);
      if(meta && !meta.querySelector('.tag-new')){
        var b=document.createElement('span'); b.className='tag-new'; b.textContent='NEW';
        meta.insertBefore(b, meta.firstChild);
      }
    }
  };
  var list=document.querySelector('.bloglist');
  if(list){ markNewestPost([].slice.call(list.querySelectorAll('a')), '.m'); }
})();
