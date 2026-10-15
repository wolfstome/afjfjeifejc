// Brief page preparation indicator; bounded so a slow asset never blocks entry.
const loader=document.createElement('div');loader.className='vc-loader';loader.setAttribute('aria-hidden','true');loader.innerHTML='<div><strong>v<span>✳</span></strong><p>VELORA CODE</p><div class="vc-loader-count"><span>0</span><small>%</small></div><i></i></div>';document.body.append(loader);
const loaderNumber=loader.querySelector('.vc-loader-count span'),loaderBar=loader.querySelector('i');
const loaderStart=performance.now();let loaderReady=document.readyState==='complete',loaderProgress=0,loaderFinished=false;
addEventListener('load',()=>{loaderReady=true;},{once:true});
const clearLoader=()=>{if(loaderFinished)return;loaderFinished=true;loaderNumber.textContent='100';loaderBar.style.transform='scaleX(1)';setTimeout(()=>{loader.classList.add('vc-loader-done');setTimeout(()=>loader.remove(),600);},350);};
const updateLoader=now=>{if(loaderFinished)return;const elapsed=now-loaderStart;const target=loaderReady?Math.min(100,elapsed/40):Math.min(92,elapsed/45);loaderProgress=Math.max(loaderProgress,target);loaderNumber.textContent=String(Math.floor(loaderProgress));loaderBar.style.transform='scaleX('+(loaderProgress/100)+')';if(loaderProgress>=100||elapsed>=5000)clearLoader();else requestAnimationFrame(updateLoader);};
requestAnimationFrame(updateLoader);setTimeout(clearLoader,5200);
// js/content.js
// Website text and placeholder content. Edit these values to personalize your pages.
const SiteContent = {
  // Set your real inbox here to enable the email action in the contact dialog.
  contactEmail: '',
  contactPhone: '',
  newsletterUrl: '', // Your newsletter provider's hosted signup URL.
  location: '',
  // Example figures only. Replace with verified company numbers, then set false.
  statsAreDemo: true,
  reviews: [], // Add approved customer quotes: {quote, name, company}. Hidden until supplied.
  stats: [], // Add verified company metrics to enable count-up numbers.
  partners: ['Design', 'Development', 'Strategy', 'Identity', 'Digital', 'Motion'],
  services: [
    { icon: '✳', title: 'UI/UX Design', text: 'Intuitive experiences. Thoughtful interfaces. Design that feels as good as it looks.', tags: 'Web design / Product design / Prototyping' },
    { icon: '⌘', title: 'Web Development', text: 'Fast, responsive websites that bring your ideas to life and grow alongside you.', tags: 'Websites / Web applications / E-commerce' },
    { icon: '◈', title: 'Brand Identity', text: 'A distinct point of view, made visible. Brands with personality and a clear purpose.', tags: 'Visual identity / Brand systems / Art direction' },
    { icon: '↗', title: 'Digital Strategy', text: 'Connect the dots between your business, your audience, and your next opportunity.', tags: 'Discovery / Content strategy / Digital direction' }
  ],
  projects: [
    { image:'studio.png', name: 'AER — A fresh perspective', category: 'Design', type: 'Website experience', color: 'lavender', symbol: '◒', text: 'A considered website concept with a clear visual hierarchy and an intuitive path through the content.' },
    { image:'workspace.png', name: 'A considered digital experience', category: 'Development', type: 'Digital product', color: 'peach', symbol: '▦', text: 'A digital product concept built around useful interactions, responsive layouts, and a simple user journey.' },
    { image:'form.png', name: 'FORM — Naturally distinct', category: 'Branding', type: 'Visual identity', color: 'sage', symbol: '✳', text: 'An identity concept exploring typography, color, and a flexible visual language across different touchpoints.' },
    { image:'form.png', name: 'FORM — A quieter way to shop', category: 'Development', type: 'E-commerce experience', color: 'blue', symbol: '◇', text: 'An online store concept focused on clear product information and a comfortable shopping experience.' }
  ],
  process: [
    { title: 'Discover', text: 'We listen, ask questions, and get to the heart of what you want to achieve.' },
    { title: 'Design', text: 'We explore the possibilities and turn the right direction into a considered design.' },
    { title: 'Develop', text: 'We bring it to life with responsive code and careful attention to the details.' },
    { title: 'Deliver', text: 'We test, refine, and get you ready for your next chapter.' }
  ],
  articles: [
    { image:'workspace.png', title: 'Great websites start with better questions.', tag: 'STRATEGY', time: '2 MIN READ', color: 'peach', symbol: '?', paragraphs: ['Before choosing a font or a framework, decide what your website needs to help someone do. A clear purpose makes every later decision easier.', 'Start with three questions: Who is visiting? What do they need to understand? What should they do next? Write down one primary answer for each.', 'Organize your content around that journey. Introduce the problem, show a relevant solution, and make the next step easy to find.'] },
    { image:'form.png', title: 'The little details that make design feel right.', tag: 'DESIGN', time: '2 MIN READ', color: 'lavender', symbol: '✦', paragraphs: ['Good design is often felt before it is noticed. Consistent spacing, readable type, and a clear hierarchy help people move comfortably through a page.', 'Use a small set of spacing values and repeat them. Keep body text readable, and give important headings enough room to stand apart.', 'Check the small interactions too. Buttons need visible focus states, links need clear labels, and motion should respect reduced-motion preferences.'] },
    { image:'workspace.png', title: 'Simple code. Room for bigger ideas.', tag: 'DEVELOPMENT', time: '2 MIN READ', color: 'sage', symbol: '{ }', paragraphs: ['A small website can go a long way with HTML, CSS, and JavaScript. Fewer dependencies can make the project easier to understand and maintain.', 'Keep content separate from rendering and interactions. This gives you a clear place to edit copy, change the layout, or add behavior.', 'Add complexity when a real requirement calls for it. A solid foundation should help the next person understand how the website works.'] }
  ]
};

// js/render.js
// Shared page templates. Content comes from content.js.
const SiteRender = {
  fill(selector, html) { const element = document.querySelector(selector); if (element) element.innerHTML = html; },
  render(model) {
    this.fill('#hero-stats',model.statsAreDemo?'':model.stats.map(s=>`<div aria-label="${s.value}${s.suffix} ${s.label}${model.statsAreDemo?', demo figure':''}"><strong aria-hidden="true"><span data-count="${s.value}">0</span>${s.suffix}</strong><span>${s.label}</span></div>`).join('')+(model.statsAreDemo?'<small class="vc-stats-note">DEMO FIGURES · REPLACE WITH YOUR COMPANY NUMBERS</small>':''));
    const logos = model.partners.map(name => `<span>${name}</span>`).join('');
    this.fill('#partner-logos', `<div>${logos}</div><div aria-hidden="true">${logos}</div>`);
    this.fill('#service-list', model.services.map((s, i) => `<article class="vc-service"><div class="vc-service-top"><span class="vc-service-icon">${s.icon}</span><span>0${i + 1}</span></div><h3>${s.title}</h3><p>${s.text}</p><small>${s.tags}</small><button data-service="${i}" aria-label="Explore ${s.title}">↗</button></article>`).join(''));
    this.projects(model.projects);
    this.fill('#process-list', model.process.map((p, i) => `<article><span class="vc-step-number">0${i + 1}<span>↗</span></span><h3>${p.title}</h3><p>${p.text}</p></article>`).join(''));
    this.fill('#article-list', model.articles.map((a, i) => `<article class="vc-article"><a class="vc-article-art vc-${a.color}" href="blog-post.html?id=${i}" aria-label="Read ${a.title}"><img src="images/${a.image}" alt="${a.title}" loading="lazy"></a><div class="vc-article-meta"><span>${a.tag}</span><span>${a.time}</span></div><h3><a href="blog-post.html?id=${i}">${a.title}<span>↗</span></a></h3></article>`).join(''));
    document.querySelector('#current-year').textContent = new Date().getFullYear();
  },
  projects(projects) {
    this.fill('#project-list', projects.map((p,i) => `<article class="vc-project" style="--project-i:${i}"><span class="vc-project-index" aria-hidden="true">0${SiteContent.projects.indexOf(p)+1}</span><a class="vc-project-art vc-${p.color}" href="project.html?id=${SiteContent.projects.indexOf(p)}" aria-label="View ${p.name}"><span class="vc-project-tag">DESIGN STUDY</span><img src="images/${p.image}" alt="${p.name}" loading="lazy"><span class="vc-project-arrow">↗</span></a><div class="vc-project-caption"><h3>${p.name}</h3><span>${p.type}</span></div></article>`).join(''));
  },
  dialog(content) {
    this.fill('#dialog-content', content);
    document.querySelector('#detail-dialog').showModal();
  }
};

// js/theme.js
// Light/dark choice is shared across all pages.
const Theme = {
  init() {
    let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    try { theme = localStorage.getItem('velora-theme') || theme; } catch (_) {}
    this.set(theme);
    document.querySelector('.vc-theme').addEventListener('click', () => this.set(document.body.dataset.theme === 'light' ? 'dark' : 'light'));
  },
  set(theme) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = selected;
    const button = document.querySelector('.vc-theme');
    button.firstElementChild.textContent = selected === 'light' ? '☾' : '☀';
    button.setAttribute('aria-label', `Switch to ${selected === 'light' ? 'dark' : 'light'} theme`);
    try { localStorage.setItem('velora-theme', selected); } catch (_) {}
  }
};

// js/menu.js
const Menu = {
  open:false, rotation:0,
  init() {
    this.button=document.querySelector('.vc-menu');
    this.nav=document.querySelector('#navigation');
    this.mobile=matchMedia('(max-width:900px)');
    this.button.addEventListener('click',()=>this.set(!this.open));
    const page=location.pathname.split('/').pop() || 'index.html';
    this.nav.querySelectorAll('a').forEach((link,index)=>{
      link.style.setProperty('--link-order',index);
      if(link.getAttribute('href')===page) link.setAttribute('aria-current','page');
      link.addEventListener('click',()=>this.set(false,false));
    });
    this.initWheel();
    this.mobile.addEventListener('change',()=>{this.set(false,false);this.paintWheel();});
    this.set(false,false);
    document.addEventListener('keydown',event=>{
      if(!this.open) return;
      if(event.key==='Escape') this.set(false);
      if(event.key==='Tab') {
        const elements=[...document.querySelectorAll('.vc-header a,.vc-header button')].filter(el=>el.getClientRects().length && !el.closest('[inert]'));
        const first=elements[0],last=elements.at(-1);
        if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
        if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
    document.addEventListener('click',event=>{if(this.open && !event.target.closest('.vc-header')) this.set(false);});
  },
  set(open,restore=true) {
    const next=open && this.mobile.matches;
    this.button.style.transform=next?'rotate(90deg)':'';
    this.open=next;
    this.nav.classList.toggle('vc-is-open',next);
    this.nav.inert=this.mobile.matches && !next;
    this.button.setAttribute('aria-expanded',String(next));
    this.button.setAttribute('aria-label',next?'Close menu':'Open menu');
    document.body.classList.toggle('vc-menu-open',next);
    document.querySelector('main').inert=next;
    document.querySelector('.vc-footer').inert=next;
    this.paintWheel();
    if(!next && restore) this.button.focus();
  },
  initWheel() {
    this.links=[...this.nav.querySelectorAll('a')];this.turn=0;
    const controls=document.createElement('div');controls.className='vc-wheel-controls';
    controls.innerHTML='<p>SWIPE TO EXPLORE</p><span aria-live="polite"></span>';
    this.nav.append(controls);this.counter=controls.querySelector('span');
    const move=amount=>{this.turn+=amount;this.paintWheel();};
    this.nav.addEventListener('wheel',e=>{if(!this.open)return;e.preventDefault();move(Math.max(-.45,Math.min(.45,(e.deltaY+e.deltaX)/180)));},{passive:false});
    let start=null,moved=false;
    this.nav.addEventListener('pointerdown',e=>{if(!this.open||e.target.closest('button'))return;start={x:e.clientX,y:e.clientY};moved=false;});
    this.nav.addEventListener('pointermove',e=>{if(!start)return;const delta=(e.clientY-start.y)+(e.clientX-start.x);if(Math.abs(delta)>3){moved=true;move(-delta/100);start={x:e.clientX,y:e.clientY};}});
    const end=()=>{start=null;};window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
    this.nav.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
    this.nav.addEventListener('keydown',e=>{if(!this.open)return;if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();move(['ArrowDown','ArrowRight'].includes(e.key)?1:-1);this.links[((Math.round(this.turn)%this.links.length)+this.links.length)%this.links.length].focus();}});
    new ResizeObserver(()=>this.paintWheel()).observe(this.nav);
  },
  paintWheel() {
    if(!this.links)return;
    const n=this.links.length,size=this.nav.clientWidth;
    this.links.forEach((link,i)=>{
      if(!this.mobile.matches){link.removeAttribute('style');link.removeAttribute('tabindex');link.removeAttribute('aria-hidden');return;}
      const offset=((i-this.turn+n*1000+n/2)%n)-n/2,angle=(135+offset*30)*Math.PI/180,visible=Math.abs(offset)<1.45;
      link.style.setProperty('--wheel-x',(size+Math.cos(angle)*size*.67)+'px');link.style.setProperty('--wheel-y',(Math.sin(angle)*size*.67)+'px');
      link.style.setProperty('--wheel-opacity',visible?'1':'0');link.style.visibility=visible?'visible':'hidden';link.tabIndex=visible?0:-1;link.setAttribute('aria-hidden',String(!visible));
    });
    this.counter.textContent=(((Math.round(this.turn)%n)+n)%n+1)+' / '+n;
  }
};

// js/portfolio.js
const Portfolio = {
  init() {
    document.querySelector('.vc-filter-bar')?.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      SiteRender.projects(SiteContent.projects.filter(p => button.dataset.filter === 'All' || p.category === button.dataset.filter));
    });
    const id = Number(new URLSearchParams(location.search).get('id') || 0);
    if (document.querySelector('#project-detail')) {
      const project = SiteContent.projects[id];
      if (!project) { SiteRender.fill('#project-detail','<h1>Project not found.</h1><p><a href="projects.html">Explore our projects ↗</a></p>'); return; }
      document.title = `${project.name} — Velora Code`;
      SiteRender.fill('#project-detail',`<a class="vc-text-link" href="projects.html">← All projects</a><p class="vc-eyebrow">${project.category} / EXAMPLE CONCEPT</p><h1>${project.name}</h1><div class="vc-dialog-art vc-${project.color}"><img src="images/${project.image}" alt="${project.name}"></div><p>${project.text}</p><p>A self-initiated design study exploring a visual direction, with generated campaign imagery.</p>`);
    }
    if (document.querySelector('#blog-detail')) {
      const article = SiteContent.articles[id];
      if (!article) { SiteRender.fill('#blog-detail','<h1>Article not found.</h1><p><a href="blog.html">Return to studio notes ↗</a></p>'); return; }
      document.title = `${article.title} — Velora Code`;
      SiteRender.fill('#blog-detail',`<a class="vc-text-link" href="blog.html">← All studio notes</a><p class="vc-eyebrow">${article.tag} / ${article.time}</p><h1>${article.title}</h1><div class="vc-dialog-art vc-${article.color}"><img src="images/${article.image}" alt="${article.title}"></div>${article.paragraphs.map(p=>`<p>${p}</p>`).join('')}`);
    }
  }
};

// js/dialogs.js
const Dialogs = {
  init() {
    const dialog = document.querySelector('#detail-dialog');
    document.querySelector('.vc-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-service], [data-contact]');
      if (!button) return;
      if ('service' in button.dataset) {
        const service = SiteContent.services[button.dataset.service];
        SiteRender.dialog(`<p class="vc-eyebrow">HOW WE CAN HELP</p><h2 id="dialog-title">${service.title}</h2><p>${service.text}</p><p>${service.tags}</p><button class="vc-button" data-contact>Let’s talk about it <span>↗</span></button>`);
      } else {
        dialog.close();
        this.contact();
      }
    });
  },
  contact() {
    SiteRender.dialog(`<p class="vc-eyebrow">LET’S MAKE SOMETHING GOOD</p><h2 id="dialog-title">Tell us what’s<br>on your mind.</h2><p>A website, a new brand, or an idea you haven’t quite figured out yet. Start with a few details.</p><form id="contact-form"><label>Your name<input name="name" autocomplete="name" required placeholder="Alex Morgan" maxlength="100"></label><label>Your email<input name="email" type="email" autocomplete="email" required placeholder="you@company.com" maxlength="150"></label><label>A little about your project<textarea name="project" required placeholder="I have an idea for…" rows="4" maxlength="3000"></textarea></label><button class="vc-button" type="submit">${SiteContent.contactEmail ? 'Prepare email' : 'Preview my message'} <span>↗</span></button><p class="vc-form-note">${SiteContent.contactEmail ? 'Opens your email app with a draft. You choose when to send.' : 'Preview mode — your information stays in this browser and is not sent.'}</p><p id="contact-status" role="status"></p></form>`);
    document.querySelector('#contact-form').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('project')}`;
      if (SiteContent.contactEmail) location.href = `mailto:${encodeURIComponent(SiteContent.contactEmail)}?subject=${encodeURIComponent('A new project for Velora Code')}&body=${encodeURIComponent(message)}`;
      document.querySelector('#contact-status').textContent = SiteContent.contactEmail ? 'Your email draft is ready in your email app.' : `Your message preview (not sent):\n\n${message}`;
    });
  }
};

// js/motion.js
// Small native animations: no animation library required.
const Motion = {
  init() {
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const items=[...document.querySelectorAll('.vc-service,.vc-studio-chapters article')];
    const counts=[...document.querySelectorAll('[data-count]')];
    const finish=()=>{items.forEach(el=>el.classList.add('vc-in-view'));counts.forEach(el=>el.textContent=el.dataset.count);};
    if(reduced.matches || !('IntersectionObserver' in window)){finish();}
    else {
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add('vc-in-view');observer.unobserve(entry.target);
      }),{threshold:.15});
      items.forEach(item=>{const order=[...item.parentElement.children].indexOf(item);item.classList.add('vc-reveal');item.style.setProperty('--reveal-delay',`${order*110}ms`);observer.observe(item);});
      const stats=document.querySelector('#hero-stats');
      if(stats){const counterObserver=new IntersectionObserver(entries=>{
        if(!entries.some(e=>e.isIntersecting))return;
        counterObserver.disconnect();const start=performance.now();
        const tick=now=>{const progress=Math.min((now-start)/1700,1);const eased=1-Math.pow(1-progress,3);counts.forEach(el=>el.textContent=Math.round(Number(el.dataset.count)*eased));if(progress<1&&!reduced.matches)requestAnimationFrame(tick);else counts.forEach(el=>el.textContent=el.dataset.count);};requestAnimationFrame(tick);
      },{threshold:.35});counterObserver.observe(stats);}
      reduced.addEventListener('change',event=>{if(event.matches){observer.disconnect();finish();}});
    }
    document.querySelectorAll('[data-service-scroll]').forEach(button=>button.addEventListener('click',()=>{
      const list=document.querySelector('#service-list'),card=list.querySelector('article');
      list.scrollBy({left:Number(button.dataset.serviceScroll)*(card.getBoundingClientRect().width+16),behavior:reduced.matches?'instant':'smooth'});
    }));
  }
};

// js/footer.js
const Footer = { init() {
 const section=document.querySelector('#client-reviews');
 if(!section||!SiteContent.reviews.length)return;
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=0;section.hidden=false;
 section.innerHTML='<p class="vc-eyebrow">IN OUR CLIENTS’ WORDS</p><div id="review-copy" aria-live="polite"></div><div class="vc-review-controls"><button aria-label="Previous review" id="review-prev">←</button><span id="review-count"></span><button aria-label="Next review" id="review-next">→</button></div>';
 const show=()=>{const r=SiteContent.reviews[current];document.querySelector('#review-copy').innerHTML='<h2>“'+safe(r.quote)+'”</h2><p>'+safe(r.name)+' · '+safe(r.company)+'</p>';document.querySelector('#review-count').textContent=(current+1)+' / '+SiteContent.reviews.length;};
 document.querySelector('#review-prev').onclick=()=>{current=(current-1+SiteContent.reviews.length)%SiteContent.reviews.length;show();};document.querySelector('#review-next').onclick=()=>{current=(current+1)%SiteContent.reviews.length;show();};show();
}};

const Experience={init(){
const quiet=matchMedia('(prefers-reduced-motion: reduce)').matches;
const demo=new URLSearchParams(location.search).get('preview')==='1';
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const metrics=document.querySelector('#company-metrics');
const data=SiteContent.stats.length?SiteContent.stats:(demo?[{value:100,suffix:'+',label:'Happy customers'},{value:150,suffix:'+',label:'Completed projects'},{value:12,suffix:'',label:'Team members'}]:[]);
if(metrics&&data.length){metrics.hidden=false;metrics.innerHTML='<p class="vc-eyebrow">THE PEOPLE. THE WORK. THE NUMBERS.</p>'+(demo?'<p class="vc-preview-note">DESIGN PREVIEW — SAMPLE FIGURES</p>':'')+'<div class="vc-metrics-line">'+data.map(s=>'<div><strong><span data-metric="'+Number(s.value)+'">0</span>'+safe(s.suffix||'')+'</strong><p>'+safe(s.label)+'</p></div>').join('')+'</div>';const nums=[...metrics.querySelectorAll('[data-metric]')];const run=()=>{const start=performance.now();const tick=t=>{const p=quiet?1:Math.min(1,(t-start)/1800);nums.forEach(n=>n.textContent=Math.round(Number(n.dataset.metric)*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);};if(quiet)run();else{const o=new IntersectionObserver(e=>{if(e.some(x=>x.isIntersecting)){o.disconnect();run();}},{threshold:.25});o.observe(metrics);}}
const reviews=document.querySelector('#client-reviews');const voices=SiteContent.reviews.length?SiteContent.reviews:(demo?[{quote:'The finished website feels like our business. Clear, considered, and easy for our customers to use.',name:'Example customer',company:'Sample quote for layout preview'}]:[]);
if(reviews&&voices.length){reviews.hidden=false;reviews.innerHTML='<div><p class="vc-eyebrow">IN OUR CLIENTS’ WORDS</p><h2>Good work.<br><span class="vc-gradient">Better relationships.</span></h2>'+(demo?'<p class="vc-preview-note">DESIGN PREVIEW — ILLUSTRATIVE QUOTES</p>':'')+'</div><div><div id="review-copy" aria-live="polite"></div><div class="vc-review-controls"><span id="review-count"></span><div><button id="review-prev" aria-label="Previous review">←</button><button id="review-next" aria-label="Next review">→</button></div></div></div>';let i=0;const show=()=>{const r=voices[i];document.querySelector('#review-copy').innerHTML='<blockquote>“'+safe(r.quote)+'”</blockquote><p>'+safe(r.name)+' · '+safe(r.company)+'</p>';document.querySelector('#review-count').textContent=(i+1)+' / '+voices.length;if(!quiet)document.querySelector('#review-copy').animate([{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'none'}],{duration:450});};document.querySelector('#review-prev').onclick=()=>{i=(i-1+voices.length)%voices.length;show();};document.querySelector('#review-next').onclick=()=>{i=(i+1)%voices.length;show();};show();}
if(reviews&&!voices.length){reviews.hidden=false;reviews.innerHTML='<div><p class="vc-eyebrow">CLIENT PERSPECTIVES</p><h2>Good work.<br><span class="vc-gradient">Better relationships.</span></h2></div><div class="vc-review-invitation"><p>Have we worked together?</p><h3>We’d love to hear<br>your side of the story.</h3><button class="vc-text-link" data-contact>Share your experience <span>↗</span></button></div>';}
const steps=[...document.querySelectorAll('#process-list article')];
const processBand=document.querySelector('.vc-process-band');
if(processBand&&steps.length&&!quiet){
 processBand.classList.add('vc-process-scroll');
 const progress=document.createElement('div');progress.className='vc-process-progress';progress.setAttribute('aria-hidden','true');progress.innerHTML=steps.map((s,i)=>'<span><i>0'+(i+1)+'</i><b>'+s.querySelector('h3').textContent+'</b><em></em></span>').join('');document.querySelector('#process-list').append(progress);
 const paint=()=>{const rect=processBand.getBoundingClientRect(),travel=processBand.offsetHeight-innerHeight,raw=Math.max(0,Math.min(3.999,-rect.top/Math.max(1,travel)*4)),base=Math.floor(raw),t=Math.max(0,(raw-base-.6)/.4),p=base===3?3:base+t*t*(3-2*t);steps.forEach((s,i)=>{const d=i-p;s.style.transform='translateX('+(d*110)+'%)';s.style.opacity=String(Math.max(0,1-Math.abs(d)));s.inert=Math.abs(d)>.55;s.setAttribute('aria-hidden',String(Math.abs(d)>.55));});progress.querySelectorAll('span').forEach((s,i)=>s.classList.toggle('vc-current',i===Math.round(p)));};
 let queued=false;addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;paint();});}},{passive:true});addEventListener('resize',paint);paint();
}
const chapters=document.querySelectorAll('.vc-studio-chapters article');const co=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('vc-chapter-active',e.isIntersecting)),{rootMargin:'-35% 0px -10% 0px',threshold:.1});chapters.forEach(s=>co.observe(s));
const form=document.querySelector('#footer-enquiry');if(form){const status=document.querySelector('#footer-status');status.textContent=SiteContent.contactEmail?'Opens a draft in your email app.':'Email delivery awaits your business address. Your message can be prepared locally.';form.onsubmit=e=>{e.preventDefault();const f=new FormData(form);const msg='From: '+f.get('email')+'\n\n'+f.get('message');if(SiteContent.contactEmail){location.href='mailto:'+encodeURIComponent(SiteContent.contactEmail)+'?subject=Velora%20Code%20project&body='+encodeURIComponent(msg);}else status.textContent='Message prepared, not sent:\n'+msg;};}
const up=document.querySelector('.vc-back-top'), menuButton=document.querySelector('.vc-menu'), navPanel=document.querySelector('#navigation');
let scrollFrame=0;
const updateScroll=()=>{scrollFrame=0;if(up){const visible=scrollY>450;up.classList.toggle('vc-up-visible',visible);up.tabIndex=visible?0:-1;up.style.setProperty('--page-progress',(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*360)+'deg');}};
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});updateScroll();
document.querySelectorAll('.vc-back-top').forEach(a=>a.onclick=e=>{e.preventDefault();scrollTo({top:0,behavior:quiet?'instant':'smooth'});});
}};

// js/main.js
// Shared entry point: each feature lives in its own small file.
SiteRender.render(SiteContent);
Theme.init();
Menu.init();
Portfolio.init();
Dialogs.init();
Motion.init();
Experience.init();

// Newsletter handoff and real company details are configured above.
const newsletter=document.querySelector('#newsletter-form');
if(newsletter)newsletter.addEventListener('submit',e=>{e.preventDefault();const status=document.querySelector('#newsletter-status');if(SiteContent.newsletterUrl){location.href=SiteContent.newsletterUrl;}else{status.textContent='Newsletter signup is not open yet. Please check back soon. Your email has not been saved.';}});
const details=document.querySelector('.vc-contact-details');
if(details){const rows=details.querySelectorAll('a,p');if(SiteContent.contactEmail){rows[0].href='mailto:'+SiteContent.contactEmail;rows[0].lastChild.textContent=' '+SiteContent.contactEmail;}if(SiteContent.contactPhone)rows[1].lastChild.textContent=' '+SiteContent.contactPhone;if(SiteContent.location)rows[2].lastChild.textContent=' '+SiteContent.location;}
const reviewPanel=document.querySelector('#client-reviews');
if(reviewPanel){
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const real=SiteContent.reviews.length>0;
 const entries=real?SiteContent.reviews:Array.from({length:6},(_,i)=>({quote:'Your client’s words belong here.',name:'Client review '+String(i+1).padStart(2,'0'),company:'Awaiting an approved quote'}));
 reviewPanel.classList.add('vc-review-collection');reviewPanel.hidden=false;
 reviewPanel.innerHTML='<header class="vc-review-heading"><div><p class="vc-eyebrow">CLIENT PERSPECTIVES</p><h2>Different stories.<br><span class="vc-gradient">Shared confidence.</span></h2></div><p>'+(real?'In their words. A closer look at the people behind the projects.':'Review layout preview — these six spaces are ready for your real customer quotes.')+'</p></header><div class="vc-review-grid">'+entries.map((r,i)=>'<article class="vc-client-note"><div class="vc-note-top"><span>'+String(i+1).padStart(2,'0')+' / CLIENT PERSPECTIVE</span><i aria-hidden="true">↗</i></div><blockquote>'+escape(r.quote)+'</blockquote><footer><span class="vc-client-monogram" aria-hidden="true">'+(real?escape(r.name.trim().split(/\s+/).map(s=>s[0]).slice(0,2).join('')):'VC')+'</span><div><strong>'+escape(r.name)+'</strong><p>'+escape(r.company)+'</p></div></footer></article>').join('')+'</div>';
}
document.querySelectorAll('.vc-studio-strip').forEach(strip=>strip.querySelectorAll('span').forEach(s=>{s.innerHTML=s.textContent.split('✳').map(t=>t.trim()?'<b>'+t.trim()+'</b><i>✳</i>':'').join('');}));

// An overlapping deck: the front review lifts away and returns to the back.
const reviewRail=document.querySelector('.vc-review-grid');
if(reviewRail){
 const cards=[...reviewRail.children],count=cards.length;
 reviewRail.classList.add('vc-review-deck');reviewRail.tabIndex=0;
 reviewRail.setAttribute('role','region');reviewRail.setAttribute('aria-label','Customer reviews. Swipe or use left and right arrow keys to browse.');
 const hint=document.createElement('p');hint.className='vc-review-hint';hint.innerHTML='<span>SWIPE TO EXPLORE</span><span class="vc-review-position"></span>';reviewRail.after(hint);
 let current=0,drag=null,distance=0,busy=false;
 const quiet=matchMedia('(prefers-reduced-motion:reduce)');
 const paint=()=>{cards.forEach((card,i)=>{const layer=(i-current+count)%count;card.style.zIndex=count-layer;card.style.opacity=layer<3?'1':'0';card.style.transform='translate3d(0,'+(layer*18)+'px,'+(-layer*45)+'px) scale('+(1-layer*.045)+') rotate('+(layer===0?0:layer%2?-2:2)+'deg)';card.style.pointerEvents=layer===0?'auto':'none';card.inert=layer!==0;card.setAttribute('aria-hidden',String(layer!==0));});hint.lastChild.textContent=String(current+1).padStart(2,'0')+' / '+String(count).padStart(2,'0');};
 const turn=async direction=>{if(busy||count<2)return;busy=true;const card=cards[current];if(!quiet.matches){await card.animate([{transform:card.style.transform,opacity:1},{transform:'translate3d('+(direction*115)+'%, -25px, 80px) rotate('+(direction*15)+'deg)',opacity:0}],{duration:380,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'}).finished.catch(()=>{});}current=(current+1)%count;card.getAnimations().forEach(a=>a.cancel());paint();busy=false;};
 reviewRail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turn(e.key==='ArrowRight'?-1:1);}});
 reviewRail.addEventListener('pointerdown',e=>{if(busy||(e.pointerType==='mouse'&&e.button!==0))return;drag=e.clientX;distance=0;reviewRail.setPointerCapture(e.pointerId);reviewRail.classList.add('vc-dragging');});
 reviewRail.addEventListener('pointermove',e=>{if(drag===null||busy)return;distance=e.clientX-drag;cards[current].style.transform='translate3d('+distance+'px,0,30px) rotate('+(quiet.matches?0:distance/22)+'deg)';});
 const release=cancel=>{if(drag===null)return;drag=null;reviewRail.classList.remove('vc-dragging');if(!cancel&&Math.abs(distance)>Math.min(65,reviewRail.clientWidth*.18))turn(distance<0?-1:1);else paint();};
 reviewRail.addEventListener('pointerup',()=>release(false));reviewRail.addEventListener('pointercancel',()=>release(true));reviewRail.addEventListener('lostpointercapture',()=>release(true));
 const measure=()=>reviewRail.style.height=(Math.max(...cards.map(c=>c.offsetHeight))+50)+'px';new ResizeObserver(measure).observe(reviewRail);paint();measure();
}

// A ring follows the mouse; its smaller dot eases towards the ring.
const cursorMedia=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
const ring=document.createElement('span'),dot=document.createElement('span');ring.className='vc-cursor-ring';dot.className='vc-cursor-dot';[ring,dot].forEach(el=>{el.setAttribute('aria-hidden','true');document.body.append(el);});
let cursorFrame=0,cursorActive=false,mx=0,my=0,rx=0,ry=0,dx=0,dy=0;
const cursorPaint=()=>{rx+=(mx-rx)*.3;ry+=(my-ry)*.3;dx+=(rx-dx)*.1;dy+=(ry-dy)*.1;ring.style.transform='translate3d('+rx+'px,'+ry+'px,0) translate(-50%,-50%)';dot.style.transform='translate3d('+dx+'px,'+dy+'px,0) translate(-50%,-50%)';if(cursorActive&&(Math.abs(mx-dx)+Math.abs(my-dy)>.1))cursorFrame=requestAnimationFrame(cursorPaint);else{dot.style.transform=ring.style.transform;cursorFrame=0;}};
const hideCursor=()=>{cursorActive=false;document.body.classList.remove('vc-cursor-active');cancelAnimationFrame(cursorFrame);cursorFrame=0;};
document.addEventListener('pointermove',e=>{if(!cursorMedia.matches||e.pointerType!=='mouse'){hideCursor();return;}mx=e.clientX;my=e.clientY;if(!cursorActive){rx=dx=mx;ry=dy=my;cursorActive=true;document.body.classList.add('vc-cursor-active');}ring.classList.toggle('vc-cursor-hover',!!e.target.closest('a,button,input,textarea,.vc-review-loop'));if(!cursorFrame)cursorFrame=requestAnimationFrame(cursorPaint);},{passive:true});
document.documentElement.addEventListener('pointerleave',hideCursor);window.addEventListener('blur',hideCursor);cursorMedia.addEventListener('change',hideCursor);document.addEventListener('visibilitychange',()=>{if(document.hidden)hideCursor();});
