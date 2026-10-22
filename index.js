const $=s=>document.querySelector(s),
S=(id,w=576,a='')=>`<svg viewBox="0 0 ${w} 512"${a}><use href="#${id}"/></svg>`,
esc=s=>String(s).replace(/[&<>"]/g,c=>'&#'+c.charCodeAt()+';'),
J=(k,d)=>{try{return JSON.parse(localStorage[k]||d)}catch{return JSON.parse(d)}},

// ---------- DATA ----------
// c = category, t = tag ('New' | 'Sale' | 'Out of stock'), o = old price, i = images (first is main)
P=[
{s:'Naruto',n:'ITACHI UCHIHA BRACELET',p:499,c:'accessories',d:`A sleek Itachi Uchiha bracelet with Akatsuki spirit. Adjustable fit and a durable finish for everyday wear.`,i:['shop products/p1/sp1.jpg','shop products/p1/sp2.jpg','shop products/p1/sp3.jpg']},
{s:'One-Piece',n:'LUFFY HAT NECKLACE',p:599,c:'accessories',d:`Wear Luffy's iconic straw hat around your neck. A lightweight pendant on a sturdy chain.`,i:['shop products/p2.jpg']},
{s:'Dragon-Ball',n:'GOKU KEYCHAIN',p:299,c:'accessories',d:`Spiky-haired Goku in a tough metal keychain. Perfect for keys, bags and backpacks.`,i:['shop products/p3.jpg']},
{s:'Demon Slayer',n:'TANJIRO KIMONO',p:1299,o:1599,t:'Sale',c:'cosplay',d:`Checkered haori-style kimono inspired by Tanjiro Kamado. Breathable fabric, ideal for cosplay and conventions.`,i:['shop products/p4.jpg']},
{s:'Attack-On-Titan',n:'ATTACK ON TITAN COSPLAY',p:1499,t:'New',c:'cosplay',d:`A complete Survey Corps-style cosplay set from Attack on Titan. Comfortable fit with detailed stitching.`,i:['shop products/p5.jpg']},
{s:'Anime',n:'ANIME LAPTOP SKIN',p:249,c:'accessories',d:`A colourful anime character collage skin for your laptop. Bubble-free vinyl that peels off without residue.`,i:['features/6.jpg']},
{s:'Bleach',n:'BLEACH KIMONO',p:1999,t:'Out of stock',c:'cosplay',d:`Shinigami-style kimono inspired by Bleach. Flowing fabric for a dramatic cosplay look.`,i:['shop products/p6.jpg']},
{s:'Tokyo-Revengers',n:'DRAKEN JACKET',p:1099,o:1399,t:'Sale',c:'cosplay',d:`Tokyo Revengers-inspired jacket with bold embroidery. Warm, durable and made for the street.`,i:['shop products/p7.jpg']},
{s:'Tokyo-Revengers',n:'MIKEY SCROLL',p:499,c:'accessories',d:`A printed scroll poster of Mikey from Tokyo Revengers. Hang it up for an instant anime corner.`,i:['shop products/p8.jpg']},
{s:'My-Hero-Academia',n:'MY HERO ACADEMIA BACKPACK',p:2299,o:2799,t:'Sale',c:'accessories',d:`A roomy backpack with a My Hero Academia print. Padded straps and space for a laptop and books.`,i:['shop products/p9.jpg']},
{s:'Attack-On-Titan',n:'LEVI COFFEE CUP',p:299,c:'accessories',d:`A large ceramic coffee cup featuring Levi from Attack on Titan. Glossy finish, dishwasher safe.`,i:['features/5.jpg']},
{s:'Death-Note',n:'DEATH NOTE RULED BOOK',p:649,c:'accessories',d:`A ruled notebook styled after the Death Note. Hardcover with a dark finish, great for notes and sketches.`,i:['shop products/p10.jpg']},
{s:'Naruto',n:'KAKASHI HATAKE BLACK HOODIE',p:999,t:'New',c:'hoodies',d:`A soft fleece hoodie with a Kakashi Hatake print. The laser-printed design stays sharp after washing.`,i:['features/1.jpg']},
{s:'One-Piece',n:'LUFFY BLACK HOODIE',p:799,c:'hoodies',d:`A black hoodie with a hand-drawn Luffy print. Warm, comfortable and made for everyday wear.`,i:['features/2.jpg']},
{s:'Dragon-Ball',n:'GOKU BLACK HOODIE',p:599,c:'hoodies',d:`A black hoodie featuring Goku's spiky-hair silhouette. Soft fabric with a durable print.`,i:['features/3.webp']},
{s:'One-Piece',n:'HANCOCK PILLOW',p:1299,o:1599,t:'Sale',c:'accessories',d:`A long, soft pillow featuring Boa Hancock artwork. Cosy for lounging and gaming sessions.`,i:['features/4.jpg']}
].map(x=>({...x,i:x.i.map(s=>'images/'+s)})),

// sample reviews: [name, stars, text]. Replace with real customer reviews before going live.
R=[
[['Aarav',5,`Looks exactly like the pictures. The Sharingan charm is a nice touch.`],['Meera',4,`Good quality for the price, fits a smaller wrist snugly.`]],
[['Rohan',5,`I wear it every day. The straw hat detail is neat.`],['Sneha',4,`The chain is a bit thin, but the pendant is great.`]],
[['Karthik',5,`Sturdy metal and the paint is sharp.`],['Ananya',4,`Cute and lightweight, arrived well packed.`]],
[['Vikram',5,`The checkered pattern is spot on, great for cosplay.`],['Divya',4,`Fabric is thick. Order one size up.`]],
[['Arjun',5,`The whole set looked amazing at the convention.`],['Priya',4,`Stitching is solid. The straps took some adjusting.`]],
[['Nikhil',5,`Easy to apply with no bubbles, and the colours pop.`],['Isha',5,`Fits my 15-inch laptop perfectly.`]],
[['Harsh',4,`Looks great and the fabric feels premium.`],['Tanvi',5,`Perfect for an Ichigo cosplay.`]],
[['Sameer',5,`The embroidery is clean and the jacket is warm.`],['Neha',4,`Slightly long in the sleeves, otherwise great.`]],
[['Rahul',5,`Looks great on my wall and the print is sharp.`],['Aditi',4,`Good size, the paper is sturdy.`]],
[['Yash',5,`Plenty of room for my laptop and books.`],['Kavya',4,`The zips are smooth and the print has not faded.`]],
[['Manoj',5,`The print survived many washes. Nice big mug.`],['Pooja',5,`Perfect morning coffee companion.`]],
[['Siddharth',5,`Lovely cover and a great gift for fans.`],['Riya',4,`Looks like the real thing. Paper could be thicker.`]],
[['Dev',5,`Soft fleece inside and the print is crisp.`],['Shruti',4,`Runs a little big, still cosy.`]],
[['Abhay',5,`The OK print makes me smile every time.`],['Lakshmi',5,`Warm and well stitched.`]],
[['Varun',5,`The print has not cracked after many washes.`],['Pallavi',4,`Great fit and quick delivery.`]],
[['Gaurav',4,`Soft and comfortable, the print is bold.`],['Sana',5,`Super comfy for sleeping.`]]
],

// ---------- STATE ----------
C=()=>J('cart','{}'),
W=()=>J('wish','[]'),
ent=()=>Object.entries(C()).map(([k,q])=>({k,q,x:P[k.split('|')[0]],z:k.split('|')[1]})).filter(e=>e.x),
sub=()=>ent().reduce((a,e)=>a+e.x.p*e.q,0),
CP={ANIME10:['10% off',s=>Math.round(s*.1)],WELCOME100:['₹100 off',s=>Math.min(100,s)]},
disc=()=>CP[localStorage.cp]?.[1](sub())||0,
rows=()=>`<tr><td>Cart Subtotal</td><td>₹${sub()}</td></tr>${disc()?`<tr><td>Discount (${localStorage.cp})</td><td>−₹${disc()}</td></tr>`:''}<tr><td>Shipping</td><td>Free</td></tr><tr><td><strong>Total</strong></td><td><strong>₹${sub()-disc()}</strong></td></tr>`,
revs=i=>[...R[i],...(J('rev','{}')[i]||[])],
rate=i=>{const r=revs(i),n=r.length;return{n,avg:n?Math.round(r.reduce((a,b)=>a+b[1],0)/n*10)/10:0}},
st=r=>[1,2,3,4,5].map(i=>`<i class="fa fa-star${r>=i-.25?'':r>=i-.75?'-half-o':'-o'}"></i>`).join(''),
count=()=>{$('#n').textContent=ent().reduce((a,e)=>a+e.q,0)||'';$('#wn').textContent=W().length||''},
save=c=>{localStorage.cart=JSON.stringify(c);count()},
toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1800)},
dk=()=>document.body.classList.contains('dark'),
mode=()=>$('#mode').innerHTML=`<i class="fa fa-${dk()?'sun':'moon'}-o"></i>`,

// ---------- VIEWS ----------
card=i=>{const x=P[i],r=rate(i),h=`sproduct.html?id=${i}`;
 return `<div class="pro">${x.t?`<b class="tag ${x.t.toLowerCase().split(' ')[0]}">${x.t}</b>`:''}<i class="fa fa-heart${W().includes(i)?'':'-o'} wish" data-w="${i}" role="button" aria-label="Wishlist"></i><a href="${h}"><img src="${x.i[0]}"${x.i[1]?` data-o="${x.i[0]}" data-h="${x.i[1]}"`:''} alt="${x.n}" loading="lazy"></a><div class="des"><span>${x.s.replace(/-/g,' ')}</span><a href="${h}"><h5>${x.n}</h5></a><div class="star">${st(r.avg)}<small>(${r.n})</small></div><h4>₹${x.p}${x.o?` <s>₹${x.o}</s>`:''}</h4></div>${x.t=='Out of stock'?'':S('c',576,` class="cart" data-id="${i}" aria-label="Add to cart"`)}</div>`},
fill=(s,h)=>$(s)&&($(s).innerHTML=h),
wl=()=>fill('#wl',W().map(card).join('')||'<p class="empty">Your wishlist is empty. Tap the ♡ on any product to save it.</p>'),
shop=()=>{const q=$('#q').value.toLowerCase(),c=$('#cat').value,s=$('#ser').value,o=$('#srt').value;
 const ids=P.map((_,i)=>i).filter(i=>{const x=P[i];return(!c||x.c==c)&&(!s||x.s==s)&&(x.n+' '+x.s).toLowerCase().includes(q)});
 if(o=='a')ids.sort((a,b)=>P[a].p-P[b].p);if(o=='d')ids.sort((a,b)=>P[b].p-P[a].p);if(o=='r')ids.sort((a,b)=>rate(b).avg-rate(a).avg);
 fill('#all',ids.map(card).join('')||'<p class="empty">Nothing here yet. New drops are coming soon!</p>');$('#cnt').textContent=ids.length+' products'},
render=()=>{const e=ent(),nm=r=>r.x.n+(r.z?` (${r.z})`:'');
 fill('#cart tbody',e.map((r,j)=>`<tr><td>${j+1}.</td><td><img src="${r.x.i[0]}" alt="${r.x.n}"></td><td>${nm(r)}</td><td>₹${r.x.p}</td><td><input type="number" min="1" value="${r.q}" data-q="${r.k}" aria-label="Quantity"></td><td>₹${r.x.p*r.q}</td><td><button data-rm="${r.k}" aria-label="Remove">✕</button></td></tr>`).join('')||'<tr><td colspan="7">Your cart is empty</td></tr>');
 fill('#oi',e.map(r=>`<li>${nm(r)} × ${r.q}<b>₹${r.x.p*r.q}</b></li>`).join('')||'<li>Your cart is empty</li>');
 fill('#tt',rows())},
pdp=()=>{if(!$('#Product'))return;
 const q=+new URLSearchParams(location.search).get('id'),id=P[q]?q:0,x=P[id],out=x.t=='Out of stock',cl=['hoodies','cosplay'].includes(x.c),r=rate(id);
 document.title=x.n+' | Anime World';
 $('#Product').innerHTML=`<div class="gal"><div class="zoom"><img id="mi" src="${x.i[0]}" alt="${x.n}"></div>${x.i[1]?`<div class="th">${x.i.map((s,j)=>`<img src="${s}" alt="${x.n} view ${j+1}"${j?'':' class="on"'}>`).join('')}</div>`:''}</div><div class="single"><h6>${x.s.replace(/-/g,' ')}</h6><h2 class="pn">${x.n}</h2><div class="star">${st(r.avg)}<small>${r.avg} (${r.n} reviews)</small></div><h3 class="pr">₹${x.p}${x.o?` <s>₹${x.o}</s>`:''}</h3><p class="stock${out?' out':''}">${out?'Out of stock':'In stock'}</p>${cl?`<select id="sz" aria-label="Size"><option value="">Select Size</option>${['S','M','L','XL','XXL'].map(o=>`<option>${o}</option>`).join('')}</select>`:''}<input id="qty" type="number" min="1" value="1" aria-label="Quantity"><button class="btn" data-id="${id}"${out?' disabled':''}>${out?'Sold Out':'Add To Cart'}</button><button class="btn alt" data-w="${id}"><i class="fa fa-heart${W().includes(id)?'':'-o'}"></i> Wishlist</button><h4>Product Details</h4><p>${x.d}</p>${cl?'<p><a href="info.html#size"><u>Size guide</u></a></p>':''}</div>`;
 $('#reviews').innerHTML=`<div class="text p">REVIEWS</div>${revs(id).map(v=>`<div class="rv"><b>${esc(v[0])}</b><span class="star">${st(v[1])}</span><p>${esc(v[2])}</p></div>`).join('')}<form id="rf" data-p="${id}"><h3>Write a review</h3><input name="n" placeholder="Your name" required><select name="r" aria-label="Rating">${[5,4,3,2,1].map(n=>`<option value="${n}">${n} ★</option>`).join('')}</select><textarea name="t" rows="3" placeholder="Your review" required></textarea><button class="btn">Submit Review</button></form>`;
 fill('#rel',P.map((_,i)=>i).filter(i=>i!=id).sort((a,b)=>((P[b].s==x.s)*2+(P[b].c==x.c))-((P[a].s==x.s)*2+(P[a].c==x.c))).slice(0,4).map(card).join(''))};

// icons (defined once) + toast
document.body.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute"><path id="c" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/><path id="b" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg><div id="toast" role="status"></div>');
if(localStorage.dark)document.body.classList.add('dark');

// header + footer
const pg=(location.pathname.split('/').pop().replace('.html','')||'index').replace('sproduct','shop'),
 on=h=>pg==h?' class="active"':'';
$('#header').innerHTML=`<a href="index.html"><img src="images/anime.png" alt="Anime World"></a><ul id="navbar"><li id="close">✕</li>${['index','shop','blog','contact','about'].map(h=>`<li><a${on(h)} href="${h}.html">${h=='index'?'HOME':h.toUpperCase()}</a></li>`).join('')}<li><a${on('wishlist')} href="wishlist.html" aria-label="Wishlist"><i class="fa fa-heart-o"></i><sup id="wn"></sup></a></li><li><a${on('cart')} href="cart.html" aria-label="Cart">${S('c')}<sup id="n"></sup></a></li><li id="mode" role="button" aria-label="Toggle dark mode"></li></ul>${S('b',448,' id="bar"')}`;
$('footer').innerHTML=`<div class="row"><h1>Follow Us</h1><br>${['facebook','instagram','youtube','twitter'].map(x=>`<a href="#" aria-label="${x}"><i class="fa fa-${x}"></i></a>`).join('')}</div><div class="row"><ul>${[['Contact us','contact.html'],['Size Guide','info.html#size'],['Shipping &amp; Returns','info.html#shipping'],['Privacy Policy','info.html#privacy'],['Terms &amp; Conditions','info.html#terms']].map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></div><form id="nl" class="row"><input type="email" required placeholder="Email for new drops" aria-label="Email"> <button class="btn">Subscribe</button></form><div class="row">R_R Copyright © 2023 Anime World - Shopping Website</div>`;
$('#bar').onclick=()=>$('#navbar').classList.add('active');
$('#close').onclick=()=>$('#navbar').classList.remove('active');
mode();count();

// page setup
fill('#trend',[12,13,14,15,10,5,3,7].map(card).join(''));
if($('#all')){
 $('#ser').innerHTML='<option value="">All anime</option>'+[...new Set(P.map(x=>x.s))].map(s=>`<option value="${s}">${s.replace(/-/g,' ')}</option>`).join('');
 const sp=new URLSearchParams(location.search);$('#cat').value=sp.get('cat')||'';$('#q').value=sp.get('q')||'';
 shop();['input','change'].forEach(v=>$('#tools').addEventListener(v,shop))}
pdp();wl();render();
if($('#cm')&&CP[localStorage.cp])$('#cm').textContent=localStorage.cp+' applied: '+CP[localStorage.cp][0];
if($('#ord')){const o=J('order','null');
 $('#ord').innerHTML=o?`<h2>Thank you, ${esc(o.name)}! 🎉</h2><p>Your order <b>${o.id}</b> has been placed.</p><table class="ot">${o.items.map(i=>`<tr><td>${esc(i[0])} × ${i[1]}</td><td>₹${i[1]*i[2]}</td></tr>`).join('')}${o.d?`<tr><td>Discount</td><td>−₹${o.d}</td></tr>`:''}<tr><td><b>Total (${esc(o.pay)})</b></td><td><b>₹${o.t}</b></td></tr></table><p>Delivering to ${esc(o.address)}, ${esc(o.city)} - ${esc(o.pin)}.<br>Estimated delivery: 5-7 working days.</p><a class="btn" href="shop.html">Continue Shopping</a>`:'<h2>No recent order</h2><p>&nbsp;</p><a class="btn" href="shop.html">Start Shopping</a>'}

// events
document.addEventListener('click',e=>{const t=e.target,
 a=t.closest('[data-id]'),r=t.closest('[data-rm]'),w=t.closest('[data-w]'),b=t.closest('[data-cat]'),h=t.closest('.th img');
 if(a){const id=a.dataset.id,sz=$('#sz');
  if(['hoodies','cosplay'].includes(P[id].c)&&!$('#Product')){location='sproduct.html?id='+id;return}
  if(sz&&!sz.value)return toast('Please select a size');
  const c=C(),k=id+(sz?'|'+sz.value:'');c[k]=(c[k]||0)+(+$('#qty')?.value||1);save(c);toast('Added to cart ✓')}
 if(r){const c=C();delete c[r.dataset.rm];save(c);render()}
 if(w){const id=+w.dataset.w,l=W(),j=l.indexOf(id);j<0?l.push(id):l.splice(j,1);localStorage.wish=JSON.stringify(l);count();
  const i=w.matches('i')?w:w.querySelector('i');i.classList.toggle('fa-heart');i.classList.toggle('fa-heart-o');
  toast(j<0?'Saved to wishlist ♥':'Removed from wishlist');wl()}
 if(b&&$('#cat')){$('#cat').value=b.dataset.cat;shop();$('#tools').scrollIntoView({behavior:'smooth'})}
 if(h){$('#mi').src=h.src;document.querySelectorAll('.th img').forEach(i=>i.classList.toggle('on',i==h))}
 if(t.closest('#mode')){document.body.classList.toggle('dark');dk()?localStorage.dark=1:delete localStorage.dark;mode()}
 if(t.closest('#ap')){const v=$('#cc').value.trim().toUpperCase();
  if(CP[v]){localStorage.cp=v;$('#cm').textContent=v+' applied: '+CP[v][0]}else{delete localStorage.cp;$('#cm').textContent='Invalid coupon code'}render()}});
document.addEventListener('change',e=>{const k=e.target.dataset.q;if(k){const c=C();c[k]=Math.max(1,+e.target.value||1);save(c);render()}});
document.addEventListener('mousemove',e=>{const z=e.target.closest?.('.zoom');if(z){const b=z.getBoundingClientRect();z.style.setProperty('--x',(e.clientX-b.left)/b.width*100+'%');z.style.setProperty('--y',(e.clientY-b.top)/b.height*100+'%')}});
document.addEventListener('mouseover',e=>{if(e.target.dataset?.h)e.target.src=e.target.dataset.h});
document.addEventListener('mouseout',e=>{if(e.target.dataset?.o)e.target.src=e.target.dataset.o});
document.addEventListener('submit',e=>{const f=e.target,d=Object.fromEntries(new FormData(f));
 if(f.id=='nl'||f.id=='cf'){e.preventDefault();f.reset();toast(f.id=='nl'?'Thanks for subscribing!':'Message sent! We will reply soon.')}
 if(f.id=='rf'){e.preventDefault();const v=J('rev','{}'),i=f.dataset.p;(v[i]=v[i]||[]).push([d.n,+d.r,d.t]);localStorage.rev=JSON.stringify(v);pdp();toast('Thanks for your review!')}
 if(f.id=='co'){e.preventDefault();if(!ent().length)return toast('Your cart is empty');
  localStorage.order=JSON.stringify({id:'AW'+Date.now().toString().slice(-7),items:ent().map(r=>[r.x.n+(r.z?` (${r.z})`:''),r.q,r.x.p]),d:disc(),t:sub()-disc(),...d});
  localStorage.cart='{}';delete localStorage.cp;location='order.html'}});
