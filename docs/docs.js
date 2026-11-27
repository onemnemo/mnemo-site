/* Docs behaviour: mobile menu, page picker, sidebar sections and search. */

/* Page picker on small screens */
(function(){
  const b=document.querySelector(".pick"),p=document.getElementById("pages");if(!b||!p)return;
  b.addEventListener("click",()=>{const o=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",o);p.classList.toggle("open",o)});
})();

/* Sidebar: open and close a page's sections, and mark the one you're reading */
(function(){
  document.querySelectorAll(".item .tog").forEach(t=>t.addEventListener("click",()=>{
    const item=t.closest(".item"),o=!item.classList.contains("open");
    item.classList.toggle("open",o);t.setAttribute("aria-expanded",o);
  }));
  const links=[...document.querySelectorAll(".item.open .subs a")];if(!links.length)return;
  const secs=links.map(a=>document.getElementById(a.hash.slice(1)));
  let raf=0;
  const update=()=>{
    raf=0;
    const line=innerHeight*.3;let cur=0;
    secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=line)cur=i});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs.length-1;
    links.forEach((a,i)=>a.classList.toggle("on",i===cur));
  };
  addEventListener("scroll",()=>{if(!raf)raf=requestAnimationFrame(update)},{passive:true});
  addEventListener("resize",update);update();
})();

/* Search. The index loads the first time search opens. */
(function(){
  const wrap=document.getElementById("search"),input=document.getElementById("q"),list=document.getElementById("results");
  if(!wrap)return;
  const mac=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent);
  if(mac)document.querySelectorAll("[data-search] kbd").forEach(k=>k.textContent="\u2318 K");
  let index=null,hits=[],sel=0,last=null;
  const load=()=>index?Promise.resolve(index):fetch("/docs/search.json").then(r=>r.json()).then(d=>index=d);
  const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const terms=q=>q.toLowerCase().split(/\s+/).filter(Boolean);
  const mark=(text,ts)=>{let h=esc(text);ts.forEach(t=>{h=h.replace(new RegExp("("+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","gi"),"<mark>$1</mark>")});return h};
  const snippet=(x,ts)=>{
    const low=x.toLowerCase();let at=-1;
    for(const t of ts){const i=low.indexOf(t);if(i>=0&&(at<0||i<at))at=i}
    if(at<0)return x.slice(0,150);
    const start=at>50?x.lastIndexOf(" ",at-40)+1:0;
    return (start?"\u2026":"")+x.slice(start,start+170);
  };
  function render(){
    const q=input.value.trim(),ts=terms(q);
    if(!index){list.innerHTML="";return}
    if(!ts.length){
      hits=index.filter(e=>!e.h);
    }else{
      hits=index.map(e=>{
        const h=e.h.toLowerCase(),p=e.p.toLowerCase(),x=e.x.toLowerCase();let score=0;
        for(const t of ts){
          if(h.includes(t))score+=h.startsWith(t)?8:6;
          else if(p.includes(t))score+=4;
          else if(x.includes(t))score+=1;
          else return null;
        }
        return {e,score};
      }).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,20).map(r=>r.e);
    }
    sel=0;
    if(!hits.length){list.innerHTML=`<p class="none">Nothing found for \u201c${esc(q)}\u201d. Try another word.</p>`;return}
    list.innerHTML=hits.map((e,i)=>`<a class="res" role="option" id="r${i}" href="${e.u}" aria-selected="${i===0}">`+
      `<b>${mark(e.h||e.p,ts)}</b><span>${esc(e.h?e.p+", "+e.g:e.g)}</span>`+
      (ts.length?`<p>${mark(snippet(e.x,ts),ts)}</p>`:`<p>${esc(e.x)}</p>`)+`</a>`).join("");
    input.setAttribute("aria-activedescendant","r0");
  }
  function move(d){
    if(!hits.length)return;
    const els=list.querySelectorAll(".res");
    els[sel].setAttribute("aria-selected","false");
    sel=(sel+d+hits.length)%hits.length;
    els[sel].setAttribute("aria-selected","true");
    els[sel].scrollIntoView({block:"nearest"});
    input.setAttribute("aria-activedescendant","r"+sel);
  }
  function open(){
    if(!wrap.hidden)return;
    last=document.activeElement;wrap.hidden=false;document.body.style.overflow="hidden";
    input.value="";input.focus();load().then(render).catch(()=>{list.innerHTML='<p class="none">Search couldn\u2019t load. Try again in a moment.</p>'});
  }
  function close(){
    if(wrap.hidden)return;
    wrap.hidden=true;document.body.style.overflow="";if(last&&last.focus)last.focus();
  }
  document.querySelectorAll("[data-search]").forEach(b=>b.addEventListener("click",open));
  input.addEventListener("input",render);
  input.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){e.preventDefault();move(1)}
    else if(e.key==="ArrowUp"){e.preventDefault();move(-1)}
    else if(e.key==="Enter"&&hits[sel]){e.preventDefault();close();location.href=hits[sel].u}
  });
  list.addEventListener("click",e=>{if(e.target.closest(".res"))close()});
  wrap.addEventListener("mousedown",e=>{if(e.target===wrap)close()});
  addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();wrap.hidden?open():close()}
    else if(e.key==="/"&&wrap.hidden&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();open()}
    else if(e.key==="Escape")close();
  });
})();
