const dialog=document.querySelector('#lightbox');
const image=dialog.querySelector('img');
for(const button of document.querySelectorAll('[data-image]')){
 button.addEventListener('click',()=>{image.src=button.dataset.image;image.alt=button.querySelector('img').alt;dialog.showModal()});
}
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientY<r.top||event.clientY>r.bottom||event.clientX<r.left||event.clientX>r.right)dialog.close()}});
fetch('downloads/release.json').then(r=>{if(!r.ok)throw Error('Release metadata unavailable');return r.json()}).then(release=>{
 if(release.notarized===true&&release.gatekeeper==='accepted')document.querySelector('#notary-label').textContent='APPLE NOTARIZED';
 document.querySelector('#release-size').textContent=`${(release.bytes/1048576).toFixed(1)} MB · Developer ID signed`;
}).catch(()=>{});
